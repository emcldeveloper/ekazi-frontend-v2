import { featuredCandidates } from "@/services/candidates.service";
import { useQuery } from "@tanstack/react-query";

export const useFeaturedCandidates = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => featuredCandidates({ page, limit, search }),
    queryKey: ["featured-candidates", page, limit, search],
  });
