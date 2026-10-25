import { incrementJobView } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useIncrementJobView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: incrementJobView,

    onSuccess: (_, jobId) => {
      queryClient.invalidateQueries({
        queryKey: ["job-detail", jobId],
      });

      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
