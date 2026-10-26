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

export const getJobDetails = async (id: number) => {
  const res = await api.get(`/jobs/${id}`);
  return res.data?.data;
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

export const getSavedJobs = async () => {
  const res = await api.get("/applicant/saved-jobs");
  return res.data;
};

export const getMatchedJobs = async () => {
  const res = await api.get(`/applicant/job_match`);
  return res.data;
};

export const getJobMatchData = async (applicantId: number, jobId: number) => {
  const res = await api.get(`/applicant/jobmatchData/${applicantId}/${jobId}`);
  return res.data?.data;
};

export const applyJobInternal = async (payload: any) => {
  const res = await api.post("/applicant/jobInternalApplication", payload);
  return res.data;
};
