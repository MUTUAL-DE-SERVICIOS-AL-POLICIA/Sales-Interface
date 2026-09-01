"use client";

import { createContext, useContext, ReactNode } from "react";

import { Groups } from "@/utils/interfaces";

interface ReportsContextProps {

  groups: Groups[];
}

interface ReportsProviderProps extends ReportsContextProps {
  children: ReactNode;
}

const ReportsContext = createContext<ReportsContextProps | undefined>(undefined);

ReportsContext.displayName = "ReportsContext";

export function ReportsProvider({ groups, children }: ReportsProviderProps) {
  return (
    <ReportsContext.Provider value={{ groups }} >
      {children}
    </ReportsContext.Provider>
  );
}

export const useReports = () => {
  const context = useContext(ReportsContext);

  if (!context) {
    throw new Error("useReports debe usarse dentro de un ReportsProvider");
  }

  return context;
};
