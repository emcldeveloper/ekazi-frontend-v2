import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useChangePassword } from "@/hooks/auth";
import DeactivateAccount from "./DeactivateAccount";
import DeleteAccount from "./DeleteAccount";
import { getErrorMessage } from "@/utils/axios-helpers";
import type { ChangePasswordPayload } from "@/@types/auth";

const SecurityPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordPayload>();

  const { mutate: changePassword, isPending: isChanging } = useChangePassword();

  const onSubmit = (data: ChangePasswordPayload) => {
    const payload = {
      old_password: data.old_password,
      new_password: data.new_password,
    };

    changePassword(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Password changed successfully");
        reset();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-center gap-2 sm:gap-4">
                <FieldLabel>Current password</FieldLabel>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    {...register("old_password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon size={16} />
                    ) : (
                      <EyeOffIcon size={16} />
                    )}
                  </span>
                </div>

                {errors.old_password && (
                  <FieldError>{errors.old_password.message}</FieldError>
                )}
              </Field>

              <Field className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-center gap-2 sm:gap-4">
                <FieldLabel>New password</FieldLabel>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="******"
                    {...register("new_password", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showNewPassword ? (
                      <EyeIcon size={16} />
                    ) : (
                      <EyeOffIcon size={16} />
                    )}
                  </span>
                </div>

                {errors.new_password && (
                  <FieldError>{errors.new_password.message}</FieldError>
                )}
              </Field>

              <Field className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-center gap-2 sm:gap-4">
                <FieldLabel>Confirm new password</FieldLabel>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="******"
                    {...register("confirm_new_password", {
                      required: "Please confirm your new password",
                      validate: (value) =>
                        value === getValues("new_password") ||
                        "Passwords do not match.",
                    })}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeIcon size={16} />
                    ) : (
                      <EyeOffIcon size={16} />
                    )}
                  </span>
                </div>

                {errors.confirm_new_password && (
                  <FieldError>{errors.confirm_new_password.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="submit" disabled={isChanging}>
                {isChanging ? "Updating..." : "Update password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between items-center py-4 border-b border- last:border-0">
            <div>
              <p className="text-base font-medium">Deactivate account</p>
              <p className="text-sm text-muted-foreground">
                Temporarily disable your account
              </p>
            </div>

            <DeactivateAccount />
          </div>

          <div className="flex justify-between items-center py-4 border-b border- last:border-0">
            <div>
              <p className="text-base font-medium">Delete account</p>
              <p className="text-sm text-muted-foreground">
                Permanently remove all your data
              </p>
            </div>

            <DeleteAccount />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPage;
