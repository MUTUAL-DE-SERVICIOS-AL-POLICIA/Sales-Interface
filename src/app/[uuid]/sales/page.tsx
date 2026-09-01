"use client";

import Image from "next/image";
import { Card, toast } from "@heroui/react";
import { useState } from "react";
import { useEffect } from "react";

import { useSales } from "@/context";
import { getPersonSales, cancelSale } from "@/api";
import { Sale } from "@/utils/interfaces";
import { EmptyContent, ButtonCancel, ButtonPrint } from "@/components";
import { apiClient } from "@/services";

export default function Page() {
  const { person } = useSales();
  const [personSales, setPersonSales] = useState<Sale[]>([]);
  const [, setLoading] = useState(false);

  const getSales = async (key: string) => {
    try {
      setLoading(true);
      const { error, message, data } = await getPersonSales(key);
      console.log(data);
      if (error) {
        toast.danger(message);

        return;
      }
      setPersonSales(data);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (saleId: string) => {
    try {
      const response = await apiClient.GET(
        `sales/voucherPdf/${saleId}?template=reciboPrueba`,
      );

      if (!response.ok) {
        toast.danger("No se pudo generar el PDF");

        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const iframe = document.createElement("iframe");

      iframe.style.position = "fixed";
      iframe.style.width = "1px";
      iframe.style.height = "1px";
      iframe.style.opacity = "0";
      iframe.style.pointerEvents = "none";
      iframe.src = url;

      iframe.onload = () => {
        const win = iframe.contentWindow;

        if (!win) return;

        win.focus();

        // Espera un poco para que el visor PDF termine de cargar
        setTimeout(() => {
          win.print();
        }, 500);
      };

      document.body.appendChild(iframe);
    } catch {
      toast.danger("Error al imprimir el PDF");
    }
  };

  const handleCancel = async (saleId: string) => {

    const { error, message } = await cancelSale(saleId);

    if (error) {
      toast.danger(message);
      return;
    }

    toast.success(message);
    getSales(person.id);
  };

  useEffect(() => {
    getSales(person.id);
  }, []);

  return (
    <>
      {personSales.length === 0 ? (
        <EmptyContent />
      ) : (
        <>
          {personSales.map((sale) => (
            <Card
              key={sale.id}
              className="w-full items-stretch md:flex-row border-2"
            >
              <div className="relative h-35 w-full shrink-0 overflow-hidden rounded-2xl sm:h-50 sm:w-50 text-center">
                <Image
                  alt="receipt"
                  className="h-full w-full object-cover"
                  height={0}
                  sizes="100vw"
                  src="/receipt.svg"
                  width={0}
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <Card.Header className="gap-1">
                  <Card.Title className="pr-8" />
                  <Card.Description className="font-bold text-blue-800">
                    COD: {sale.code}
                    &nbsp; - &nbsp; ESTADO: {sale.saleState}
                  </Card.Description>
                </Card.Header>
                <Card.Content className="flex flex-col gap-2 overflow-y-auto">
                  {sale.saleProducts.map((product) => (
                    <div key={product.id} className="flex flex-col gap-1">
                      <span className="text-md font-bold text-foreground">
                        {product.amount} {product.name} - #{product.fileNumber?.fileNumber}
                      </span>
                    </div>
                  ))}
                  <span className="font-bold">
                    Total:{sale.voucher.total} Bs{" "}
                  </span>

                  <span>Depositante: {sale.voucher.customer}</span>
                  <span>
                    CI Depositante: {sale.voucher.identityCardCustomer}
                  </span>
                </Card.Content>
                <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">
                      Recepcionado por: {sale.receptionist}
                    </span>
                    <span className="text-xs text-muted">
                      Fecha de recepción: {sale.createdAt}
                    </span>
                  </div>
                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:w-auto">
                    <ButtonPrint
                      isIconOnly
                      onPress={() => handlePrint(String(sale.id))}
                    />
                    <ButtonCancel isIconOnly onPress={() => handleCancel(String(sale.id))} />
                  </div>
                </Card.Footer>
              </div>
            </Card>
          ))}
        </>
      )}
    </>
  );
}
