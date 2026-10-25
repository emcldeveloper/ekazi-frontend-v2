import api from "../lib/axios";

export const articlesApi = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const res = await api.get("/articles", {
    params: { page, limit, search },
  });
  return res.data;
};

export const articleBySlugApi = async (slug: string) => {
  const res = await api.get(`/articles/${slug}`);
  return res.data;
};

export const createComment = async (id: number, payload: any) => {
  const res = await api.post(`/articles/${id}/comments`, payload);
  return res.data;
};
