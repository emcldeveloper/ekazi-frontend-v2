import { addCandidateView } from "@/services/candidates.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCandidateView = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addCandidateView(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate-view", id],
      });
    },
  });
};
