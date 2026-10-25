import { getCourses } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useCourses = ({ search = "", page = 1, limit = 25 }) =>
  useQuery({
    queryFn: () => getCourses({ page, limit, search }),
    queryKey: ["courses", search, page, limit],
  });
