import api from "@/lib/axios";

export const getTermsConditions = async () => {
  const res = await api.get("/term-conditions");
  return res.data?.data;
};
