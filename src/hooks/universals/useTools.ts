import { getTools } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useTools = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => getTools({ page, limit, search }),
    queryKey: ["tools", page, limit, search],
  });
