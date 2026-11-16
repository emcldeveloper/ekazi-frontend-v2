import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Eye } from "lucide-react";
import { IMG_BASE } from "@/config";

interface Article {
  id: number | string;
  title: string;
  description?: string | null;
  category?: string | { name: string } | null;
  featured_image?: string | null;
  created_at?: string;
  slug?: string;
  views?: number | string;
}

interface ArticleCardProps {
  article: Article;
}

const formatDate = (date?: string) => {
  if (!date) return "";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const articleUrl = `/articles/${article.slug || article.id}`;

  const imageUrl = article.featured_image
    ? `${IMG_BASE.replace(/\/$/, "")}/${article.featured_image.replace(/^\//, "")}`
    : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-lg sm:p-4">
      <Link
        to={articleUrl}
        className="relative block aspect-video overflow-hidden rounded-lg bg-gray-100"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-orange-50 text-Orange">
            <span className="text-sm font-semibold">Ekazi Articles</span>
          </div>
        )}

        <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/95 text-gray-900 opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <div className="mt-auto mb-4 flex items-center justify-between gap-2 pt-5">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <CalendarDays size={13} />
            {formatDate(article.created_at)}
          </span>

          <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            <Eye className="size-4" />
            {Number(article.views || 0).toLocaleString()}
          </div>
        </div>

        <Link to={articleUrl}>
          <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-Orange sm:text-lg">
            {article.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
          {article.description ||
            "Explore helpful career insights, practical advice, and tips to grow professionally."}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <Link
            to={articleUrl}
            aria-label={`Read ${article.title}`}
            className="flex items-center gap-1 text-xs font-semibold text-Orange transition-colors hover:text-Blue"
          >
            Read article
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
