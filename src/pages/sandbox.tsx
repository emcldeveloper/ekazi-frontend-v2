// import {
//   useRef,
//   useState,
//   type ChangeEvent,
//   type ComponentType,
//   type ReactNode,
// } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   ArrowRight,
//   AtSign,
//   Briefcase,
//   Building2,
//   CalendarDays,
//   Check,
//   CheckCircle,
//   ExternalLink,
//   FileText,
//   Files,
//   Link2,
//   Mail,
//   MailCheck,
//   Paperclip,
//   Plus,
//   Send,
//   ShieldCheck,
//   Upload,
//   X,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// /* -------------------------------------------------------------------------- */
// /* Routes and sample data                                                     */
// /* -------------------------------------------------------------------------- */

// const ROUTES = {
//   newCv: "/app/templates",
//   newLetter: "/app/cover-letters/new",
//   applications: "/app/external-applications",
// };

// const MAX_ATTACHMENT_MB = 7;
// const BYTES_IN_MB = 1024 * 1024;

// interface SavedDocument {
//   id: string;
//   title: string;
//   fileName: string;
//   meta: string;
//   sizeMb: number;
// }

// // TODO: replace with the candidate's profile from your API.
// const CANDIDATE = {
//   fullName: "Ibrahim S Herith",
//   email: "herithibrah@gmail.com",
//   phone: "0652074072",
// };

// // TODO: replace with your verified sending address.
// const SENDER_ADDRESS = "applications@apply.ekazi.co.tz";

// // TODO: replace these lists with the candidate's saved files from your API.
// const SAMPLE_CVS: SavedDocument[] = [
//   {
//     id: "cv-1",
//     title: "Software Engineer CV",
//     fileName: "Ibrahim_S_Herith_CV.pdf",
//     meta: "Modern · Edited 3 days ago",
//     sizeMb: 0.4,
//   },
//   {
//     id: "cv-2",
//     title: "Maintenance Electrician CV",
//     fileName: "Ibrahim_S_Herith_Electrician_CV.pdf",
//     meta: "Classic · Edited Oct 12",
//     sizeMb: 0.3,
//   },
// ];

// const SAMPLE_LETTERS: SavedDocument[] = [
//   {
//     id: "1",
//     title: "Software roles",
//     fileName: "Ibrahim_S_Herith_Cover_Letter.pdf",
//     meta: "Modern · Edited 2 days ago",
//     sizeMb: 0.1,
//   },
//   {
//     id: "2",
//     title: "Vodacom – Electrician",
//     fileName: "Ibrahim_S_Herith_Vodacom_Cover_Letter.pdf",
//     meta: "Classic · Edited Oct 12",
//     sizeMb: 0.1,
//   },
// ];

// const SAMPLE_OTHER_FILES: SavedDocument[] = [
//   {
//     id: "file-1",
//     title: "Degree certificate",
//     fileName: "Degree_Certificate.pdf",
//     meta: "Uploaded Sep 2",
//     sizeMb: 1.2,
//   },
//   {
//     id: "file-2",
//     title: "Academic transcript",
//     fileName: "Academic_Transcript.pdf",
//     meta: "Uploaded Sep 2",
//     sizeMb: 0.8,
//   },
// ];

// /* -------------------------------------------------------------------------- */
// /* Types and helpers                                                          */
// /* -------------------------------------------------------------------------- */

// type IconType = ComponentType<{ className?: string }>;
// type TextField =
//   | "jobTitle"
//   | "company"
//   | "employerEmail"
//   | "jobLink"
//   | "deadline";
// type FieldName =
//   | "jobTitle"
//   | "company"
//   | "employerEmail"
//   | "cv"
//   | "attachments"
//   | "subject"
//   | "body"
//   | "consent";

// interface UploadedFile {
//   id: string;
//   fileName: string;
//   sizeMb: number;
//   file: File;
// }

// const EMPTY_JOB: Record<TextField, string> = {
//   jobTitle: "",
//   company: "",
//   employerEmail: "",
//   jobLink: "",
//   deadline: "",
// };

// const STEPS: {
//   title: string;
//   description: string;
//   icon: IconType;
//   fields: FieldName[];
// }[] = [
//   {
//     title: "Job details",
//     description: "Copy these from the job advert you found outside ekazi.",
//     icon: Briefcase,
//     fields: ["jobTitle", "company", "employerEmail"],
//   },
//   {
//     title: "Documents",
//     description: "Choose what the employer will receive with your email.",
//     icon: Files,
//     fields: ["cv", "attachments"],
//   },
//   {
//     title: "Review & send",
//     description: "Check your email. You can change anything before sending.",
//     icon: Send,
//     fields: ["subject", "body", "consent"],
//   },
// ];

// const EMAIL_PATTERN = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;

// const DOMAIN_TYPOS: Record<string, string> = {
//   "gmial.com": "gmail.com",
//   "gmai.com": "gmail.com",
//   "gmal.com": "gmail.com",
//   "gmail.co": "gmail.com",
//   "gmail.con": "gmail.com",
//   "yaho.com": "yahoo.com",
//   "yahoo.con": "yahoo.com",
//   "hotmial.com": "hotmail.com",
//   "hotmail.con": "hotmail.com",
//   "outlok.com": "outlook.com",
//   "outlook.con": "outlook.com",
// };

// function suggestEmail(email: string): string | null {
//   const [name, domain] = email.trim().toLowerCase().split("@");
//   if (!name || !domain || !DOMAIN_TYPOS[domain]) return null;
//   return `${name}@${DOMAIN_TYPOS[domain]}`;
// }

// function todayAsInputValue(): string {
//   const now = new Date();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");
//   return `${now.getFullYear()}-${month}-${day}`;
// }

// function formatSize(sizeMb: number): string {
//   return `${sizeMb.toFixed(1)} MB`;
// }

// function buildSubject(jobTitle: string): string {
//   const role = jobTitle.trim() || "the position";
//   return `Application for ${role} – ${CANDIDATE.fullName}`;
// }

// function buildBody(
//   jobTitle: string,
//   company: string,
//   hasCoverLetter: boolean,
// ): string {
//   const role = jobTitle.trim()
//     ? `the ${jobTitle.trim()} position`
//     : "this position";
//   const employer = company.trim() || "your organisation";
//   const documents = hasCoverLetter ? "my CV and cover letter" : "my CV";

//   return `Dear Hiring Manager,

// I would like to apply for ${role} at ${employer}. Please find ${documents} attached for your review.

// I would welcome the opportunity to discuss my application. You can reply to this email or call me on ${CANDIDATE.phone}.

// Kind regards,
// ${CANDIDATE.fullName}`;
// }

// function findDocument(documents: SavedDocument[], id: string | null) {
//   return documents.find((document) => document.id === id) ?? null;
// }

// /* -------------------------------------------------------------------------- */
// /* Building blocks                                                            */
// /* -------------------------------------------------------------------------- */

// function FieldLabel({
//   htmlFor,
//   required,
//   children,
// }: {
//   htmlFor?: string;
//   required?: boolean;
//   children: ReactNode;
// }) {
//   return (
//     <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-700">
//       {children}
//       {required && (
//         <span className="ml-1 text-orange-600" aria-hidden="true">
//           *
//         </span>
//       )}
//     </label>
//   );
// }

// function FieldError({ id, message }: { id?: string; message?: string }) {
//   if (!message) return null;
//   return (
//     <p id={id} className="mt-1.5 text-sm font-medium text-red-600">
//       {message}
//     </p>
//   );
// }

// function DocumentOption({
//   type,
//   name,
//   document,
//   checked,
//   onChange,
// }: {
//   type: "radio" | "checkbox";
//   name: string;
//   document: SavedDocument;
//   checked: boolean;
//   onChange: () => void;
// }) {
//   return (
//     <label
//       className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors has:focus-visible:ring-2 has-focus-visible:ring-[#1D4FA3] ${
//         checked
//           ? "border-[#1D4FA3] bg-blue-50/60"
//           : "border-slate-200/70 bg-white hover:bg-slate-50"
//       }`}
//     >
//       <span
//         className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
//           checked ? "bg-[#1D4FA3] text-white" : "bg-slate-100 text-slate-500"
//         }`}
//       >
//         <FileText className="size-4" aria-hidden="true" />
//       </span>
//       <span className="min-w-0 flex-1">
//         <span className="block truncate text-sm font-semibold text-slate-900">
//           {document.title}
//         </span>
//         <span className="block truncate text-xs text-slate-500">
//           {document.meta} · {formatSize(document.sizeMb)}
//         </span>
//       </span>
//       <input
//         type={type}
//         name={name}
//         checked={checked}
//         onChange={onChange}
//         className="size-4 shrink-0 accent-[#1D4FA3]"
//       />
//     </label>
//   );
// }

// function EmailRow({ label, children }: { label: string; children: ReactNode }) {
//   return (
//     <div className="flex gap-3 border-b border-slate-100 px-5 py-2.5 text-sm sm:px-7">
//       <span className="w-16 shrink-0 text-slate-500">{label}</span>
//       <span className="min-w-0 break-word text-slate-800">{children}</span>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Page                                                                       */
// /* -------------------------------------------------------------------------- */

// export default function ApplyByEmailPage() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // "Use to apply" on a saved letter or CV opens this page with it selected.
//   const [selectedCvId, setSelectedCvId] = useState<string | null>(
//     findDocument(SAMPLE_CVS, searchParams.get("cvId"))?.id ?? null,
//   );
//   const [selectedLetterId, setSelectedLetterId] = useState<string | null>(
//     findDocument(SAMPLE_LETTERS, searchParams.get("letterId"))?.id ?? null,
//   );

//   const [job, setJob] = useState(EMPTY_JOB);
//   const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [subjectOverride, setSubjectOverride] = useState<string | null>(null);
//   const [bodyOverride, setBodyOverride] = useState<string | null>(null);
//   const [hasConsent, setHasConsent] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
//   const [isSent, setIsSent] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const selectedCv = findDocument(SAMPLE_CVS, selectedCvId);
//   const selectedLetter = findDocument(SAMPLE_LETTERS, selectedLetterId);
//   const selectedOtherFiles = SAMPLE_OTHER_FILES.filter((file) =>
//     selectedFileIds.includes(file.id),
//   );

//   const attachments = [
//     ...(selectedCv ? [selectedCv] : []),
//     ...(selectedLetter ? [selectedLetter] : []),
//     ...selectedOtherFiles,
//     ...uploadedFiles,
//   ];
//   const attachmentMb = attachments.reduce(
//     (total, attachment) => total + attachment.sizeMb,
//     0,
//   );
//   const isOverLimit = attachmentMb > MAX_ATTACHMENT_MB;

//   const subject = subjectOverride ?? buildSubject(job.jobTitle);
//   const body =
//     bodyOverride ??
//     buildBody(job.jobTitle, job.company, selectedLetter !== null);

//   const employerEmail = job.employerEmail.trim();
//   const emailSuggestion = suggestEmail(employerEmail);
//   const hasPassedDeadline =
//     job.deadline !== "" && job.deadline < todayAsInputValue();

//   const getError = (name: FieldName): string | undefined => {
//     switch (name) {
//       case "jobTitle":
//         return job.jobTitle.trim() ? undefined : "Job title is required";
//       case "company":
//         return job.company.trim() ? undefined : "Company is required";
//       case "employerEmail":
//         if (!employerEmail) return "Employer email is required";
//         return EMAIL_PATTERN.test(employerEmail)
//           ? undefined
//           : "Enter one valid email address";
//       case "cv":
//         return selectedCv ? undefined : "Choose a CV to attach";
//       case "attachments":
//         return isOverLimit
//           ? `Attachments must be ${MAX_ATTACHMENT_MB} MB or less in total`
//           : undefined;
//       case "subject":
//         return subject.trim() ? undefined : "Subject is required";
//       case "body":
//         return body.trim() ? undefined : "Your message is required";
//       case "consent":
//         return hasConsent
//           ? undefined
//           : "Please confirm before sending your application";
//     }
//   };

//   const countedFields: FieldName[] = STEPS.flatMap(
//     (step) => step.fields,
//   ).filter((name) => name !== "attachments");
//   const remaining = countedFields.filter((name) => getError(name)).length;
//   const percent = Math.round(
//     ((countedFields.length - remaining) / countedFields.length) * 100,
//   );

//   const clearError = (name: FieldName) => {
//     setErrors((current) => ({ ...current, [name]: undefined }));
//   };

//   const handleJobChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const name = event.target.name as TextField;
//     const { value } = event.target;
//     setJob((current) => ({ ...current, [name]: value }));
//     if (name === "jobTitle" || name === "company" || name === "employerEmail") {
//       clearError(name);
//     }
//   };

//   const toggleOtherFile = (id: string) => {
//     setSelectedFileIds((current) =>
//       current.includes(id)
//         ? current.filter((fileId) => fileId !== id)
//         : [...current, id],
//     );
//     clearError("attachments");
//   };

//   const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const added = Array.from(event.target.files ?? []).map((file) => ({
//       id: `${file.name}-${file.lastModified}-${file.size}`,
//       fileName: file.name,
//       sizeMb: file.size / BYTES_IN_MB,
//       file,
//     }));
//     setUploadedFiles((current) => [
//       ...current,
//       ...added.filter(
//         (file) => !current.some((existing) => existing.id === file.id),
//       ),
//     ]);
//     clearError("attachments");
//     // Allows the same file to be selected again after it is removed.
//     event.target.value = "";
//   };

//   const validate = (): boolean => {
//     const allFields = STEPS.flatMap((step) => step.fields);
//     const found = allFields.flatMap((name) => {
//       const message = getError(name);
//       return message ? [[name, message] as const] : [];
//     });

//     setErrors(Object.fromEntries(found));
//     if (found.length === 0) return true;

//     const firstField = found[0][0];
//     setActiveStep(STEPS.findIndex((step) => step.fields.includes(firstField)));
//     window.requestAnimationFrame(() => {
//       document.getElementById(firstField)?.focus();
//     });
//     return false;
//   };

//   const handleSend = () => {
//     if (!validate()) return;
//     // TODO: send the application with your API, then show the sent screen
//     // only after the request succeeds.
//     setIsSent(true);
//   };

//   const startAnotherApplication = () => {
//     setJob(EMPTY_JOB);
//     setSelectedCvId(null);
//     setSelectedLetterId(null);
//     setSelectedFileIds([]);
//     setUploadedFiles([]);
//     setSubjectOverride(null);
//     setBodyOverride(null);
//     setHasConsent(false);
//     setActiveStep(0);
//     setErrors({});
//     setIsSent(false);
//   };

//   const renderInput = (
//     name: TextField,
//     label: string,
//     icon: IconType,
//     placeholder: string,
//     options: { required?: boolean; type?: string; hint?: string } = {},
//   ) => {
//     const Icon = icon;
//     const error = errors[name as FieldName];
//     const errorId = `${name}-error`;

//     return (
//       <div>
//         <FieldLabel htmlFor={name} required={options.required}>
//           {label}
//         </FieldLabel>
//         <div className="relative mt-1.5">
//           <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
//           <Input
//             id={name}
//             name={name}
//             type={options.type ?? "text"}
//             value={job[name]}
//             onChange={handleJobChange}
//             placeholder={placeholder}
//             aria-required={options.required}
//             aria-invalid={Boolean(error)}
//             aria-describedby={error ? errorId : undefined}
//             className={`h-12 rounded-xl bg-slate-50 pl-11 text-sm shadow-none [&::-webkit-calendar-picker-indicator]:ml-auto ${
//               error ? "border-red-400" : "border-slate-200"
//             }`}
//           />
//         </div>
//         <FieldError id={errorId} message={error} />
//         {options.hint && !error && (
//           <p className="mt-1.5 text-xs text-slate-500">{options.hint}</p>
//         )}
//       </div>
//     );
//   };

//   if (isSent) {
//     return (
//       <div className="flex min-h-full items-center justify-center bg-[#F3F4F8] p-4 sm:p-6 lg:p-8">
//         <section className="w-full max-w-xl rounded-3xl border border-slate-200/70 bg-white p-6 text-center sm:p-10">
//           <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
//             <MailCheck className="size-7" aria-hidden="true" />
//           </span>
//           <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-950">
//             Your application is on its way
//           </h1>
//           <p className="mt-2 text-slate-600">
//             We've sent your application for{" "}
//             <span className="font-semibold text-slate-900">{job.jobTitle}</span>{" "}
//             at{" "}
//             <span className="font-semibold text-slate-900">{job.company}</span>{" "}
//             to {employerEmail}. A copy will go to {CANDIDATE.email}, and the
//             employer's replies will come straight to you.
//           </p>
//           <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
//             <Button className="h-11 rounded-xl bg-[#1D4FA3] px-5 font-semibold text-white hover:bg-[#18428A]">
//               <Link to={ROUTES.applications}>View my applications</Link>
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={startAnotherApplication}
//               className="h-11 rounded-xl border-slate-200 bg-white px-5 font-semibold text-slate-800 shadow-none hover:bg-slate-50"
//             >
//               Apply to another job
//             </Button>
//           </div>
//         </section>
//       </div>
//     );
//   }

//   const currentStep = STEPS[activeStep];

//   return (
//     <div className="space-y-4">
//       <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//         <div className="max-w-2xl">
//           <Button size="sm" variant="secondary" onClick={() => navigate(-1)}>
//             <ArrowLeft /> Back
//           </Button>
//           <h1 className="text-2xl font-bold tracking-tight text-Blue mt-2">
//             Email Application
//           </h1>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Found a job outside ekazi? Send your saved CV and cover letter
//             straight to the employer.
//           </p>
//         </div>
//       </header>

//       <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
//         {/* Form */}
//         <section className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white">
//           <div className="border-b border-slate-100 p-5 sm:p-6">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-semibold text-slate-900">
//                 {remaining === 0
//                   ? "Ready to send"
//                   : `${remaining} required ${remaining === 1 ? "item" : "items"} left`}
//               </p>
//               <span className="font-mono text-xs text-slate-500">
//                 {percent}%
//               </span>
//             </div>
//             <div
//               role="progressbar"
//               aria-label="Required items completed"
//               aria-valuemin={0}
//               aria-valuemax={100}
//               aria-valuenow={percent}
//               className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"
//             >
//               <div
//                 className="h-full rounded-full bg-[#1D4FA3] transition-all"
//                 style={{ width: `${percent}%` }}
//               />
//             </div>

//             <nav
//               aria-label="Application steps"
//               className="mt-4 grid grid-cols-3 gap-2"
//             >
//               {STEPS.map((step, index) => {
//                 const isActive = index === activeStep;
//                 const isComplete =
//                   !isActive && step.fields.every((name) => !getError(name));
//                 const Icon = isComplete ? Check : step.icon;

//                 return (
//                   <button
//                     key={step.title}
//                     type="button"
//                     title={step.title}
//                     aria-current={isActive ? "step" : undefined}
//                     onClick={() => setActiveStep(index)}
//                     className={`flex min-w-0 flex-col items-start gap-2 rounded-2xl border p-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] sm:flex-row sm:items-center ${
//                       isActive
//                         ? "border-[#1D4FA3] bg-blue-50/60"
//                         : "border-slate-200/70 bg-white hover:bg-slate-50"
//                     }`}
//                   >
//                     <span
//                       className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
//                         isActive
//                           ? "bg-[#1D4FA3] text-white"
//                           : isComplete
//                             ? "bg-emerald-50 text-emerald-600"
//                             : "bg-slate-100 text-slate-500"
//                       }`}
//                     >
//                       <Icon className="size-4" />
//                     </span>
//                     <span className="w-full min-w-0">
//                       <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-500">
//                         Step {index + 1}
//                       </span>
//                     </span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>

//           <div className="space-y-5 p-5 sm:p-6">
//             <div>
//               <h2 className="text-xl font-bold text-slate-950">
//                 {currentStep.title}
//               </h2>
//               <p className="mt-1 text-sm text-slate-600">
//                 {currentStep.description}
//               </p>
//             </div>

//             {activeStep === 0 && (
//               <>
//                 {renderInput(
//                   "jobTitle",
//                   "Job title",
//                   Briefcase,
//                   "e.g. Software Engineer",
//                   { required: true },
//                 )}
//                 {renderInput(
//                   "company",
//                   "Company",
//                   Building2,
//                   "e.g. Vodacom Tanzania Plc",
//                   { required: true },
//                 )}
//                 <div>
//                   {renderInput(
//                     "employerEmail",
//                     "Employer email",
//                     AtSign,
//                     "e.g. careers@company.co.tz",
//                     {
//                       required: true,
//                       type: "email",
//                       hint: "Use the application email from the advert.",
//                     },
//                   )}
//                   {emailSuggestion && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setJob((current) => ({
//                           ...current,
//                           employerEmail: emailSuggestion,
//                         }));
//                         clearError("employerEmail");
//                       }}
//                       className="mt-2 rounded-lg bg-orange-50 px-3 py-2 text-left text-sm font-medium text-orange-800 hover:bg-orange-100"
//                     >
//                       Did you mean{" "}
//                       <span className="font-bold">{emailSuggestion}</span>?
//                     </button>
//                   )}
//                 </div>
//                 {renderInput(
//                   "jobLink",
//                   "Job link",
//                   Link2,
//                   "Paste the advert link (optional)",
//                   { type: "url" },
//                 )}
//                 <div>
//                   {renderInput(
//                     "deadline",
//                     "Application deadline",
//                     CalendarDays,
//                     "",
//                     { type: "date" },
//                   )}
//                   {hasPassedDeadline && (
//                     <p className="mt-1.5 text-sm font-medium text-orange-700">
//                       This deadline has passed. Check that the job is still open
//                       before you apply.
//                     </p>
//                   )}
//                 </div>
//               </>
//             )}

//             {activeStep === 1 && (
//               <>
//                 <fieldset>
//                   <legend className="flex w-full items-center justify-between gap-2">
//                     <FieldLabel required>CV</FieldLabel>
//                     <Link
//                       to={ROUTES.newCv}
//                       className="inline-flex items-center gap-1 text-sm font-semibold text-[#1D4FA3] hover:underline"
//                     >
//                       Create a CV
//                       <ExternalLink className="size-3.5" aria-hidden="true" />
//                     </Link>
//                   </legend>
//                   <div
//                     id="cv"
//                     tabIndex={-1}
//                     className="mt-2 space-y-2 outline-none"
//                   >
//                     {SAMPLE_CVS.map((cv) => (
//                       <DocumentOption
//                         key={cv.id}
//                         type="radio"
//                         name="cv-option"
//                         document={cv}
//                         checked={selectedCvId === cv.id}
//                         onChange={() => {
//                           setSelectedCvId(cv.id);
//                           clearError("cv");
//                         }}
//                       />
//                     ))}
//                   </div>
//                   <FieldError message={errors.cv} />
//                 </fieldset>

//                 <fieldset>
//                   <legend className="flex w-full items-center justify-between gap-2">
//                     <FieldLabel>Cover letter</FieldLabel>
//                     <Link
//                       to={ROUTES.newLetter}
//                       className="inline-flex items-center gap-1 text-sm font-semibold text-[#1D4FA3] hover:underline"
//                     >
//                       Write a letter
//                       <ExternalLink className="size-3.5" aria-hidden="true" />
//                     </Link>
//                   </legend>
//                   <div className="mt-2 space-y-2">
//                     {SAMPLE_LETTERS.map((letter) => (
//                       <DocumentOption
//                         key={letter.id}
//                         type="radio"
//                         name="letter-option"
//                         document={letter}
//                         checked={selectedLetterId === letter.id}
//                         onChange={() => setSelectedLetterId(letter.id)}
//                       />
//                     ))}
//                     <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200/70 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1D4FA3]">
//                       Don't attach a cover letter
//                       <input
//                         type="radio"
//                         name="letter-option"
//                         checked={selectedLetterId === null}
//                         onChange={() => setSelectedLetterId(null)}
//                         className="size-4 shrink-0 accent-[#1D4FA3]"
//                       />
//                     </label>
//                   </div>
//                 </fieldset>

//                 <fieldset>
//                   <legend>
//                     <FieldLabel>Other files</FieldLabel>
//                   </legend>
//                   <div className="mt-2 space-y-2">
//                     {SAMPLE_OTHER_FILES.map((file) => (
//                       <DocumentOption
//                         key={file.id}
//                         type="checkbox"
//                         name="other-files"
//                         document={file}
//                         checked={selectedFileIds.includes(file.id)}
//                         onChange={() => toggleOtherFile(file.id)}
//                       />
//                     ))}

//                     {uploadedFiles.map((file) => (
//                       <div
//                         key={file.id}
//                         className="flex items-center gap-3 rounded-2xl border border-[#1D4FA3] bg-blue-50/60 p-3"
//                       >
//                         <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1D4FA3] text-white">
//                           <Upload className="size-4" aria-hidden="true" />
//                         </span>
//                         <span className="min-w-0 flex-1">
//                           <span className="block truncate text-sm font-semibold text-slate-900">
//                             {file.fileName}
//                           </span>
//                           <span className="block text-xs text-slate-500">
//                             Uploaded now · {formatSize(file.sizeMb)}
//                           </span>
//                         </span>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="icon"
//                           aria-label={`Remove ${file.fileName}`}
//                           onClick={() => {
//                             setUploadedFiles((current) =>
//                               current.filter((item) => item.id !== file.id),
//                             );
//                             clearError("attachments");
//                           }}
//                           className="size-9 shrink-0 rounded-lg text-slate-500 hover:text-red-600"
//                         >
//                           <X className="size-4" aria-hidden="true" />
//                         </Button>
//                       </div>
//                     ))}

//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       multiple
//                       accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                       onChange={handleUpload}
//                       className="sr-only"
//                       tabIndex={-1}
//                       aria-label="Upload files"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => fileInputRef.current?.click()}
//                       className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-4 text-sm font-semibold text-slate-600 transition-colors hover:border-[#1D4FA3] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3]"
//                     >
//                       <Plus className="size-4" aria-hidden="true" />
//                       Upload a file
//                     </button>
//                   </div>
//                 </fieldset>

//                 <div
//                   id="attachments"
//                   tabIndex={-1}
//                   className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm outline-none ${
//                     isOverLimit
//                       ? "bg-red-50 text-red-700"
//                       : "bg-slate-50 text-slate-600"
//                   }`}
//                 >
//                   <span className="font-medium">Total attachment size</span>
//                   <span className="font-mono text-xs">
//                     {formatSize(attachmentMb)} of {MAX_ATTACHMENT_MB} MB
//                   </span>
//                 </div>
//                 <FieldError message={errors.attachments} />
//               </>
//             )}

//             {activeStep === 2 && (
//               <>
//                 <div>
//                   <FieldLabel htmlFor="subject" required>
//                     Subject
//                   </FieldLabel>
//                   <Input
//                     id="subject"
//                     value={subject}
//                     onChange={(event) => {
//                       setSubjectOverride(event.target.value);
//                       clearError("subject");
//                     }}
//                     aria-required
//                     aria-invalid={Boolean(errors.subject)}
//                     className={`mt-1.5 h-12 rounded-xl bg-slate-50 text-sm shadow-none ${
//                       errors.subject ? "border-red-400" : "border-slate-200"
//                     }`}
//                   />
//                   <FieldError message={errors.subject} />
//                 </div>

//                 <div>
//                   <div className="flex items-center justify-between gap-2">
//                     <FieldLabel htmlFor="body" required>
//                       Message
//                     </FieldLabel>
//                     {bodyOverride !== null && (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setBodyOverride(null);
//                           clearError("body");
//                         }}
//                         className="text-sm font-semibold text-[#1D4FA3] hover:underline"
//                       >
//                         Use suggested message
//                       </button>
//                     )}
//                   </div>
//                   <Textarea
//                     id="body"
//                     rows={12}
//                     value={body}
//                     onChange={(event) => {
//                       setBodyOverride(event.target.value);
//                       clearError("body");
//                     }}
//                     aria-required
//                     aria-invalid={Boolean(errors.body)}
//                     className={`mt-1.5 rounded-2xl bg-slate-50 p-3.5 text-sm shadow-none ${
//                       errors.body ? "border-red-400" : "border-slate-200"
//                     }`}
//                   />
//                   <FieldError message={errors.body} />
//                 </div>

//                 <div>
//                   <label
//                     className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1D4FA3] ${
//                       errors.consent
//                         ? "border-red-400 bg-red-50/50"
//                         : "border-slate-200/70 bg-slate-50"
//                     }`}
//                   >
//                     <input
//                       id="consent"
//                       type="checkbox"
//                       checked={hasConsent}
//                       onChange={(event) => {
//                         setHasConsent(event.target.checked);
//                         clearError("consent");
//                       }}
//                       className="mt-0.5 size-4 shrink-0 accent-[#1D4FA3]"
//                     />
//                     <span className="text-sm text-slate-700">
//                       <span className="flex items-center gap-1.5 font-semibold text-slate-900">
//                         <ShieldCheck
//                           className="size-4 text-emerald-600"
//                           aria-hidden="true"
//                         />
//                         I agree to share these documents
//                       </span>
//                       <span className="mt-1 block">
//                         ekazi will send my message and attachments to{" "}
//                         <span className="font-medium [overflow-wrap:anywhere]">
//                           {employerEmail || "this employer"}
//                         </span>
//                         .
//                       </span>
//                     </span>
//                   </label>
//                   <FieldError message={errors.consent} />
//                 </div>
//               </>
//             )}
//           </div>

//           <div
//             className={`flex items-center gap-3 border-t border-slate-100 bg-slate-50/70 p-5 sm:p-6 ${
//               activeStep === 0 ? "justify-end" : "justify-between"
//             }`}
//           >
//             {activeStep > 0 && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setActiveStep(activeStep - 1)}
//                 className="h-11 rounded-xl border-slate-200 bg-white px-5 font-semibold text-slate-800 shadow-none hover:bg-slate-50"
//               >
//                 <ArrowLeft className="size-4" aria-hidden="true" />
//                 Back
//               </Button>
//             )}

//             {activeStep < STEPS.length - 1 ? (
//               <Button
//                 type="button"
//                 onClick={() => setActiveStep(activeStep + 1)}
//                 className="h-11 rounded-xl bg-[#1D4FA3] px-5 font-semibold text-white hover:bg-[#18428A]"
//               >
//                 Next: {STEPS[activeStep + 1].title}
//                 <ArrowRight className="size-4" aria-hidden="true" />
//               </Button>
//             ) : (
//               <Button
//                 type="button"
//                 onClick={handleSend}
//                 className="h-11 rounded-xl bg-orange-600 px-5 font-semibold text-white hover:bg-orange-700"
//               >
//                 <Send className="size-4" aria-hidden="true" />
//                 Send application
//               </Button>
//             )}
//           </div>
//         </section>

//         {/* Preview */}
//         <section
//           aria-label="Email preview"
//           className="min-w-0 lg:sticky lg:top-6"
//         >
//           <p className="flex items-center gap-2 py-2 text-sm font-semibold text-slate-900">
//             <span
//               className="size-2 rounded-full bg-emerald-500"
//               aria-hidden="true"
//             />
//             Live preview
//           </p>

//           <div className="mt-1 rounded-3xl bg-[#E4E7EE] p-3 sm:p-6">
//             <div
//               data-testid="email-preview"
//               className="overflow-hidden rounded-xl bg-white shadow-xl shadow-slate-900/10"
//             >
//               <div className="flex items-center gap-3 bg-[#1D4FA3] px-5 py-4 text-white sm:px-7">
//                 <Mail className="size-5 shrink-0" aria-hidden="true" />
//                 <p className="min-w-0 break-word font-bold">{subject}</p>
//               </div>

//               <EmailRow label="From">
//                 {CANDIDATE.fullName} via ekazi{" "}
//                 <span className="text-slate-500">&lt;{SENDER_ADDRESS}&gt;</span>
//               </EmailRow>
//               <EmailRow label="Reply-To">{CANDIDATE.email}</EmailRow>
//               <EmailRow label="To">
//                 {employerEmail || (
//                   <span className="text-slate-400">employer@company.co.tz</span>
//                 )}
//               </EmailRow>
//               <EmailRow label="Copy">{CANDIDATE.email}</EmailRow>

//               <div className="min-h-64 whitespace-pre-line break-words px-5 py-5 text-[13px] leading-relaxed text-slate-700 sm:px-7">
//                 {body}
//               </div>

//               <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
//                 <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
//                   <Paperclip className="size-4" aria-hidden="true" />
//                   {attachments.length === 0
//                     ? "No attachments yet"
//                     : `${attachments.length} ${
//                         attachments.length === 1 ? "attachment" : "attachments"
//                       } · ${formatSize(attachmentMb)}`}
//                 </p>
//                 {attachments.length > 0 ? (
//                   <ul className="mt-3 flex flex-wrap gap-2">
//                     {attachments.map((attachment) => (
//                       <li
//                         key={attachment.id}
//                         className="flex min-w-0 max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700"
//                       >
//                         <CheckCircle
//                           className="size-3.5 shrink-0 text-emerald-600"
//                           aria-hidden="true"
//                         />
//                         <span className="truncate">{attachment.fileName}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="mt-1 text-sm text-slate-500">
//                     Your CV and other files will appear here.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
