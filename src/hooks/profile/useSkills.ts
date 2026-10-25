import { saveSkills } from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
