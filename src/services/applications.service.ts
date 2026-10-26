import api from "@/lib/axios";

export const getApplications = async () => {
  const res = await api.get(`/applicant/my-application`);
  return res.data;
};

export const getApplicationStages = async () => {
  const res = await api.get(`/stages`);
  return res.data?.data;
};

export const interviewResponse = async (payload: any) => {
  const res = await api.post(`/applicant/interview/response`, payload);
  return res.data;
};

export const offerResponse = async (payload: any) => {
  const res = await api.post(`/applicant/offer/response`, payload);
  return res.data;
};

export const counterOffer = async (payload: any) => {
  const res = await api.post(`/applicant/counter-offers`, payload);
  return res.data;
};
