import oldApi from "@/lib/axios-old";

export const createInsightApi = async () => {
  const res = await oldApi.post("/applicant/viewincrement");
  return res.data;
};

export const salaryDataApi = async () => {
  const res = await oldApi.get("/applicant/salar-calculator");
  return res.data.salarydata;
};

// export const salaryDataApi = async () => {
//   const res = await api.get("/tax-calculation");
//   return res.data.salarydata;
// };
