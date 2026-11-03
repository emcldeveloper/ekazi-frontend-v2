import { getPositions } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const usePositions = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => getPositions(page, limit, search),
    queryKey: ["position", search, page, limit],
  });
