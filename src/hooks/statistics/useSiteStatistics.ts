import { siteStatistics } from "@/services/statistics.service";
import { useQuery } from "@tanstack/react-query";

export const useSiteStatistics = () =>
  useQuery({
    queryFn: siteStatistics,
    queryKey: ["site-statistics"],
  });
