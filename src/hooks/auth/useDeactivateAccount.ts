import { deactivateAccount } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useDeactivateAccount = () => {
  return useMutation({
    mutationFn: deactivateAccount,
  });
};
