import { saveJob } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
