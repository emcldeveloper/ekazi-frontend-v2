import type { ReactNode } from "react";

/** Classic serif section heading with divider line */
export function Section({
  title,
  children,
  accent,
  elegant,
}: {
  title: string;
  children?: ReactNode;
  accent?: string;
  elegant?: boolean;
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          fontSize: "10px",
          fontWeight: "700",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: accent || (elegant ? "#1a1a1a" : "#333"),
          borderBottom: `1.5px solid ${accent || "#1a1a1a"}`,
          paddingBottom: "3px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

/** Dark sidebar section used in Template2 */
export function SideSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          fontWeight: "700",
          letterSpacing: "1.5px",
          color: "#93c5fd",
          marginBottom: "6px",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          paddingBottom: "3px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

/** Bold amber section heading used in Template4 */
export function BoldSection({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          fontWeight: "900",
          letterSpacing: "1.5px",
          color: color,
          borderBottom: `2px solid ${color}`,
          paddingBottom: "2px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

/** Monospace tech section heading used in Template5 */
export function TechSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          fontWeight: "700",
          color: "#0f172a",
          marginBottom: "8px",
          fontFamily: "'Courier New', monospace",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

/** Blue pill label used in Template8 sidebar */
export function AsideLabel({
  title,
  brand,
}: {
  title: string;
  brand: string;
}) {
  return (
    <div
      style={{
        background: brand,
        color: "#fff",
        fontWeight: "700",
        borderRadius: "20px",
        padding: "2px 10px",
        display: "inline-block",
        marginBottom: "5px",
        border: `1px solid ${brand}`,
      }}
    >
      {title}
    </div>
  );
}

/** Blue filled heading used in Template8 main column */
export function SectionHeading({
  title,
  brand,
}: {
  title: string;
  brand: string;
}) {
  return (
    <div
      style={{
        fontWeight: "700",
        color: "#202020",
        margin: "6px 0 5px",
      }}
    >
      <span
        style={{
          background: brand,
          color: "#fff",
          padding: "2px 8px",
          borderRadius: "4px",
        }}
      >
        {title}
      </span>
    </div>
  );
}

/** Orange section title with divider used in Template10 left column */
export function OrangeSectionTitle({
  title,
  brand,
  divider,
}: {
  title: string;
  brand: string;
  divider: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "10px",
        marginBottom: "5px",
      }}
    >
      <div style={{ fontWeight: "800", color: brand }}>{title}</div>
      <div style={{ height: "2px", flex: 1, background: divider }} />
    </div>
  );
}

/** Orange side section with divider used in Template10 right column */
export function OrangeSideSection({
  title,
  children,
  brand,
  divider,
}: {
  title: string;
  children?: ReactNode;
  brand: string;
  divider: string;
}) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ fontWeight: "800", color: brand }}>{title}</div>
      <div
        style={{ height: "2px", marginBottom: "8px", background: divider }}
      />
      {children}
    </div>
  );
}
