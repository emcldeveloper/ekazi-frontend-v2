import { getSalaryRanges } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useSalaryRanges = () =>
  useQuery({
    queryFn: getSalaryRanges,
    queryKey: ["salary-ranges"],
  });
