import { saveSoftwares } from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveSoftwares = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveSoftwares,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
