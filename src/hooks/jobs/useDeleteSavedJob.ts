import { deleteSavedJob } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSavedJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: number) => deleteSavedJob(jobId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-jobs"],
      });
    },
  });
};
