import { getArticle } from "@/services/articles.service";
import { useQuery } from "@tanstack/react-query";

export const useArticle = (id: number) => {
  return useQuery({
    queryFn: () => getArticle(id),
    queryKey: ["article-details", id],
    enabled: !!id,
  });
};
