import {
  createRatingApi,
  fetchRatingsApi,
} from "@/services/candidates.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRatings = (id: number) => {
  return useQuery({
    queryKey: ["ratings", id],
    queryFn: () => fetchRatingsApi(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateRating = (id: number, rate: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createRatingApi(id, rate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
    },
  });
};
