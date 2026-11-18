import { NextResponse } from "next/server";
import { apiClient } from "@/utils/services/GatewayServerClient";
import { GatewayRequestError } from "@/utils/services/GatewayRequestError";

export async function GET(
  _request: Request,
  context: { params: Promise<{ saleId: string }> },
) {
  const { saleId } = await context.params;
  if (!/^[1-9][0-9]*$/.test(saleId))
    return new NextResponse(null, { status: 400 });
  try {
    const upstream = await apiClient.GET_BLOB(`sales/voucherPdf/${saleId}`);
    return new NextResponse(await upstream.arrayBuffer(), {
      status: 200,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/pdf",
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    const status = error instanceof GatewayRequestError ? error.status : 502;
    return NextResponse.json(
      { error: true, message: "No se pudo generar el comprobante." },
      { status },
    );
  }
}
