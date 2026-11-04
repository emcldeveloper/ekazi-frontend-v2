import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { A4_H, A4_W } from "../data/constants";

export default function TemplateThumbnail({
  children,
}: {
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateScale = () => setScale(container.clientWidth / A4_W);

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white"
      style={{ aspectRatio: `4 / 3` }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${A4_W}px`,
          minHeight: `${A4_H}px`,
          padding: "48px 52px 52px",
          boxSizing: "border-box",
          background: "#fff",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale > 0 ? "visible" : "hidden",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {children}
      </div>

      <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-5" />
    </div>
  );
}
