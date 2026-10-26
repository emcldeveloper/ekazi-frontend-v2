import {
  counterOffer,
  interviewResponse,
  offerResponse,
} from "@/services/applications.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Interview response hook
export const useInterviewResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: interviewResponse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-details"],
      });
    },
  });
};

// Offer response hook
export const useOfferResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: offerResponse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-details"],
      });
    },
  });
};

// Offer response hook
export const useCounterOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: counterOffer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-details"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-offers"],
      });
    },
  });
};
