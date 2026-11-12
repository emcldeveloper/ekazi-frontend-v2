import { getTermsConditions } from "@/services/settings.service";
import { useQuery } from "@tanstack/react-query";

export const useTermsConditions = () =>
  useQuery({
    queryFn: getTermsConditions,
    queryKey: ["site-statistics"],
  });
