import { jobsByIndustry } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobsByIndustry = () => {
  return useQuery({
    queryFn: jobsByIndustry,
    queryKey: ["jobs"],
  });
};
