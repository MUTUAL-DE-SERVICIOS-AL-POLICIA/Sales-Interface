import "server-only";

import { cache } from "react";

import { apiClient } from "@/utils/services/GatewayServerClient";
import { configuredToolKey } from "@/utils/helpers/auth-tool";
import { GatewayRequestError } from "@/utils/services/GatewayRequestError";
import { UserContext } from "@/utils/interfaces";

const TECHNICAL_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function invalid(): never {
  throw new GatewayRequestError(502, "AUTH_UPSTREAM_ERROR");
}

function record(value: unknown): Record<string, unknown> {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.getPrototypeOf(value) !== Object.prototype
  )
    invalid();
  return value as Record<string, unknown>;
}

function future(value: unknown): number {
  if (!Number.isSafeInteger(value) || (value as number) <= Date.now())
    invalid();
  return value as number;
}

function parse(value: unknown, expectedTool: string): UserContext {
  const source = record(value);
  const keys = [
    "authenticated",
    "currentTool",
    "currentClient",
    "identity",
    "realmRoles",
    "clientRoles",
    "groups",
    "permissions",
    "contextExpiresAt",
    "permissionsExpiresAt",
    "sessionExpiresAt",
    "sessionAbsoluteExpiresAt",
  ];
  if (
    Object.keys(source).length !== keys.length ||
    Object.keys(source).some((key) => !keys.includes(key)) ||
    source.authenticated !== true ||
    source.currentTool !== expectedTool ||
    typeof source.currentClient !== "string" ||
    !TECHNICAL_ID_PATTERN.test(source.currentClient) ||
    !Array.isArray(source.permissions)
  )
    invalid();

  const identity = record(source.identity);
  const identityKeys = [
    "sub",
    "preferredUsername",
    "name",
    "givenName",
    "familyName",
    "email",
  ];
  if (
    Object.keys(identity).some((key) => !identityKeys.includes(key)) ||
    typeof identity.sub !== "string" ||
    !identity.sub.trim() ||
    identityKeys
      .slice(1)
      .some(
        (key) =>
          identity[key] !== undefined &&
          (typeof identity[key] !== "string" ||
            !(identity[key] as string).trim()),
      )
  )
    invalid();
  const stringList = (value: unknown): string[] => {
    if (
      !Array.isArray(value) ||
      value.some((item) => typeof item !== "string") ||
      new Set(value).size !== value.length
    )
      invalid();
    return [...value] as string[];
  };
  const realmRoles = stringList(source.realmRoles);
  const clientRoles = stringList(source.clientRoles);
  const groups = stringList(source.groups);

  const permissions = source.permissions.map((candidate) => {
    const item = record(candidate);
    if (
      Object.keys(item).length !== 2 ||
      !Object.prototype.hasOwnProperty.call(item, "resource") ||
      !Object.prototype.hasOwnProperty.call(item, "scopes") ||
      typeof item.resource !== "string" ||
      !item.resource ||
      !Array.isArray(item.scopes) ||
      item.scopes.some((scope) => typeof scope !== "string" || !scope) ||
      new Set(item.scopes).size !== item.scopes.length
    )
      invalid();
    return { resource: item.resource, scopes: [...item.scopes] as string[] };
  });
  const contextExpiresAt = future(source.contextExpiresAt);
  const permissionsExpiresAt = future(source.permissionsExpiresAt);
  const sessionExpiresAt = future(source.sessionExpiresAt);
  const sessionAbsoluteExpiresAt = future(source.sessionAbsoluteExpiresAt);
  if (
    permissionsExpiresAt > contextExpiresAt ||
    contextExpiresAt > sessionExpiresAt ||
    sessionExpiresAt > sessionAbsoluteExpiresAt
  )
    invalid();

  return {
    authenticated: true,
    currentTool: expectedTool,
    currentClient: source.currentClient,
    identity: identity as UserContext["identity"],
    realmRoles,
    clientRoles,
    groups,
    permissions,
    contextExpiresAt,
    permissionsExpiresAt,
    sessionExpiresAt,
    sessionAbsoluteExpiresAt,
  };
}

export const getUserContext = cache(async () => {
  const tool = configuredToolKey();
  const response = await apiClient.POST_CONTEXT("auth/client/context", {
    tool,
  });

  return parse(await response.json(), tool);
});
