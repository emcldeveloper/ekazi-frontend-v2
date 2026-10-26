import { applyJobInternal } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApplyJobInternal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyJobInternal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-pipeline"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
};
