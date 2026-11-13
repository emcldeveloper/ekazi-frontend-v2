import { readNotification } from "@/services/notifications.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => readNotification(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
