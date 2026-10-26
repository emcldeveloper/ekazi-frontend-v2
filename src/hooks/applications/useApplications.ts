import { getApplications } from "@/services/applications.service";
import { useQuery } from "@tanstack/react-query";

export const useApplications = () => {
  return useQuery({
    queryFn: getApplications,
    queryKey: ["applications"],
  });
};
