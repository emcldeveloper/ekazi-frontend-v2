import { articlesApi } from "@/services/articles.service";
import { useQuery } from "@tanstack/react-query";

export const useArticles = ({ page = 1, limit = 10, search = "" }) => {
  return useQuery({
    queryKey: ["articles", page, limit, search],
    queryFn: () => articlesApi({ page, limit, search }),
  });
};
