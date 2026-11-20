import type {
  CreateThreadPayload,
  SendMessagePayload,
} from "@/@types/correspondences";
import api from "@/lib/axios";

export const createThread = async (payload: CreateThreadPayload) => {
  const res = await api.post("/correspondence/threads", payload);
  return res.data;
};

export const getThreads = async () => {
  const res = await api.get("/correspondence/threads");
  return res.data;
};

export const getSingleThread = async (id: number) => {
  const res = await api.get(`/correspondence/threads/${id}`);
  return res.data;
};

export const threadMessages = async (threadId: number) => {
  const res = await api.get(`/correspondence/threads/${threadId}/messages`);
  return res.data;
};

export const sendThreadMessage = async (
  threadId: number,
  payload: SendMessagePayload,
) => {
  const res = await api.post(
    `/correspondence/threads/${threadId}/messages`,
    payload,
  );
  return res.data;
};
