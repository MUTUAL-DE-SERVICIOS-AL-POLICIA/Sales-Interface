"use client";

import type {Key} from "@heroui/react";

import {
  Button,
  Input,
  Label,
  Card,
  Surface,
  toast,
  Separator,
  ListBox,
  Select,
  Checkbox,
  CheckboxGroup
} from "@heroui/react";
import { useState } from "react";

import { PdfIcon, ExcelIcon } from "@/components";
import { apiClient } from "@/services";
import { useReports } from "@/context";
import React from "react";
import { getGroupProducts, getGroupsSelected } from "@/api";
import { Products } from "@/utils/interfaces";

export default function Persons() {
  const dateNow = new Date().toISOString().split("T")[0];

  const [dateFrom, setDateFrom] = useState(dateNow);
  const [dateTo, setDateTo] = useState(dateNow);
  const [, setLoading] = useState(false);
  const { groups } = useReports();
  const [selected, setSelected] = useState<Key[]>([]);

  const [allProducts, setAllProducts] = useState<Products[]>([]);
  const [selectedCheck, setSelectedCheck] = useState(["coding"]);
  const allOptions = ["coding", "design", "writing"];

  const downloadReportAllSales = async (format: "pdf" | "xlsx") => {
    try {
      setLoading(true);

      const response = await apiClient.GET(
        `sales/reports/allSales?dateFrom=${dateFrom}&dateTo=${dateTo}&products=${selected.join(",")}&format=${format}`,
      );

      if (!response.ok) {
        toast.danger("No se pudo generar el reporte");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download =
        format === "pdf"
          ? "reporte-ventas.pdf"
          : "reporte-ventas.xlsx";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar reporte:", error);
      toast.danger("No se pudo descargar el reporte");
    } finally {
      setLoading(false);
    }
  };

  const getGroupsCheck = async (keys: Key[]) => {
    try {
      setLoading(true);

      setSelected(keys);

      const selectedIds = keys.map(String);

      const { error, data } = await getGroupsSelected(selectedIds);

      if (error) {
        toast.danger(error);
        return;
      }

      setAllProducts(data);
    } finally {
      setLoading(false);
    }
  };

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

          <CheckboxGroup name="interests">
            <Label>Select your interests</Label>
  
            <Checkbox value="coding">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                Coding
              </Checkbox.Content>
            </Checkbox>
          </CheckboxGroup>

        </Card>
      </div>
      <Card className="card-no-outline flex-1 border-2 p-3 min-w-162.5 h-full">
        <div className="flex w-1/2 flex-col h-full gap-2">
          <div className="font-bold">Formato en PDF</div>
          <div className="flex w-1/2 flex-col gap-1 overflow-y-auto overflow-x-hidden">
            <Button
              variant="tertiary"
              onPress={() => {
                downloadReportAllSales("pdf");
              }}
            >
              <PdfIcon />
              Reporte de ventas
            </Button>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex w-1/2 flex-col h-full">
          <div className="font-bold">Formatos en EXCEL</div>
          <div className="flex flex-col h-4/5 rounded-lg">
            <Button
              variant="tertiary"
              onPress={() => {
                downloadReportAllSales("xlsx");
              }}
            >
              <ExcelIcon />
              Reporte de ventas
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
