import { incrementCvCountApi } from "@/services/cv-builder.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useIncrementCVCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: incrementCvCountApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-count"] });
    },
  });
};
