import type { IncrementJobViewPayload } from "@/@types/jobs";
import api from "@/lib/axios";

export const fetchJobs = async ({
  page,
  limit,
  search,
  industry,
}: {
  page: number;
  limit: number;
  search: string;
  industry: string;
}) => {
  const res = await api.get("/jobs", {
    params: {
      page,
      limit,
      search,
      industry,
    },
  });

  return res.data;
};

export const fetchEmployerJobs = async ({
  page,
  limit,
  search,
  industry,
}: {
  page: number;
  limit: number;
  search: string;
  industry: string;
}) => {
  const res = await api.get("/employer/jobs", {
    params: {
      page,
      limit,
      search,
      industry,
    },
  });

  return res.data;
};

export const incrementJobView = async (payload: IncrementJobViewPayload) => {
  const res = await api.post("/applicant/jobView", payload);
  return res.data;
};

export const saveJob = async (payload: any) => {
  const res = await api.post("/applicant/cartJobs", payload);
  return res.data;
};

export const getJobsMatch = async (applicant_id: number) => {
  const res = await api.get(`/applicant/job_match`, {
    params: { id: applicant_id },
  });
  return res.data;
};
