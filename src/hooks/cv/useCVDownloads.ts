import { downloadsApi } from "@/services/cv-builder.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCvDownloads = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => downloadsApi(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["downloads"] });
    },
  });
};
