import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldSeparator,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useResendVerificationCode, useVerification } from "@/hooks/auth";
import { Loader } from "lucide-react";

export default function VerifyAccountForm() {
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const [countdown, setCountdown] = useState(60);
  const canResend = countdown === 0;

  //   Resend Countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const { mutate: verifyUser, isPending } = useVerification();

  const { mutate: resendCode } = useResendVerificationCode();

  const onSubmit = (data: { code: string }) => {
    verifyUser(
      { token: data.code },
      {
        onSuccess: (res) => {
          if (Number(res.data?.role_id) === 12) {
            navigate("/login", { replace: true });
          }

          toast.success(res?.message || "Account verified successfully");
          reset();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  const handleResendCode = () => {
    resendCode(
      { email: email },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Code sent successfully");
          setCountdown(60);
          reset();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>Enter Verification Code</FieldLabel>
          <Controller
            name="code"
            control={control}
            rules={{
              required: "Verification code is required",
              minLength: {
                value: 6,
                message: "Please enter all 6 digits",
              },
            }}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={field.value ?? ""}
                onChange={field.onChange}
                className="w-full"
              >
                <InputOTPGroup className="flex w-full">
                  <InputOTPSlot index={0} className="h-10 flex-1 text-xl" />
                  <InputOTPSlot index={1} className="h-10 flex-1 text-xl" />
                  <InputOTPSlot index={2} className="h-10 flex-1 text-xl" />

                  <InputOTPSeparator />

                  <InputOTPSlot index={3} className="h-10 flex-1 text-xl" />
                  <InputOTPSlot index={4} className="h-10 flex-1 text-xl" />
                  <InputOTPSlot index={5} className="h-10 flex-1 text-xl" />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {errors.code && <FieldError>{errors.code.message}</FieldError>}
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-Blue hover:bg-blue-600"
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Account"
            )}
          </Button>
        </Field>

        <FieldSeparator />

        <FieldDescription>
          {canResend ? (
            <Button variant="link" type="button" onClick={handleResendCode}>
              Resend code
            </Button>
          ) : (
            <p className="text-sm ml-2 text-gray-500">
              Resend in{" "}
              <span className="font-semibold text-Blue">{countdown}s</span>
            </p>
          )}
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
