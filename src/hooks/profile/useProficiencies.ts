import {
  createProficiency,
  deleteProficiency,
  getProficiencies,
  updateProficiency,
} from "@/services/profile.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProficiencies = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => getProficiencies({ page, limit, search }),
    queryKey: ["proficiency", page, limit, search],
  });

export const useCreateProficiency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProficiency,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useUpdateProficiency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateProficiency(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useDeleteProficiency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProficiency(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
