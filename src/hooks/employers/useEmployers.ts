import { fetchEmployers } from "@/services/employers.service";
import { useQuery } from "@tanstack/react-query";

export const useEmployers = ({ page = 1, limit = 25, search = "" }) => {
  return useQuery({
    queryFn: () => fetchEmployers({ page, limit, search }),
    queryKey: ["employers", page, limit, search],
  });
};
