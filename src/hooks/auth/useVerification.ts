import { verifyAccount } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useVerification = () => {
  return useMutation({
    mutationFn: verifyAccount,
  });
};
