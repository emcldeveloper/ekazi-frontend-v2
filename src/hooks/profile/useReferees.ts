import {
  createReferee,
  deleteReferee,
  updateReferee,
} from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReferee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReferee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useUpdateReferee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      updateReferee(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};

export const useDeleteReferee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReferee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
