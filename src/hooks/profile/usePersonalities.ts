import {
  getPersonalities,
  savePersonalities,
} from "@/services/profile.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePersonalities = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => getPersonalities({ page, limit, search }),
    queryKey: ["personalities", page, limit, search],
  });

export const useSavePersonalities = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePersonalities,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
