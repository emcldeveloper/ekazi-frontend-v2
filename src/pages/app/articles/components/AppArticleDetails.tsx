import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Eye,
  Link2,
  Share2,
} from "lucide-react";
import DOMPurify from "dompurify";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { IMG_BASE } from "@/config";
import { useArticle, useArticles } from "@/hooks/articles";
import { formatDate } from "@/utils/helpers";
import { FaFacebook } from "react-icons/fa";

type Article = {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  views: string | number;
};

const getImageUrl = (path: string | null) => {
  if (!path) return null;

  return `${IMG_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const ArticleThumbnail = ({ article }: { article: Article }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageUrl(article.featured_image);

  return (
    <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={article.title}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-slate-100">
          <BookOpen className="size-6 text-slate-400" />
        </div>
      )}
    </div>
  );
};

const AppArticleDetails = () => {
  const { id } = useParams();
  const articleId = Number(id);
  const navigate = useNavigate();

  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: article, isLoading } = useArticle(articleId);

  const { data: articlesData } = useArticles({
    page: 1,
    limit: 10,
    search: "",
  });

  // All hooks are called before conditional returns.
  const relatedArticles: Article[] = (articlesData?.data ?? [])
    .filter(
      (item: Article) =>
        item.status === "published" && Number(item.id) !== articleId,
    )
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="grid animate-pulse gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="h-9 w-3/4 rounded bg-muted" />
          <div className="h-4 w-48 rounded bg-muted" />
          <div className="aspect-video rounded-xl bg-muted" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
        </div>

        <div className="hidden space-y-5 lg:block">
          <div className="h-24 rounded bg-muted" />
          <div className="h-64 rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-4">
        <BookOpen className="size-10 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Article not found</h2>
        <Button onClick={() => navigate("/app/articles")}>
          Back to articles
        </Button>
      </div>
    );
  }

  const imageUrl = getImageUrl(article.featured_image);
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(article.content || "");

  const shareUrl = window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          url: shareUrl,
        });
      } catch {
        // Native share dialog was dismissed.
      }
    } else {
      await handleCopyLink();
    }
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-10">
        {/* MAIN ARTICLE */}
        <main className="min-w-0 space-y-6 pb-10">
          {/* Back */}
          <Button
            size="sm"
            variant="link"
            onClick={() => navigate("/app/articles")}
            className="px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Articles
          </Button>

          {/* Title and metadata */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-[34px]">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {formatDate(article.published_at || article.created_at)}
              </span>

              <span className="text-slate-300">•</span>

              <span className="inline-flex items-center gap-1.5">
                <Eye className="size-3.5" />
                {Number(article.views || 0).toLocaleString()} views
              </span>
            </div>
          </div>

          {/* Featured image */}
          <div className="aspect-video overflow-hidden rounded-xl bg-slate-100">
            {imageUrl && !imageError ? (
              <img
                key={article.id}
                src={imageUrl}
                alt={article.title}
                onError={() => setImageError(true)}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-3 bg-linear-to-br from-slate-100 to-blue-50">
                <BookOpen className="size-12 text-blue-300" />
                <span className="text-sm text-slate-400">Career Insights</span>
              </div>
            )}
          </div>

          {/* Article excerpt */}
          {article.excerpt && (
            <p className="text-base font-medium leading-7 text-muted-foreground">
              {stripHtml(article.excerpt)}
            </p>
          )}

          {/* Article content */}
          <article className="min-w-0">
            {isHtml ? (
              <div
                className="prose prose-slate max-w-none break-word
                  prose-headings:font-semibold
                  prose-headings:tracking-tight
                  prose-h2:mt-8
                  prose-h2:text-xl
                  prose-h3:mt-6
                  prose-h3:text-lg
                  prose-p:text-[15px]
                  prose-p:leading-7
                  prose-p:text-slate-700
                  prose-li:text-[15px]
                  prose-li:leading-7
                  prose-a:text-Blue
                  prose-img:rounded-xl
                  dark:prose-p:text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article.content || ""),
                }}
              />
            ) : (
              <div className="space-y-4 text-[15px] leading-7 text-slate-700 dark:text-muted-foreground">
                {(article.content || "")
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((paragraph: string, index: number) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>
            )}
          </article>

          <Separator />

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Enjoyed this article? Explore more insights.
            </p>

            <Button
              render={<Link to="/app/articles" />}
              variant="secondary"
              size="sm"
              className="gap-2"
            >
              More articles
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="min-w-0 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="space-y-7 lg:sticky lg:top-6">
            {/* Share */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold">Share to</h3>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFacebookShare}
                  className="size-9 rounded-full"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook className="size-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                  className="size-9 rounded-full"
                  aria-label="Share article"
                >
                  <Share2 className="size-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  className="size-9 rounded-full"
                  aria-label="Copy article link"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-600" />
                  ) : (
                    <Link2 className="size-4" />
                  )}
                </Button>
              </div>
            </section>

            <Separator />

            {/* Related articles */}
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">Related Articles</h3>
              </div>

              {relatedArticles.length > 0 ? (
                <div className="space-y-5">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.id}
                      to={`/app/articles/${item.id}`}
                      className="group flex items-start gap-3"
                    >
                      <ArticleThumbnail article={item} />

                      <div className="min-w-0 flex-1 space-y-1.5">
                        <h4 className="line-clamp-3 text-[13px] font-semibold leading-5 transition-colors group-hover:text-Blue">
                          {item.title}
                        </h4>

                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.published_at || item.created_at)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No related articles available.
                </p>
              )}

              <Button
                render={<Link to="/app/articles" />}
                variant="secondary"
                size="sm"
                className="w-full justify-between"
              >
                View all articles
                <ArrowRight className="size-4" />
              </Button>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AppArticleDetails;
