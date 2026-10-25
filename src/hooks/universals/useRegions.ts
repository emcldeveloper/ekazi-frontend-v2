import { getRegions } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useRegions = ({ page = 1, limit = 25, search = "" }) => {
  return useQuery({
    queryFn: () => getRegions({ page, limit, search }),
    queryKey: ["regions", search, page, limit],
  });
};
