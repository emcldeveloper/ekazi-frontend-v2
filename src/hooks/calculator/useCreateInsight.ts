import { createInsightApi } from "@/services/calculator.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateInsight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInsightApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calculator-insights"],
      });
    },
  });
};
