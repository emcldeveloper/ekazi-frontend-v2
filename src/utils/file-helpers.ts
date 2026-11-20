import { BASE_URL } from "@/config";

export const getFileUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  // Already a full URL (e.g. S3, Cloudinary), leave it alone
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export const getFileNameFromUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  const fullName = url.split("/").pop() as string;
  const dotIndex = fullName.lastIndexOf(".");
  if (dotIndex === -1) return fullName;

  const name = fullName.slice(0, dotIndex);
  const ext = fullName.slice(dotIndex);

  return name.length > 10 ? `${name.slice(0, 7)}...${ext}` : fullName;
};
