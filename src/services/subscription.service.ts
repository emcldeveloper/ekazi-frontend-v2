import api from "@/lib/axios";
import oldApi from "@/lib/axios-old";

export const initiatePayment = async (payload: {
  plan_id: number;
  phone: string;
}) => {
  const res = await api.post("/payment/initiate", payload);
  return res.data;
};

export const createSubscriptionApi = async (payload: any) => {
  const res = await oldApi.post("/applicant/accountsubscription", payload);

  return res.data;
};

export const getSubscriptionApi = async (applicant_id: any) => {
  const res = await oldApi.get(
    `/applicant/accountsubscriptionStatus/${applicant_id}`,
  );

  return res.data;
};

export const getSubscriptions = async (applicant_id: any) => {
  const res = await oldApi.get(`/applicant/CvSubscriptiondata/${applicant_id}`);

  return res.data;
};

//
export const subscriptionPlansApi = async () => {
  const res = await oldApi.get("/subscription-plans");

  return res.data;
};
