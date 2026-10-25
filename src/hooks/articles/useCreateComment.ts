import { createComment } from "@/services/articles.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createComment(articleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["article-comments", articleId],
      });
    },
  });
};
