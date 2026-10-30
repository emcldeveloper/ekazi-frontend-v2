import type { ContactPayload, RequestDemoPayload } from "@/@types/contact";
import api from "../lib/axios";

export const contactUs = async (payload: ContactPayload) => {
  const res = await api.post("/contact", payload);

  return res.data;
};

export const requestDemo = async (payload: RequestDemoPayload) => {
  const res = await api.post("/request-demo", payload);
  return res.data;
};
