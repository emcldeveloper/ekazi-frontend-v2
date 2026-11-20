import { uploadUserImage } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadUserImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadUserImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
