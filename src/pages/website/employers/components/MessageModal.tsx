import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// icons
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { EmployerMessagePayload } from "@/@types/employers";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useSendEmployerMessage } from "@/hooks/employers";

interface MessageModalProps {
  clientId: number;
}

const MessageModal = ({ clientId }: MessageModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployerMessagePayload>();

  const { mutate: sendMessage, isPending } = useSendEmployerMessage();

  const onSubmit = (data: EmployerMessagePayload) => {
    const payload = {
      ...data,
      client_id: clientId,
    };

    sendMessage(payload, {
      onSuccess: (res) => {
        toast.success(res?.message ?? "Message sent");
        reset();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Message us</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Us a Message</DialogTitle>
        </DialogHeader>

        <form id="employer-message" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                {...register("name", {
                  required: "name is required",
                })}
                placeholder="Enter your name"
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                {...register("email", {
                  required: "email is required",
                })}
                placeholder="Enter your email"
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Subject</FieldLabel>
              <Input
                {...register("subject", {
                  required: "subject is required",
                })}
                placeholder="Enter subject"
              />
              {errors.subject && (
                <FieldError>{errors.subject.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Message</FieldLabel>
              <Textarea
                {...register("message", {
                  required: "message is required",
                })}
                placeholder="Type your message here."
              />
              {errors.message && (
                <FieldError>{errors.message.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter className="flex justify-between gap-2">
          <Button type="submit" form="employer-message" disabled={isPending}>
            {isPending ? "Sending" : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
