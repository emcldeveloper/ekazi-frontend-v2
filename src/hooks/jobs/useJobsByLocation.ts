import { jobsByLocation } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobsByLocation = () => {
  return useQuery({
    queryFn: jobsByLocation,
    queryKey: ["jobs"],
  });
};
