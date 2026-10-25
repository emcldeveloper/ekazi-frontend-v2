import { getMajors } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useMajors = ({ search = "", page = 1, limit = 25 }) =>
  useQuery({
    queryFn: () => getMajors({ page, limit, search }),
    queryKey: ["majors", search, page, limit],
  });
