import { getSavedJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useSavedJobs = () => {
  return useQuery({
    queryFn: getSavedJobs,
    queryKey: ["saved-jobs"],
  });
};
