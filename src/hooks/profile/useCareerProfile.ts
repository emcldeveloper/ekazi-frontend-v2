import { createCareerSummary } from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveCareerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCareerSummary,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
