import type { ReactNode } from "react";
import { TemplatesContext } from "./TemplatesContext";
import { useApplicantProfile } from "@/hooks/profile";

export function TemplatesProvider({ children }: { children: ReactNode }) {
  const query = useApplicantProfile();

  return (
    <TemplatesContext.Provider value={query as never}>
      {children}
    </TemplatesContext.Provider>
  );
}
