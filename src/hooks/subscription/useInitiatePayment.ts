import { initiatePayment } from "@/services/subscription.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInitiatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: initiatePayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
};
