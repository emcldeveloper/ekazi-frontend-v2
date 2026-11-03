// Simple original illustrations for the promo carousel. Colors match the brand palette.
import type { ReactNode } from "react";

const BLUE = "#1756a5";
const ORANGE = "#d36415";
const PANEL = "#eef3fa";
const BAR = "#d5e0ef";

const Window = ({ children }: { children: ReactNode }) => (
  <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
    <rect
      x="4"
      y="8"
      width="212"
      height="148"
      rx="8"
      fill="#000"
      opacity="0.12"
    />
    <rect x="0" y="0" width="212" height="148" rx="8" fill={PANEL} />
    <path d="M0 8a8 8 0 0 1 8-8h196a8 8 0 0 1 8 8v14H0z" fill={BAR} />
    <circle cx="12" cy="11" r="4" fill={ORANGE} />
    <circle cx="24" cy="11" r="4" fill={BLUE} />
    {children}
  </svg>
);

/** A highlighted candidate card with a star badge. */
export const FeaturedIllustration = () => (
  <Window>
    <rect
      x="16"
      y="34"
      width="180"
      height="30"
      rx="6"
      fill="#fff"
      opacity="0.7"
    />
    <rect
      x="16"
      y="104"
      width="180"
      height="30"
      rx="6"
      fill="#fff"
      opacity="0.7"
    />
    <rect x="24" y="43" width="60" height="5" rx="2.5" fill={BAR} />
    <rect x="24" y="113" width="70" height="5" rx="2.5" fill={BAR} />
    <rect
      x="10"
      y="64"
      width="192"
      height="38"
      rx="7"
      fill="#fff"
      stroke={ORANGE}
      strokeWidth="2.5"
    />
    <circle cx="30" cy="83" r="10" fill={BLUE} />
    <rect x="48" y="75" width="80" height="6" rx="3" fill={BLUE} />
    <rect x="48" y="86" width="56" height="5" rx="2.5" fill={BAR} />
    <circle cx="180" cy="64" r="16" fill={ORANGE} />
    <path
      d="m180 55 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"
      fill="#fff"
    />
  </Window>
);

/** A profile card with a progress ring and a checklist. */
export const ProfileIllustration = () => {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <Window>
      <circle cx="56" cy="80" r={r} stroke={BAR} strokeWidth="7" />
      <circle
        cx="56"
        cy="80"
        r={r}
        stroke={ORANGE}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * 0.3}
        transform="rotate(-90 56 80)"
      />
      <circle cx="56" cy="74" r="7" fill={BLUE} />
      <path d="M43 92a13 10 0 0 1 26 0" fill={BLUE} />
      {[48, 74, 100].map((y, i) => (
        <g key={y}>
          <rect
            x="96"
            y={y}
            width="12"
            height="12"
            rx="3"
            fill={i < 2 ? BLUE : "#fff"}
            stroke={BLUE}
            strokeWidth="1.5"
          />
          {i < 2 && (
            <path
              d={`M99 ${y + 6}l2.5 2.5 4-5`}
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <rect
            x="114"
            y={y + 3}
            width={i === 1 ? 60 : 76}
            height="6"
            rx="3"
            fill={i < 2 ? BAR : ORANGE}
            opacity={i < 2 ? 1 : 0.8}
          />
        </g>
      ))}
    </Window>
  );
};

/** A stack of CVs under a magnifying glass. */
export const BrowseCvIllustration = () => (
  <Window>
    {[
      { x: 28, y: 46, o: 0.55 },
      { x: 48, y: 38, o: 0.8 },
      { x: 68, y: 30, o: 1 },
    ].map(({ x, y, o }) => (
      <g key={x} opacity={o}>
        <rect
          x={x}
          y={y}
          width="72"
          height="96"
          rx="6"
          fill="#fff"
          stroke={BAR}
          strokeWidth="1.5"
        />
        <circle cx={x + 16} cy={y + 18} r="8" fill={BLUE} />
        <rect
          x={x + 30}
          y={y + 13}
          width="32"
          height="5"
          rx="2.5"
          fill={BLUE}
        />
        <rect x={x + 30} y={y + 22} width="22" height="4" rx="2" fill={BAR} />
        {[40, 50, 60, 70].map((dy) => (
          <rect
            key={dy}
            x={x + 10}
            y={y + dy}
            width={dy === 70 ? 34 : 52}
            height="4"
            rx="2"
            fill={BAR}
          />
        ))}
      </g>
    ))}
    <circle
      cx="160"
      cy="92"
      r="24"
      fill="#fff"
      fillOpacity="0.6"
      stroke={ORANGE}
      strokeWidth="6"
    />
    <path
      d="m177 109 16 16"
      stroke={ORANGE}
      strokeWidth="8"
      strokeLinecap="round"
    />
  </Window>
);
