import { getCountries } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useCountries = ({ search = "", page = 1, limit = 25 }) => {
  return useQuery({
    queryKey: ["countries", search, page, limit],
    queryFn: () => getCountries({ search, page, limit }),
  });
};
