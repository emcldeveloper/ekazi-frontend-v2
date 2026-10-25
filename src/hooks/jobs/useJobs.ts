import { fetchJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobs = ({
  page = 1,
  limit = 25,
  search = "",
  industry = "",
}) => {
  return useQuery({
    queryKey: ["jobs", page, limit, search, industry],
    queryFn: () =>
      fetchJobs({
        page,
        limit,
        search,
        industry,
      }),
  });
};
