import { articlesApi } from "@/services/articles.service";
import { useQuery } from "@tanstack/react-query";

export const useArticles = ({ page = 1, limit = 10, search = "" }) => {
  return useQuery({
    queryFn: () => articlesApi({ page, limit, search }),
    queryKey: ["articles", page, limit, search],
  });
};
