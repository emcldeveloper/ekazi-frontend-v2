import type { ReactNode } from "react";

const SectionTitle = ({ children }: { children: ReactNode }) => {
  return <div className="text-lg text-Blue font-semibold">{children}</div>;
};

export default SectionTitle;
