import { featuredCandidate } from "@/services/candidates.service";
import { useQuery } from "@tanstack/react-query";

export const useCandidatesDetails = (id: number) =>
  useQuery({
    queryFn: () => featuredCandidate(id),
    queryKey: ["candidate-details", id],
    enabled: !!id,
  });
