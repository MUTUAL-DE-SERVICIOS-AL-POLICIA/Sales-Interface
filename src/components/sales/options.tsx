"use client";
import { toast, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { getSalesRecords } from "@/api";
import { DrawerRecords } from "@/components";
import { useSales } from "@/context";
import { usePermissions } from "@/utils/context/PermissionContext";

export const Options = () => {
  const { can } = usePermissions();
  const [dataRecords, setDataRecords] = useState<any[]>([]);
  const { person } = useSales();
  const router = useRouter();
  const { uuid } = useParams();

  const handlePress = async () => {
    const { error, message, data } = await getSalesRecords(String(person.id));

    if (error) {
      toast.danger(message);

      return;
    }
    setDataRecords(data);
  };

  return (
    <div className="flex justify-end items-center gap-1">
      <div className="flex gap-1">
        {can("sales", "read") && (
          <Button
            className="border-2"
            variant="outline"
            onClick={() => router.push(`/${uuid}/sales`)}
          >
            Ver ventas
          </Button>
        )}
        {can("sales.qr", "read") && (
          <Button
            className="border-2"
            variant="outline"
            onClick={() => router.push(`/${uuid}/pending`)}
          >
            Ver pendientes
          </Button>
        )}
        {can("sales.records", "read") && (
          <DrawerRecords data={dataRecords} getData={handlePress} />
        )}
      </div>
    </div>
  );
};
