import { getExperienceTypes } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useExperienceType = () =>
  useQuery({
    queryFn: getExperienceTypes,
    queryKey: ["experience-types"],
  });
