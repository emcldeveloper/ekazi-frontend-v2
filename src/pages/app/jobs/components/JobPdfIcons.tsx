// The same Lucide + Font Awesome icons used on the website, redrawn as
// react-pdf vector shapes (react-pdf can't render normal React/DOM SVG components).
import { Svg, Path, Circle, Rect } from "@react-pdf/renderer";
import type { ComponentProps, ComponentType, ReactNode } from "react";

export type PdfSvgStyle = ComponentProps<typeof Svg>["style"];

export interface PdfIconProps {
  size?: number;
  color?: string;
  style?: PdfSvgStyle;
}

export type PdfIcon = ComponentType<PdfIconProps>;

/* ---------- Lucide (outline, 24x24) ---------- */

interface StrokeStyle {
  fill: "none";
  stroke: string;
  strokeWidth: number;
  strokeLinecap: "round";
  strokeLinejoin: "round";
}

const stroke = (color: string, strokeWidth = 2): StrokeStyle => ({
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

const Lucide = ({
  size = 12,
  style,
  children,
}: Omit<PdfIconProps, "color"> & { children?: ReactNode }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    {children}
  </Svg>
);

export const EyeIcon = ({ color = "#f97316", ...p }: PdfIconProps) => (
  <Lucide {...p}>
    <Path
      {...stroke(color)}
      d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
    />
    <Circle {...stroke(color)} cx="12" cy="12" r="3" />
  </Lucide>
);

export const UsersIcon = ({ color = "#f97316", ...p }: PdfIconProps) => (
  <Lucide {...p}>
    <Path {...stroke(color)} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Path {...stroke(color)} d="M16 3.128a4 4 0 0 1 0 7.744" />
    <Path {...stroke(color)} d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <Circle {...stroke(color)} cx="9" cy="7" r="4" />
  </Lucide>
);

export const BriefcaseIcon = ({ color = "#f97316", ...p }: PdfIconProps) => (
  <Lucide {...p}>
    <Path {...stroke(color)} d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <Rect {...stroke(color)} width="20" height="14" x="2" y="6" rx="2" />
  </Lucide>
);

export const BanknoteIcon = ({ color = "#f97316", ...p }: PdfIconProps) => (
  <Lucide {...p}>
    <Rect {...stroke(color)} width="20" height="12" x="2" y="6" rx="2" />
    <Circle {...stroke(color)} cx="12" cy="12" r="2" />
    <Path {...stroke(color)} d="M6 12h.01M18 12h.01" />
  </Lucide>
);

export const CalendarIcon = ({ color = "#f97316", ...p }: PdfIconProps) => (
  <Lucide {...p}>
    <Path {...stroke(color)} d="M8 2v3" />
    <Path {...stroke(color)} d="M16 2v3" />
    <Rect {...stroke(color)} x="3" y="3" width="18" height="18" rx="2" />
    <Path {...stroke(color)} d="M3 9h18" />
  </Lucide>
);

export const SendIcon = ({ color = "#ffffff", ...p }: PdfIconProps) => (
  <Lucide {...p}>
    <Path
      {...stroke(color)}
      d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
    />
    <Path {...stroke(color)} d="m21.854 2.147-10.94 10.939" />
  </Lucide>
);

export const BookmarkIcon = ({ color = "#1e3a8a", ...p }: PdfIconProps) => (
  <Lucide {...p}>
    <Path
      {...stroke(color)}
      d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    />
  </Lucide>
);

export const ExternalLinkIcon = ({ color = "#1e3a8a", ...p }: PdfIconProps) => (
  <Lucide {...p}>
    <Path {...stroke(color)} d="M15 3h6v6" />
    <Path {...stroke(color)} d="M10 14 21 3" />
    <Path
      {...stroke(color)}
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    />
  </Lucide>
);

/* ---------- Font Awesome brands (filled), same as react-icons/fa ---------- */

export const WhatsAppIcon = ({
  size = 12,
  color = "#25D366",
  style,
}: PdfIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 448 512" style={style}>
    <Path
      fill={color}
      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
    />
  </Svg>
);

export const LinkedInIcon = ({
  size = 12,
  color = "#0077b5",
  style,
}: PdfIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 448 512" style={style}>
    <Path
      fill={color}
      d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
    />
  </Svg>
);

export const FacebookIcon = ({
  size = 12,
  color = "#3b5998",
  style,
}: PdfIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" style={style}>
    <Path
      fill={color}
      d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
    />
  </Svg>
);
