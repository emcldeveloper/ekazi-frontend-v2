import { getJobDetails } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobDetails = (id: number) => {
  return useQuery({
    queryFn: () => getJobDetails(id),
    queryKey: ["job-details", id],
    enabled: !!id,
  });
};
