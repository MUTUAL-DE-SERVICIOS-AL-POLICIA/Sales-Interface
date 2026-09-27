export const gatewayErrorCodes = [
  "INVALID_CLIENT_REQUEST",
  "INVALID_AUTHORIZATION_REQUEST",
  "SESSION_INVALID",
  "WEB_TOOL_UNAVAILABLE",
  "WEB_CLIENT_ACCESS_DENIED",
  "WEB_CLIENT_INVALID",
  "AUTHORIZATION_DENIED",
  "AUTHORIZATION_CONTEXT_INVALID",
  "AUTH_UPSTREAM_ERROR",
  "AUTH_SERVICE_UNAVAILABLE",
  "WEB_AUTH_DISABLED",
  "BENEFICIARY_SERVICE_UNAVAILABLE",
] as const;

export type GatewayErrorCode = (typeof gatewayErrorCodes)[number];

const publicMessages: Record<GatewayErrorCode, string> = {
  INVALID_CLIENT_REQUEST:
    "No fue posible preparar el contexto de la herramienta.",
  INVALID_AUTHORIZATION_REQUEST: "No fue posible validar la autorización.",
  SESSION_INVALID: "La sesión ya no es válida.",
  WEB_TOOL_UNAVAILABLE: "No tiene acceso a esta herramienta.",
  WEB_CLIENT_ACCESS_DENIED: "No tiene acceso a esta herramienta.",
  WEB_CLIENT_INVALID: "No fue posible preparar el cliente de la herramienta.",
  AUTHORIZATION_DENIED: "No tiene permiso para realizar esta operación.",
  AUTHORIZATION_CONTEXT_INVALID:
    "No fue posible validar el contexto de autorización.",
  AUTH_UPSTREAM_ERROR: "Ocurrió un error técnico al procesar la solicitud.",
  AUTH_SERVICE_UNAVAILABLE:
    "El servicio de autenticación no está disponible temporalmente.",
  WEB_AUTH_DISABLED: "La autenticación web no está disponible temporalmente.",
  BENEFICIARY_SERVICE_UNAVAILABLE:
    "El servicio de beneficiarios no está disponible temporalmente.",
};

const accessDeniedCodes = new Set<GatewayErrorCode>([
  "AUTHORIZATION_DENIED",
  "WEB_TOOL_UNAVAILABLE",
  "WEB_CLIENT_ACCESS_DENIED",
]);

export function isAccessDeniedCode(code: GatewayErrorCode): boolean {
  return accessDeniedCodes.has(code);
}

export class GatewayRequestError extends Error {
  readonly status: number;
  readonly code: GatewayErrorCode;

  constructor(status: number, code: GatewayErrorCode) {
    super(publicMessages[code]);
    this.name = "GatewayRequestError";
    this.status =
      Number.isInteger(status) && status >= 400 && status <= 599 ? status : 502;
    this.code = code;
  }
}

export function isGatewayErrorCode(value: unknown): value is GatewayErrorCode {
  return (
    typeof value === "string" &&
    gatewayErrorCodes.includes(value as GatewayErrorCode)
  );
}
