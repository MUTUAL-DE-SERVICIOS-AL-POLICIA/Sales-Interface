"use client";

import { Table, Tabs } from "@heroui/react";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input, Button, Separator, Label, toast, Card } from "@heroui/react";
import clsx from "clsx";
import { ProgressCircle } from "@heroui/react";

import {
  ButtonCard,
  ButtonDelete,
  ModalAlert,
  PaymentType,
  Sidebar,
  UserInfo,
} from "@/components";
import { useSales } from "@/context";
import { getGroupProducts, postCreateSale, postGenerateQr } from "@/api";
import { Products, Voucher, SaleProduct } from "@/utils/interfaces";
import { getUserCookie } from "@/utils";

const columns = [
  { id: "actions", name: "Acciones" },
  { id: "name", name: "Nombre" },
  { id: "price", name: "Precio" },
  { id: "amount", name: "Cantidad" },
  { id: "subtotal", name: "Sub Total" },
];

export default function Page() {
  const { uuid } = useParams();
  const router = useRouter();
  const { parameters, paymentTypes, person, groups } = useSales();
  const [, setLoading] = useState(false);
  const [loadingQr, setLoadingQr] = useState(false);

  const [allProducts, setAllProducts] = useState<Products[]>([]);

  const [paymentType, setPaymentType] = useState(paymentTypes[0].shortened);

  const [productError, setProductError] = useState(false);
  const [openModalAlert, setOpenModalAlert] = useState(false);

  const [saleProducts, setSaleProducts] = useState<SaleProduct[]>([]);
  const [paymentTypeId, setPaymentTypeId] = useState<string>(
    paymentTypes[0].id,
  );
  const [isGenerateQr, setIsGenerateQr] = useState(false);
  const [imagenQr, setImagenQr] = useState<string>("");

  const [receivedAmount, setReceivedAmount] = useState<number>(0);

  const [voucher, setVoucher] = useState<Voucher>({
    customer: "",
    identityCardCustomer: "",
    paymentLocation: "MUTUAL DE SERVICIOS AL POLICÍA",
    depositDate: new Date().toISOString(),
    receiptNumber: "",
    description: "",
  });

  const getProducts = async (Key: string) => {
    try {
      setLoading(true);

      const { error, data } = await getGroupProducts(Key);

      if (error) return;
      setAllProducts(data);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (product: Products) => {
    setProductError(false);

    setSaleProducts((prev) => {
      const exists = prev.some((p) => p.productId === product.id);

      if (exists) return prev;
      if (prev.length >= parameters.maxProducts) return prev;

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          code: product.code,
          price: product.price,
          amount: 1,
        },
      ];
    });
  };

  const total = saleProducts.reduce(
    (sum, product) => sum + Number(product.price) * product.amount,
    0,
  );

  const change = receivedAmount === 0 ? 0 : receivedAmount - total;

  const createSale = async () => {
    try {
      setLoading(true);
      const { data } = await getUserCookie();
      const body = {
        personId: person.id,
        parameterId: parameters.id,
        paymentTypeId: paymentTypeId,
        saleProducts: saleProducts,
        voucher: voucher,
        receptionist: data.username,
      };
      const { error, message } = await postCreateSale(body);

      if (error) {
        toast.danger(message);

        return;
      }
      toast.success(message);
      router.push(`${uuid}/sales`);

      return;
    } catch (error: any) {
      toast.danger("Error al crear la venta", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const validateData = () => {
    const hasProducts = saleProducts.length > 0;
    const hasPaymentType = paymentTypeId !== "";

    let isVoucherValid = false;

    if (paymentType === "DEP") {
      isVoucherValid = [
        voucher.customer,
        voucher.identityCardCustomer,
        voucher.paymentLocation,
        voucher.depositDate,
        voucher.receiptNumber,
      ].every((value) => String(value).trim() !== "");
    }

    if (paymentType === "EF") {
      isVoucherValid = [
        voucher.customer,
        voucher.identityCardCustomer,
        voucher.paymentLocation,
        voucher.depositDate,
      ].every((value) => String(value).trim() !== "");
    }

    if (paymentType === "QR") {
      isVoucherValid = true;
    }

    setProductError(!hasProducts);

    if (!hasProducts) {
      toast.danger("Seleccione al menos un producto");

      return false;
    }

    if (!isVoucherValid || !hasPaymentType) {
      toast.danger("Complete todos los campos del comprobante");

      return false;
    }

    if(paymentType != "QR"){
      if(receivedAmount < total) {
        toast.danger("El monto recibido es menor al total de la venta");
        return false
      }
    }

    return true;
  };

  const handleTabChange = (index: string) => {
    const type = paymentTypes[Number(index) - 1];

    setVoucher({
      customer: "",
      identityCardCustomer: "",
      paymentLocation:
        type.shortened === "EF"
          ? "MUTUAL DE SERVICIOS AL POLICÍA"
          : type.shortened === "DEP"
            ? "BANCO UNIÓN S.A."
            : "",
      depositDate: new Date().toISOString(),
      receiptNumber: "",
      description: "",
    });

    setPaymentTypeId(type.id);
    setPaymentType(type.shortened);
  };

  const generateQr = async () => {
    try {
      setLoadingQr(true);
      const { data: userCookie } = await getUserCookie();

      if (!validateData()) return;

      const body = {
        personId: person.id,
        parameterId: parameters.id,
        paymentTypeId: paymentTypeId,
        saleProducts: saleProducts,
        receptionist: userCookie.username,
      };

      const { error, message, data } = await postGenerateQr(body);

      if (error) {
        toast.danger(message);

        return;
      }

      setIsGenerateQr(!error);
      setImagenQr(data.qrImage);
      toast.info(message, {
        description:
          "Se ha deshabilitado la edición de la venta mientras el QR este generado",
      });

      return;
    } catch (error: any) {
      toast.danger("Error al generar el Qr", {
        description: error.message,
      });
    } finally {
      setLoadingQr(false);
    }
  };

  return (
    <>
      <div className="flex-1 min-w-62.5 max-w-75 2xl:max-w-100 h-full">
        <div className="relative flex flex-col h-full w-full min-h-0 gap-2">
          <UserInfo
            isPolice={person.isPolice}
            user={{
              fullName: person.fullName,
              identityCard: person.identityCard,
              nup: person.nup,
              state: true,
            }}
          />
          <div className="flex gap-1 flex-1 min-h-0">
            <Sidebar sidebar={groups} onChange={getProducts} />
          </div>
        </div>
      </div>
      <Card className="card-no-outline flex-1 border-2 p-3 min-w-162.5 h-full">
        <div className="flex h-full gap-2">
          <div className="flex w-1/4 flex-col gap-1 overflow-y-auto overflow-x-hidden">
            {allProducts.map((product) => {
              return (
                <ButtonCard
                  key={product.id}
                  currencySymbol={parameters.currencySymbol}
                  disabled={isGenerateQr}
                  isSelected={saleProducts.some(
                    (p) => p.productId === product.id,
                  )}
                  price={product.price}
                  title={product.name}
                  onPress={() => addProduct(product)}
                />
              );
            })}
          </div>
          <Separator orientation="vertical" />
          <div className="flex w-3/4 flex-col h-full">
            <div className="flex flex-col h-4/5 rounded-lg">
              {saleProducts.length > 0 ? (
                <Table key={String(isGenerateQr)} className="flex-1 max-h-1/6">
                  <Table.ScrollContainer className="overflow-y-auto">
                    <Table.Content
                      aria-label="Selected products"
                      className="min-w-150"
                    >
                      <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
                        {columns.map((col) => (
                          <Table.Column
                            key={col.id}
                            id={col.id}
                            isRowHeader={col.id === "name"}
                          >
                            {col.name}
                          </Table.Column>
                        ))}
                      </Table.Header>
                      <Table.Body>
                        <Table.Collection items={saleProducts}>
                          {(product) => (
                            <Table.Row
                              key={product.productId}
                              id={product.productId}
                            >
                              <Table.Cell>
                                <ButtonDelete
                                  isDisabled={isGenerateQr}
                                  onPress={() =>
                                    setSaleProducts((prev) =>
                                      prev.filter(
                                        (p) =>
                                          p.productId !== product.productId,
                                      ),
                                    )
                                  }
                                />
                              </Table.Cell>
                              <Table.Cell>{product.name}</Table.Cell>
                              <Table.Cell>{product.price}</Table.Cell>
                              <Table.Cell>
                                <Input
                                  disabled={isGenerateQr}
                                  max={parameters.maxAmountProduct}
                                  min={1}
                                  type="number"
                                  value={String(product.amount)}
                                  onChange={(e) => {
                                    let amount = Number(e.target.value);

                                    amount = Math.max(
                                      1,
                                      Math.min(
                                        amount || 1,
                                        parameters.maxAmountProduct,
                                      ),
                                    );
                                    setSaleProducts((prev) =>
                                      prev.map((p) =>
                                        p.productId === product.productId
                                          ? { ...p, amount }
                                          : p,
                                      ),
                                    );
                                  }}
                                  onKeyDown={(e) => {
                                    if (["e", "E", "+", "-"].includes(e.key)) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                              </Table.Cell>
                              <Table.Cell>
                                {(
                                  Number(product.price) * product.amount
                                ).toFixed(2)}
                              </Table.Cell>
                            </Table.Row>
                          )}
                        </Table.Collection>
                      </Table.Body>
                    </Table.Content>
                  </Table.ScrollContainer>
                </Table>
              ) : (
                <div
                  className={clsx(
                    "flex-1 max-h-1/6 items-center justify-center rounded-lg border-2 border-dashed border-default-300 p-2 text-center text-gray-500",
                    productError && "border-2 border-danger p-2",
                  )}
                >
                  <p className="text-xl">Seleccione al menos 1 producto</p>
                  <p className="text-sm">
                    Cantidad máxima de productos:
                    <span className="font-bold"> {parameters.maxProducts}</span>
                  </p>
                  <p className="text-sm">
                    Cantidad máxima por producto:
                    <span className="font-bold">
                      {" "}
                      {parameters.maxAmountProduct}
                    </span>
                  </p>
                </div>
              )}
              {saleProducts.length > 0 && (
                <>
                  <Label className="mb-2 text-xl font-bold">
                    Seleccione tipo de pago:
                  </Label>
                  <div className="flex flex-1 flex-col">
                    <Tabs
                      className="w-full h-full"
                      isDisabled={isGenerateQr}
                      variant="secondary"
                      onSelectionChange={(key) => handleTabChange(String(key))}
                    >
                      <Tabs.ListContainer>
                        <Tabs.List aria-label="Options" className="uppercase">
                          {paymentTypes.map((type, index) => (
                            <Tabs.Tab key={index} id={type.id}>
                              {type.name}
                              <Tabs.Indicator />
                            </Tabs.Tab>
                          ))}
                        </Tabs.List>
                      </Tabs.ListContainer>
                      {loadingQr ? (
                        <ProgressCircle
                          isIndeterminate
                          aria-label="Loading"
                          size="lg"
                          value={160}
                        >
                          <ProgressCircle.Track>
                            <ProgressCircle.TrackCircle />
                            <ProgressCircle.FillCircle />
                          </ProgressCircle.Track>
                        </ProgressCircle>
                      ) : (
                        <PaymentType
                          generateQr={generateQr}
                          imagenQr={imagenQr}
                          isGenerateQr={isGenerateQr}
                          paymentType={paymentType}
                          setVoucher={setVoucher}
                          voucher={voucher}
                        />
                      )}
                    </Tabs>
                  </div>
                </>
              )}
            </div>

            <div className="flex h-1/5 flex-col  justify-end">
              <div className="flex justify-between pt-4 ">
                {isGenerateQr ? (
                  <Button
                    aria-label="Menu"
                    className="w-2/5 h-full text-xl font-bold"
                    size="lg"
                    variant="primary"
                    onPress={() => router.push(`/${uuid}/sales`)}
                  >
                    VER REGISTROS
                  </Button>
                ) : paymentType !== "QR" ? (
                  <Button
                    aria-label="Menu"
                    className="w-2/5 h-full text-xl font-bold"
                    size="lg"
                    variant="secondary"
                    onPress={() => {
                      if (!validateData()) return;
                      setOpenModalAlert(true);
                    }}
                  >
                    FINALIZAR VENTA
                  </Button>
                ) : (
                  <div className="w-2/5"> </div>
                )}
                <div className="grid grid-cols-[120px_50px_1fr] items-center gap-y-2">
                  <span>RECIBIDO</span>
                  <span className="capitalize">{parameters.currencySymbol}.</span>

                  <Input
                    variant="secondary"
                    className="w-full text-right"
                    type="text"
                    inputMode="decimal"
                    disabled={isGenerateQr || saleProducts.length === 0}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9.,]/.test(e.key) &&
                        !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      let value = e.target.value;

                      // Convertir coma a punto
                      value = value.replace(",", ".");

                      // Eliminar caracteres que no sean números o punto
                      value = value.replace(/[^0-9.]/g, "");

                      // Permitir solamente un punto decimal
                      const parts = value.split(".");

                      if (parts.length > 2) {
                        value = `${parts[0]}.${parts.slice(1).join("")}`;
                      }

                      setReceivedAmount(Number(value) || 0);
                    }}
                  />

                  <span className="font-semibold">TOTAL</span>
                  <span className="font-semibold capitalize">{parameters.currencySymbol}.</span>
                  <span className="text-right font-semibold">
                    {total.toFixed(2)}
                  </span>

                  <span>CAMBIO</span>
                  <span className="capitalize">{parameters.currencySymbol}.</span>
                  <span className="text-right">
                    {change.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ModalAlert
            cancelText="Cancelar"
            confirmText="Sí, Registrar Venta"
            isOpen={openModalAlert}
            message={`¿Está seguro que desea crear la venta?`}
            title={`Crear Venta`}
            onClose={() => setOpenModalAlert(false)}
            onConfirm={() => {
              createSale();
              setOpenModalAlert(false);
            }}
          />
        </div>
      </Card>
    </>
  );
}
