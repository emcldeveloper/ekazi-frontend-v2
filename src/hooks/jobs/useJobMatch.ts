import { getMatchedJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobMatch = ({
  page = 1,
  limit = 10,
  search = "",
  industry = "",
}) => {
  return useQuery({
    queryFn: () => getMatchedJobs({ page, limit, search, industry }),
    queryKey: ["matched-jobs", page, limit, search, industry],
  });
};
