import { salaryDataApi } from "@/services/calculator.service";
import { useQuery } from "@tanstack/react-query";

export const useSalaryData = () => {
  return useQuery({
    queryKey: ["salary-data"],
    queryFn: salaryDataApi,
  });
};
