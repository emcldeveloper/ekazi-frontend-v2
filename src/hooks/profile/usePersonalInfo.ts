import {
  updatePersonalInfo,
  uploadBackgroundImage,
  uploadProfileImage,
} from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSavePersonalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePersonalInfo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant_profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["personal-info"],
      });
    },
  });
};

export const useSaveBackgroundImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadBackgroundImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant_profile"],
      });
    },
  });
};

export const useSaveProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant_profile"],
      });
    },
  });
};
