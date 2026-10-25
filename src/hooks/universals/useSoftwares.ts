import { getSoftwares } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useSoftwares = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => getSoftwares({ page, limit, search }),
    queryKey: ["softwares", page, limit, search],
  });
