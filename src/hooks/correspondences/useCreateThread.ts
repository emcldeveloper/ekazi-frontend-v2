import type { CreateThreadPayload } from "@/@types/correspondences";
import { createThread } from "@/services/correspondence.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateThreadPayload) => createThread(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["correspondence-threads"],
      });
    },
  });
};
