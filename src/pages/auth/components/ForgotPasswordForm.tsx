import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/auth";
import type { ForgotPasswordPayload } from "@/@types/auth";
import { getErrorMessage } from "@/utils/axios-helpers";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>();

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordPayload) => {
    forgotPassword(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Link sent succesfully");
        navigate("/login");
        reset();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldDescription>
          Enter the email address linked to your account, and we’ll send you a
          link to reset your password.
        </FieldDescription>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-Blue hover:bg-blue-800"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>
        </Field>

        <FieldSeparator>Or</FieldSeparator>

        <FieldDescription className="text-center">
          Remember your password? <Link to="/login">Login</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
