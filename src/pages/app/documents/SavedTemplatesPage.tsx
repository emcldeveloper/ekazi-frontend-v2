import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Eye,
  FileText,
  Paperclip,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// TODO: check these match your routes.
const ROUTES = {
  cvBuilder: "/app/cv-builder",
  applyByEmail: (cvId: string) => `/app/external-jobs?cvId=${cvId}`,
};

interface SavedCv {
  id: string;
  title: string;
  fileName: string;
  template: string;
  /** Main color of the template, used for the preview */
  accent: string;
  sizeBytes: number;
  saved: string;
  /** Link to the PDF. Leave empty until your API is connected. */
  fileUrl?: string;
}

// TODO: replace with the candidate's saved CVs from your API.
// Set this to [] to see the empty state.
const SAMPLE_CVS: SavedCv[] = [];

const ICON_BUTTON_CLASS =
  "size-11 shrink-0 rounded-xl border-slate-200 bg-white text-slate-700 shadow-none hover:bg-slate-50";

function formatSize(sizeBytes: number): string {
  return sizeBytes < 1024 * 1024
    ? `${Math.max(1, Math.round(sizeBytes / 1024))} KB`
    : `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function CvPreview({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden="true"
      className="h-44 overflow-hidden bg-[#ECEDF2] px-5 pt-5 sm:px-7"
    >
      <div className="flex h-full overflow-hidden rounded-t-md bg-white shadow-lg shadow-slate-900/10">
        {/* Sidebar */}
        <div
          className="flex w-[34%] flex-col items-center gap-2 px-2.5 pt-4"
          style={{ backgroundColor: accent }}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-white/20 text-white">
            <UserRound className="size-5" />
          </span>
          <div className="mt-1 h-1.5 w-4/5 rounded-full bg-white/40" />
          <div className="h-1.5 w-3/5 rounded-full bg-white/30" />
          <div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/30" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/30" />
        </div>
        {/* Main column */}
        <div className="flex-1 space-y-2 p-3.5">
          <div
            className="h-2.5 w-3/5 rounded-full"
            style={{ backgroundColor: accent, opacity: 0.85 }}
          />
          <div className="h-1.5 w-2/5 rounded-full bg-[#ECECF3]" />
          <div className="!mt-4 h-1.5 w-1/3 rounded-full bg-slate-300" />
          <div className="h-1.5 w-full rounded-full bg-[#ECECF3]" />
          <div className="h-1.5 w-[90%] rounded-full bg-[#ECECF3]" />
          <div className="!mt-4 h-1.5 w-1/3 rounded-full bg-slate-300" />
          <div className="h-1.5 w-[95%] rounded-full bg-[#ECECF3]" />
          <div className="h-1.5 w-4/5 rounded-full bg-[#ECECF3]" />
        </div>
      </div>
    </div>
  );
}

const SavedTemplatesPage = () => {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState(SAMPLE_CVS);
  const [cvToDelete, setCvToDelete] = useState<SavedCv | null>(null);

  const handleView = (cv: SavedCv) => {
    // TODO: make sure fileUrl is set from your API.
    if (cv.fileUrl) window.open(cv.fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = (cv: SavedCv) => {
    // TODO: make sure fileUrl is set from your API. If the file is on
    // another domain, download it through your API so the name is kept.
    if (!cv.fileUrl) return;
    const link = document.createElement("a");
    link.href = cv.fileUrl;
    link.download = cv.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleConfirmDelete = () => {
    if (cvToDelete) {
      // TODO: delete the CV with your API.
      setCvs((current) => current.filter((cv) => cv.id !== cvToDelete.id));
    }
    setCvToDelete(null);
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            My CVs
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            CVs you've built and saved as PDF, ready to download or attach when
            you apply.
          </p>
        </div>

        {cvs.length === 0 ? (
          <></>
        ) : (
          <Button type="button" onClick={() => navigate(ROUTES.cvBuilder)}>
            <Plus className="size-4" aria-hidden="true" />
            Build a new CV
          </Button>
        )}
      </header>

      {cvs.length === 0 ? (
        <Card className="mt-6 h-full">
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
                <FileText className="size-8" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-xl font-bold text-Blue">
                No saved CVs yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Build a CV from your ekazi profile, choose a template, and save
                it as a PDF. It will appear here.
              </p>
              <Button
                type="button"
                onClick={() => navigate(ROUTES.cvBuilder)}
                className="mt-6"
              >
                <Plus className="size-4" aria-hidden="true" />
                Build your first CV
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <section
          aria-label="Your saved CVs"
          className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          <button
            type="button"
            onClick={() => navigate(ROUTES.cvBuilder)}
            className="group flex min-h-72 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-slate-300 p-6 transition-colors hover:border-[#1D4FA3] hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors group-hover:text-[#1D4FA3]">
              <Plus className="size-6" aria-hidden="true" />
            </span>
            <span className="font-semibold text-slate-600">Build a new CV</span>
          </button>

          {cvs.map((cv) => (
            <article
              key={cv.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white"
            >
              <CvPreview accent={cv.accent} />

              <div className="flex flex-1 flex-col p-5 sm:px-7">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="min-w-0 truncate text-lg font-bold text-slate-950">
                    {cv.title}
                  </h2>
                  <span className="shrink-0 rounded-md bg-[#FEEFE6] px-2 py-1 font-mono text-[11px] font-semibold text-[#C2410C]">
                    PDF
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-600">
                  {cv.fileName}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {cv.template} <span className="mx-1">·</span>{" "}
                  {formatSize(cv.sizeBytes)} <span className="mx-1">·</span>{" "}
                  {cv.saved}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-6">
                  <Button
                    type="button"
                    onClick={() => navigate(ROUTES.applyByEmail(cv.id))}
                    className="h-11 min-w-0 flex-1 rounded-xl bg-[#FEEFE6] px-3 font-semibold text-[#C2410C] shadow-none hover:bg-[#FDE3D3]"
                  >
                    <Paperclip className="size-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">Use to apply</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleView(cv)}
                    aria-label={`View ${cv.title}`}
                    title="View PDF"
                    className={ICON_BUTTON_CLASS}
                  >
                    <Eye className="size-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleDownload(cv)}
                    aria-label={`Download ${cv.title}`}
                    title="Download PDF"
                    className={ICON_BUTTON_CLASS}
                  >
                    <Download className="size-4" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setCvToDelete(cv)}
                    aria-label={`Delete ${cv.title}`}
                    title="Delete"
                    className={`${ICON_BUTTON_CLASS} hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <AlertDialog
        open={cvToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setCvToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this CV?</AlertDialogTitle>
            <AlertDialogDescription>
              “{cvToDelete?.title}” will be permanently deleted. Applications
              you've already sent won't change.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SavedTemplatesPage;
