import { useState, useEffect } from "react";

/**
 * Loads a logo image from a URL and converts it to a base64 data URL.
 * Using base64 ensures the logo renders correctly inside html2pdf captures.
 *
 * @param {string} src - Path or URL to the logo image (e.g. "/logo.png")
 * @returns {string|null} base64 data URL or null while loading / on error
 */
export function useLogoLoader(src: string | null | undefined): string | null {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      setLogoSrc(canvas.toDataURL("image/png"));
    };
    img.onerror = () => setLogoSrc(null);
    img.src = src;
  }, [src]);

  return logoSrc;
}
