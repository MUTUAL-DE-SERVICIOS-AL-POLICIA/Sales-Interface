import "server-only";

import { cookies } from "next/headers";

import { gatewayInternalUrl } from "@/utils/helpers/urls";
import { configuredToolKey } from "@/utils/helpers/auth-tool";
import {
  GatewayErrorCode,
  GatewayRequestError,
  isGatewayErrorCode,
} from "./GatewayRequestError";

type ResponseProfile = "context" | "json" | "upload" | "blob";

const SID_PATTERN = /^[A-Za-z0-9_-]{43,128}$/;
const WEB_TOOL_HEADER = "X-Muserpol-Tool";
const PUBLIC_ERROR_MAX_BYTES = 64 * 1024;
const CONTEXT_MAX_BYTES = 64 * 1024;
// Persons lists and related JSON can legitimately exceed the context limit.
const FUNCTIONAL_JSON_MAX_BYTES = 8 * 1024 * 1024;
const UPLOAD_RESPONSE_MAX_BYTES = 1024 * 1024;

const PROFILE_TIMEOUT_MS: Record<ResponseProfile, number> = {
  context: 15_000,
  json: 30_000,
  upload: 5 * 60_000,
  blob: 5 * 60_000,
};

const PROFILE_MAX_BYTES: Record<Exclude<ResponseProfile, "blob">, number> = {
  context: CONTEXT_MAX_BYTES,
  json: FUNCTIONAL_JSON_MAX_BYTES,
  upload: UPLOAD_RESPONSE_MAX_BYTES,
};

const statusByCode: Record<GatewayErrorCode, number> = {
  INVALID_CLIENT_REQUEST: 400,
  INVALID_AUTHORIZATION_REQUEST: 400,
  SESSION_INVALID: 401,
  AUTHORIZATION_DENIED: 403,
  WEB_TOOL_UNAVAILABLE: 403,
  WEB_CLIENT_ACCESS_DENIED: 403,
  AUTHORIZATION_CONTEXT_INVALID: 500,
  AUTH_UPSTREAM_ERROR: 502,
  WEB_CLIENT_INVALID: 502,
  AUTH_SERVICE_UNAVAILABLE: 503,
  WEB_AUTH_DISABLED: 503,
  BENEFICIARY_SERVICE_UNAVAILABLE: 503,
};

function joinUrl(endpoint: string): string {
  const path = endpoint.replace(/^\/+/, "");
  return new URL(`/api/${path}`, gatewayInternalUrl()).toString();
}

async function getSid(): Promise<string> {
  const values = (await cookies()).getAll("sid");

  if (values.length !== 1 || !SID_PATTERN.test(values[0].value)) {
    throw new GatewayRequestError(401, "SESSION_INVALID");
  }

  return values[0].value;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function exactKeys(
  record: Record<string, unknown>,
  expected: readonly string[],
): boolean {
  const keys = Object.keys(record);
  return (
    keys.length === expected.length &&
    keys.every((key) => expected.includes(key))
  );
}

function hasJsonContentType(response: Response): boolean {
  return (
    response.headers
      .get("content-type")
      ?.split(";", 1)[0]
      .trim()
      .toLowerCase() === "application/json"
  );
}

function parsePublicError(
  response: Response,
  bytes: Uint8Array,
): GatewayRequestError {
  try {
    if (!hasJsonContentType(response)) throw new Error();
    const payload: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!isPlainRecord(payload) || !exactKeys(payload, ["error"]))
      throw new Error();

    const error = payload.error;
    if (!isPlainRecord(error) || !exactKeys(error, ["code", "message"]))
      throw new Error();
    if (
      !isGatewayErrorCode(error.code) ||
      typeof error.message !== "string" ||
      !error.message.trim()
    ) {
      throw new Error();
    }
    if (statusByCode[error.code] !== response.status) throw new Error();

    return new GatewayRequestError(response.status, error.code);
  } catch {
    return new GatewayRequestError(502, "AUTH_UPSTREAM_ERROR");
  }
}

async function readBody(
  response: Response,
  maxBytes: number | undefined,
): Promise<Uint8Array> {
  const declaredLength = response.headers.get("content-length");
  if (declaredLength !== null) {
    const parsedLength = Number(declaredLength);
    if (
      !Number.isSafeInteger(parsedLength) ||
      parsedLength < 0 ||
      (maxBytes && parsedLength > maxBytes)
    ) {
      throw new GatewayRequestError(502, "AUTH_UPSTREAM_ERROR");
    }
  }

  if (!response.body) return new Uint8Array();

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (maxBytes !== undefined && total > maxBytes) {
        await reader.cancel();
        throw new GatewayRequestError(502, "AUTH_UPSTREAM_ERROR");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

function rebuiltResponse(response: Response, bytes: Uint8Array): Response {
  const headers = new Headers(response.headers);
  const body = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(body).set(bytes);
  headers.delete("content-length");
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function request(
  endpoint: string,
  init: RequestInit,
  profile: ResponseProfile,
): Promise<Response> {
  const sid = await getSid();
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    PROFILE_TIMEOUT_MS[profile],
  );
  const headers = new Headers(init.headers);

  headers.set("Cookie", `sid=${sid}`);
  headers.set(WEB_TOOL_HEADER, configuredToolKey());

  try {
    const response = await fetch(joinUrl(endpoint), {
      ...init,
      cache: "no-store",
      headers,
      signal: controller.signal,
    });

    const limit = response.ok
      ? profile === "blob"
        ? undefined
        : PROFILE_MAX_BYTES[profile]
      : PUBLIC_ERROR_MAX_BYTES;
    const bytes = await readBody(response, limit);

    if (!response.ok) throw parsePublicError(response, bytes);
    if (profile === "context" && !hasJsonContentType(response)) {
      throw new GatewayRequestError(502, "AUTH_UPSTREAM_ERROR");
    }
    return rebuiltResponse(response, bytes);
  } catch (error) {
    if (error instanceof GatewayRequestError) throw error;
    const isAuthRequest = endpoint.replace(/^\/+/, "").startsWith("auth/");
    throw new GatewayRequestError(
      isAuthRequest ? 503 : 502,
      isAuthRequest ? "AUTH_SERVICE_UNAVAILABLE" : "AUTH_UPSTREAM_ERROR",
    );
  } finally {
    clearTimeout(timeout);
  }
}

export const apiClient = {
  GET(
    endpoint: string,
    params?: Record<string, string | number>,
    contentType = "application/json",
  ) {
    const search = params
      ? new URLSearchParams(
          Object.entries(params).map(([key, value]) => [key, String(value)]),
        )
      : undefined;
    const path = search?.size ? `${endpoint}?${search}` : endpoint;
    return request(
      path,
      { method: "GET", headers: { "Content-Type": contentType } },
      "json",
    );
  },
  GET_BLOB(endpoint: string) {
    return request(endpoint, { method: "GET" }, "blob");
  },
  POST_CONTEXT(endpoint: string, body: unknown) {
    return request(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      "context",
    );
  },
  POST(endpoint: string, body: unknown, isFormData = false) {
    return request(
      endpoint,
      {
        method: "POST",
        headers: isFormData
          ? undefined
          : { "Content-Type": "application/json" },
        body: isFormData ? (body as BodyInit) : JSON.stringify(body),
      },
      isFormData ? "upload" : "json",
    );
  },
  PATCH(endpoint: string, body: unknown, isFormData = false) {
    return request(
      endpoint,
      {
        method: "PATCH",
        headers: isFormData
          ? undefined
          : { "Content-Type": "application/json" },
        body: isFormData ? (body as BodyInit) : JSON.stringify(body),
      },
      isFormData ? "upload" : "json",
    );
  },
  PUT(endpoint: string, body: unknown) {
    return request(
      endpoint,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      "json",
    );
  },
  DELETE(endpoint: string) {
    return request(endpoint, { method: "DELETE" }, "json");
  },
};
