import { DEFAULT_IMG, IMG_BASE } from "@/config";
// Type-only, so this doesn't pull react-pdf into the main bundle
import type {
  JobPdfData,
  JobPdfLinks,
  PdfBlock,
} from "@/pages/app/jobs/components/JobPdfDocument";

export interface JobShareOptions {
  shareUrl: string;
  shareTitle: string;
}

export interface ShareFileOptions {
  title?: string;
  text?: string;
}

export type ShareResult = "shared" | "downloaded" | "cancelled";

/* ---------- HTML (from the rich-text editor) -> simple blocks ---------- */

const clean = (s: string | null | undefined): string =>
  (s || "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();

export function htmlToBlocks(html: string | null | undefined): PdfBlock[] {
  if (!html) return [];
  const doc = new DOMParser().parseFromString(
    html.replace(/<br\s*\/?>/gi, "\n"),
    "text/html",
  );
  const blocks: PdfBlock[] = [];

  const walk = (node: Node): void => {
    node.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const text = clean(n.textContent);
        if (text) blocks.push({ type: "p", text });
        return;
      }
      if (n.nodeType !== Node.ELEMENT_NODE) return;

      const el = n as Element;
      const tag = el.tagName.toLowerCase();
      if (/^h[1-6]$/.test(tag)) {
        const text = clean(el.textContent);
        if (text) blocks.push({ type: "h", text });
      } else if (tag === "ul" || tag === "ol") {
        const items = Array.from(el.children)
          .filter((c) => c.tagName.toLowerCase() === "li")
          .map((li) => clean(li.textContent))
          .filter(Boolean);
        if (items.length)
          blocks.push({ type: "list", ordered: tag === "ol", items });
      } else if (["div", "section", "article", "blockquote"].includes(tag)) {
        walk(el);
      } else {
        const text = clean(el.textContent);
        if (text) blocks.push({ type: "p", text });
      }
    });
  };

  walk(doc.body);
  return blocks;
}

/* ---------- helpers ---------- */

/**
 * Loads an image and returns it as a PNG data URL that react-pdf can embed.
 *
 * react-pdf only understands PNG/JPEG, so logos uploaded as WebP, SVG, GIF
 * (or served with the wrong content-type) are redrawn onto a canvas and
 * exported as PNG. The image is also scaled down so the PDF stays small.
 *
 * The image server must send CORS headers (Access-Control-Allow-Origin),
 * otherwise the browser blocks the fetch.
 */
async function imageToPngDataUrl(url: string, maxSize = 400): Promise<string> {
  const res = await fetch(url, { mode: "cors", cache: "force-cache" });
  if (!res.ok) throw new Error(`Logo request failed: ${res.status}`);
  const blob = await res.blob();

  // Same-origin object URL, so the canvas isn't "tainted"
  const objectUrl = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Logo could not be decoded"));
      el.src = objectUrl;
    });

    const w = img.naturalWidth || 300; // SVGs without width/height
    const h = img.naturalHeight || 150;
    const scale = Math.min(1, maxSize / Math.max(w, h));

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context is not available");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function loadLogo(job: JobPdfData): Promise<string | null> {
  const candidates = [
    // Logo paths can contain spaces (e.g. "uploads/..._emcl logo.png"), so encode them
    job?.client?.logo ? encodeURI(`${IMG_BASE}${job.client.logo}`) : null,
    DEFAULT_IMG, // same fallback the page uses
  ].filter((url): url is string => Boolean(url));

  for (const url of candidates) {
    try {
      return await imageToPngDataUrl(url);
    } catch (err) {
      console.warn("[job pdf] logo not loaded:", url, err);
    }
  }
  return null;
}

const slug = (s: string | null | undefined): string =>
  (s || "job")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function getJobPdfFileName(job: JobPdfData): string {
  const parts = [job?.position?.name, job?.client?.name].filter(Boolean);
  return `${slug(parts.join(" "))}.pdf`;
}

export function buildJobLinks(
  job: JobPdfData,
  { shareUrl, shareTitle }: JobShareOptions,
): JobPdfLinks {
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedUrl = encodeURIComponent(shareUrl);
  return {
    home: window.location.origin,
    view: shareUrl,
    // External jobs go straight to the employer's page; others land on the job on your site
    apply: job?.job_externalUrl || shareUrl,
    save: shareUrl,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}

/* ---------- generate / download / share ---------- */

export async function generateJobPdf(
  job: JobPdfData,
  { shareUrl, shareTitle }: JobShareOptions,
): Promise<Blob> {
  // Lazy-load so react-pdf isn't in the main bundle
  const [{ pdf }, { default: JobPdfDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/pages/app/jobs/components/JobPdfDocument"),
  ]);

  const logo = await loadLogo(job);

  return pdf(
    <JobPdfDocument
      job={job}
      logo={logo}
      links={buildJobLinks(job, { shareUrl, shareTitle })}
      // Despite the name, `requirements` holds the duties
      duties={htmlToBlocks(job?.requirements?.[0]?.main_duties)}
      requirements={htmlToBlocks(
        job?.other_requirements?.[0]?.other_requirement,
      )}
    />,
  ).toBlob();
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Opens the native share sheet with the PDF attached (mobile: WhatsApp, Mail, etc.).
 * Falls back to downloading when file sharing isn't supported.
 */
export async function shareJobPdf(
  blob: Blob,
  fileName: string,
  { title, text }: ShareFileOptions,
): Promise<ShareResult> {
  const file = new File([blob], fileName, { type: "application/pdf" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title, text });
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return "cancelled";
      // NotAllowedError etc. -> fall through to download
    }
  }

  downloadBlob(blob, fileName);
  return "downloaded";
}
