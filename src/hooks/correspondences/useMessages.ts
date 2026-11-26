import { threadMessages } from "@/services/correspondence.service";
import { useQuery } from "@tanstack/react-query";

export const useMessages = (threadId?: number) => {
  return useQuery({
    queryKey: ["correspondence-messages", threadId],
    queryFn: () => threadMessages(threadId as number),
    enabled: !!threadId,
  });
};
