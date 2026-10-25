import type {
  EmployerMessagePayload,
  RateEmployerPayload,
} from "@/@types/employers";
import api from "@/lib/axios";

export const fetchEmployers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await api.get("/list-of-employer", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
};

export const sendEmployerMessage = async (payload: EmployerMessagePayload) => {
  const res = await api.post("/employer/message", payload);
  return res.data;
};

export const rateEmployer = async (payload: RateEmployerPayload) => {
  const res = await api.post("/employer/rate", payload);
  return res.data;
};
