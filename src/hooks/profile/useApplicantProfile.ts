import { getProfile } from "@/services/profile.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicantProfile = (enabled = true) => {
  return useQuery({
    queryFn: getProfile,
    queryKey: ["applicant-profile"],
    enabled,
  });
};
