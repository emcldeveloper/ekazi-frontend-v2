import api from "@/lib/axios";

export const getDashboardStatistics = async () => {
  const res = await api.get(`/applicant/dashboard`);
  return res.data;
};

export const getApplicantPipeline = async () => {
  const res = await api.get(`/applicant/application-pipeline`);
  return res.data?.applicant_pipeline;
};
