import type {
  EmployerMessagePayload,
  RateEmployerPayload,
} from "@/@types/employers";
import api from "@/lib/axios";

export const fetchEmployers = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/featured-employers", {
    params: {
      page,
      limit,
      search,
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
