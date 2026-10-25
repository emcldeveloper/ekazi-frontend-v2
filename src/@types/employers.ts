export type EmployerMessagePayload = {
  client_id?: number;

  name: string;
  email: string;
  subject: string;
  message: string;
};

export type RateEmployerPayload = {
  client_id?: number;
  rating?: number;
  comment?: string;
};
