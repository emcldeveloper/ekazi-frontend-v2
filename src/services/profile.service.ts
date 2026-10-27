import type { PersonalInfoPayload } from "@/@types/profile/personal-info";
import type {
  CulturesPayload,
  ExperiencePayload,
  LanguagePayload,
  PersonalitiesPayload,
  RefereePayload,
  SkillsPayload,
  SoftwarePayload,
  ToolsPayload,
} from "@/@types/profile/profile";
import api from "@/lib/axios";

/**
 * Check Profile Completeion
 */
export const profileCompletion = async () => {
  const res = await api.get("/applicant/complete");
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/applicant/my-profile");
  return res.data?.data;
};

// Personal Information
export const updatePersonalInfo = async (payload: PersonalInfoPayload) => {
  const res = await api.put("/applicant/personinformation", payload);
  return res.data;
};

export const uploadProfileImage = async (formData: FormData) => {
  const res = await api.post("/applicant/profileimagesave", formData);
  return res.data;
};

export const uploadBackgroundImage = async (formData: FormData) => {
  const res = await api.post("/applicant/backgroundimagesave", formData);
  return res.data;
};

// Career / About
export const createCareerSummary = async (payload: { career: string }) => {
  const res = await api.post(`/applicant/career-profile`, payload);
  return res.data;
};

// Objectives
export const createCareerObjective = async (payload: { objective: string }) => {
  const res = await api.post(`/applicant/objectives`, payload);
  return res.data;
};

// Experience
export const createExperience = async (payload: ExperiencePayload) => {
  const res = await api.post("/applicant/experiencestore", payload);
  return res.data;
};

export const updateExperience = async (
  id: number,
  payload: ExperiencePayload,
) => {
  const res = await api.post(`/applicant/updateexperience/${id}`, payload);
  return res.data;
};

export const deleteExperience = async (id: number) => {
  const res = await api.delete(`/applicant/deleteexperience/${id}`);
  return res.data;
};

/**
 * Education apis
 */
export const createEducation = async (payload: FormData) => {
  const res = await api.post("/applicant/educations", payload);
  return res.data;
};

export const updateEducation = async (id: number, payload: FormData) => {
  const res = await api.patch(`/applicant/educations/${id}`, payload);
  return res.data;
};

export const deleteEducation = async (id: number) => {
  const res = await api.delete(`/applicant/educations/${id}`);
  return res?.data;
};

/**
 * Language apis
 * */
export const createLanguage = async (payload: LanguagePayload) => {
  const res = await api.post("/applicant/languages", payload);
  return res.data;
};

export const updateLanguage = async (id: number, payload: LanguagePayload) => {
  const res = await api.patch(`/applicant/languages/${id}`, payload);
  return res.data;
};

export const deleteLanguage = async (id: number) => {
  const res = await api.delete(`/applicant/languages/${id}`);
  return res.data;
};

/**
 * Skills APIs
 */
export const saveSkills = async (payload: SkillsPayload) => {
  const { data } = await api.post("/applicant/knowledges", payload);
  return data;
};

/**
 * Software APIs
 */
export const saveSoftwares = async (payload: SoftwarePayload) => {
  const { data } = await api.post("/applicant/softwares", payload);
  return data;
};

export const saveTools = async (payload: ToolsPayload) => {
  const { data } = await api.post("/applicant/tools", payload);
  return data;
};

/**
 * Personalities APIs
 */
export const getPersonalities = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/personalities", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const savePersonalities = async (payload: PersonalitiesPayload) => {
  const res = await api.post("/applicant/personalities", payload);
  return res.data;
};

export const getCultures = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/cultures", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const createCultures = async (payload: CulturesPayload) => {
  const res = await api.post("/applicant/cultures", payload);
  return res.data;
};

/**
 * Proficiency
 */
export const getProficiencies = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/proficiencies", {
    params: {
      search,
      page,
      limit,
    },
  });
  return res?.data?.data;
};

export const createProficiency = async (payload: FormData) => {
  const res = await api.post("/applicant/proficiencies", payload);
  return res.data;
};

export const updateProficiency = async (id: number, payload: FormData) => {
  const res = await api.patch(`/applicant/proficiencies/${id}`, payload);
  return res.data;
};

export const deleteProficiency = async (id: number) => {
  const response = await api.delete(`/applicant/proficiencies/${id}`);
  return response.data;
};

/**
 * Training
 */
export const getTrainings = async () => {
  const res = await api.get("/trainings");
  return res.data?.data;
};

export const createTraining = async (payload: FormData) => {
  const res = await api.post("/applicant/trainings", payload);
  return res.data;
};

export const updateTraining = async (id: number, payload: FormData) => {
  const res = await api.post(`/applicant/trainings/${id}`, payload);
  return res.data;
};

export const deleteTraining = async (id: number) => {
  const res = await api.delete(`/applicant/trainings/${id}`);
  return res.data;
};

/**
 * Referees
 */
export const createReferee = async (payload: RefereePayload) => {
  const res = await api.post("/applicant/referees", payload);
  return res.data;
};

export const updateReferee = async (id: number, payload: RefereePayload) => {
  const res = await api.patch(`/applicant/referees/${id}`, payload);
  return res.data;
};

export const deleteReferee = async (id: number) => {
  const response = await api.delete(`/applicant/referees/${id}`);
  return response.data;
};
