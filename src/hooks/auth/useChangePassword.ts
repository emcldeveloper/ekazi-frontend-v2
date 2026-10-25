import { changePassword } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
