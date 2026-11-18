"use client";

import { createContext, useCallback, useContext, useMemo } from "react";

import type { ResourcePermission } from "@/utils/interfaces";

interface PermissionContextValue {
  can: (resource: string, scope: string) => boolean;
}

const PermissionContext = createContext<PermissionContextValue | undefined>(
  undefined,
);

export function PermissionProvider({
  children,
  permissions,
}: {
  children: React.ReactNode;
  permissions: readonly ResourcePermission[];
}) {
  const index = useMemo(
    () =>
      new Map(permissions.map((item) => [item.resource, new Set(item.scopes)])),
    [permissions],
  );
  const can = useCallback(
    (resource: string, scope: string) =>
      index.get(resource)?.has(scope) === true,
    [index],
  );
  return (
    <PermissionContext.Provider value={{ can }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions(): PermissionContextValue {
  const value = useContext(PermissionContext);
  if (!value)
    throw new Error("usePermissions must be used within PermissionProvider");
  return value;
}
