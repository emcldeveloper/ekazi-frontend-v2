import type { CommentPayload } from "@/@types/articles";
import { createComment } from "@/services/articles.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CommentPayload }) =>
      createComment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
};
