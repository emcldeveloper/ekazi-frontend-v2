import { createCareerObjective } from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveObjective = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCareerObjective,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
