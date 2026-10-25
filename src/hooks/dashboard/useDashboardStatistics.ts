import { getDashboardStatistics } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStatistics = (applicant_id: number) => {
  return useQuery({
    queryFn: () => getDashboardStatistics(applicant_id),
    queryKey: ["dashboardStatistics", applicant_id],
    enabled: !!applicant_id,
  });
};
