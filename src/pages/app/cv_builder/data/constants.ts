import Template1 from "../templates/Template1";
import Template10 from "../templates/Template10";
import Template11 from "../templates/Template11";
import Template12 from "../templates/Template12";
import Template14 from "../templates/Template14";
import Template15 from "../templates/Template15";
import Template16 from "../templates/Template16";
import Template17 from "../templates/Template17";
import Template18 from "../templates/Template18";
import Template19 from "../templates/Template19";
import Template2 from "../templates/Template2";
import Template20 from "../templates/Template20";
import Template21 from "../templates/Template21";
import Template22 from "../templates/Template22";
import Template23 from "../templates/Template23";
import Template24 from "../templates/Template24";
import Template25 from "../templates/Template25";
import Template26 from "../templates/Template26";
import Template27 from "../templates/Template27";
import Template28 from "../templates/Template28";
import Template29 from "../templates/Template29";
import Template3 from "../templates/Template3";
import Template30 from "../templates/Template30";
import Template31 from "../templates/Template31";
import Template32 from "../templates/Template32";
import Template33 from "../templates/Template33";
import Template34 from "../templates/Template34";
import Template35 from "../templates/Template35";
import Template36 from "../templates/Template36";
import Template37 from "../templates/Template37";
import Template38 from "../templates/Template38";
import Template39 from "../templates/Template39";
import Template4 from "../templates/Template4";
import Template40 from "../templates/Template40";
import Template41 from "../templates/Template41";
import Template42 from "../templates/Template42";
import Template43 from "../templates/Template43";
import Template44 from "../templates/Template44";
import Template45 from "../templates/Template45";
import Template46 from "../templates/Template46";
import Template47 from "../templates/Template47";
import Template48 from "../templates/Template48";
import Template49 from "../templates/Template49";
import Template5 from "../templates/Template5";
import Template50 from "../templates/Template50";
import Template51 from "../templates/Template51";
import Template52 from "../templates/Template52";
import Template53 from "../templates/Template53";
import Template54 from "../templates/Template54";
import Template55 from "../templates/Template55";
import Template56 from "../templates/Template56";
import Template57 from "../templates/Template57";
import Template58 from "../templates/Template58";
import Template59 from "../templates/Template59";
import Template6 from "../templates/Template6";
import Template60 from "../templates/Template60";
import Template61 from "../templates/Template61";
import Template62 from "../templates/Template62";
import Template63 from "../templates/Template63";
import Template64 from "../templates/Template64";
import Template65 from "../templates/Template65";
import Template66 from "../templates/Template66";
import Template67 from "../templates/Template67";
import Template68 from "../templates/Template68";
import Template69 from "../templates/Template69";
import Template7 from "../templates/Template7";
import Template70 from "../templates/Template70";
import Template71 from "../templates/Template71";
import Template8 from "../templates/Template8";
import Template9 from "../templates/Template9";

// ─── A4 dimensions (794×1123px at 96dpi = 210×297mm) ─────────────────────────
export const A4_W = 794;
export const A4_H = 1123;

// ─── Template registry ────────────────────────────────────────────────────────
export const TEMPLATES = [
  {
    id: 1,
    category: "classic",
    name: "Classic Professional",
    tier: "basic",
    description: "Traditional serif layout, timeless and formal",
    accent: "#1a1a1a",
    Component: Template1,
    isBasicAllowed: true,
  },
  {
    id: 2,
    category: "sidebar-left",
    name: "Modern Sidebar",
    tier: "basic",
    description: "Two-column with navy sidebar, contemporary feel",
    accent: "#3b82f6",
    Component: Template2,
    isBasicAllowed: true,
  },
  {
    id: 3,
    category: "classic",
    name: "Executive Minimal",
    tier: "basic",
    description: "Centered elegant header, refined and understated",
    accent: "#1a1a1a",
    Component: Template3,
    isBasicAllowed: true,
  },
  {
    id: 4,
    category: "header-sidebar",
    name: "Bold Creative",
    tier: "basic",
    description: "Amber accents, high-impact for creative roles",
    accent: "#f59e0b",
    Component: Template4,
    isBasicAllowed: true,
  },
  {
    id: 5,
    category: "header",
    name: "Tech Dark",
    tier: "premium",
    description: "Monospace code-style, perfect for tech roles",
    accent: "#38bdf8",
    Component: Template5,
    isBasicAllowed: true,
  },
  {
    id: 6,
    category: "sidebar-right",
    name: "Ekazi Blue Split",
    tier: "basic",
    description: "Dark right panel, blue accents, skills grid",
    accent: "#1756a5",
    Component: Template6,
  },
  {
    id: 7,
    category: "modern-sidebar",
    name: "Teal Timeline",
    tier: "basic",
    description: "Hexagonal photo, teal timeline sections",
    accent: "#0ea5a4",
    Component: Template7,
  },
  {
    id: 8,
    category: "sidebar-left",
    name: "Blue Aside Cards",
    tier: "basic",
    description: "Pill-label sidebar, education table layout",
    accent: "#1756a5",
    Component: Template8,
  },
  {
    id: 9,
    category: "header",
    name: "Red Banner",
    tier: "basic",
    description: "Bold red header with photo, clean two-column",
    accent: "#dc3545",
    Component: Template9,
  },
  {
    id: 10,
    category: "modern-sidebar",
    name: "Warm Orange",
    tier: "basic",
    description: "Nunito font, orange accents, full skills breakdown",
    accent: "#D36314",
    Component: Template10,
  },
  {
    id: 11,
    category: "modern-sidebar",
    name: "Orange Card Layout",
    tier: "basic",
    description: "Card-based layout, orange accents, timeline experience",
    accent: "#c2410c",
    Component: Template11,
  },
  {
    id: 12,
    category: "header-sidebar",
    name: "Emerald Dark Panel",
    tier: "premium",
    description: "Dark left panel, emerald green, education cards",
    accent: "#10b981",
    Component: Template12,
  },
  // {
  //   id: 13,
  //   category: "header",
  //   name: "Red Timeline",
  //   tier: "basic",
  //   description: "Red gradient timeline, chip tags, card sections",
  //   accent: "#dc2626",
  //   Component: Template14,
  // },
  {
    id: 14,
    category: "header",
    name: "Indigo Amber Gradient",
    tier: "basic",
    description: "Bold gradient header, badge tags per skill category",
    accent: "#4f46e5",
    Component: Template14,
  },
  {
    id: 15,
    category: "header",
    name: "Orange Banner",
    tier: "basic",
    description: "Orange banner header, pill tags, left-bordered cards",
    accent: "#f97316",
    Component: Template15,
  },
  {
    id: 16,
    category: "header",
    name: "Teal Sidebar Photo",
    tier: "basic",
    description: "Teal center header, circular photo sidebar, chip skills",
    accent: "#009485",
    Component: Template16,
  },
  {
    id: 17,
    category: "header",
    name: "Navy Photo Header",
    tier: "basic",
    description: "Navy header with photo, card blocks, left-bordered items",
    accent: "#32489e",
    Component: Template17,
  },
  {
    id: 18,
    category: "header",
    tier: "basic",
    name: "Deep Navy Skills",
    description: "Navy header, skills block grid, dot timeline experience",
    accent: "#242a64",
    Component: Template18,
  },
  {
    id: 19,
    category: "header",
    tier: "basic",
    name: "Orange Octagon",
    description:
      "Orange header, octagon photo, 6-cell skill grid, 2-col layout",
    accent: "#ff6601",
    Component: Template19,
  },
  {
    id: 20,
    category: "header",
    tier: "basic",
    name: "Deep Red Diamond",
    description: "Red gradient diagonal header, diamond photo, merged exp+edu",
    accent: "#b62424",
    Component: Template20,
  },
  {
    id: 21,
    category: "modern-sidebar",
    tier: "basic",
    name: "Teal Split Header",
    description: "Portrait photo left, name right, thin teal accent strip",
    accent: "#007d84",
    Component: Template21,
  },
  {
    id: 22,
    category: "header",
    tier: "basic",
    name: "Navy Circle Header",
    description: "Circular photo centered in navy header, education table",
    accent: "#223a83",
    Component: Template22,
  },
  {
    id: 23,
    category: "header",
    tier: "basic",
    name: "Burnt Orange Float",
    description: "Floating circular photo over burnt orange bar, card sections",
    accent: "#ad5715",
    Component: Template23,
  },
  {
    id: 24,
    category: "header",
    tier: "basic",
    name: "Deep Navy Cards",
    description: "Rounded navy header, card blocks, left-border dot timeline",
    accent: "#0c2b3b",
    Component: Template24,
  },
  {
    id: 25,
    category: "header",
    tier: "basic",
    name: "Bright Orange Cards",
    description:
      "Bright orange centered header, card blocks, left-bordered items",
    accent: "#ff511a",
    Component: Template25,
  },
  {
    id: 26,
    category: "header",
    tier: "basic",
    name: "Indigo Panel Timeline",
    description:
      "Indigo header with decorative circle, padded photo, timeline + edu table",
    accent: "#312e81",
    Component: Template26,
  },
  {
    id: 27,
    category: "header",
    tier: "basic",
    name: "Deep Rose Gradient",
    description:
      "Rose gradient header, circular photo, dot timeline, pill skill tags",
    accent: "#881337",
    Component: Template27,
  },
  {
    id: 28,
    category: "classic",
    tier: "basic",
    name: "Serif Floating Photo",
    description:
      "Centered red name, floating photo below header, slate card sections",
    accent: "#dc2626",
    Component: Template28,
  },
  {
    id: 29,
    category: "header",
    tier: "basic",
    name: "Sky Blue Absolute",
    description:
      "Sky blue header with absolute photo, left-bordered exp/edu, 2-col layout",
    accent: "#0284c7",
    Component: Template29,
  },
  {
    id: 30,
    category: "modern-sidebar",
    tier: "basic",
    name: "Teal Purple Gradient",
    description:
      "Radial gradient header, contact tiles, gradient pill tags, gradient cards",
    accent: "#0B7285",
    Component: Template30,
  },
  {
    id: 31,
    category: "modern sidebar",
    tier: "basic",
    name: "Burnt Orange Banner",
    description:
      "Gradient banner, rectangular photo, dot timeline, orange pills",
    accent: "#cf470c",
    Component: Template31,
  },
  {
    id: 32,
    category: "header",
    tier: "basic",
    name: "Dark Teal Float",
    description:
      "Dark teal centered header, floating photo, card blocks, timeline",
    accent: "#224559",
    Component: Template32,
  },
  {
    id: 33,
    category: "header",
    tier: "basic",
    name: "Teal Gold Curved",
    description:
      "Teal curved header, gold borders, circular photo, rounded exp cards",
    accent: "#146990",
    Component: Template33,
  },
  {
    id: 34,
    category: "modern-sidebar",
    tier: "basic",
    name: "Teal Left Border",

    description:
      "Teal left-border panel header, circular photo, exp cards, pill tags",
    accent: "#13a4a6",
    Component: Template34,
  },
  {
    id: 35,
    category: "classic",
    tier: "premium",
    name: "Amber Single Flow",
    description:
      "Amber circular photo header, contact bar, single-column dot timeline",
    accent: "#dd8321",
    Component: Template35,
  },
  {
    id: 36,
    category: "classic",
    tier: "premium",
    name: "Navy Rectangular Photo",
    description:
      "Rectangular photo top-left, bullet skill lists, 2-col referees",
    accent: "#0b3d6d",
    Component: Template36,
  },
  {
    id: 37,
    category: "modern-sidebar",
    tier: "premium",
    name: "Teal Rounded Sidebar",
    description:
      "Teal rounded-corner sidebar, contact pill bar, exp in main column",
    accent: "#247d6f",
    Component: Template37,
  },
  {
    id: 38,
    category: "header",
    tier: "premium",
    name: "Navy Hero Header",
    description:
      "Full-width navy hero, 3-col bullet lists, timeline rows with dates",
    accent: "#233376",
    Component: Template38,
  },
  {
    id: 39,
    category: "modern-sidebar",
    tier: "premium",
    name: "Teal Triangle Sidebar",
    description:
      "Clip-path triangle accent, large circular photo, dot timeline right",
    accent: "#047b7d",
    Component: Template39,
  },
  {
    id: 40,
    category: "classic",
    tier: "premium",
    name: "Burnt Orange Accent",
    description:
      "Orange top bar, circular photo, 2-col detail panels, left-border refs",
    accent: "#e5481d",
    Component: Template40,
  },
  {
    id: 41,
    category: "classic",
    tier: "premium",
    name: "Warm Brown Resume",
    description:
      "Circular photo, 2-col contact grid, resume rows, 2-col panels",
    accent: "#8e604c",
    Component: Template41,
  },
  {
    id: 42,
    category: "classic",
    tier: "premium",
    name: "Navy Section Bars",
    description:
      "Full-width navy section bars, circular photo, 3-col bullet lists",
    accent: "#00357a",
    Component: Template42,
  },
  {
    id: 43,
    category: "classic",
    tier: "basic",
    name: "Forest Green Accent",
    description:
      "Vertical green bar, right-aligned photo, data rows, green footer",
    accent: "#156939",
    Component: Template43,
  },
  {
    id: 44,
    category: "modern-sidebar",
    tier: "basic",
    name: "Red Diamond Markers",
    description: "Diamond markers, rectangular photo, 2-col exp/skills layout",
    accent: "#ff0000",
    Component: Template44,
  },
  {
    id: 45,
    category: "header",
    tier: "premium",
    name: "Orange Dark Header",
    description:
      "Dark gradient header, orange circular photo border, pill-icon sections",
    accent: "#ff8a00",
    Component: Template45,
  },
  {
    id: 46,
    category: "modern-sidebar",
    tier: "basic",
    name: "Crimson 2-Col Blocks",
    description: "Crimson section blocks, circular photo, 3-col referee cards",
    accent: "#8b0039",
    Component: Template46,
  },
  {
    id: 47,
    category: "sidebar-left",
    tier: "basic",
    name: "Red Dark Sidebar",
    description:
      "Dark sidebar, octagon photo, red seam pill tabs, dot timeline",
    accent: "#ef3f35",
    Component: Template47,
  },
  {
    id: 48,
    category: "header-sidebar",
    tier: "basic",
    name: "Peach Rounded Hero",
    description:
      "Peach rounded header, offset circular photo, sidebar panel, skill grid",
    accent: "#f3b184",
    Component: Template48,
  },
  {
    id: 49,
    category: "sidebar-left",
    tier: "basic",
    name: "Purple Orange Pills",
    description:
      "Purple sidebar, orange pill headings, circular photo, left-border exp",
    accent: "#5f5896",
    Component: Template49,
  },
  {
    id: 50,
    category: "header",
    tier: "basic",
    name: "Navy Pill Headings",
    description:
      "Navy header, rounded square photo, navy contact card, pill headings",
    accent: "#1A365D",
    Component: Template50,
  },
  {
    id: 51,
    category: "modern-sidebar",
    tier: "basic",
    name: "Duck Blue Pill Sidebar",
    description:
      "Pill-shaped photo in blue box, dark sidebar, outline-border section headings",
    accent: "#1e3653",
    Component: Template51,
  },
  {
    id: 52,
    category: "header",
    tier: "basic",
    name: "Steel Two-Tone Header",
    description:
      "Steel two-tone header (photo+text), 3-col bullet grids, single-column body",
    accent: "#536779",
    Component: Template52,
  },
  {
    id: 53,
    category: "header",
    tier: "basic",
    name: "Rust Split Header",
    description:
      "Rust header split (photo+contact left, edu+skills right), pill skills grid",
    accent: "#8b2e16",
    Component: Template53,
  },
  {
    id: 54,
    category: "header",
    tier: "premium",
    name: "Deep Navy Gold Header",
    description:
      "Deep navy header, gold circular photo, 60/40 split body, gold contact icons",
    accent: "#001b3d",
    Component: Template54,
  },
  {
    id: 55,
    category: "sidebar-left",
    tier: "premium",
    name: "Green Rounded Sidebar",
    description:
      "Green rounded sidebar with edu+contact, left-border exp rows, 2-col skills",
    accent: "#32bb78",
    Component: Template55,
  },
  {
    id: 56,
    category: "header-sidebar",
    tier: "basic",
    name: "Teal Wave Sidebar",
    description:
      "Dark header + teal wave, ribbon-style sidebar sections, checkmark lists",
    accent: "#46a1c0",
    Component: Template56,
  },
  {
    id: 57,
    category: "sidebar-left",
    tier: "basic",
    name: "Blue Split Circular",
    description:
      "Half-blue clip-path photo, blue summary block, sidebar skills",
    accent: "#005696",
    Component: Template57,
  },
  {
    id: 58,
    category: "modern-sidebar",
    tier: "basic",
    name: "Teal Pill Sections",
    description:
      "Pill-style section headers, tall rounded photo on dark teal right side",
    accent: "#0a3d44",
    Component: Template58,
  },
  {
    id: 59,
    category: "modern-sidebar",
    tier: "basic",
    name: "Blue Steel Two-Tone",
    description:
      "Steel/blue two-tone header, dark exp block, blue pill tags, footer bar",
    accent: "#1d78b7",
    Component: Template59,
  },
  {
    id: 60,
    category: "sidebar-left",
    tier: "basic",
    name: "Orange Offset Sidebar",
    description:
      "Offset circular photo, orange banner name, dot timeline, 2-col refs",
    accent: "#ff7a1f",
    Component: Template60,
  },
  {
    id: 61,
    category: "classic",
    tier: "basic",
    name: "Dark Teal Panel Row",
    description:
      "3-col header, tinted panels, date-box experience rows, 2-col extras",
    accent: "#102429",
    Component: Template61,
  },
  {
    id: 62,
    category: "modern-sidebar",
    tier: "basic",
    name: "Navy Dark Sidebar Main",
    description:
      "Corner-anchored photo, dark rounded main panel, gold rule, split dates",
    accent: "#163854",
    Component: Template62,
  },
  {
    id: 63,
    category: "header",
    tier: "basic",
    name: "Slate Pill Columns",
    description:
      "Right-aligned slate header, floating pill card, pill section headings",
    accent: "#3d5a6c",
    Component: Template63,
  },
  {
    id: 64,
    category: "sidebar-left",
    tier: "basic",
    name: "Dark Floating Photo",
    description:
      "Dark left sidebar, floating circular photo, dark rounded bottom, diamond lists",
    accent: "#2d2d2d",
    Component: Template64,
  },
  {
    id: 65,
    category: "classic",
    tier: "basic",
    name: "Minimal Pill Sections",
    description:
      "Clean minimal, small circular photo, gray rounded-right pill headings, 2-col skills",
    accent: "#374151",
    Component: Template65,
  },
  {
    id: 66,
    category: "classic",
    tier: "basic",
    name: "Blue Dot Timeline",
    description:
      "Pure minimal, blue dot timeline, border-top sections, no photo",
    accent: "#60a5fa",
    Component: Template66,
  },
  {
    id: 67,
    category: "classic",
    tier: "basic",
    name: "Resume Table Layout",
    description:
      "Centered Resume title, grid personal details, education table, portrait photo",
    accent: "#000000",
    Component: Template67,
  },
  {
    id: 68,
    category: "classic",
    tier: "basic",
    name: "Dark Header Table",
    description:
      "Dark grey header, Manrope, dark-row edu table, rectangular portrait photo",
    accent: "#444444",
    Component: Template68,
  },
  {
    id: 69,
    category: "sidebar-left",
    tier: "basic",
    name: "Teal Border Sidebar",
    description:
      "Teal thick border, teal sidebar, circular photo, bullet dot lists",
    accent: "#15a39a",
    Component: Template69,
  },
  {
    id: 70,
    category: "modern-sidebar",
    tier: "basic",
    name: "Blue Bubble Cards",
    description:
      "Blue bubble cards 2-col, circular photo in header, contact tiles",
    accent: "#4a90a4",
    Component: Template70,
  },
  {
    id: 71,
    category: "modern-sidebar",
    tier: "premium",
    name: "Orange Contact Bar",
    description:
      "Orange contact bar, name stacked bold, left-border side section",
    accent: "#e68a5c",
    Component: Template71,
  },
];
