import {
  useEffect,
  useState,
  type ChangeEvent,
  type ComponentType,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  CheckCircle,
  CircleAlert,
  Download,
  ExternalLink,
  FilePenLine,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Sparkles,
  Tag,
  Target,
  User,
  Zap,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* -------------------------------------------------------------------------- */
/* Types and options                                                          */
/* -------------------------------------------------------------------------- */

type IconType = ComponentType<{ className?: string }>;
type Template = "Modern" | "Classic" | "Minimal";
type Tone = "Professional" | "Confident" | "Friendly";

interface Profile {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  address: string;
}

interface CoverLetterFormData {
  letterName: string;
  date: string;
  hiringManager: string;
  recipientTitle: string;
  company: string;
  companyAddress: string;
  position: string;
  opening: string;
  fit: string;
  closing: string;
}

type FieldName = keyof CoverLetterFormData;

// TODO: replace with the candidate's profile from your API.
const PROFILE: Profile = {
  fullName: "Ibrahim S Herith",
  headline: "Software Engineer · Maintenance Electrician",
  email: "herithibrah@gmail.com",
  phone: "0652074072",
  address: "Dar Es Salaam, Tanzania",
};

const PROFILE_ROUTE = "/profile";

const TEMPLATES: Template[] = ["Modern", "Classic", "Minimal"];
const TONES: Tone[] = ["Professional", "Confident", "Friendly"];

/** `swatch` is the picker color. `ink` is used in the letter so text stays readable. */
const ACCENTS = [
  { name: "Blue", swatch: "#1D4FA3", ink: "#1D4FA3" },
  { name: "Orange", swatch: "#F97316", ink: "#C2410C" },
  { name: "Green", swatch: "#15803D", ink: "#15803D" },
  { name: "Black", swatch: "#161B26", ink: "#161B26" },
];

const STEPS: {
  title: string;
  description: string;
  icon: IconType;
  required: FieldName[];
}[] = [
  {
    title: "Your details",
    description:
      "Pulled from your ekazi profile. Name this letter so you can find it when applying.",
    icon: User,
    required: [],
  },
  {
    title: "Recipient",
    description: "Who you are writing to.",
    icon: Building2,
    required: ["hiringManager", "company"],
  },
  {
    title: "Letter content",
    description: "The role and the paragraphs of your letter.",
    icon: FilePenLine,
    required: ["position", "opening", "fit", "closing"],
  },
];

const REQUIRED_MESSAGES: Partial<Record<FieldName, string>> = {
  hiringManager: "Hiring manager is required",
  company: "Company is required",
  position: "Position is required",
  opening: "Opening paragraph is required",
  fit: "This paragraph is required",
  closing: "Closing paragraph is required",
};

const REQUIRED_FIELDS = STEPS.flatMap((step) => step.required);

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function todayAsInputValue(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function formatLetterDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return "";
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildSubject(position: string): string {
  const role = position.trim();
  return role
    ? `Re: Application for the ${role} position`
    : "Re: Application for the position";
}

function draftParagraphs(
  tone: Tone,
  position: string,
  company: string,
): Pick<CoverLetterFormData, "opening" | "fit" | "closing"> {
  const role = position.trim();
  const employer = company.trim() || "your organisation";

  const drafts: Record<
    Tone,
    Pick<CoverLetterFormData, "opening" | "fit" | "closing">
  > = {
    Professional: {
      opening: `I am writing to apply for the ${role} position at ${employer}. I would welcome the opportunity to contribute my skills and experience to your team.`,
      fit: `My experience has prepared me to take on the responsibilities of this role. I work carefully, communicate clearly and take ownership of my results, and I am keen to apply these strengths at ${employer}.`,
      closing: `Thank you for considering my application. I would welcome the chance to discuss how I can contribute to your team, and I am available for an interview at your convenience.`,
    },
    Confident: {
      opening: `I am applying for the ${role} position at ${employer} because I am confident that I can make a strong contribution to your team.`,
      fit: `I bring relevant experience, sound judgement and a commitment to delivering results. I learn quickly, solve problems independently and hold my work to a high standard, and I will bring that same approach to ${employer}.`,
      closing: `I would welcome the opportunity to show you what I can bring to this role. Thank you for your time, and I look forward to speaking with you.`,
    },
    Friendly: {
      opening: `I was excited to see the ${role} opening at ${employer}, and I would love to be considered for the position.`,
      fit: `I enjoy working with others, learning new things and taking pride in what I do. My experience has taught me how to work well within a team, and I would be glad to bring that energy to ${employer}.`,
      closing: `Thank you for reading my application. I would be happy to talk more about the role and how I can help, and I hope to hear from you soon.`,
    },
  };

  return drafts[tone];
}

/** The built-in PDF fonts cannot display some typographic characters. */
function toPdfText(text: string): string {
  return text
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/ /g, " ")
    .trim();
}

function toPdfFileName(fullName: string): string {
  const safeName = fullName
    .replace(/[^\p{L}\p{N}]+/gu, "_")
    .replace(/^_+|_+$/g, "");
  return `${safeName || "My"}_Cover_Letter.pdf`;
}

interface PdfOptions {
  profile: Profile;
  formData: CoverLetterFormData;
  template: Template;
  accent: string;
}

function downloadCoverLetterPdf({
  profile,
  formData,
  template,
  accent,
}: PdfOptions) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const PAGE_WIDTH = 210;
  const PAGE_HEIGHT = 297;
  const MARGIN = 22;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
  const INK = "#1E293B";
  const MUTED = "#64748B";
  const fontFamily = template === "Classic" ? "times" : "helvetica";

  let cursorY = MARGIN;

  const lineHeightFor = (size: number) => size * 0.5;

  const write = (
    text: string,
    {
      size = 11,
      style = "normal",
      color = INK,
      gapAfter = 0,
    }: {
      size?: number;
      style?: "normal" | "bold";
      color?: string;
      gapAfter?: number;
    } = {},
  ) => {
    doc.setFont(fontFamily, style);
    doc.setFontSize(size);
    doc.setTextColor(color);

    const lineHeight = lineHeightFor(size);
    const lines: string[] = doc.splitTextToSize(toPdfText(text), CONTENT_WIDTH);

    lines.forEach((line) => {
      if (cursorY + lineHeight > PAGE_HEIGHT - MARGIN) {
        doc.addPage();
        cursorY = MARGIN;
      }
      doc.text(line, MARGIN, cursorY);
      cursorY += lineHeight;
    });
    cursorY += gapAfter;
  };

  const contact = [profile.email, profile.phone, profile.address]
    .filter(Boolean)
    .join("   |   ");

  if (template === "Modern") {
    doc.setFont(fontFamily, "normal");
    doc.setFontSize(9.5);
    const contactLines: string[] = doc.splitTextToSize(
      toPdfText(contact),
      CONTENT_WIDTH,
    );
    const bandHeight = 40 + contactLines.length * 5;

    doc.setFillColor(accent);
    doc.rect(0, 0, PAGE_WIDTH, bandHeight, "F");
    doc.setTextColor("#FFFFFF");

    doc.setFont(fontFamily, "bold");
    doc.setFontSize(22);
    doc.text(toPdfText(profile.fullName), MARGIN, 19);

    doc.setFont(fontFamily, "normal");
    doc.setFontSize(10.5);
    doc.text(toPdfText(profile.headline), MARGIN, 28);

    doc.setFontSize(9.5);
    doc.text(contactLines, MARGIN, 37);

    cursorY = bandHeight + 14;
  } else if (template === "Classic") {
    const center = PAGE_WIDTH / 2;

    doc.setFont(fontFamily, "bold");
    doc.setFontSize(22);
    doc.setTextColor(accent);
    doc.text(toPdfText(profile.fullName), center, 24, { align: "center" });

    doc.setFont(fontFamily, "normal");
    doc.setFontSize(11);
    doc.setTextColor(INK);
    doc.text(toPdfText(profile.headline), center, 31, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(MUTED);
    const contactLines: string[] = doc.splitTextToSize(
      toPdfText(contact),
      CONTENT_WIDTH,
    );
    doc.text(contactLines, center, 37, { align: "center" });

    const ruleY = 41 + contactLines.length * 4;
    doc.setDrawColor(accent);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, ruleY, PAGE_WIDTH - MARGIN, ruleY);

    cursorY = ruleY + 12;
  } else {
    write(profile.fullName, { size: 20, style: "bold", gapAfter: 1 });
    write(profile.headline, { size: 10.5, color: accent, gapAfter: 1 });
    write(contact, { size: 9.5, color: MUTED, gapAfter: 10 });
  }

  const f = formData;
  const letterDate = formatLetterDate(f.date);

  if (letterDate) write(letterDate, { gapAfter: 6 });

  write(f.hiringManager, { style: "bold" });
  if (f.recipientTitle.trim()) write(f.recipientTitle);
  write(f.company);
  if (f.companyAddress.trim()) write(f.companyAddress);
  cursorY += 6;

  write(buildSubject(f.position), {
    style: "bold",
    color: accent,
    gapAfter: 6,
  });
  write(`Dear ${f.hiringManager.trim()},`, { gapAfter: 5 });

  write(f.opening, { gapAfter: 5 });
  write(f.fit, { gapAfter: 5 });
  write(f.closing, { gapAfter: 7 });

  // Keep the sign-off and the candidate's name together on the same page.
  if (cursorY + 18 > PAGE_HEIGHT - MARGIN) {
    doc.addPage();
    cursorY = MARGIN;
  }
  write("Sincerely,", { gapAfter: 5 });
  write(profile.fullName, { style: "bold" });

  doc.save(toPdfFileName(profile.fullName));
}

/* -------------------------------------------------------------------------- */
/* Form building blocks                                                       */
/* -------------------------------------------------------------------------- */

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-700">
      {children}
      {required && (
        <span className="ml-1 text-orange-600" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-600">
      {message}
    </p>
  );
}

function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="break-words text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Live preview                                                               */
/* -------------------------------------------------------------------------- */

function LetterPreview({
  profile,
  formData,
  template,
  accent,
}: {
  profile: Profile;
  formData: CoverLetterFormData;
  template: Template;
  accent: string;
}) {
  const placeholder = "text-slate-400";
  const letterDate = formatLetterDate(formData.date);
  const contact = [profile.email, profile.phone, profile.address].filter(
    Boolean,
  );

  const paragraphs = [
    {
      text: formData.opening,
      fallback: "Your opening paragraph will appear here.",
    },
    {
      text: formData.fit,
      fallback:
        "Describe your experience and why you are a strong fit for the role.",
    },
    {
      text: formData.closing,
      fallback: "Close with thanks and a call to action.",
    },
  ];

  return (
    <div
      data-testid="letter-preview"
      className={`overflow-hidden rounded-xl bg-white shadow-xl shadow-slate-900/10 ${
        template === "Classic" ? "font-serif" : ""
      }`}
    >
      {template === "Modern" && (
        <div
          className="px-6 py-7 text-white sm:px-9"
          style={{ backgroundColor: accent }}
        >
          <p className="break-words text-2xl font-bold">{profile.fullName}</p>
          <p className="mt-2 text-xs">{profile.headline}</p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
            {contact.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        </div>
      )}

      {template === "Classic" && (
        <div
          className="mx-6 border-b-2 pb-5 pt-8 text-center sm:mx-9"
          style={{ borderColor: accent }}
        >
          <p
            className="break-words text-2xl font-bold"
            style={{ color: accent }}
          >
            {profile.fullName}
          </p>
          <p className="mt-1.5 text-sm text-slate-700">{profile.headline}</p>
          <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
            {contact.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        </div>
      )}

      {template === "Minimal" && (
        <div className="px-6 pt-8 sm:px-9">
          <p className="break-words text-2xl font-bold text-slate-900">
            {profile.fullName}
          </p>
          <p className="mt-1 text-xs font-medium" style={{ color: accent }}>
            {profile.headline}
          </p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            {contact.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        </div>
      )}

      <div className="min-h-[26rem] break-words px-6 py-7 text-[13px] leading-relaxed text-slate-700 sm:px-9">
        {letterDate && <p>{letterDate}</p>}

        <div className={letterDate ? "mt-4" : ""}>
          <p
            className={`font-semibold ${
              formData.hiringManager ? "text-slate-800" : placeholder
            }`}
          >
            {formData.hiringManager || "Hiring Manager"}
          </p>
          {formData.recipientTitle && <p>{formData.recipientTitle}</p>}
          <p className={formData.company ? "" : placeholder}>
            {formData.company || "Company name"}
          </p>
          {formData.companyAddress && <p>{formData.companyAddress}</p>}
        </div>

        <p className="mt-4 font-semibold" style={{ color: accent }}>
          {buildSubject(formData.position)}
        </p>

        <p className="mt-4 text-slate-800">
          Dear {formData.hiringManager.trim() || "Hiring Manager"},
        </p>

        {paragraphs.map(({ text, fallback }) => (
          <p
            key={fallback}
            className={`mt-4 whitespace-pre-line ${text ? "" : placeholder}`}
          >
            {text || fallback}
          </p>
        ))}

        <p className="mt-5 text-slate-800">Sincerely,</p>
        <p className="mt-4 font-semibold text-slate-800">{profile.fullName}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function CreateCoverLetter() {
  const [formData, setFormData] = useState<CoverLetterFormData>({
    letterName: "",
    date: todayAsInputValue(),
    hiringManager: "",
    recipientTitle: "",
    company: "",
    companyAddress: "",
    position: "",
    opening: "",
    fit: "",
    closing: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [activeStep, setActiveStep] = useState(0);
  const [template, setTemplate] = useState<Template>("Modern");
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [tone, setTone] = useState<Tone>("Professional");
  const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadFailed, setDownloadFailed] = useState(false);

  useEffect(() => {
    if (!downloadSuccess) return;
    const timer = window.setTimeout(() => setDownloadSuccess(false), 3000);
    return () => window.clearTimeout(timer);
  }, [downloadSuccess]);

  const isFilled = (name: FieldName) => formData[name].trim().length > 0;

  const filledCount = REQUIRED_FIELDS.filter(isFilled).length;
  const remaining = REQUIRED_FIELDS.length - filledCount;
  const percent = Math.round((filledCount / REQUIRED_FIELDS.length) * 100);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name as FieldName;
    const { value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const focusField = (name: FieldName) => {
    window.requestAnimationFrame(() => {
      document.getElementById(name)?.focus();
    });
  };

  /** Shows every missing field and opens the first step that needs attention. */
  const validateForm = (): boolean => {
    const missing = REQUIRED_FIELDS.filter((name) => !isFilled(name));
    if (missing.length === 0) {
      setErrors({});
      return true;
    }

    setErrors(
      Object.fromEntries(
        missing.map((name) => [name, REQUIRED_MESSAGES[name]]),
      ),
    );
    setActiveStep(
      STEPS.findIndex((step) => step.required.includes(missing[0])),
    );
    focusField(missing[0]);
    return false;
  };

  const handleDownload = () => {
    setDownloadFailed(false);
    setDownloadSuccess(false);
    if (!validateForm()) return;

    try {
      downloadCoverLetterPdf({
        profile: PROFILE,
        formData,
        template,
        accent: accent.ink,
      });
      setDownloadSuccess(true);
    } catch (error) {
      console.error("Could not generate cover letter PDF", error);
      setDownloadFailed(true);
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;
    // TODO: save { ...formData, template, accent: accent.name } with your API.
  };

  const applyDraft = () => {
    setFormData((current) => ({
      ...current,
      ...draftParagraphs(tone, current.position, current.company),
    }));
    setErrors((current) => ({
      ...current,
      opening: undefined,
      fit: undefined,
      closing: undefined,
    }));
  };

  const handleGenerate = () => {
    if (!isFilled("position")) {
      setErrors((current) => ({
        ...current,
        position: "Add the position first so we can draft your letter",
      }));
      focusField("position");
      return;
    }

    if (isFilled("opening") || isFilled("fit") || isFilled("closing")) {
      setIsReplaceDialogOpen(true);
      return;
    }
    applyDraft();
  };

  const renderInput = (
    name: FieldName,
    label: string,
    icon: IconType,
    placeholder?: string,
    options: { required?: boolean; type?: string } = {},
  ) => {
    const Icon = icon;
    const error = errors[name];
    const errorId = `${name}-error`;

    return (
      <div>
        <FieldLabel htmlFor={name} required={options.required}>
          {label}
        </FieldLabel>
        <div className="relative mt-1.5">
          <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id={name}
            name={name}
            type={options.type ?? "text"}
            value={formData[name]}
            onChange={handleInputChange}
            placeholder={placeholder}
            aria-required={options.required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={`h-12 rounded-xl bg-slate-50 pl-11 text-sm shadow-none [&::-webkit-calendar-picker-indicator]:ml-auto ${
              error ? "border-red-400" : "border-slate-200"
            }`}
          />
        </div>
        <FieldError id={errorId} message={error} />
      </div>
    );
  };

  const renderParagraph = (
    name: FieldName,
    label: string,
    placeholder: string,
    rows: number,
  ) => {
    const error = errors[name];
    const errorId = `${name}-error`;

    return (
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor={name} required>
            {label}
          </FieldLabel>
          <span className="font-mono text-xs text-slate-400">
            {formData[name].length} chars
          </span>
        </div>
        <Textarea
          id={name}
          name={name}
          rows={rows}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          aria-required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`mt-1.5 rounded-2xl bg-slate-50 p-3.5 text-sm shadow-none ${
            error ? "border-red-400" : "border-slate-200"
          }`}
        />
        <FieldError id={errorId} message={error} />
      </div>
    );
  };

  const currentStep = STEPS[activeStep];

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            Build your cover letter
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in the form to generate your professional cover letter
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={handleDownload}>
            <Download className="size-4 text-orange-600" aria-hidden="true" />
            Download PDF
          </Button>
          <Button type="button" onClick={handleSave}>
            <Bookmark className="size-4" aria-hidden="true" />
            Save letter
          </Button>
        </div>
      </header>

      {downloadSuccess && (
        <Alert className="mt-5 border-emerald-200 bg-emerald-50 text-emerald-800">
          <CheckCircle className="size-4" aria-hidden="true" />
          <AlertDescription>
            Cover letter downloaded successfully!
          </AlertDescription>
        </Alert>
      )}

      {downloadFailed && (
        <Alert className="mt-5 border-red-200 bg-red-50 text-red-800">
          <CircleAlert className="size-4" aria-hidden="true" />
          <AlertDescription>
            We couldn't create your PDF. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Form */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                {remaining === 0
                  ? "All required fields done"
                  : `${remaining} required ${remaining === 1 ? "field" : "fields"} left`}
              </p>
              <span className="font-mono text-xs text-slate-500">
                {percent}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Required fields completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"
            >
              <div
                className="h-full rounded-full bg-[#1D4FA3] transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>

            <nav
              aria-label="Cover letter steps"
              className="mt-4 grid grid-cols-3 gap-2"
            >
              {STEPS.map((step, index) => {
                const isActive = index === activeStep;
                const isComplete = !isActive && step.required.every(isFilled);
                const Icon = isComplete ? Check : step.icon;

                return (
                  <button
                    key={step.title}
                    type="button"
                    title={step.title}
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => setActiveStep(index)}
                    className={`flex min-w-0 flex-col items-start gap-2 rounded-2xl border p-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] sm:flex-row sm:items-center ${
                      isActive
                        ? "border-[#1D4FA3] bg-blue-50/60"
                        : "border-slate-200/70 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-[#1D4FA3] text-white"
                          : isComplete
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="w-full min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        Step {index + 1}
                      </span>
                      <span className="block truncate text-sm font-semibold text-slate-900">
                        {step.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                {currentStep.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {currentStep.description}
              </p>
            </div>

            {activeStep === 0 && (
              <>
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <RefreshCw className="size-3" aria-hidden="true" />
                      Synced from your profile
                    </span>
                    <Link
                      to={PROFILE_ROUTE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4FA3] hover:underline"
                    >
                      Edit in profile
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="mt-4 space-y-3">
                    <ProfileRow
                      icon={User}
                      label="Full name"
                      value={PROFILE.fullName}
                    />
                    <ProfileRow
                      icon={Briefcase}
                      label="Headline"
                      value={PROFILE.headline}
                    />
                    <ProfileRow
                      icon={Mail}
                      label="Email"
                      value={PROFILE.email}
                    />
                    <ProfileRow
                      icon={Phone}
                      label="Phone"
                      value={PROFILE.phone}
                    />
                    <ProfileRow
                      icon={MapPin}
                      label="Address"
                      value={PROFILE.address}
                    />
                  </div>
                </div>
                {renderInput(
                  "letterName",
                  "Letter name",
                  Tag,
                  "e.g. Software roles",
                )}
                {renderInput("date", "Date", CalendarDays, undefined, {
                  type: "date",
                })}
              </>
            )}

            {activeStep === 1 && (
              <>
                {renderInput(
                  "hiringManager",
                  "Hiring manager",
                  User,
                  "e.g. Jane Mushi",
                  { required: true },
                )}
                {renderInput(
                  "recipientTitle",
                  "Their title",
                  Briefcase,
                  "e.g. HR Manager",
                )}
                {renderInput(
                  "company",
                  "Company",
                  Building2,
                  "e.g. Vodacom Tanzania Plc",
                  { required: true },
                )}
                {renderInput(
                  "companyAddress",
                  "Company address",
                  MapPin,
                  "e.g. Dodoma, Tanzania",
                )}
              </>
            )}

            {activeStep === 2 && (
              <>
                {renderInput(
                  "position",
                  "Position applying for",
                  Target,
                  "e.g. Software Engineer",
                  { required: true },
                )}

                <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-orange-50 p-4">
                  <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                    <Sparkles
                      className="size-5 text-orange-500"
                      aria-hidden="true"
                    />
                    Draft with a tone
                  </h3>
                  <div
                    role="group"
                    aria-label="Letter tone"
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {TONES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={tone === option}
                        onClick={() => setTone(option)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2 ${
                          tone === option
                            ? "border-[#1D4FA3] bg-[#1D4FA3] text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <Button
                    type="button"
                    onClick={handleGenerate}
                    className="mt-3 h-10 rounded-xl bg-[#161B26] px-4 font-semibold text-white hover:bg-slate-800"
                  >
                    <Zap className="size-4" aria-hidden="true" />
                    Generate paragraphs
                  </Button>
                  <p className="mt-3 text-xs text-slate-500">
                    This is a starting point. Add your own experience and
                    achievements before you send it.
                  </p>
                </div>

                {renderParagraph(
                  "opening",
                  "Opening paragraph",
                  "Introduce yourself and the role you are applying for.",
                  4,
                )}
                {renderParagraph(
                  "fit",
                  "Why you are a fit",
                  "Highlight relevant experience, skills and achievements.",
                  6,
                )}
                {renderParagraph(
                  "closing",
                  "Closing paragraph",
                  "Thank them and invite next steps.",
                  4,
                )}
              </>
            )}
          </div>

          <div
            className={`flex items-center gap-3 border-t border-slate-100 bg-slate-50/70 p-5 sm:p-6 ${
              activeStep === 0 ? "justify-end" : "justify-between"
            }`}
          >
            {activeStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveStep(activeStep - 1)}
                className="h-11 rounded-xl border-slate-200 bg-white px-5 font-semibold text-slate-800 shadow-none hover:bg-slate-50"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back
              </Button>
            )}

            {activeStep < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="h-11 rounded-xl bg-[#1D4FA3] px-5 font-semibold text-white hover:bg-[#18428A]"
              >
                Next: {STEPS[activeStep + 1].title}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSave}
                className="h-11 rounded-xl bg-orange-600 px-5 font-semibold text-white hover:bg-orange-700"
              >
                <Bookmark className="size-4" aria-hidden="true" />
                Save to my letters
              </Button>
            )}
          </div>
        </section>

        {/* Preview */}
        <section
          aria-label="Letter preview"
          className="min-w-0 lg:sticky lg:top-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <span
                className="size-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              Live preview
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div
                role="group"
                aria-label="Letter template"
                className="flex rounded-xl border border-slate-200 bg-white p-1"
              >
                {TEMPLATES.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={template === option}
                    onClick={() => setTemplate(option)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] ${
                      template === option
                        ? "bg-[#161B26] text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div
                role="group"
                aria-label="Letter color"
                className="flex items-center gap-1.5"
              >
                {ACCENTS.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    title={option.name}
                    aria-label={option.name}
                    aria-pressed={accent.name === option.name}
                    onClick={() => setAccent(option)}
                    className={`size-7 rounded-full border-2 border-white transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] ${
                      accent.name === option.name ? "ring-2 ring-[#1D4FA3]" : ""
                    }`}
                    style={{ backgroundColor: option.swatch }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-3xl bg-[#E4E7EE] p-3 sm:p-6">
            <LetterPreview
              profile={PROFILE}
              formData={formData}
              template={template}
              accent={accent.ink}
            />
          </div>
        </section>
      </div>

      <AlertDialog
        open={isReplaceDialogOpen}
        onOpenChange={setIsReplaceDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace your paragraphs?</AlertDialogTitle>
            <AlertDialogDescription>
              The new draft will replace what you've written in all three
              paragraphs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my text</AlertDialogCancel>
            <AlertDialogAction onClick={applyDraft}>
              Replace paragraphs
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
