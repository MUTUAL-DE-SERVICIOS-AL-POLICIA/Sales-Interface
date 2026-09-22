"use client";

import type { Key } from "@heroui/react";

import {
  Button,
  Input,
  Label,
  Card,
  Surface,
  toast,
  ListBox,
  Select,
  Checkbox,
  CheckboxGroup,
  Tabs,
} from "@heroui/react";
import { useState } from "react";
import { useEffect } from "react";

import { PdfIcon, ExcelIcon } from "@/components";
import { apiClient } from "@/services";
import { useReports } from "@/context";
import { getGroupsSelected } from "@/api";
import { Products } from "@/utils/interfaces";

const listClassName = [
  "rounded-xl border border-accent/10 bg-accent-soft/30 p-1",
  "**:data-[slot=tabs-tab]:rounded-lg",
  "**:data-[slot=tabs-tab]:bg-transparent",
  "**:data-[slot=tabs-tab]:text-muted",
  "**:data-[slot=tabs-tab]:opacity-100",
  "**:data-[slot=tabs-tab]:transition-colors",
  "**:data-[slot=tabs-tab]:data-[hovered=true]:not-data-[selected=true]:bg-accent-soft",
  "**:data-[slot=tabs-tab]:data-[hovered=true]:not-data-[selected=true]:text-accent-soft-foreground",
  "**:data-[slot=tabs-tab]:data-[pressed=true]:not-data-[selected=true]:bg-accent-soft-hover",
  "**:data-[slot=tabs-tab]:data-[focus-visible=true]:ring-2",
  "**:data-[slot=tabs-tab]:data-[focus-visible=true]:ring-accent/15",
  "**:data-[slot=tabs-tab]:data-[selected=true]:font-medium",
  "**:data-[slot=tabs-tab]:data-[selected=true]:text-accent-foreground",
  "**:data-[slot=tabs-tab]:shadow-none",
  "**:data-[slot=tabs-indicator]:rounded-lg",
  "**:data-[slot=tabs-indicator]:bg-accent",
  "**:data-[slot=tabs-indicator]:shadow-none",
].join(" ");

export default function Persons() {
  const dateNow = new Date().toISOString().split("T")[0];

  const [dateFrom, setDateFrom] = useState(dateNow);
  const [dateTo, setDateTo] = useState(dateNow);
  const [, setLoading] = useState(false);
  const { groups } = useReports();
  const [selected, setSelected] = useState<Key[]>([]);
  const [allProducts, setAllProducts] = useState<Products[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [format, setFormat] = useState<"pdf" | "csv">("pdf");

  const downloadReportAllSales = async () => {
    try {
      setLoading(true);

      const api = `sales/reports/allSales?dateFrom=${dateFrom}&dateTo=${dateTo}&productIds=${selectedProducts.join(",")}&format=${format}`;

      const response = await apiClient.GET(api);

      if (!response.ok) {
        toast.danger("No se pudo generar el reporte");

        return;
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const filename =
        contentDisposition?.match(/filename="?([^"]+)"?/i)?.[1] ?? "ventas";

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch {
      toast.danger("No se pudo descargar el reporte");
    } finally {
      setLoading(false);
    }
  };

  const getGroupsCheck = async (keys: Key[]) => {
    try {
      setLoading(true);
      setSelected(keys);

      if (keys.length === 0) {
        setAllProducts([]);
        setSelectedProducts([]);

        return;
      }

      const selectedIds = keys.map(String);

      const { error, message, data } = await getGroupsSelected(selectedIds);

      if (error) {
        toast.danger(message || "Ocurrió un error al obtener los productos");

        return;
      }

      setAllProducts(data);

      setSelectedProducts(data.map((product: any) => String(product.id)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (groups.length === 0) return;

    const allGroupIds = groups.map((group) => group.id);

    getGroupsCheck(allGroupIds);
  }, [groups]);

  return (
    <>
      <div className="flex-1 min-w-62.5 max-w-75 2xl:max-w-100 h-full">
        <Card className="relative flex flex-col border-2 h-full w-full min-h-0 gap-2">
          <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
            <Label className="w-1/4">Desde</Label>
            <Input
              className="w-3/4"
              defaultValue={dateFrom}
              type="date"
              variant="secondary"
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Surface>
          <Surface className="flex w-full items-center justify-center rounded-xl bg-surface">
            <Label className="w-1/4">Hasta</Label>
            <Input
              className="w-3/4"
              defaultValue={dateTo}
              type="date"
              variant="secondary"
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Surface>

          <Select
            className="w-full"
            placeholder="Seleccione el filtro de los rubros"
            selectionMode="multiple"
            value={selected}
            onChange={(keys) => getGroupsCheck(keys)}
          >
            <Label>Grupos (selección multiple)</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox selectionMode="multiple">
                {groups.map((group) => (
                  <ListBox.Item
                    key={group.id}
                    id={group.id}
                    textValue={group.name}
                  >
                    {group.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <CheckboxGroup
            name="interests"
            value={selectedProducts}
            onChange={setSelectedProducts}
          >
            <Label>Seleccione los productos</Label>
            {allProducts.map((product) => (
              <Checkbox key={product.id} value={String(product.id)}>
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  {product.name}
                </Checkbox.Content>
              </Checkbox>
            ))}
          </CheckboxGroup>
          <Tabs
            className="w-full max-w-sm"
            onSelectionChange={(key) => setFormat(key as "pdf" | "csv")}
          >
            <Tabs.ListContainer className="rounded-none bg-transparent">
              <Tabs.List aria-label="Billing cycle" className={listClassName}>
                <Tabs.Tab id="pdf">
                  PDF
                  <PdfIcon />
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="csv">
                  CSV
                  <ExcelIcon />
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </Card>
      </div>
      <Card className="card-no-outline flex-1 border-2 p-3 min-w-162.5 h-full">
        <div className="flex w-full flex-col gap-1 overflow-y-auto overflow-x-hidden">
          <Button
            className="bg-emerald-100 border-2 hover:bg-emerald-200"
            isDisabled={selectedProducts.length === 0}
            variant="secondary"
            onPress={() => {
              downloadReportAllSales();
            }}
          >
            REPORTE DE VENTAS
          </Button>
        </div>
      </Card>
    </>
  );
}
