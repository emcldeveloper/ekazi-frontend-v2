import { getMaritalStatus } from "@/services/universals.service";
import { useQuery } from "@tanstack/react-query";

export const useMaritalStatus = () =>
  useQuery({
    queryFn: getMaritalStatus,
    queryKey: ["marital-status"],
  });
