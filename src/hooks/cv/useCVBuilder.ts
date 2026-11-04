import { cvBuilderApi } from "@/services/cv-builder.service";
import { useQuery } from "@tanstack/react-query";

export function useCVBuilder(applicantId: number) {
  return useQuery({
    queryFn: () => cvBuilderApi(applicantId),
    queryKey: ["cv-builder", applicantId],
    enabled: !!applicantId,
  });
}
