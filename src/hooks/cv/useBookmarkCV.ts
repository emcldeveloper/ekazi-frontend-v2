import { bookmarkApi } from "@/services/cv-builder.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBookmarkCv = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => bookmarkApi(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
    },
  });
};
