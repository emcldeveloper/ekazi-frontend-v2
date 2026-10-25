import api from "../lib/axios";

export const createInsightApi = async () => {
  const res = await api.post("/applicant/viewincrement");
  return res.data;
};

export const salaryDataApi = async () => {
  const res = await api.get("/applicant/salar-calculator");
  return res.data.salarydata;
};
