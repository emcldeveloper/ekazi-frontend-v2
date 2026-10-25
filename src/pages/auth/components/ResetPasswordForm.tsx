import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

import { getErrorMessage } from "@/utils/axios-helpers";
import { useResetPassword } from "@/hooks/auth";
import type { ResetPasswordPayload } from "@/@types/auth";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = String(searchParams.get("token"));
  const email = String(searchParams.get("email"));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordPayload>();

  const { mutate: resetPassword, isPending } = useResetPassword();

  const password = watch("password");

  const onSubmit = (data: ResetPasswordPayload) => {
    if (!token && !email) {
      toast.error("Invalid or missing email or reset token.");
      return;
    }

    const payload = {
      ...data,
      token,
      email,
    };

    resetPassword(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Password reset successfully");
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
          Enter your new password below to reset your account password.
        </FieldDescription>

        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </span>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password_confirmation">
            Confirm New Password
          </FieldLabel>

          <div className="relative">
            <Input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              {...register("password_confirmation", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={16} />
              ) : (
                <EyeIcon size={16} />
              )}
            </span>
          </div>

          {errors.password_confirmation && (
            <p className="text-xs text-red-500">
              {errors.password_confirmation.message}
            </p>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-Blue hover:bg-blue-800"
          >
            {isPending ? "Resetting..." : "Reset Password"}
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
