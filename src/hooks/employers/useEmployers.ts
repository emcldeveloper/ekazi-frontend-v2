import { fetchEmployers } from "@/services/employers.service";
import { useQuery } from "@tanstack/react-query";

export const useEmployers = ({ page = 1, limit = 25 }) => {
  return useQuery({
    queryFn: () => fetchEmployers({ page, limit }),
    queryKey: ["employers", page, limit],
  });
};
