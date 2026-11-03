import { getSavedJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useSavedJobs = ({
  page = 1,
  limit = 25,
  search = "",
  industry = "",
}) => {
  return useQuery({
    queryFn: () => getSavedJobs({ page, limit, search, industry }),
    queryKey: ["saved-jobs", page, limit, search, industry],
  });
};
