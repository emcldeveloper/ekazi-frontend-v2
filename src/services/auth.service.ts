import type {
  ChangePasswordPayload,
  DeactivatePayload,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResendCodePayload,
  ResetPasswordPayload,
  VerifyAccountPayload,
} from "@/@types/auth";
import api from "@/lib/axios";

export const register = async (payload: RegisterPayload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const verifyAccount = async (payload: VerifyAccountPayload) => {
  const res = await api.post(`/auth/verify`, payload);
  return res.data;
};

export const resendVerificationCode = async (payload: ResendCodePayload) => {
  const res = await api.post("/auth/resend-verification", payload);
  return res.data;
};

export const login = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const res = await api.post("/auth/reset-password", payload);
  return res.data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const res = await api.post("/auth/password-new", payload);
  return res.data;
};

// change password after login
export const changePassword = async (payload: ChangePasswordPayload) => {
  const res = await api.post("/auth/change-password", payload);
  return res.data;
};

export const deactivateAccount = async (payload: DeactivatePayload) => {
  const res = await api.post("/auth/deactivate-account", payload);
  return res.data;
};

export const deleteAccount = async (payload: DeactivatePayload) => {
  const res = await api.post("/auth/delete-account", payload);
  return res.data;
};

export const getUser = async () => {
  const res = await api.get(`/auth/user`);
  return res.data?.data;
};
