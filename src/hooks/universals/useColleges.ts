import { getColleges } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useColleges = ({ search = "", page = 1, limit = 25 }) =>
  useQuery({
    queryFn: () => getColleges({ page, limit, search }),
    queryKey: ["colleges", search, page, limit],
  });
