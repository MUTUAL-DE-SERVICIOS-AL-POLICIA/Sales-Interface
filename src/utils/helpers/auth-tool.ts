import "server-only";

import { GatewayRequestError } from "@/utils/services/GatewayRequestError";

const TOOL_KEY_PATTERN = /^[a-z][a-z0-9-]{0,63}$/;

export function configuredToolKey(): string {
  const value = process.env.AUTH_TOOL_KEY;
  if (!value || !TOOL_KEY_PATTERN.test(value)) {
    throw new GatewayRequestError(502, "AUTH_UPSTREAM_ERROR");
  }
  return value;
}
