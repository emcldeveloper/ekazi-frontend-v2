import {
  createTraining,
  deleteTraining,
  updateTraining,
} from "@/services/profile.service";
import { getTrainings } from "@/services/universals.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTrainings = () =>
  useQuery({
    queryFn: getTrainings,
    queryKey: ["trainings"],
  });

export const useCreateTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTraining,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useUpdateTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateTraining(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useDeleteTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTraining(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
