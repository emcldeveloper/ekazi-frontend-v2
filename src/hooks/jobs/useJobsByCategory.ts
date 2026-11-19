import { jobsByCategory } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobsByCategory = () => {
  return useQuery({
    queryFn: jobsByCategory,
    queryKey: ["jobs"],
  });
};
