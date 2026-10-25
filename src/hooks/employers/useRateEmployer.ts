import { rateEmployer } from "@/services/employers.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRateEmployer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rateEmployer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employer-rate"],
      });
    },
  });
};
