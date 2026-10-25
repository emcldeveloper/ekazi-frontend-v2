import { resendVerificationCode } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useResendVerificationCode = () => {
  return useMutation({
    mutationFn: resendVerificationCode,
  });
};
