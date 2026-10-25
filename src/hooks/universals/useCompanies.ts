import { getCompanies } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useCompanies = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => getCompanies({ page, limit, search }),
    queryKey: ["companies"],
  });
