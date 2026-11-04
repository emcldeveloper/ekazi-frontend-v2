import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Download,
  Paperclip,
  Pencil,
  Plus,
  Trash2,
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

const ROUTES = {
  newLetter: "/app/cover-letters/new",
  editLetter: (id: string) => `/app/cover-letters/${id}/edit`,
  profile: "/app/profile",
  applyByEmail: (letterId: string) =>
    `/app/apply-by-email?letterId=${letterId}`,
};

interface CoverLetter {
  id: string;
  title: string;
  jobTitle: string;
  company: string;
  template: string;
  edited: string;
}

// TODO: replace with the candidate's name from your API.
const CANDIDATE_NAME = "Ibrahim S Herith";

// TODO: replace with the candidate's letters from your API.
const SAMPLE_LETTERS: CoverLetter[] = [
  {
    id: "1",
    title: "Software roles",
    jobTitle: "Software Engineer",
    company: "Tech companies",
    template: "Modern",
    edited: "Edited 2 days ago",
  },
  {
    id: "2",
    title: "Vodacom – Electrician",
    jobTitle: "Maintenance Electrician",
    company: "Vodacom Tanzania Plc",
    template: "Classic",
    edited: "Edited Oct 12",
  },
];

const ICON_BUTTON_CLASS =
  "size-11 shrink-0 rounded-xl border-slate-200 bg-white text-slate-700 shadow-none hover:bg-slate-50";

function LetterPreview() {
  return (
    <div
      aria-hidden="true"
      className="h-40 overflow-hidden bg-[#ECEDF2] px-5 pt-5 sm:px-7"
    >
      <div className="h-full overflow-hidden rounded-t-md bg-white shadow-lg shadow-slate-900/10">
        <div className="h-8 truncate bg-[#1D4FA3] px-4 py-2 text-xs font-bold text-white">
          {CANDIDATE_NAME}
        </div>
        <div className="space-y-2 p-4">
          <div className="h-1.5 w-2/5 rounded-full bg-[#ECECF3]" />
          <div className="h-1.5 w-1/3 rounded-full bg-[#ECECF3]" />
          <div className="mt-4! h-1.5 w-full rounded-full bg-[#ECECF3]" />
          <div className="h-1.5 w-[92%] rounded-full bg-[#ECECF3]" />
          <div className="h-1.5 w-[98%] rounded-full bg-[#ECECF3]" />
        </div>
      </div>
    </div>
  );
}

export default function CoverLettersPage() {
  const navigate = useNavigate();
  const [letterToDelete, setLetterToDelete] = useState<CoverLetter | null>(
    null,
  );

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            My cover letters
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Write once, then attach a letter when you apply. Cover letters are
            optional — your ekazi profile is always shared with employers.
          </p>
        </div>
        <Button type="button" onClick={() => navigate(ROUTES.newLetter)}>
          <Plus className="size-4" aria-hidden="true" />
          New cover letter
        </Button>
      </header>

      <section className="mt-6 flex flex-col gap-4 rounded-2xl bg-accent-foreground p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <BriefcaseBusiness
              className="size-5 text-orange-500"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold">
              Applying on ekazi uses your profile
            </h2>
            <p className="mt-0.5 text-sm text-slate-300">
              No CV upload needed. Download a letter as PDF when applying
              outside ekazi.
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate(ROUTES.profile)}
          className="shrink-0 self-start font-semibold text-white hover:bg-white/10 hover:text-white sm:self-auto"
        >
          View profile
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </section>

      <section
        aria-label="Your cover letters"
        className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <button
          type="button"
          onClick={() => navigate(ROUTES.newLetter)}
          className="group flex min-h-72 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-slate-300 p-6 transition-colors hover:border-[#1D4FA3] hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2"
        >
          <span className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors group-hover:text-[#1D4FA3]">
            <Plus className="size-6" aria-hidden="true" />
          </span>
          <span className="font-semibold text-slate-600">
            Start a new letter
          </span>
        </button>

        {SAMPLE_LETTERS.map((letter) => (
          <article
            key={letter.id}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white"
          >
            <LetterPreview />

            <div className="flex flex-1 flex-col p-5 sm:px-7">
              <h2 className="truncate text-lg font-bold text-slate-950">
                {letter.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {letter.jobTitle} · {letter.company}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {letter.template} <span className="mx-1">·</span>{" "}
                {letter.edited}
              </p>

              <div className="mt-auto flex items-center gap-2 pt-6">
                <Button
                  type="button"
                  onClick={() => navigate(ROUTES.applyByEmail(letter.id))}
                  className="h-11 min-w-0 flex-1 rounded-xl bg-[#FEEFE6] px-3 font-semibold text-[#C2410C] shadow-none hover:bg-[#FDE3D3]"
                >
                  <Paperclip className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">Use to apply</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(ROUTES.editLetter(letter.id))}
                  aria-label={`Edit ${letter.title}`}
                  title="Edit"
                  className={ICON_BUTTON_CLASS}
                >
                  <Pencil className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    // TODO: download the letter as a PDF.
                  }}
                  aria-label={`Download ${letter.title} as PDF`}
                  title="Download PDF"
                  className={ICON_BUTTON_CLASS}
                >
                  <Download className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setLetterToDelete(letter)}
                  aria-label={`Delete ${letter.title}`}
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

      <AlertDialog
        open={letterToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setLetterToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this cover letter?</AlertDialogTitle>
            <AlertDialogDescription>
              “{letterToDelete?.title}” will be permanently deleted. This can’t
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // TODO: delete letterToDelete.
                setLetterToDelete(null);
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
