import { getDashboardStatistics } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStatistics = () => {
  return useQuery({
    queryFn: getDashboardStatistics,
    queryKey: ["dashboard-statistics"],
  });
};
