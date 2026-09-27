export function configuredHttpOrigin(
  name: "HUB_PUBLIC_ORIGIN" | "GATEWAY_INTERNAL_URL",
): URL {
  const value = process.env[name];

  if (!value)
    throw new Error("La configuración del servicio no está disponible.");

  try {
    const url = new URL(value);

    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/"
    ) {
      throw new Error();
    }

    return url;
  } catch {
    throw new Error("La configuración del servicio no es válida.");
  }
}

export function gatewayInternalUrl(): URL {
  return configuredHttpOrigin("GATEWAY_INTERNAL_URL");
}

export function hubPublicUrl(
  pathname: "/apphub" | "/api/auth/session/invalid" | "/api/auth/logout",
): URL {
  const url = configuredHttpOrigin("HUB_PUBLIC_ORIGIN");

  url.pathname = pathname;
  url.search = "";
  url.hash = "";

  return url;
}

export function invalidSessionUrl(): URL {
  const url = hubPublicUrl("/api/auth/session/invalid");

  url.searchParams.set("returnPath", "/apphub");

  return url;
}
