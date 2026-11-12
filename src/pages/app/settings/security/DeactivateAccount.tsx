import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon, LockKeyhole, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { useDeactivateAccount } from "@/hooks/auth";
import { getErrorMessage } from "@/utils/axios-helpers";

type DeactivateFormValues = {
  deactivatePassword: string;
};

const DeactivateAccount = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: deactivateAccount, isPending } = useDeactivateAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeactivateFormValues>({
    defaultValues: {
      deactivatePassword: "",
    },
  });

  const resetDialog = () => {
    setStep(1);
    setShowPassword(false);
    reset();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;

    setOpen(nextOpen);

    if (!nextOpen) {
      resetDialog();
    }
  };

  const onSubmit = (data: DeactivateFormValues) => {
    deactivateAccount(
      {
        password: data.deactivatePassword,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Account deactivated successfully");

          setOpen(false);
          resetDialog();

          // Clear authentication and redirect to login here.
          // Use your existing logout/auth flow.
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        render={
          <Button type="button" variant="destructive" size="sm">
            Deactivate
          </Button>
        }
      />

      <AlertDialogContent size="sm">
        {step === 1 ? (
          <>
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>

              <AlertDialogTitle>Deactivate Account?</AlertDialogTitle>

              <AlertDialogDescription>
                Your account will be temporarily deactivated. You will lose
                access until your account is reactivated.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>

              <Button
                type="button"
                variant="destructive"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive">
                <LockKeyhole />
              </AlertDialogMedia>

              <AlertDialogTitle>Confirm your password</AlertDialogTitle>

              <AlertDialogDescription>
                Please enter your current password to confirm account
                deactivation.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="py-5">
              <Field>
                <FieldLabel htmlFor="deactivatePassword">
                  Current password
                </FieldLabel>

                <div className="relative">
                  <Input
                    id="deactivatePassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10"
                    autoComplete="current-password"
                    aria-invalid={!!errors.deactivatePassword}
                    {...register("deactivatePassword", {
                      required: "Password is required",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeIcon size={16} />
                    ) : (
                      <EyeOffIcon size={16} />
                    )}
                  </button>
                </div>

                {errors.deactivatePassword && (
                  <FieldError>{errors.deactivatePassword.message}</FieldError>
                )}
              </Field>
            </div>

            <AlertDialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => setStep(1)}
              >
                Back
              </Button>

              <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending ? "Deactivating..." : "Deactivate"}
              </Button>
            </AlertDialogFooter>
          </form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeactivateAccount;
