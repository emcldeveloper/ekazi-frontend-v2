import { login } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: () => {
      queryClient.clear();
    },
  });
};
