import type { CommentPayload } from "@/@types/articles";
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
  const res = await api.get("/blog-posts", {
    params: { page, limit, search },
  });
  return res.data;
};

export const getArticle = async (id: number) => {
  const res = await api.get(`/blog-posts/${id}`);
  return res.data?.data;
};

export const articleBySlugApi = async (slug: string) => {
  const res = await api.get(`/articles/${slug}`);
  return res.data;
};

export const createComment = async (id: number, payload: CommentPayload) => {
  const res = await api.post(`/articles/${id}/comments`, payload);
  return res.data;
};
