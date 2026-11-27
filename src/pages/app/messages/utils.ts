import type {
  CorrespondenceThread,
  CorrespondenceUser,
  ThreadMessage,
  MessageAttachment,
  ThreadParticipantRecord,
} from "@/@types/correspondences";
import { BASE_URL } from "@/config";
import { getFileUrl } from "@/utils/file-helpers";

const LIST_KEYS = ["data", "messages", "threads", "items", "rows"];

/**
 * The API may return a bare array, `{ data: [] }`, a paginated
 * `{ data: { data: [] } }` or a keyed `{ data: { messages: [] } }`.
 * Normalise all of them to an array.
 */
export const toList = <T>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];

  const data = (response as { data?: unknown } | undefined)?.data;
  if (Array.isArray(data)) return data as T[];

  if (data && typeof data === "object") {
    for (const key of LIST_KEYS) {
      const nested = (data as Record<string, unknown>)[key];
      if (Array.isArray(nested)) return nested as T[];
    }
  }

  return [];
};

/** Unwraps `{ data: {...} }` to the inner object. */
export const toItem = <T>(response: unknown): T | undefined => {
  if (!response || typeof response !== "object") return undefined;

  const data = (response as { data?: unknown }).data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data as T;
  }

  return response as T;
};

export const getUserName = (user?: CorrespondenceUser) => {
  if (!user) return "Unknown";

  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return user.name || fullName || user.username || user.email || "Unknown";
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

export const getUserImage = (user?: CorrespondenceUser) => {
  const path = user?.profile_picture || user?.avatar;
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;

  return `${BASE_URL}/${path.replace(/^\//, "")}`;
};

export const getSenderId = (message: ThreadMessage) =>
  message.sender_id ??
  message.user_id ??
  message.sender?.id ??
  message.user?.id;

export const getMessageText = (message?: ThreadMessage | null) =>
  message?.message ?? message?.body ?? "";

export const getLastMessage = (thread: CorrespondenceThread) =>
  thread.latest_message ?? thread.last_message ?? null;

/** The participant who isn't the current user (falls back to the first one). */
export const getCounterpart = (
  thread: CorrespondenceThread,
  currentUserId?: number,
) => {
  const participants = thread.participants ?? [];
  const other =
    participants.find((participant) => participant.user_id !== currentUserId) ??
    participants[0];

  return participantToUser(other);
};

/** Participants may carry a nested `user` or flat `username`/`profile_picture`. */
const participantToUser = (
  participant?: ThreadParticipantRecord,
): CorrespondenceUser | undefined => {
  if (!participant) return undefined;
  if (participant.user) return participant.user;

  return {
    id: participant.user_id,
    username: participant.username,
    profile_picture: participant.profile_picture,
  };
};

/** Finds a thread participant by user id. */
export const getParticipant = (
  thread: CorrespondenceThread | undefined,
  userId?: number,
) =>
  participantToUser(
    thread?.participants?.find((participant) => participant.user_id === userId),
  );

export const getJobTitle = (thread: CorrespondenceThread) =>
  (
    thread.job?.title ??
    thread.job?.job_title ??
    thread.job?.position
  )?.trim() || undefined;

export const getCompanyName = (thread: CorrespondenceThread) =>
  thread.job?.company?.name ?? thread.job?.company?.company_name;

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const formatTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatDayLabel = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
  });
};

/** Short label for the thread list: time today, otherwise the date. */
export const formatListTimestamp = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return isSameDay(date, new Date())
    ? formatTime(value)
    : formatDayLabel(value);
};

export const sortMessages = (messages: ThreadMessage[]) =>
  [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

export const sortThreads = (threads: CorrespondenceThread[]) =>
  [...threads].sort((a, b) => {
    const aTime = getLastMessage(a)?.created_at ?? a.updated_at ?? a.created_at;
    const bTime = getLastMessage(b)?.created_at ?? b.updated_at ?? b.created_at;

    return new Date(bTime ?? 0).getTime() - new Date(aTime ?? 0).getTime();
  });

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

/** Compact relative label for the inbox: "now", "5m", "3h", "2d", "80w". */
export const formatRelativeShort = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const diff = Math.max(0, Date.now() - date.getTime());

  if (diff < MINUTE) return "now";
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}m`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}h`;
  if (diff < WEEK) return `${Math.floor(diff / DAY)}d`;

  return `${Math.floor(diff / WEEK)}w`;
};

/** Separator label inside a conversation: "Today at 3:33 PM", "Dec 28, 2024 at 10:26 AM". */
export const formatSeparatorLabel = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const day = isSameDay(date, today)
    ? "Today"
    : isSameDay(date, yesterday)
      ? "Yesterday"
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

  return `${day} at ${formatTime(value)}`;
};

export const formatFileSize = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getAttachmentUrl = (attachment: MessageAttachment) =>
  getFileUrl(attachment.url ?? attachment.file_path);

export const getAttachmentName = (attachment: MessageAttachment) =>
  attachment.file_name ||
  (attachment.url ?? attachment.file_path ?? "").split("/").pop() ||
  "Attachment";

/** Inbox preview: the text, or a note when only files were sent. */
export const getMessagePreview = (message?: ThreadMessage | null) => {
  const text = getMessageText(message).trim();
  if (text) return text;

  const count = message?.attachments?.length ?? 0;
  if (count === 1) return "Sent an attachment";
  if (count > 1) return `Sent ${count} attachments`;

  return "";
};
