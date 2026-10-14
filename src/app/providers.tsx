/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import type { ThemeProviderProps } from "next-themes";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Toast } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PermissionProvider } from "@/utils/context/PermissionContext";
import type { ResourcePermission } from "@/utils/interfaces";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  initialSidebarCollapsed?: boolean;
  permissions?: readonly ResourcePermission[];
}

type SidebarContextType = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  setCollapsed: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({
  children,
  initialCollapsed = true,
}: {
  children: ReactNode;
  initialCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");

    if (stored !== null) {
      setCollapsed(stored === "true");
    } else {
      setCollapsed(initialCollapsed);
    }
  }, [initialCollapsed]);

  useEffect(() => {
    if (collapsed === null) return;

    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  if (collapsed === null) {
    return null;
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggleCollapsed,
        setCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}

export function Providers({
  children,
  themeProps,
  initialSidebarCollapsed,
  permissions = [],
}: ProvidersProps) {
  return (
    <NextThemesProvider {...themeProps}>
      <Toast.Provider placement="top end" />
      <PermissionProvider permissions={permissions}>
        <SidebarProvider initialCollapsed={initialSidebarCollapsed ?? true}>
          {children}
        </SidebarProvider>
      </PermissionProvider>
    </NextThemesProvider>
  );
}
