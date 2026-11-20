export type CreateThreadPayload = {
  subject: string;
  job_id?: number;
  participants: ThreadParticipant[];
};

export type ThreadParticipant = {
  user_id: number;
  role?: string;
};

export type SendMessagePayload = {
  thread_id: number;
  message: string;
  category?: CorrespondenceCategory;
  subject?: string;
  reply_to_id?: number;
  meta?: Record<string, any>;
};

export type CorrespondenceCategory =
  | "stage"
  | "interview"
  | "issue"
  | "note"
  | "general";
