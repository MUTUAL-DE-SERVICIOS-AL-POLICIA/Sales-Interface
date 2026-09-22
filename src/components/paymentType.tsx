"use client";

import { Button, Input, Label, Surface, TextArea } from "@heroui/react";
import Image from "next/image";

import { Voucher } from "@/utils/interfaces";

interface Props {
  paymentType: string;
  isGenerateQr?: boolean;
  imagenQr?: string;
  generateQr?: () => void;
  voucher: Voucher;
  setVoucher: (voucher: Voucher) => void;
}

export const PaymentType = ({
  paymentType,
  isGenerateQr = false,
  imagenQr,
  generateQr,
  voucher,
  setVoucher,
}: Props) => {
  return (
    <>
      {paymentType !== "QR" ? (
        <div className="flex flex-col gap-4">
          <Surface className="flex w-full items-center justify-center rounded-3xl bg-surface">
            <Label className="w-1/4">Nombre del depositante</Label>
            <Input
              aria-label="Nombre del depositante"
              className="w-3/4"
              value={voucher.customer}
              variant="secondary"
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "")
                  .toUpperCase();

                setVoucher({
                  ...voucher,
                  customer: value,
                });
              }}
            />
          </Surface>

          <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
            <Label className="w-1/4">
              # de carnet de identidad del depositante
            </Label>
            <Input
              className="w-3/4"
              inputMode="numeric"
              type="text"
              value={voucher.identityCardCustomer}
              variant="secondary"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");

                setVoucher({
                  ...voucher,
                  identityCardCustomer: value,
                });
              }}
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Surface>

          {paymentType == "DEP" && (
            <>
              <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
                <Label className="w-1/4">Fecha del depósito</Label>
                <Input
                  className="w-3/4"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  type="date"
                  variant="secondary"
                  onChange={(e) =>
                    setVoucher({ ...voucher, depositDate: e.target.value })
                  }
                />
              </Surface>

              <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
                <Label className="w-1/4">Ubicación del depósito</Label>
                <Input
                  aria-label="Ubicación del depósito"
                  className="w-3/4 flex"
                  value={voucher.paymentLocation}
                  variant="secondary"
                  onChange={(e) =>
                    setVoucher({ ...voucher, paymentLocation: e.target.value })
                  }
                />
              </Surface>
              <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
                <Label className="w-1/4">Número de comprobante</Label>
                <Input
                  aria-label="Numero del comprobante"
                  className="w-3/4 flex"
                  variant="secondary"
                  onChange={(e) =>
                    setVoucher({ ...voucher, receiptNumber: e.target.value })
                  }
                />
              </Surface>
            </>
          )}

          <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
            <Label className="w-1/4">Descripción (opcional)</Label>
            <TextArea
              aria-label="Descripción"
              className="w-3/4 flex"
              placeholder="Descripción del depósito"
              onChange={(e) =>
                setVoucher({ ...voucher, description: e.target.value })
              }
            />
          </Surface>
        </div>
      ) : (
        <>
          {isGenerateQr ? (
            <>
              <Button
                className="w-full"
                variant="secondary"
                onPress={() => {
                  const link = document.createElement("a");

                  link.href = `data:image/png;base64,${imagenQr}`;
                  link.download = "qr_payment.png";
                  link.click();
                }}
              >
                DESCARGAR QR
              </Button>
              <Button
                className="w-full"
                variant="secondary"
                onPress={() => {
                  const popup = window.open(
                    "",
                    "qrWindow",
                    "width=500,height=600,left=200,top=100,resizable=yes,scrollbars=no",
                  );

                  if (popup) {
                    popup.document.write(`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Código QR</title>
                          <style>
                            body{
                              margin:0;
                              display:flex;
                              justify-content:center;
                              align-items:center;
                              height:100vh;
                              background:#f5f5f5;
                            }
                            img{
                              max-width:90%;
                              max-height:90%;
                            }
                          </style>
                        </head>
                        <body>
                          <img src="data:image/png;base64,${imagenQr}" alt="QR" />
                        </body>
                      </html>
                    `);
                    popup.document.close();
                  }
                }}
              >
                VISUALIZAR QR
              </Button>
              <div className="flex items-center justify-center">
                <Image
                  alt="QR"
                  height={400}
                  src={`data:image/png;base64,${imagenQr}`}
                  width={400}
                />
              </div>
            </>
          ) : (
            <Button className="w-full" variant="secondary" onPress={generateQr}>
              GENERAR QR
            </Button>
          )}
        </>
      )}
    </>
  );
};
