import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, Download, Eye } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useCVData } from "@/context/TemplatesContext";

import { TEMPLATES } from "./data/constants";
import {
  useBookmarkCv,
  useCVCount,
  useCvDownloads,
  useCVNormalized,
  useGetBookmarkCv,
  useGetCvDownloads,
  useLogoLoader,
  useSaveCV,
  useSubscriptionPlans,
} from "@/hooks/cv";
import MultiPageA4Preview from "./templates/components/MultiPageA4Preview";
import MultiPageA4Download from "./templates/components/MultiPageA4Download";
import DownloadModal from "./components/DownloadModal";
import PaymentModal from "./components/PaymentModal";

interface PaymentPlan {
  id: number;
  name: string;
  price: number;
  duration_days: number;
}

interface SelectedPaymentPlan {
  id: number;
  name: string;
  price: number;
  period: string;
}

interface PdfElementRef {
  current: HTMLDivElement | null;
}

interface TemplateViewCount {
  template_no: number | string;
  view?: number | string | null;
}

const PreviewTemplate = () => {
  const applicant_id = 31941;
  const { id } = useParams();
  const navigate = useNavigate();
  const templateId = Number(id);

  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<SelectedPaymentPlan | null>(
    null,
  );

  const { data: bookmarkedData } = useGetBookmarkCv();

  const isBookmarked = useMemo(() => {
    const list = Array.isArray(bookmarkedData)
      ? bookmarkedData
      : bookmarkedData?.data || [];

    return list.some(
      (b: any) =>
        Number(b.template_id) === Number(templateId) && b.status === true,
    );
  }, [bookmarkedData, templateId]);

  const { mutate: countCvDownloads } = useCvDownloads();
  const { data: downloads } = useGetCvDownloads(templateId);
  const downloadCount = downloads?.download_count;

  const { data: views } = useCVCount();
  const viewCounts = views?.view_count || [];

  const getTemplateViewCount = (id: number) => {
    if (!Array.isArray(viewCounts)) return 0;
    const found = viewCounts.find(
      (item: TemplateViewCount) => Number(item.template_no) === Number(id),
    );
    return Number(found?.view ?? 0);
  };
  const selectedViewCount = getTemplateViewCount(templateId);

  const { data: templateData } = useCVData();
  const profile = useCVNormalized(templateData);
  const logoSrc = useLogoLoader("/assets/logos/logo.png");
  const watermarkSrc = useLogoLoader("/assets/logos/ekazi-tie.png");

  //  const fileName = `${profile.fullName.replace(/\s+/g, "_")}_CV.pdf`;
  const fileName = `${profile.fullName.replace(/\s+/g, "_")}`;
  const [pdfName, setPdfName] = useState(fileName);
  const safeFileName = pdfName?.replace(/[<>:"/\\|?*]+/g, "")?.trim() || "CV";
  const finalFileName = `${safeFileName}.pdf`;

  // SAVE DOWNLOADED CVS
  const { mutate: saveDownloadedCv } = useSaveCV();

  const selectedMeta = TEMPLATES.find((t) => t.id === templateId);
  const SelectedComponent = selectedMeta?.Component;
  const templateName = selectedMeta?.name;

  // Payments
  const subscriptionStatus = "premium"; // Replace with actual subscription status from user data

  const { data: plans } = useSubscriptionPlans();
  const subscriptionPlans = plans?.data || [];

  const { mutate: bookmarkCv } = useBookmarkCv();

  const scaledContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const freeRef = useRef<HTMLDivElement>(null); // watermark = true  → free download
  const proRef = useRef<HTMLDivElement>(null); // watermark = false → pro download

  // Scale A4 to fit container width
  const recalcScale = useCallback(() => {
    if (!scaledContainerRef.current) return;
  }, []);

  useEffect(() => {
    recalcScale();
    window.addEventListener("resize", recalcScale);
    return () => window.removeEventListener("resize", recalcScale);
  }, [recalcScale]);

  const handleBookmark = (id: number) => {
    const newValue = !isBookmarked;

    bookmarkCv(
      { applicant_id, template_id: id, status: newValue },
      {
        onSuccess: () => {
          toast.success(
            newValue ? "Added to bookmarks" : "Removed from bookmarks",
          );
        },
      },
    );
  };

  // Core PDF generator
  const generatePdfFromBackend = async (
    elementRef: PdfElementRef,
    fileName: string,
    withWatermark: boolean = true,
  ) => {
    if (!elementRef?.current) return;

    try {
      setIsDownloading(true);
      toast("Generating PDF...");

      // Convert logo to base64 — Puppeteer can't reach frontend relative URLs
      let logoBase64 = "";
      let watermarkBase64 = "";

      if (logoSrc) {
        try {
          const r = await fetch(logoSrc);
          const blob = await r.blob();
          logoBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          console.error("Failed to convert logo to base64", err);
        }
      }

      if (watermarkSrc) {
        try {
          const r = await fetch(watermarkSrc);
          const blob = await r.blob();
          watermarkBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          console.error("Failed to convert watermark to base64", err);
        }
      }

      const html = `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /></head>
  <body>${elementRef.current.outerHTML}</body>
</html>`;

      const response = await fetch(
        // "http://localhost:5001/api/pdf/generate",
        "https://cvtemplate.ekazi.co.tz/api/pdf/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            html,
            watermark: withWatermark,
            logoBase64,
            watermarkBase64,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("PDF Downloaded");

      countCvDownloads({
        template_id: templateId,
        template_name: templateName,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  // Download handlers
  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleDownloadFree = () => {
    setShowModal(false);
    generatePdfFromBackend(freeRef, finalFileName, true);
    saveDownloadedCv({
      applicant_id,
      template: templateName,
      cv_name: finalFileName,
    });
  };

  const handleDownloadPro = () => {
    setShowModal(false);
    generatePdfFromBackend(proRef, finalFileName, false);
    saveDownloadedCv({
      applicant_id,
      template: templateName,
      cv_name: finalFileName,
    });
  };

  const handlePayPerDownload = (plan: PaymentPlan) => {
    setShowModal(false);

    setPaymentPlan({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: `/ ${Math.floor(plan.duration_days / 30)} month(s)`,
    });

    setOpenPaymentModal(true);
  };

  return (
    <>
      <div>
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Back
        </Button>
      </div>

      <div className="flex justify-between">
        <div>
          <span className="hidden sm:block text-sm sm:text-base text-Blue font-bold">
            {selectedMeta?.name}
          </span>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Eye size={16} /> {selectedViewCount}
            </span>
            <span className="flex items-center gap-2">
              <Download size={16} /> {downloadCount}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => handleBookmark(templateId)}
            variant="secondary"
          >
            <Bookmark
              size={16}
              className="cursor-pointer"
              fill={isBookmarked ? "#1756a5" : "none"}
              stroke="#1756a5"
              strokeWidth={2}
            />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>

          <Button
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className="bg-Blue hover:bg-blue-900"
          >
            <Download className="mr-1" />
            {isDownloading ? "Generating…" : "Download"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          {/* Scaled A4 visible preview */}
          <div className="mx-auto w-full max-w-[1000px]">
            <MultiPageA4Preview
              containerRef={previewRef}
              shadow={true}
              watermark={true}
              logoSrc={logoSrc ?? undefined}
              watermarkSrc={watermarkSrc ?? undefined}
            >
              {SelectedComponent && <SelectedComponent profile={profile} />}
            </MultiPageA4Preview>
          </div>

          {/* Hidden off-screen renders — used only for PDF capture */}
          {SelectedComponent && (
            <div
              style={{
                position: "absolute",
                left: "-9999px",
                top: 0,
                zIndex: -1,
              }}
            >
              {/* freeRef → with watermark (free / pay-per-download) */}
              <MultiPageA4Download containerRef={freeRef} shadow={false}>
                <SelectedComponent profile={profile} />
              </MultiPageA4Download>

              {/* proRef → no watermark (standard / premium subscribers) */}
              <MultiPageA4Download containerRef={proRef} shadow={false}>
                <SelectedComponent profile={profile} />
              </MultiPageA4Download>
            </div>
          )}
        </CardContent>
      </Card>

      <DownloadModal
        open={showModal}
        onClose={() => setShowModal(false)}
        subscriptionStatus={subscriptionStatus}
        onDownloadFree={handleDownloadFree}
        onDownloadPro={handleDownloadPro}
        onPayPerDownload={handlePayPerDownload}
        subscriptionPlans={subscriptionPlans}
        pdfName={pdfName}
        setPdfName={setPdfName}
      />

      <PaymentModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
        plan={paymentPlan}
        onSuccess={() => generatePdfFromBackend(freeRef, fileName, true)}
      />
    </>
  );
};

export default PreviewTemplate;
