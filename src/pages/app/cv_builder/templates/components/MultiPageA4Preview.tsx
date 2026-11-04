import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  type Ref,
  type ReactNode,
} from "react";
import { A4_H, A4_W } from "../../data/constants";

const PAGE_PADDING_TOP = 48;
const PAGE_PADDING_X = 52;
const PAGE_PADDING_BOTTOM = 52;
const CONTENT_HEIGHT = A4_H - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM;

export default function MultiPageA4Preview({
  containerRef,
  shadow = true,
  showPageBreaks = false,
  watermark,
  logoSrc,
  watermarkSrc,
  children,
}: {
  containerRef: Ref<HTMLDivElement>;
  shadow?: boolean;
  showPageBreaks?: boolean;
  watermark?: boolean;
  logoSrc?: string;
  watermarkSrc?: string;
  children?: ReactNode;
}) {
  const scaleContainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [scale, setScale] = useState(0);

  const pageGap = shadow ? 24 : 0;
  const unscaledHeight = pageCount * (A4_H + pageGap);

  // Keep the A4 layout intact and scale it to the available card width.
  useLayoutEffect(() => {
    const container = scaleContainerRef.current;
    if (!container) return undefined;

    const updateScale = () => setScale(container.clientWidth / A4_W);

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!measureRef.current) return;
    const timer = setTimeout(() => {
      const h = measureRef.current?.scrollHeight ?? 0;
      setPageCount(Math.max(1, Math.ceil(h / CONTENT_HEIGHT)));
    }, 150);
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div
      ref={scaleContainerRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${unscaledHeight * scale}px`,
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${A4_W}px`,
          background: "transparent",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale > 0 ? "visible" : "hidden",
        }}
      >
        {/* Invisible measurement div */}
        <div
          ref={measureRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            zIndex: -1,
            width: `${A4_W - PAGE_PADDING_X * 2}px`,
            left: -9999,
            top: 0,
          }}
        >
          {children}
        </div>

        {Array.from({ length: pageCount }).map((_, i) => (
          <div
            key={i}
            className="pdf-page"
            style={{
              width: `${A4_W}px`,
              height: `${A4_H}px`,
              background: "#fff",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
              marginBottom: pageGap,
              boxShadow: shadow ? "0 4px 40px rgba(0,0,0,0.18)" : "none",
            }}
          >
            {/* ── Content slice ──
    Key fix: each page shifts content up by CONTENT_HEIGHT,
    but also needs to start BELOW the header (PAGE_PADDING_TOP)
    and the content window must be clipped ABOVE the footer too  ── */}
            <div
              style={{
                position: "absolute",
                top: PAGE_PADDING_TOP, // ← always start below header
                left: PAGE_PADDING_X,
                right: PAGE_PADDING_X,
                bottom: PAGE_PADDING_BOTTOM, // ← always stop above footer
                overflow: "hidden", // ← clip content at both edges
                pointerEvents: "none",
              }}
            >
              {/* Inner div slides content up for each page */}
              <div
                style={{
                  position: "absolute",
                  top: -i * CONTENT_HEIGHT, // ← slide up by page index
                  left: 0,
                  right: 0,
                }}
              >
                {children}
              </div>
            </div>

            {/* ── Footer ── */}
            {watermark && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: PAGE_PADDING_BOTTOM,
                  padding: "8px 52px",
                  borderTop: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 10,
                  color: "#9ca3af",
                  background: "#fff",
                  boxSizing: "border-box",
                  zIndex: 5,
                }}
              >
                <span>Powered by ekazi</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {logoSrc && (
                    <img
                      src={logoSrc}
                      alt="ekazi"
                      style={{ height: 14, objectFit: "contain" }}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Watermark */}
            {watermark && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  zIndex: 20,
                }}
              >
                {watermarkSrc ? (
                  <img
                    src={watermarkSrc}
                    alt="watermark"
                    style={{ width: 550, opacity: 0.07 }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: 72,
                      fontWeight: 700,
                      color: "#000",
                      opacity: 0.06,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ekazi.co.tz
                  </span>
                )}
              </div>
            )}

            {/* Page badge */}
            {showPageBreaks && pageCount > 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 12,
                  fontSize: 10,
                  color: "#6366f1",
                  background: "#eef2ff",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontWeight: 600,
                }}
              >
                {i + 1} / {pageCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
