import { getProfile } from "@/services/profile.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicantProfile = () => {
  return useQuery({
    queryFn: getProfile,
    queryKey: ["applicant-profile"],
  });
};
