import { articleBySlugApi } from "@/services/articles.service";
import { useQuery } from "@tanstack/react-query";

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => articleBySlugApi(slug),
    enabled: !!slug,
  });
};
