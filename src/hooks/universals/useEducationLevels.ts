import { getEducationLevels } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useEducationLevels = () =>
  useQuery({
    queryFn: getEducationLevels,
    queryKey: ["education-levels"],
  });
