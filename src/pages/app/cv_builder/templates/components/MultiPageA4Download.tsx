import { A4_W } from "../../data/constants";
import type { ReactNode, Ref } from "react";

type MultiPageA4DownloadProps = {
  containerRef: Ref<HTMLDivElement>;
  shadow?: boolean;
  children?: ReactNode;
};

export default function MultiPageA4Download({
  containerRef,
  shadow = true,
  children,
}: MultiPageA4DownloadProps) {
  return (
    <div
      ref={containerRef}
      style={{
        width: `${A4_W}px`,
        background: "#fff",
        boxSizing: "border-box",
        position: "relative",
        boxShadow: shadow ? "0 4px 40px rgba(0,0,0,0.18)" : "none",
      }}
    >
      {/* Single render — no slicing, no clipping */}
      <div
        style={{
          padding: "48px 52px 52px 52px",
          // These CSS rules tell the print engine / Puppeteer
          // where it's safe to break between pages
        }}
        className="cv-content"
      >
        {children}
      </div>
    </div>
  );
}
