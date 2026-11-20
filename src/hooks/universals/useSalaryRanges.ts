import { getSalaryRanges } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useSalaryRanges = ({ search = "", page = 1, limit = 25 }) =>
  useQuery({
    queryFn: () =>
      getSalaryRanges({
        search,
        page,
        limit,
      }),
    queryKey: ["salary-ranges", search, page, limit],
  });
