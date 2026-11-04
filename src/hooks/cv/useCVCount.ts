import { getCvCountApi } from "@/services/cv-builder.service";
import { useQuery } from "@tanstack/react-query";

export const useCVCount = () =>
  useQuery({
    queryKey: ["cv-count"],
    queryFn: getCvCountApi,
  });
