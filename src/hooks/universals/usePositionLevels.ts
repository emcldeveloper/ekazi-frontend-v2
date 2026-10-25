import { getPositionLevels } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const usePositionLevel = () =>
  useQuery({
    queryFn: getPositionLevels,
    queryKey: ["position-levels"],
  });
