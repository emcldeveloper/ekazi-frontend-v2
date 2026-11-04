import cvApi from "@/lib/axios-cv";
import oldApi from "@/lib/axios-old";

export const getCvCountApi = async () => {
  const res = await oldApi.get("/applicant/getcvno");
  return res.data;
};

export const incrementCvCountApi = async (data: any) => {
  const res = await oldApi.post("/applicant/countcv", data);
  return res.data;
};

export const getCvProfileApi = async (applicantId: any) => {
  const res = await oldApi.get(`/cv/cv_builder/${applicantId}`);
  return res.data;
};

// GENERATE CV PDF
export const cvBuilderApi = async (applicantId: any) => {
  const res = await oldApi.get(`/cv/cv_builder/${applicantId}`);
  return res?.data;
};

export const generateCvPdf = async ({
  template,
  name,
  applicantId,
}: {
  template: any;
  name: any;
  applicantId: any;
}) => {
  const response = await cvApi.get("/generatePdf", {
    params: {
      template,
      name,
      applicantId,
    },
  });

  window.open(response.data.body.link, "_blank");

  return response.data;
};

/**
 * Save downloaded CVs
 */
export const saveCvApi = async (payload: any) => {
  const res = await oldApi.post("/applicant/savedCv", payload);
  return res.data;
};

/**
 * Fetch downloaded CVs
 */
export const getMyCvApi = async (applicantId: number) => {
  const res = await oldApi.get(`/applicant/mycv/${applicantId}`);

  return res.data;
};

/**
 * Delete downloaded CVs
 */
export const deleteCvApi = async (id: number) => {
  const res = await oldApi.delete(`/applicant/deletecv/${id}`);
  return res.data;
};

// Bookmark CV Templates
export const bookmarkApi = async (payload: any) => {
  const res = await oldApi.post("/cv/bookmarks", payload);
  return res.data;
};

export const getBookmarksApi = async (applicant_id: any) => {
  const res = await oldApi.get(`/cv/bookmarks/${applicant_id}`);
  return res.data;
};

// Bookmark CV Templates
export const downloadsApi = async (payload: any) => {
  const res = await oldApi.post("/cv/downloads", payload);
  return res.data;
};

export const getCvDownloadsApi = async (template_id: any) => {
  const res = await oldApi.get(`/cv/downloads/${template_id}`);
  return res.data;
};
