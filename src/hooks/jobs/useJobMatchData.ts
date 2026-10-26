import { getJobMatchData } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobMatchData = ({
  applicantId,
  jobId,
}: {
  applicantId: number;
  jobId: number;
}) => {
  return useQuery({
    queryFn: () => getJobMatchData(applicantId, jobId),
    queryKey: ["job-match-data", applicantId, jobId],
    enabled: !!applicantId && !!jobId,
  });
};
