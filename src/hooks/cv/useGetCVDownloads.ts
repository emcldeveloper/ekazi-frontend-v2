import { getCvDownloadsApi } from "@/services/cv-builder.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCvDownloads = (template_id: any) => {
  return useQuery({
    queryKey: ["downloads"],
    queryFn: () => getCvDownloadsApi(template_id),
  });
};
