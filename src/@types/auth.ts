export type RegisterPayload = {
  firstname: string;
  middlename?: string;
  lastname: string;
  dob: string;
  gender_id: number;
  marital_status_id: number;
  country_id: number;
  region_id: number;
  phone: string;
  address: string;
  email: string;
  password: string;
  password_confirmation?: string;
  terms?: boolean;
};

export type VerifyAccountPayload = {
  token: string;
};

export type ResendCodePayload = {
  email: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  email: string;
  password: string;
  password_confirmation?: string;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  confirm_new_password?: string;
};

export type DeactivatePayload = {
  password: string;
};
