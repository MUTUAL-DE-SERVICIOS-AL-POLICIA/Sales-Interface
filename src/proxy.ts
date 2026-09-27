import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hubPublicUrl } from "@/utils/helpers/urls";
export const proxy = (request: NextRequest) => {
  try {
    if (!request.cookies.get("sid")?.value)
      return NextResponse.redirect(hubPublicUrl("/apphub"));
    return NextResponse.next();
  } catch {
    return new NextResponse("Servicio temporalmente no disponible", {
      status: 503,
    });
  }
};
export const config = {
  matcher: [
    "/((?!_next/|favicon.ico|static/|images/|fonts/|api/|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.gif|.*\\.ico).*)",
  ],
};
