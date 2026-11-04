import { saveCvApi } from "@/services/cv-builder.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveCvApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-cv"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-cv"],
      });
    },
  });
};
