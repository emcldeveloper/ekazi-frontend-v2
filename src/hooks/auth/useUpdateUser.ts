import { updateUser } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
