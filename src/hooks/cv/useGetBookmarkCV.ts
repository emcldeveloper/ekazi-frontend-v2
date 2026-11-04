import { getBookmarksApi } from "@/services/cv-builder.service";
import { useQuery } from "@tanstack/react-query";

export const useGetBookmarkCv = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarksApi(applicant_id),
    enabled: !!applicant_id,
  });
};
