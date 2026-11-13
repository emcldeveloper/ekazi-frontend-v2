import { getNotifications } from "@/services/notifications.service";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = ({ page = 1, limit = 25, search = "" }) => {
  return useQuery({
    queryFn: () =>
      getNotifications({
        page,
        limit,
        search,
      }),
    queryKey: ["notifications", page, limit, search],
  });
};
