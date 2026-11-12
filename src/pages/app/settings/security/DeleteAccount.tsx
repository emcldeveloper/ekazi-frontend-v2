import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon, Trash2Icon, LockKeyhole } from "lucide-react";
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

import { useDeleteAccount } from "@/hooks/auth";
import { getErrorMessage } from "@/utils/axios-helpers";

type DeleteAccountFormValues = {
  deletePassword: string;
  confirmation: string;
};

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeleteAccountFormValues>({
    defaultValues: {
      deletePassword: "",
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

  const onSubmit = (data: DeleteAccountFormValues) => {
    deleteAccount(
      {
        password: data.deletePassword,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Account deleted successfully");

          setOpen(false);
          resetDialog();
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
            Delete Account
          </Button>
        }
      />

      <AlertDialogContent size="sm">
        {step === 1 ? (
          <>
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
                <Trash2Icon />
              </AlertDialogMedia>

              <AlertDialogTitle>Delete Account?</AlertDialogTitle>

              <AlertDialogDescription>
                This action will permanently delete your account and associated
                data. This action cannot be undone.
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
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
                <LockKeyhole />
              </AlertDialogMedia>

              <AlertDialogTitle>Confirm your password</AlertDialogTitle>

              <AlertDialogDescription>
                Enter your current password to permanently delete your account.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-5 py-5">
              <Field>
                <FieldLabel htmlFor="deletePassword">
                  Current password
                </FieldLabel>

                <div className="relative">
                  <Input
                    id="deletePassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="pr-10"
                    aria-invalid={!!errors.deletePassword}
                    {...register("deletePassword", {
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

                {errors.deletePassword && (
                  <FieldError>{errors.deletePassword.message}</FieldError>
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
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogFooter>
          </form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccount;
