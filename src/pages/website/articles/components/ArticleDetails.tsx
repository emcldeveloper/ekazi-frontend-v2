import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  Eye,
  Link2,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import HomeLayout from "@/layouts/HomeLayout";
import { useArticle } from "@/hooks/articles";
import { IMG_BASE } from "@/config";

// Helpers
const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const readTime = (content = "") => {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return isNaN(date.getTime())
    ? dateString
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
};

// Share Actions
const ShareActions = ({ title }: { title?: string }) => {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Share cancelled
      }
    } else {
      await copyLink();
    }
  };

  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(
        `${title ?? ""} ${url}`,
      )}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title ?? "",
      )}&url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-Blue/30 hover:bg-Blue/5 hover:text-Blue"
      >
        {copied ? (
          <Check className="size-4 text-green-600" />
        ) : (
          <Link2 className="size-4" />
        )}
        {copied ? "Copied!" : "Copy link"}
      </button>

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-Blue/30 hover:bg-Blue/5 hover:text-Blue"
        >
          {link.label}
        </a>
      ))}

      <button
        type="button"
        onClick={shareArticle}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 sm:hidden"
        aria-label="Share article"
      >
        <Share2 className="size-4" />
      </button>
    </div>
  );
};

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="mx-auto max-w-6xl animate-pulse px-4 py-10 sm:px-6 lg:py-14">
    <div className="mb-12 max-w-3xl space-y-5">
      <div className="h-4 w-28 rounded bg-gray-100" />
      <div className="h-6 w-24 rounded-full bg-gray-100" />
      <div className="h-12 w-full rounded-lg bg-gray-200" />
      <div className="h-12 w-4/5 rounded-lg bg-gray-200" />
      <div className="h-5 w-3/4 rounded bg-gray-100" />
      <div className="h-4 w-1/2 rounded bg-gray-100" />
    </div>

    <div className="mb-12 aspect-video rounded-2xl bg-gray-200" />

    <div className="mx-auto max-w-3xl space-y-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="h-4 rounded bg-gray-100"
          style={{ width: `${95 - (index % 3) * 12}%` }}
        />
      ))}
    </div>
  </div>
);

// Article Details
const ArticleDetails = () => {
  const { id } = useParams();
  const articleId = Number(id);

  const { data: article, isPending: isLoading } = useArticle(articleId);

  const minutes = useMemo(
    () => readTime(article?.content ?? ""),
    [article?.content],
  );

  const isHTML = /<\/?[a-z][\s\S]*>/i.test(article?.content ?? "");

  const imageUrl = article?.featured_image
    ? `${IMG_BASE.replace(/\/$/, "")}/${article.featured_image.replace(/^\/+/, "")}`
    : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [articleId]);

  if (isLoading) {
    return (
      <HomeLayout>
        <LoadingSkeleton />
      </HomeLayout>
    );
  }

  if (!article) {
    return (
      <HomeLayout>
        <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-Blue/5">
            <BookOpen className="size-7 text-Blue" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Article not found
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
            The article you're looking for may have been moved or is no longer
            available.
          </p>

          <Button className="mt-6 bg-Blue hover:bg-Blue/90">
            <Link to="/articles">
              <ArrowLeft className="mr-2 size-4" />
              Back to articles
            </Link>
          </Button>
        </div>
      </HomeLayout>
    );
  }

  const category =
    typeof article.category === "string"
      ? article.category
      : article.category?.name;

  return (
    <HomeLayout>
      <article className="min-h-screen bg-white">
        {/* Article Header */}
        <div className="border-b border-gray-100 bg-[#FAFBFD]">
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-8 sm:px-6 lg:pb-14 lg:pt-12">
            {/* Back Link */}
            <Link
              to="/articles"
              className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-Blue"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to articles
            </Link>

            <div className="max-w-4xl">
              {/* Category */}
              {category && (
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-md border border-Blue/10 bg-Blue/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-Blue">
                    {category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="max-w-4xl text-3xl font-bold leading-[1.2] tracking-tight text-gray-950 sm:text-4xl lg:text-[46px] lg:leading-[1.15]">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="mt-6 max-w-3xl text-base leading-8 text-gray-500 sm:text-lg">
                  {stripHtml(article.excerpt)}
                </p>
              )}

              {/* Metadata */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gray-200/80 pt-6 text-sm text-gray-500">
                {article.published_at && (
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-gray-400" />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock3 className="size-4 text-gray-400" />
                  <span>{minutes} min read</span>
                </div>

                {article.views != null && (
                  <div className="flex items-center gap-2">
                    <Eye className="size-4 text-gray-400" />
                    <span>{Number(article.views).toLocaleString()} views</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {imageUrl && (
          <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:pt-12">
            <div className="overflow-hidden rounded-xl bg-gray-100 sm:rounded-2xl">
              <img
                src={imageUrl}
                alt={article.title}
                className="aspect-video w-full object-cover sm:aspect-video"
                loading="eager"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-12 sm:px-6 lg:pb-24 lg:pt-16">
          <div
            className="
              prose prose-base sm:prose-lg max-w-none
              prose-headings:font-bold
              prose-headings:tracking-tight
              prose-headings:text-gray-950

              prose-h2:mb-5
              prose-h2:mt-12
              prose-h2:text-2xl
              sm:prose-h2:text-3xl

              prose-h3:mb-4
              prose-h3:mt-9
              prose-h3:text-xl

              prose-p:mb-6
              prose-p:leading-[1.9]
              prose-p:text-gray-700

              prose-strong:font-semibold
              prose-strong:text-gray-900

              prose-a:font-medium
              prose-a:text-Blue
              prose-a:underline
              prose-a:decoration-Blue/30
              prose-a:underline-offset-4
              hover:prose-a:decoration-Blue

              prose-ul:my-6
              prose-ol:my-6
              prose-li:my-2
              prose-li:leading-relaxed
              prose-li:text-gray-700
              prose-li:marker:text-Blue

              prose-blockquote:my-8
              prose-blockquote:rounded-r-xl
              prose-blockquote:border-l-4
              prose-blockquote:border-Blue
              prose-blockquote:bg-Blue/5
              prose-blockquote:px-6
              prose-blockquote:py-4
              prose-blockquote:font-normal
              prose-blockquote:not-italic
              prose-blockquote:text-gray-700

              prose-img:my-8
              prose-img:rounded-xl

              prose-hr:my-10
              prose-hr:border-gray-200

              prose-table:text-sm
              prose-th:bg-gray-50
              prose-th:text-gray-900
              prose-td:text-gray-700
            "
          >
            {isHTML ? (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: article.content ?? "",
                }}
              />
            ) : (
              article.content
                ?.split(/\r?\n\r?\n/)
                .filter(Boolean)
                .map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))
            )}
          </div>

          {/* Share Section */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Share this article
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Found this helpful? Share it with others.
              </p>
            </div>

            <ShareActions title={article.title} />
          </div>

          {/* Back to Articles */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link
              to="/articles"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-Blue transition-colors hover:text-Blue/80"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Browse more articles
            </Link>
          </div>
        </div>
      </article>
    </HomeLayout>
  );
};

export default ArticleDetails;
