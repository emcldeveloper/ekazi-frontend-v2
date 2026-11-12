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

export const incrementJobView = async (id: number) => {
  const res = await api.post(`/jobs/${id}/increment-view`);
  return res.data;
};

export const saveJob = async (payload: any) => {
  const res = await api.post("/applicant/saved-jobs", payload);
  return res.data;
};

export const getSavedJobs = async ({
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
  const res = await api.get("/applicant/saved-jobs", {
    params: {
      page,
      limit,
      search,
      industry,
    },
  });
  return res.data;
};

export const getMatchedJobs = async ({
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
  const res = await api.get(`/applicant/matched-jobs`, {
    params: {
      page,
      limit,
      search,
      industry,
    },
  });
  return res.data;
};

export const getJobMatchData = async (jobId: number) => {
  const res = await api.get(`/applicant/profile-match`, {
    params: {
      jobId,
    },
  });
  return res.data?.data;
};

export const applyJobInternal = async (payload: {
  jobId: number;
  notes: string;
}) => {
  const res = await api.post("/application/apply-job", payload);
  return res.data;
};

export const applyJobEmail = async (payload: any) => {
  const res = await api.post("/application/apply-by-emails", payload);
  return res.data;
};
