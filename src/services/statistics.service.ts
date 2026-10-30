import api from "@/lib/axios";

export const siteStatistics = async () => {
  const res = await api.get("/stats");
  return res.data?.data;
};
