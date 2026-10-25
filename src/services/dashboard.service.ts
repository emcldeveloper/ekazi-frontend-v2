import api from "@/lib/axios";

export const getDashboardStatistics = async (applicant_id: number) => {
  const res = await api.get(`/applicant/dashboardstatistics/${applicant_id}`);
  return res.data;
};
