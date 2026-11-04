import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Download,
  FileImage,
  FileText,
  FolderOpen,
  Paperclip,
  Pencil,
  Plus,
  ShieldCheck,
  Tag,
  Trash2,
  Upload,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ROUTES = {
  applyByEmail: (fileId: string) => `/apply-by-email?fileId=${fileId}`,
};

const CATEGORIES = [
  "Certificate",
  "Transcript",
  "Identification",
  "Other",
] as const;

type Category = (typeof CATEGORIES)[number];
type CategoryFilter = Category | "All";

interface OtherFile {
  id: string;
  name: string;
  fileName: string;
  category: Category;
  sizeBytes: number;
  uploaded: string;
  /** Only set for files added in this session, until your API is connected. */
  file?: File;
}

const MAX_FILE_MB = 5;
const BYTES_IN_MB = 1024 * 1024;
const ACCEPTED_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
const ACCEPT_ATTRIBUTE = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(",");

// TODO: replace with the candidate's files from your API.
const SAMPLE_FILES: OtherFile[] = [
  {
    id: "file-1",
    name: "Degree certificate",
    fileName: "Degree_Certificate.pdf",
    category: "Certificate",
    sizeBytes: 1.2 * BYTES_IN_MB,
    uploaded: "Uploaded Sep 2",
  },
  {
    id: "file-2",
    name: "Academic transcript",
    fileName: "Academic_Transcript.pdf",
    category: "Transcript",
    sizeBytes: 0.8 * BYTES_IN_MB,
    uploaded: "Uploaded Sep 2",
  },
];

const ICON_BUTTON_CLASS =
  "size-11 shrink-0 rounded-xl border-slate-200 bg-white text-slate-700 shadow-none hover:bg-slate-50";

function getExtension(fileName: string): string {
  const parts = fileName.split(".");
  return parts.length > 1 ? (parts.pop() ?? "").toLowerCase() : "";
}

function formatSize(sizeBytes: number): string {
  if (sizeBytes < 0.1 * BYTES_IN_MB) {
    return `${Math.max(1, Math.round(sizeBytes / 1024))} KB`;
  }
  return `${(sizeBytes / BYTES_IN_MB).toFixed(1)} MB`;
}

function getFileError(file: File): string | null {
  if (!ACCEPTED_EXTENSIONS.includes(getExtension(file.name))) {
    return "Upload a PDF, Word document, JPG or PNG file.";
  }
  if (file.size === 0) return "This file is empty. Choose another file.";
  if (file.size > MAX_FILE_MB * BYTES_IN_MB) {
    return `This file is larger than ${MAX_FILE_MB} MB. Choose a smaller file.`;
  }
  return null;
}

function toDisplayName(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

function saveLocalFile(file: File) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function FilePreview({ file }: { file: OtherFile }) {
  const extension = getExtension(file.fileName).toUpperCase();
  const isImage = ["JPG", "JPEG", "PNG"].includes(extension);
  const Icon =
    file.category === "Certificate" ? Award : isImage ? FileImage : FileText;

  return (
    <div
      aria-hidden="true"
      className="h-40 overflow-hidden bg-[#ECEDF2] px-5 pt-5 sm:px-7"
    >
      <div className="h-full overflow-hidden rounded-t-md bg-white p-4 shadow-lg shadow-slate-900/10">
        <div className="flex items-center justify-between">
          <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#1D4FA3]">
            <Icon className="size-5" />
          </span>
          <span className="rounded-md bg-[#FEEFE6] px-2 py-1 font-mono text-[11px] font-semibold text-[#C2410C]">
            {extension || "FILE"}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-[#ECECF3]" />
          <div className="h-1.5 w-[92%] rounded-full bg-[#ECECF3]" />
          <div className="h-1.5 w-3/5 rounded-full bg-[#ECECF3]" />
        </div>
      </div>
    </div>
  );
}

export default function OtherFilesPage() {
  const navigate = useNavigate();

  const [files, setFiles] = useState<OtherFile[]>(SAMPLE_FILES);
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [fileToDelete, setFileToDelete] = useState<OtherFile | null>(null);

  // Upload and edit dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<OtherFile | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Certificate");
  const [fileError, setFileError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isTileDragging, setIsTileDragging] = useState(false);
  const [isZoneDragging, setIsZoneDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const visibleFiles =
    filter === "All" ? files : files.filter((file) => file.category === filter);

  const selectFile = (file: File | undefined, keepName = false) => {
    if (!file) return;
    const error = getFileError(file);
    setFileError(error);
    if (error) {
      setPendingFile(null);
      return;
    }
    setPendingFile(file);
    setNameError(null);
    if (!keepName) setName(toDisplayName(file.name));
  };

  const openUploadDialog = (droppedFile?: File) => {
    setEditingFile(null);
    setPendingFile(null);
    setName("");
    setCategory(filter === "All" ? "Certificate" : filter);
    setFileError(null);
    setNameError(null);
    setIsDialogOpen(true);
    selectFile(droppedFile);
  };

  const openEditDialog = (file: OtherFile) => {
    setEditingFile(file);
    setPendingFile(null);
    setName(file.name);
    setCategory(file.category);
    setFileError(null);
    setNameError(null);
    setIsDialogOpen(true);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0], name.trim().length > 0);
    // Allows the same file to be chosen again after an error.
    event.target.value = "";
  };

  const handleTileDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsTileDragging(false);
    openUploadDialog(event.dataTransfer.files[0]);
  };

  const handleZoneDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsZoneDragging(false);
    selectFile(event.dataTransfer.files[0], name.trim().length > 0);
  };

  const handleDialogSave = () => {
    const trimmedName = name.trim();
    const isNameMissing = !trimmedName;
    const isFileMissing = !editingFile && !pendingFile;

    setNameError(isNameMissing ? "Give this file a name" : null);
    if (isFileMissing) setFileError("Choose a file to upload.");
    if (isNameMissing || isFileMissing) return;

    if (editingFile) {
      // TODO: save the new name and category with your API.
      setFiles((current) =>
        current.map((file) =>
          file.id === editingFile.id
            ? { ...file, name: trimmedName, category }
            : file,
        ),
      );
    } else if (pendingFile) {
      // TODO: upload pendingFile with your API and use the file it returns.
      const newFile: OtherFile = {
        id: `${pendingFile.name}-${pendingFile.lastModified}-${Date.now()}`,
        name: trimmedName,
        fileName: pendingFile.name,
        category,
        sizeBytes: pendingFile.size,
        uploaded: "Uploaded today",
        file: pendingFile,
      };
      setFiles((current) => [newFile, ...current]);
      if (filter !== "All" && filter !== category) setFilter("All");
    }
    setIsDialogOpen(false);
  };

  const handleDownload = (file: OtherFile) => {
    if (file.file) {
      saveLocalFile(file.file);
      return;
    }
    // TODO: download saved files from your API.
  };

  const handleConfirmDelete = () => {
    if (fileToDelete) {
      // TODO: delete the file with your API.
      setFiles((current) =>
        current.filter((file) => file.id !== fileToDelete.id),
      );
    }
    setFileToDelete(null);
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            My other files
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep your certificates, transcripts and other documents in one
            place, ready to attach when you apply.
          </p>
        </div>
        <Button type="button" onClick={() => openUploadDialog()}>
          <Upload className="size-4" aria-hidden="true" />
          Upload file
        </Button>
      </header>

      <section className="mt-6 flex items-center gap-4 rounded-2xl bg-accent-foreground p-4 text-white sm:px-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <ShieldCheck className="size-5 text-orange-500" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-bold">You choose who sees your files</h2>
          <p className="mt-0.5 text-sm text-slate-300">
            A file is only shared when you attach it to an application. PDF
            works best, up to {MAX_FILE_MB} MB per file.
          </p>
        </div>
      </section>

      <div
        role="group"
        aria-label="Filter files by type"
        className="mt-6 flex flex-wrap gap-2"
      >
        {(["All", ...CATEGORIES] as CategoryFilter[]).map((option) => {
          const count =
            option === "All"
              ? files.length
              : files.filter((file) => file.category === option).length;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2 ${
                filter === option
                  ? "border-[#1D4FA3] bg-[#1D4FA3] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {option}
              <span
                className={`ml-2 font-mono text-xs ${
                  filter === option ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <section
        aria-label="Your files"
        className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <button
          type="button"
          onClick={() => openUploadDialog()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsTileDragging(true);
          }}
          onDragLeave={() => setIsTileDragging(false)}
          onDrop={handleTileDrop}
          className={`group flex min-h-72 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed p-6 transition-colors hover:border-[#1D4FA3] hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2 ${
            isTileDragging ? "border-[#1D4FA3] bg-white/60" : "border-slate-300"
          }`}
        >
          <span className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors group-hover:text-[#1D4FA3]">
            <Plus className="size-6" aria-hidden="true" />
          </span>
          <span className="font-semibold text-slate-600">
            Upload a new file
          </span>
          <span className="-mt-3 text-sm text-slate-500">
            or drag and drop it here
          </span>
        </button>

        {visibleFiles.map((file) => (
          <article
            key={file.id}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white"
          >
            <FilePreview file={file} />

            <div className="flex flex-1 flex-col p-5 sm:px-7">
              <h2 className="truncate text-lg font-bold text-slate-950">
                {file.name}
              </h2>
              <p className="mt-1 truncate text-sm text-slate-600">
                {file.fileName}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {file.category} <span className="mx-1">·</span>{" "}
                {formatSize(file.sizeBytes)} <span className="mx-1">·</span>{" "}
                {file.uploaded}
              </p>

              <div className="mt-auto flex items-center gap-2 pt-6">
                <Button
                  type="button"
                  onClick={() => navigate(ROUTES.applyByEmail(file.id))}
                  className="h-11 min-w-0 flex-1 rounded-xl bg-[#FEEFE6] px-3 font-semibold text-[#C2410C] shadow-none hover:bg-[#FDE3D3]"
                >
                  <Paperclip className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">Use to apply</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => openEditDialog(file)}
                  aria-label={`Edit ${file.name}`}
                  title="Edit details"
                  className={ICON_BUTTON_CLASS}
                >
                  <Pencil className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleDownload(file)}
                  aria-label={`Download ${file.name}`}
                  title="Download"
                  className={ICON_BUTTON_CLASS}
                >
                  <Download className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFileToDelete(file)}
                  aria-label={`Delete ${file.name}`}
                  title="Delete"
                  className={`${ICON_BUTTON_CLASS} hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </article>
        ))}

        {visibleFiles.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-slate-200/70 bg-white p-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <FolderOpen className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-4 font-semibold text-slate-800">
              {filter === "All"
                ? "No files yet"
                : `No ${filter.toLowerCase()} files yet`}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Upload a document so it's ready for your next application.
            </p>
          </div>
        )}
      </section>

      {/* Upload and edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingFile ? "Edit file details" : "Upload a file"}
            </DialogTitle>
            <DialogDescription>
              {editingFile
                ? editingFile.fileName
                : `PDF, Word, JPG or PNG, up to ${MAX_FILE_MB} MB.`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {!editingFile && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPT_ATTRIBUTE}
                  onChange={handleFileInputChange}
                  className="sr-only"
                  tabIndex={-1}
                  aria-label="Choose a file"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsZoneDragging(true);
                  }}
                  onDragLeave={() => setIsZoneDragging(false)}
                  onDrop={handleZoneDrop}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 border-dashed p-4 text-left transition-colors hover:border-[#1D4FA3] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] ${
                    fileError
                      ? "border-red-400"
                      : isZoneDragging
                        ? "border-[#1D4FA3] bg-slate-50"
                        : pendingFile
                          ? "border-[#1D4FA3] bg-blue-50/60"
                          : "border-slate-300"
                  }`}
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                      pendingFile
                        ? "bg-[#1D4FA3] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {pendingFile ? (
                      <FileText className="size-4" aria-hidden="true" />
                    ) : (
                      <Upload className="size-4" aria-hidden="true" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900">
                      {pendingFile ? pendingFile.name : "Choose a file"}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {pendingFile
                        ? `${formatSize(pendingFile.size)} · Click to replace`
                        : "Or drag and drop it here"}
                    </span>
                  </span>
                </button>
                {fileError && (
                  <p
                    role="alert"
                    className="mt-1.5 text-sm font-medium text-red-600"
                  >
                    {fileError}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="file-name"
                className="text-sm font-semibold text-slate-700"
              >
                File name
                <span className="ml-1 text-orange-600" aria-hidden="true">
                  *
                </span>
              </label>
              <div className="relative mt-1.5">
                <Tag className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="file-name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setNameError(null);
                  }}
                  placeholder="e.g. Degree certificate"
                  aria-required
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={nameError ? "file-name-error" : undefined}
                  className={`h-12 rounded-xl bg-slate-50 pl-11 text-sm shadow-none ${
                    nameError ? "border-red-400" : "border-slate-200"
                  }`}
                />
              </div>
              {nameError && (
                <p
                  id="file-name-error"
                  className="mt-1.5 text-sm font-medium text-red-600"
                >
                  {nameError}
                </p>
              )}
            </div>

            <div role="group" aria-label="File type">
              <p className="text-sm font-semibold text-slate-700">File type</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={category === option}
                    onClick={() => setCategory(option)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2 ${
                      category === option
                        ? "border-[#1D4FA3] bg-[#1D4FA3] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="h-11 rounded-xl border-slate-200 bg-white px-5 font-semibold text-slate-800 shadow-none hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDialogSave}
              className="h-11 rounded-xl bg-[#1D4FA3] px-5 font-semibold text-white hover:bg-[#18428A]"
            >
              {editingFile ? "Save changes" : "Upload file"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <AlertDialog
        open={fileToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setFileToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this file?</AlertDialogTitle>
            <AlertDialogDescription>
              “{fileToDelete?.name}” will be permanently deleted. Applications
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
}
