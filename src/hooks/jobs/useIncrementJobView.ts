import { incrementJobView } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useIncrementJobView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: number) => incrementJobView(jobId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job-details"],
      });

      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
