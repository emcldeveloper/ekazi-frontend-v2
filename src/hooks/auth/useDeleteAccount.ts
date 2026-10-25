import { deleteAccount } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
