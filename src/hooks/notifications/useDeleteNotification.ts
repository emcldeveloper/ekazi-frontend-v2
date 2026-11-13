import { deleteNotification } from "@/services/notifications.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNotification(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
