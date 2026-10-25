import { fetchIndustries } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useIndustries = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => fetchIndustries({ page, limit, search }),
    queryKey: ["industries"],
  });
