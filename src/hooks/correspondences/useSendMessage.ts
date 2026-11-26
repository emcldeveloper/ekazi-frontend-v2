import type { SendMessagePayload } from "@/@types/correspondences";
import { sendThreadMessage } from "@/services/correspondence.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) =>
      sendThreadMessage(payload.thread_id, payload),
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["correspondence-messages", payload.thread_id],
      });

      queryClient.invalidateQueries({
        queryKey: ["correspondence-thread", payload.thread_id],
      });

      // Thread list usually shows the latest message / unread state
      queryClient.invalidateQueries({
        queryKey: ["correspondence-threads"],
      });
    },
  });
};
