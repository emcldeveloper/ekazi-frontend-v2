import { getJobsMatch } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobMatch = (applicant_id: number) => {
  return useQuery({
    queryFn: () => getJobsMatch(applicant_id),
    queryKey: ["job-match", applicant_id],
    enabled: !!applicant_id,
  });
};
