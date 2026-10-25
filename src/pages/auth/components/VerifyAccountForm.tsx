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
} from "@/components/ui/field";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useResendVerificationCode, useVerification } from "@/hooks/auth";

export default function VerifyAccountForm() {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const { handleSubmit, control, reset } = useForm();

  const [otp, setOtp] = useState("");
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

  const onSubmit = () => {
    if (otp.length < 6) {
      toast.error("Please enter the complete verification code");
      return;
    }

    verifyUser(
      { token: otp },
      {
        onSuccess: (res) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("role_id", res.data?.role_id);
          localStorage.setItem("verified", res.data?.verified);

          const role = res.data?.role_id;

          // Job seeker
          if (role === 12) {
            navigate("/app/dashboard", { replace: true });
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
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      },
    );

    setCountdown(60);
    setOtp("");
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
              required: true,
              minLength: 6,
            }}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={field.value}
                onChange={field.onChange}
                className="w-full"
              >
                <InputOTPGroup className="w-full flex">
                  <InputOTPSlot index={0} className="flex-1 h-10 text-xl" />
                  <InputOTPSlot index={1} className="flex-1 h-10 text-xl" />
                  <InputOTPSlot index={2} className="flex-1 h-10 text-xl" />
                  <InputOTPSeparator />
                  <InputOTPSlot index={3} className="flex-1 h-10 text-xl" />
                  <InputOTPSlot index={4} className="flex-1 h-10 text-xl" />
                  <InputOTPSlot index={5} className="flex-1 h-10 text-xl" />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-Blue hover:bg-blue-600"
          >
            {isPending ? "Verifying account..." : "Verify"}
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
