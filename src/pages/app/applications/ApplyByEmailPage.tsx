import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  FileText,
  Loader,
  Mail,
  Send,
  Upload,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useApplyJobByEmail, useJobDetails } from "@/hooks/jobs";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Card, CardContent } from "@/components/ui/card";

interface ApplyByEmailFormValues {
  first_name: string;
  last_name: string;
  phone: string;
  from: string;
  notes: string;
  attachments: File[];
}

interface LocationState {
  jobId?: string;
}

const ApplyJobByEmailPage = () => {
  const { state } = useLocation() as { state?: LocationState };
  const jobId = Number(state?.jobId);

  const navigate = useNavigate();

  const { data: job } = useJobDetails(jobId);
  const { mutate: applyByEmail, isPending: isLoading } = useApplyJobByEmail();

  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ApplyByEmailFormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      from: "",
      notes: "",
      attachments: [],
    },
  });

  register("attachments", {
    validate: (files) =>
      files?.length > 0 || "At least one attachment is required",
  });

  const onSubmit = (data: ApplyByEmailFormValues) => {
    const formData = new FormData();

    // Append all fields
    formData.append("job_id", String(job.id));
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone", data.phone);
    formData.append("from", data.from);
    formData.append("notes", data.notes);

    // Append multiple attachments
    if (data.attachments?.length) {
      data.attachments.forEach((file) => {
        if (file instanceof File) {
          formData.append("attachments[]", file);
        }
      });
    }

    applyByEmail(formData, {
      onSuccess: (res) => {
        toast.success(res?.message ?? "Application Sent");
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);

    if (!selectedFiles.length) return;

    const currentFiles = getValues("attachments") ?? [];

    const combinedFiles = [...currentFiles, ...selectedFiles];

    const uniqueFiles = Array.from(
      new Map(
        combinedFiles.map((file) => [
          `${file.name}-${file.size}-${file.lastModified}`,
          file,
        ]),
      ).values(),
    );

    setValue("attachments", uniqueFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setFilePreviews(uniqueFiles.map((file) => file.name));

    e.target.value = "";
  };
  // Remove an attachment
  const removeAttachment = (index: number) => {
    const files = watch("attachments") || [];

    const updated = files.filter((_, i) => i !== index);

    setValue("attachments", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setFilePreviews(updated.map((f) => f.name));
  };

  const employerEmail = job?.job_email?.name || "";

  return (
    <div className="space-y-4">
      <Button size="sm" variant="secondary" onClick={() => navigate(-1)}>
        <ArrowLeft /> Back
      </Button>

      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-Blue">
          Apply by email
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Write your application letter and attach your documents.
        </p>
      </header>

      <section className="mt-6 flex items-center gap-4 rounded-2xl bg-Blue p-4 text-white sm:px-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Mail className="size-5 text-orange-500" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold">Your application goes to</h2>
          <p className="mt-0.5 break-all text-sm text-slate-300">
            {employerEmail || "the employer's email address"}
          </p>
        </div>
      </section>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8">
              {/* Your details */}
              <section className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold ">Your details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The employer will use these to contact you.
                  </p>
                </div>

                <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="first_name">First name</FieldLabel>
                    <Input
                      id="first_name"
                      placeholder="e.g. Jane"
                      aria-invalid={Boolean(errors.first_name)}
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                    />
                    {errors.first_name && (
                      <FieldError>{errors.first_name.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="last_name">Last name</FieldLabel>
                    <Input
                      id="last_name"
                      placeholder="e.g. Mushi"
                      aria-invalid={Boolean(errors.last_name)}
                      {...register("last_name", {
                        required: "Last name is required",
                      })}
                    />
                    {errors.last_name && (
                      <FieldError>{errors.last_name.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 0652 000 000"
                      aria-invalid={Boolean(errors.phone)}
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                    />
                    {errors.phone && (
                      <FieldError>{errors.phone.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="from">Your email</FieldLabel>
                    <Input
                      id="from"
                      type="email"
                      placeholder="e.g. jane@gmail.com"
                      aria-invalid={Boolean(errors.from)}
                      {...register("from", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                    />

                    {errors.from && (
                      <FieldError>{errors.from.message}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="to">To</FieldLabel>
                    <Input id="to" value={employerEmail} readOnly />
                  </Field>
                </FieldGroup>
              </section>

              {/* Letter */}
              <section className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold">Application letter</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This becomes the body of your email.
                  </p>
                </div>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="notes" className="sr-only">
                      Application letter
                    </FieldLabel>
                    <Textarea
                      id="notes"
                      placeholder="Write your cover letter here..."
                      aria-invalid={Boolean(errors.notes)}
                      className={`min-h-56 rounded-2xl bg-slate-50 p-3.5 text-sm shadow-none ${
                        errors.notes ? "border-red-400" : "border-slate-200"
                      }`}
                      {...register("notes", {
                        required: "Application letter is required",
                      })}
                    />
                    {errors.notes && (
                      <p className="text-sm font-medium text-red-600">
                        {errors.notes.message}
                      </p>
                    )}
                  </Field>
                </FieldGroup>
              </section>

              {/* Attachments */}
              <section className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold">Attachments</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add your CV, certificates and other documents as PDFs, up to
                    5 MB each.
                  </p>
                </div>

                <FieldGroup>
                  <Field className="relative">
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="sr-only"
                      aria-invalid={Boolean(errors.attachments)}
                    />
                    <FieldLabel
                      htmlFor="attachments"
                      className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 p-4 transition-colors hover:border-[#1D4FA3] hover:bg-slate-50 has-focus-visible:ring-2"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        <Upload className="size-4" aria-hidden="true" />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          Choose PDF files
                        </span>

                        <span className="block text-xs font-normal text-muted-foreground">
                          You can select several files at once
                        </span>
                      </span>
                    </FieldLabel>

                    {/* Selected file previews */}
                    {filePreviews.length > 0 && (
                      <ul className="space-y-2">
                        {filePreviews.map((name, i) => (
                          <li
                            key={`${name}-${i}`}
                            className="flex items-center gap-3 rounded-2xl border border-[#1D4FA3] bg-blue-50/60 p-3"
                          >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1D4FA3] text-white">
                              <FileText className="size-4" aria-hidden="true" />
                            </span>

                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">
                              {name}
                            </span>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label={`Remove ${name}`}
                              onClick={() => removeAttachment(i)}
                              className="size-9 shrink-0 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <X className="size-4" aria-hidden="true" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Attachment validation error */}
                    {errors.attachments && (
                      <FieldError>{errors.attachments.message}</FieldError>
                    )}
                  </Field>
                </FieldGroup>
              </section>

              {/* Footer */}
              <div className="flex items-center justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="size-4" aria-hidden="true" />
                  )}
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplyJobByEmailPage;
