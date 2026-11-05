import { incrementJobView } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useIncrementJobView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: number) => incrementJobView(jobId),

    onSuccess: (_, jobId) => {
      queryClient.invalidateQueries({
        queryKey: ["job-details", jobId],
      });

      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
