import { saveTools } from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveTools = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveTools,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
