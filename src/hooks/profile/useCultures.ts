import { createCultures, getCultures } from "@/services/profile.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCultures = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => getCultures({ page, limit, search }),
    queryKey: ["culture", page, limit, search],
  });

export const useCreateCulture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCultures,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-profile"],
      });
    },
  });
};
