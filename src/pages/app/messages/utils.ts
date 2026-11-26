import type {
  CorrespondenceThread,
  CorrespondenceUser,
  ThreadMessage,
} from "@/@types/correspondences";
import { BASE_URL } from "@/config";

/**
 * The API may return a bare array, `{ data: [] }` or a paginated
 * `{ data: { data: [] } }`. Normalise all of them to an array.
 */
export const toList = <T>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];

  const data = (response as { data?: unknown } | undefined)?.data;
  if (Array.isArray(data)) return data as T[];

  const nested = (data as { data?: unknown } | undefined)?.data;
  if (Array.isArray(nested)) return nested as T[];

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
  message.sender_id ?? message.user_id ?? message.sender?.id ?? message.user?.id;

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

  return other?.user;
};

export const getJobTitle = (thread: CorrespondenceThread) =>
  thread.job?.title ?? thread.job?.job_title;

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

  return isSameDay(date, new Date()) ? formatTime(value) : formatDayLabel(value);
};

export const sortMessages = (messages: ThreadMessage[]) =>
  [...messages].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

export const sortThreads = (threads: CorrespondenceThread[]) =>
  [...threads].sort((a, b) => {
    const aTime = getLastMessage(a)?.created_at ?? a.updated_at ?? a.created_at;
    const bTime = getLastMessage(b)?.created_at ?? b.updated_at ?? b.created_at;

    return new Date(bTime).getTime() - new Date(aTime).getTime();
  });
