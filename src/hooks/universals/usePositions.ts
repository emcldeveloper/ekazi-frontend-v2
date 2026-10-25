import { getPositions } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const usePositions = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryKey: ["position", search, page, limit],
    queryFn: () => getPositions(page, limit, search),
  });
