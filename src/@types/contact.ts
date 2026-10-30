export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export interface RequestDemoPayload {
  company: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  session: string;
  startDate: Date;
  endDate: Date;
}
