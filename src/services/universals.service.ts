import api from "@/lib/axios";

export const gendersApi = async () => {
  const res = await api.get("/genders");
  return res.data?.data;
};

export const getMaritalStatus = async () => {
  const res = await api.get("/marital-statuses");
  return res.data?.data;
};

export const getCountries = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/countries", {
    params: { page, limit, search },
  });
  return res.data?.data;
};

export const getCitizenships = async () => {
  const res = await api.get("/citizenships");
  return res.data?.data;
};

export const getRegions = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/regions", {
    params: { page, limit, search },
  });
  return res.data?.data;
};

export const fetchIndustries = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/industries", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const getPositions = async (page = 1, limit = 25, search = "") => {
  const res = await api.get("/positions", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res.data;
};

export const getPositionLevels = async () => {
  const res = await api.get("/position-levels");
  return res.data?.data;
};

export const getJobTypes = async () => {
  const res = await api.get("/job-types");
  return res.data?.data;
};

export const getSalaryRanges = async () => {
  const res = await api.get("/salary-ranges");
  return res.data?.data;
};

export const fetchStatistics = async () => {
  const res = await api.get("/site-statistics");
  return res.data;
};

export const getOrganizations = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/organizations", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const getCourses = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/courses", {
    params: {
      search,
      page,
      limit,
    },
  });

  return res?.data?.data;
};

export const getMajors = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/majors", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const getColleges = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/colleges", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const getEducationLevels = async () => {
  const res = await api.get("/education-levels");
  return res?.data?.data;
};

export const getTrainings = async () => {
  const res = await api.get("/trainings");
  return res.data?.data;
};

// universal experience apis
export const getExperienceTypes = async () => {
  const res = await api.get("/applicant/experiencetype");
  return res.data.data;
};

export const getCompanies = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/applicant/employer", {
    params: {
      page,
      limit,
      search,
    },
  });

  return res.data?.data;
};

/**
 * Universal language apis
 */
export const getLanguages = async () => {
  const res = await api.get("/languages");
  return res.data?.data;
};

export const languageRead = async () => {
  const res = await api.get("/language-reads");
  return res.data?.data;
};

export const languageWrite = async () => {
  const res = await api.get("/language-writes");
  return res.data?.data;
};

export const languageSpeak = async () => {
  const res = await api.get("/language-speaks");
  return res.data?.data;
};

export const languageUnderstand = async () => {
  const res = await api.get("/language-understands");
  return res.data?.data;
};

/**
 *
 */
export const getKnowledges = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/knowledge", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const getSoftwares = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/softwares", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const getTools = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/tools", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};
