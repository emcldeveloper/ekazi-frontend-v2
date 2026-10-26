import { getMatchedJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobMatch = () => {
  return useQuery({
    queryFn: getMatchedJobs,
    queryKey: ["matched-jobs"],
  });
};
