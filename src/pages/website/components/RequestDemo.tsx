import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  Mail,
  MessageSquare,
  Moon,
  Phone,
  Sparkles,
  Sun,
  Sunset,
  User,
  Users,
  LineChart,
  ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { getErrorMessage } from "@/utils/axios-helpers";
import HomeLayout from "@/layouts/HomeLayout";
import type { RequestDemoPayload } from "@/@types/contact";
import { useRequestDemo } from "@/hooks/contact";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Static content                                                      */
/* ------------------------------------------------------------------ */

const sessions: {
  label: string;
  value: string;
  time: string;
  icon: LucideIcon;
}[] = [
  { label: "Morning", value: "morning", time: "8am – 12pm", icon: Sun },
  { label: "Afternoon", value: "afternoon", time: "12pm – 4pm", icon: Sunset },
  { label: "Evening", value: "evening", time: "4pm – 7pm", icon: Moon },
];

const features: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "One hiring hub",
    description: "Manage jobs, applications, and candidates from one place.",
    icon: Briefcase,
  },
  {
    title: "Faster screening",
    description: "Streamline candidate screening and evaluation.",
    icon: ClipboardCheck,
  },
  {
    title: "Team collaboration",
    description: "Collaborate with your hiring team with greater clarity.",
    icon: Users,
  },
  {
    title: "Better decisions",
    description:
      "Make informed hiring decisions with organized candidate data.",
    icon: LineChart,
  },
];

const steps = [
  "Share a few details about your company",
  "We confirm a time that suits your team",
  "Get a walkthrough tailored to your hiring workflow",
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/** Input with a leading icon */
const IconInput = ({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<typeof Input> & { icon: LucideIcon }) => (
  <div className="relative">
    <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      className={cn(
        "h-11 pl-10 transition-colors focus-visible:border-Blue focus-visible:ring-Blue/20",
        className,
      )}
      {...props}
    />
  </div>
);

const SectionLabel = ({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3">
    <span className="flex size-6 items-center justify-center rounded-full bg-Blue text-xs font-semibold text-white">
      {step}
    </span>
    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
    <span className="h-px flex-1 bg-border" />
  </div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const RequestDemo = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RequestDemoPayload>();

  const { mutate: requestDemo, isPending } = useRequestDemo();

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const onSubmit = (data: RequestDemoPayload) => {
    requestDemo(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Request sent successfully");
        reset();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <HomeLayout>
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 size-[32rem] rounded-full bg-Blue/10 blur-3xl" />
          <div className="absolute -right-32 top-1/3 size-[28rem] rounded-full bg-Orange/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-slate-300)_1px,transparent_0)]/40 bg-size-[24px_24px] mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            className="group mb-4 -ml-3 gap-2 rounded-full px-4 text-muted-foreground hover:bg-Blue/10 hover:text-Blue md:mb-8"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>

          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* ------------------------------------------------ Left */}
            <section className="lg:sticky lg:top-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-Orange/20 bg-Orange/10 px-3 py-1 text-xs font-medium text-Orange">
                <Sparkles className="size-3.5" />
                Free personalised walkthrough
              </span>

              <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
                See how Ekazi transforms{" "}
                <span className="relative whitespace-nowrap text-Blue">
                  the way you hire
                  <svg
                    aria-hidden
                    viewBox="0 0 300 12"
                    className="absolute -bottom-2 left-0 h-3 w-full text-Orange"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C60 3 140 1 298 6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
                From publishing opportunities and managing applications to
                evaluating candidates and collaborating on hiring decisions,
                Ekazi brings your entire recruitment workflow together in one
                platform.
              </p>

              {/* Feature grid */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {features.map(({ title, description, icon: Icon }) => (
                  <div
                    key={title}
                    className="group rounded-xl border bg-background/70 p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-Blue/30 hover:shadow-md"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-Blue/10 text-Blue transition-colors group-hover:bg-Blue group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              {/* What happens next */}
              <div className="mt-10 rounded-2xl bg-Blue p-6 text-white shadow-lg shadow-Blue/20">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  What happens next
                </h2>
                <ol className="mt-4 space-y-4">
                  {steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-Orange text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-6">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* ------------------------------------------------ Right */}
            <section>
              <Card className="relative overflow-hidden rounded-2xl border-border/60 py-0 shadow-xl shadow-Blue/5">
                {/* Brand accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-Blue via-Blue to-Orange" />

                <CardHeader className="px-6 pt-6 sm:px-8 sm:pt-8">
                  <CardTitle className="text-2xl font-semibold tracking-tight">
                    Tell us about your company
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    We’ll focus the conversation on the recruitment, hiring,
                    candidate, and talent workflows relevant to your
                    organization.
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-8 sm:px-8">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FieldGroup className="gap-6">
                      {/* ---------- About you */}
                      <SectionLabel step={1}>About you</SectionLabel>

                      <Field>
                        <FieldLabel htmlFor="company">Company name</FieldLabel>
                        <IconInput
                          id="company"
                          icon={Building2}
                          placeholder="Acme Ltd."
                          aria-invalid={!!errors.company}
                          {...register("company", {
                            required: "Company name is required",
                          })}
                        />
                        {errors.company && (
                          <FieldError>{errors.company.message}</FieldError>
                        )}
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                        <IconInput
                          id="fullName"
                          icon={User}
                          placeholder="Jane Doe"
                          aria-invalid={!!errors.fullName}
                          {...register("fullName", {
                            required: "Name is required",
                          })}
                        />
                        {errors.fullName && (
                          <FieldError>{errors.fullName.message}</FieldError>
                        )}
                      </Field>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="email">Work email</FieldLabel>
                          <IconInput
                            id="email"
                            type="email"
                            icon={Mail}
                            placeholder="jane@company.com"
                            aria-invalid={!!errors.email}
                            {...register("email", {
                              required: "Email is required",
                            })}
                          />
                          {errors.email && (
                            <FieldError>{errors.email.message}</FieldError>
                          )}
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                          <IconInput
                            id="phone"
                            type="tel"
                            icon={Phone}
                            placeholder="+255 7XX XXX XXX"
                            aria-invalid={!!errors.phone}
                            {...register("phone", {
                              required: "Phone number is required",
                            })}
                          />
                          {errors.phone && (
                            <FieldError>{errors.phone.message}</FieldError>
                          )}
                        </Field>
                      </div>

                      {/* ---------- Availability */}
                      <SectionLabel step={2}>Your availability</SectionLabel>

                      <Field>
                        <FieldLabel>Preferred time of day</FieldLabel>
                        <Controller
                          name="session"
                          control={control}
                          rules={{ required: "Select a session" }}
                          render={({ field }) => (
                            <div
                              role="radiogroup"
                              className="grid grid-cols-3 gap-3"
                            >
                              {sessions.map(
                                ({ label, value, time, icon: Icon }) => {
                                  const selected = field.value === value;
                                  return (
                                    <button
                                      key={value}
                                      type="button"
                                      role="radio"
                                      aria-checked={selected}
                                      onClick={() => field.onChange(value)}
                                      onBlur={field.onBlur}
                                      className={cn(
                                        "relative flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-4 text-center transition-all",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-Blue/30",
                                        selected
                                          ? "border-Blue bg-Blue/5 text-Blue"
                                          : "border-border hover:border-Blue/40 hover:bg-muted/50",
                                      )}
                                    >
                                      {selected && (
                                        <CheckCircle2 className="absolute right-2 top-2 size-4 text-Blue" />
                                      )}
                                      <Icon
                                        className={cn(
                                          "size-5",
                                          selected
                                            ? "text-Orange"
                                            : "text-muted-foreground",
                                        )}
                                      />
                                      <span className="text-sm font-medium">
                                        {label}
                                      </span>
                                      <span className="text-[11px] text-muted-foreground">
                                        {time}
                                      </span>
                                    </button>
                                  );
                                },
                              )}
                            </div>
                          )}
                        />
                        {errors.session && (
                          <FieldError>{errors.session.message}</FieldError>
                        )}
                      </Field>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="startDate">
                            Available from
                          </FieldLabel>
                          <IconInput
                            id="startDate"
                            type="date"
                            icon={CalendarDays}
                            aria-invalid={!!errors.startDate}
                            {...register("startDate", {
                              required: "Date is required",
                            })}
                          />
                          {errors.startDate && (
                            <FieldError>{errors.startDate.message}</FieldError>
                          )}
                        </Field>

                        <Field>
                          <FieldLabel htmlFor="endDate">
                            Available until
                          </FieldLabel>
                          <IconInput
                            id="endDate"
                            type="date"
                            icon={CalendarDays}
                            aria-invalid={!!errors.endDate}
                            {...register("endDate", {
                              required: "Date is required",
                            })}
                          />
                          {errors.endDate && (
                            <FieldError>{errors.endDate.message}</FieldError>
                          )}
                        </Field>
                      </div>

                      {/* ---------- Message */}
                      <SectionLabel step={3}>Anything else?</SectionLabel>

                      <Field>
                        <FieldLabel htmlFor="message">
                          Message{" "}
                          <span className="font-normal text-muted-foreground">
                            (optional)
                          </span>
                        </FieldLabel>
                        <div className="relative">
                          <MessageSquare className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                          <Textarea
                            id="message"
                            rows={4}
                            placeholder="Tell us about your hiring goals, team size, or challenges…"
                            className="min-h-28 resize-none pl-10 focus-visible:border-Blue focus-visible:ring-Blue/20"
                            {...register("message")}
                          />
                        </div>
                      </Field>

                      {/* ---------- Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isPending}
                        className="group h-12 w-full bg-Orange text-base font-semibold text-white shadow-lg shadow-Orange/25 transition-all hover:bg-Orange/90 hover:shadow-xl hover:shadow-Orange/30"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Sending request...
                          </>
                        ) : (
                          <>
                            Request a Demo
                            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        We’ll only use your details to arrange your demo.
                      </p>
                    </FieldGroup>
                  </form>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default RequestDemo;
