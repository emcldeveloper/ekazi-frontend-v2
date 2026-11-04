import { createContext, useContext } from "react";

export const TemplatesContext = createContext(null);

export function useCVData() {
  const ctx = useContext(TemplatesContext);
  if (!ctx) {
    throw new Error("useCVData must be used inside CVDataProvider");
  }
  return ctx;
}
