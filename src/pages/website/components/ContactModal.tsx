import { Phone, Mail, MapPin, Loader } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useContactUs } from "@/hooks/contact";
import type { ContactPayload } from "@/@types/contact";

interface ContactModalProps {
  show: boolean;
  handleClose: () => void;
}

const HOTLINES = ["+255 677 400 206", "+255 677 400 205", "+255 677 014 718"];
const EMAIL = "info@ekazi.co.tz";
const MAP_URL =
  "https://www.google.com/maps/place/Exact+Manpower+Consulting+Ltd/@-6.7638342,39.2549999,17z/data=!3m1!4b1!4m6!3m5!1s0x185c4d000e926bd3:0x19cf974457eb85aa!8m2!3d-6.7638342!4d39.2575748!16s%2Fg%2F11p1p7641t?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D";

const toTel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

const fieldClass = (hasError: boolean) =>
  `h-11 rounded-lg bg-white ${
    hasError
      ? "border-red-400 focus-visible:ring-red-200"
      : "border-slate-200 focus-visible:border-(--color-Blue) focus-visible:ring-(--color-Blue)/20"
  }`;

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {message}
    </p>
  ) : null;

const ContactModal = ({ show, handleClose }: ContactModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>();

  const { mutate, isPending } = useContactUs();

  const onSubmit = (data: ContactPayload) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res?.message ?? "Message sent successfully!");
        reset();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl! md:overflow-hidden">
        <div className="grid md:grid-cols-[5fr_6fr]">
          {/* LEFT: contact details */}
          <aside className="bg-(--color-Blue) px-6 py-8 text-blue-50 md:px-8 md:py-10">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold leading-tight text-white">
                Get in touch
              </DialogTitle>
            </DialogHeader>

            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--color-Orange)">
                  <Phone className="size-5 text-white" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-white">Hotline</p>
                  <div className="mt-1 flex flex-col">
                    {HOTLINES.map((n) => (
                      <a
                        key={n}
                        href={toTel(n)}
                        className="w-fit py-0.5 text-sm text-blue-50 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-white"
                      >
                        {n}
                      </a>
                    ))}
                  </div>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--color-Orange)">
                  <Mail className="size-5 text-white" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-1 inline-block text-sm text-blue-50 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    {EMAIL}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--color-Orange)">
                  <MapPin className="size-5 text-white" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-white">Visit us</p>
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm leading-relaxed text-blue-50 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    {/* 3rd Floor, The Arcade,
                    <br />
                    Mwai Kibaki Rd, Mikocheni,
                    <br />
                    P.O. Box 105061,
                    <br />
                    Dar es Salaam, Tanzania */}
                    3rd Floor, Bulika House (The Arcade House),
                    <br />
                    Mwai Kibaki Rd, Mikocheni, Dar es Salaam, Tanzania
                  </a>
                </div>
              </li>
            </ul>
          </aside>

          {/* RIGHT: form */}
          <section className="bg-white px-6 py-8 md:px-8 md:py-10">
            <h3 className="text-lg font-semibold text-slate-900">
              Send us a message
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              We will reply to the email address you give us.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Name
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  className={fieldClass(!!errors.name)}
                  {...register("name", { required: "Enter your name" })}
                />
                <FieldError
                  id="contact-name-error"
                  message={errors.name?.message}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className={fieldClass(!!errors.email)}
                  {...register("email", {
                    required: "Enter your email address",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                <FieldError
                  id="contact-email-error"
                  message={errors.email?.message}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  rows={5}
                  placeholder="How can we help?"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  className={`resize-none rounded-lg bg-white ${
                    errors.message
                      ? "border-red-400 focus-visible:ring-red-200"
                      : "border-slate-200 focus-visible:border-(--color-Blue) focus-visible:ring-Blue/20"
                  }`}
                  {...register("message", { required: "Write your message" })}
                />
                <FieldError
                  id="contact-message-error"
                  message={errors.message?.message}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full bg-Orange hover:bg-Orange/90 focus-visible:ring-Orange/30"
              >
                {isPending ? (
                  <>
                    <Loader className="size-4 animate-spin" aria-hidden />
                    Sending...
                  </>
                ) : (
                  <>Send message</>
                )}
              </Button>
            </form>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
