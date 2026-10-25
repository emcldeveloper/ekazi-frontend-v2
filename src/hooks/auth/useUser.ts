import { getUser } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
};
