import api from "@/lib/axios";

export const featuredCandidates = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get(`/featured`, {
    params: { page, limit, search },
  });
  return res.data;
};

export const featuredCandidate = async (id: number) => {
  const res = await api.get(`/featured/${id}`);
  return res.data?.data;
};

export const fetchRatingsApi = async (id: number) => {
  const res = await api.get("/ratings", {
    params: { id },
  });
  return res.data;
};

export const createRatingApi = async (id: number, rate: number) => {
  const res = await api.post("/ratings", {
    id,
    rate,
  });
  return res.data;
};

export const addCandidateView = async (id: number) => {
  const res = await api.post("/applicant/feature-view", {
    applicant_id: id,
  });
  return res.data;
};
