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
  /** A single file, sent as multipart `attachment` when present. */
  attachment?: File;
};

export type CorrespondenceCategory =
  | "stage"
  | "interview"
  | "issue"
  | "note"
  | "general";

export type CorrespondenceUser = {
  id: number;
  name?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_picture?: string | null;
  avatar?: string | null;
};

export type ThreadParticipantRecord = {
  id?: number;
  user_id: number;
  role?: string;
  participant_type?: string;
  username?: string;
  profile_picture?: string | null;
  last_read_at?: string | null;
  user?: CorrespondenceUser;
};

export type MessageAttachment = {
  id?: number;
  file_name?: string;
  file_path?: string;
  url?: string;
};

export type ThreadMessage = {
  id: number;
  thread_id?: number;
  sender_id?: number;
  sender_type?: string;
  attachments?: MessageAttachment[];
  user_id?: number;
  sender?: CorrespondenceUser;
  user?: CorrespondenceUser;
  message?: string;
  body?: string;
  category?: CorrespondenceCategory;
  subject?: string | null;
  reply_to_id?: number | null;
  read_at?: string | null;
  created_at: string;
  updated_at?: string;
};

export type CorrespondenceThread = {
  id: number;
  subject: string;
  job_id?: number | null;
  job?: {
    id: number;
    title?: string | null;
    job_title?: string | null;
    position?: string | null;
    company?: { id?: number; name?: string; company_name?: string } | null;
  } | null;
  participants?: ThreadParticipantRecord[];
  latest_message?: ThreadMessage | null;
  last_message?: ThreadMessage | null;
  unread_count?: number;
  created_at?: string;
  updated_at?: string;
};
