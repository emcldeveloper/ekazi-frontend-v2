import { getJobMatchData } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobMatchData = (jobId: number) => {
  return useQuery({
    queryFn: () => getJobMatchData(jobId),
    queryKey: ["job-match-data", jobId],
    enabled: !!jobId,
  });
};
