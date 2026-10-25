import { fetchEmployerJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useEmployerJobs = ({
  page = 1,
  limit = 25,
  search = "",
  industry = "",
}) => {
  return useQuery({
    queryKey: ["jobs", page, limit, search, industry],
    queryFn: () =>
      fetchEmployerJobs({
        page,
        limit,
        search,
        industry,
      }),
  });
};
