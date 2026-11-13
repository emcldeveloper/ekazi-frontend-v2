import api from "@/lib/axios";

export const getNotifications = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/applicant/notifications", {
    params: {
      page,
      limit,
      search,
    },
  });
  return res.data;
};

export const getNotification = async (id: number) => {
  const res = await api.get(`/applicant/notifications/${id}`);
  return res.data?.data;
};

export const deleteNotification = async (id: number) => {
  const res = await api.delete(`/applicant/notifications/${id}`);
  return res.data?.data;
};

export const readAllNotifications = async () => {
  const res = await api.post("/applicant/notifications/read-all");
  return res.data;
};

export const readNotification = async (id: number) => {
  const res = await api.patch(`/applicant/notifications/${id}/read`);
  return res.data?.data;
};
