import { profileCompletion } from "@/services/profile.service";
import { useQuery } from "@tanstack/react-query";

export const useCompleteProfile = () => {
  return useQuery({
    queryFn: profileCompletion,
    queryKey: ["profile-completion"],
  });
};
