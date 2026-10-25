import { getKnowledges } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useKnowledges = ({ page = 1, limit = 25, search = "" }) =>
  useQuery({
    queryFn: () => getKnowledges({ page, limit, search }),
    queryKey: ["knowledges", page, limit, search],
  });
