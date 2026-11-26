import { getSingleThread } from "@/services/correspondence.service";
import { useQuery } from "@tanstack/react-query";

export const useSingleThread = (id?: number) => {
  return useQuery({
    queryKey: ["correspondence-thread", id],
    queryFn: () => getSingleThread(id as number),
    enabled: !!id,
  });
};
