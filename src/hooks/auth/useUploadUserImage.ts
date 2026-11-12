import { uploadUserImage } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useUploadUserImage = () => {
  return useMutation({
    mutationFn: uploadUserImage,
  });
};
