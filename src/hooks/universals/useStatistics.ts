import { fetchStatistics } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useStatistics = () =>
  useQuery({
    queryFn: fetchStatistics,
    queryKey: ["site-statistics"],
  });
