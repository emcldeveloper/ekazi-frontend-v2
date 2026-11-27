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

/** A file must go as multipart; plain text messages stay JSON. */
const toMessageFormData = ({
  attachment,
  meta,
  ...fields
}: SendMessagePayload) => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (meta) {
    Object.entries(meta).forEach(([key, value]) => {
      formData.append(`meta[${key}]`, String(value));
    });
  }

  if (attachment) formData.append("attachment", attachment);

  return formData;
};

export const sendThreadMessage = async (payload: SendMessagePayload) => {
  const body = payload.attachment ? toMessageFormData(payload) : payload;

  const res = await api.post(`/correspondence/messages`, body);
  return res.data;
};
