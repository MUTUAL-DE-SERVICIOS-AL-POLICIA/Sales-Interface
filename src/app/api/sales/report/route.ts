import { NextResponse } from "next/server";
import { apiClient } from "@/utils/services/GatewayServerClient";
import { GatewayRequestError } from "@/utils/services/GatewayRequestError";

export async function GET(request: Request) {
  const input = new URL(request.url).searchParams;
  const dateFrom = input.get("dateFrom") ?? "";
  const dateTo = input.get("dateTo") ?? "";
  const productIds = input.get("productIds") ?? "";
  const format = input.get("format") ?? "pdf";
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(dateFrom) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(dateTo) ||
    !/^(?:\d+(?:,\d+)*)?$/.test(productIds) ||
    !/^(pdf|csv)$/.test(format)
  ) {
    return new NextResponse(null, { status: 400 });
  }
  try {
    const query = new URLSearchParams({ dateFrom, dateTo, productIds, format });
    const upstream = await apiClient.GET_BLOB(
      `sales/reports/allSales?${query}`,
    );
    const headers = new Headers({
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/octet-stream",
      "Cache-Control": "no-store",
      Pragma: "no-cache",
    });
    const disposition = upstream.headers.get("content-disposition");
    if (disposition) headers.set("Content-Disposition", disposition);
    return new NextResponse(await upstream.arrayBuffer(), {
      status: 200,
      headers,
    });
  } catch (error) {
    const status = error instanceof GatewayRequestError ? error.status : 502;
    return NextResponse.json(
      { error: true, message: "No se pudo generar el reporte." },
      { status },
    );
  }
}
