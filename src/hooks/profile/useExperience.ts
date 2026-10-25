import type { ExperiencePayload } from "@/@types/profile/profile";
import {
  createExperience,
  deleteExperience,
  updateExperience,
} from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ExperiencePayload }) =>
      updateExperience(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
