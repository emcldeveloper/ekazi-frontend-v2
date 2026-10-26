import { getApplicantPipeline } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicantPipeline = () => {
  return useQuery({
    queryFn: getApplicantPipeline,
    queryKey: ["applicant-pipeline"],
  });
};
