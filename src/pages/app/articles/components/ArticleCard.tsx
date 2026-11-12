import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IMG_BASE } from "@/config";
import { formatDate } from "@/utils/helpers";
import { ArrowRight, BookOpen, CalendarDays, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const stripHtml = (html: string) => {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
};

interface ArticleCardProps {
  article: any;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = article.featured_image
    ? `${IMG_BASE.replace(/\/$/, "")}/${article.featured_image.replace(/^\//, "")}`
    : null;

  const preview = stripHtml(article.excerpt || article.content || "");

  const isPublished = article.status === "published";

  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden rounded-2xl py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50">
      {/* Featured image */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={article.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-slate-100 via-slate-50 to-indigo-50">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-white bg-white/80 shadow-sm">
              <BookOpen className="size-7 text-indigo-400" />
            </div>
            <span className="text-xs font-medium text-slate-400">
              Career Insights
            </span>
          </div>
        )}

        <div className="absolute left-4 top-4">
          <Badge
            variant="secondary"
            className={
              isPublished
                ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                : "border border-amber-100 bg-amber-50 text-amber-700"
            }
          >
            <span
              className={`mr-1.5 size-1.5 rounded-full ${
                isPublished ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Date and reading time */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs  text-muted-foreground font-medium">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formatDate(article.published_at || article.created_at)}
          </span>

          <div className="flex items-center justify-end gap-1.5">
            <Eye className="size-4" />
            {Number(article.views || 0).toLocaleString()}
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {article.title}
        </h3>

        {/* Preview */}
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {preview ||
            "Explore this article for more insights and helpful information."}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <Button variant="link" size="sm" className="px-0">
            <Link to={`/app/articles/${article.id}`}>Read Article</Link>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
