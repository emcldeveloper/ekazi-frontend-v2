import { getApplicationStages } from "@/services/applications.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicationStages = () => {
  return useQuery({
    queryFn: getApplicationStages,
    queryKey: ["application-stages"],
  });
};
