import { getThreads } from "@/services/correspondence.service";
import { useQuery } from "@tanstack/react-query";

export const useThreads = () => {
  return useQuery({
    queryKey: ["correspondence-threads"],
    queryFn: getThreads,
  });
};
