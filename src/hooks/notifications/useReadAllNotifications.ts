import { readAllNotifications } from "@/services/notifications.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReadAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readAllNotifications,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
