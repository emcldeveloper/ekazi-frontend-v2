import { sendEmployerMessage } from "@/services/employers.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendEmployerMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendEmployerMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employer-message"],
      });
    },
  });
};
