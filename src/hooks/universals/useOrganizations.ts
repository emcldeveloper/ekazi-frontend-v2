import { getOrganizations } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useOrganizations = ({ page = 1, limit = 25, search = "" }) => {
  return useQuery({
    queryFn: () => getOrganizations({ page, limit, search }),
    queryKey: ["organizations", page, limit, search],
  });
};
