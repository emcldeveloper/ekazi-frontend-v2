import { gendersApi } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useGenders = () =>
  useQuery({
    queryFn: gendersApi,
    queryKey: ["genders"],
  });
