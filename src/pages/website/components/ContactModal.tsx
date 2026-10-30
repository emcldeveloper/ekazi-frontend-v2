import { Loader2, Phone, Mail, MapPin } from "lucide-react";
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
      <DialogContent className="max-w-4xl!">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT SIDE - CONTACT INFO */}
          <div>
            <h6 className="mb-3 font-semibold">Get in Touch</h6>

            <div className="flex items-start gap-2 mb-4">
              <Phone className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <strong>Hotline:</strong>
                <ul className="pl-4 list-disc">
                  <li>+255 677 400 206</li>
                  <li>+255 677 400 205</li>
                  <li>+255 677 014 718</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <Mail className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <strong>Email:</strong>
                <br />
                <a href="mailto:info@ekazi.co.tz" className="text-sm underline">
                  info@ekazi.co.tz
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <strong>Address:</strong>
                <br />
                3rd Floor, The Arcade,
                <br />
                Mwai Kibaki Rd, Mikocheni,
                <br />
                P.O.Box 105061,
                <br />
                Dar es Salaam, Tanzania.
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div>
            <h6 className="mb-3 font-semibold">Send Us a Message</h6>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <Textarea
                  rows={4}
                  placeholder="Your Message"
                  {...register("message", {
                    required: "Message is required",
                  })}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
