import { articlesApi } from "@/services/articles.service";
import { useQuery } from "@tanstack/react-query";

export const useArticles = ({
  page = 1,
  limit = 10,
  search = "",
  status = "published",
}) => {
  return useQuery({
    queryFn: () => articlesApi({ page, limit, search, status }),
    queryKey: ["articles", page, limit, search, status],
  });
};
