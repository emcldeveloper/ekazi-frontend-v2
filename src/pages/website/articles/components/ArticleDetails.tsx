import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Eye,
  Link2,
  Loader2,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import HomeLayout from "@/layouts/HomeLayout";
import { useApplicantProfile } from "@/hooks/profile";
import { useArticle, useArticles, useCreateComment } from "@/hooks/articles";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const readTime = (content = "") =>
  Math.max(1, Math.round(stripHtml(content).split(" ").length / 200));

const formatDate = (d?: string) => {
  if (!d) return "";
  const date = new Date(d);
  return isNaN(date.getTime())
    ? d
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
};

const timeAgo = (d?: string) => {
  if (!d) return "";
  const diff = (Date.now() - new Date(d).getTime()) / 1000;
  if (isNaN(diff)) return d;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(d);
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-Blue transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const Avatar = ({
  name,
  size = "md",
}: {
  name?: string;
  size?: "sm" | "md";
}) => (
  <div
    className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white ${
      size === "sm" ? "h-9 w-9 text-xs" : "h-11 w-11 text-sm"
    }`}
  >
    {initials(name)}
  </div>
);

const ShareActions = ({ title }: { title?: string }) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const nativeShare = () => {
    if (navigator.share) navigator.share({ title, url }).catch(() => {});
    else copy();
  };

  const enc = encodeURIComponent;
  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${enc(title ?? "")}&url=${enc(url)}`,
    },
  ];

  const btn =
    "inline-flex h-9 items-center gap-1.5 rounded-full border border-gray-200 px-3.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copy} className={btn}>
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
        >
          {l.label}
        </a>
      ))}
      <button
        type="button"
        onClick={nativeShare}
        className={`${btn} sm:hidden`}
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
};

const RelatedCard = ({ a }: { a: any }) => {
  const img = a.featured_image ?? a.image ?? a.cover_image ?? a.thumbnail;
  return (
    <Link
      to={`/articles/${a.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5"
    >
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        {img ? (
          <img
            src={img}
            alt={a.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
            <BookOpen className="h-8 w-8 text-blue-300" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-3 line-clamp-2 font-semibold leading-snug text-gray-900 group-hover:text-Blue">
          {a.title}
        </h3>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <span>{formatDate(a.published_at ?? a.created_at)}</span>
          <ArrowUpRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-Blue" />
        </div>
      </div>
    </Link>
  );
};

const LoadingSkeleton = () => (
  <div className="mx-auto max-w-3xl animate-pulse px-4 pt-16">
    <div className="mx-auto mb-6 h-4 w-24 rounded-full bg-gray-200" />
    <div className="mb-3 h-10 rounded-lg bg-gray-200" />
    <div className="mx-auto mb-8 h-10 w-2/3 rounded-lg bg-gray-200" />
    <div className="mx-auto mb-12 h-4 w-1/2 rounded-full bg-gray-100" />
    <div className="mb-12 aspect-[16/9] rounded-3xl bg-gray-200" />
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="mb-3 h-4 rounded bg-gray-100"
        style={{ width: `${90 - (i % 3) * 12}%` }}
      />
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const ArticleDetails = () => {
  const { id } = useParams();
  const articleId = Number(id);

  const { data: profile } = useApplicantProfile();
  const firstName = profile?.applicant_profile?.first_name;
  const lastName = profile?.applicant_profile?.last_name;
  const email = profile?.applicant_profile?.email;
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  const { data: article, isPending: isLoading } = useArticle(articleId);
  const { mutate, isPending } = useCreateComment();
  const { data: moreData } = useArticles({ page: 1, limit: 4, search: "" });

  const { register, handleSubmit, reset, watch } = useForm<{
    comment: string;
  }>();
  const commentValue = watch("comment") ?? "";

  const isHTML = /<\/?[a-z][\s\S]*>/i.test(article?.content ?? "");
  const minutes = useMemo(() => readTime(article?.content), [article?.content]);

  // Adjust if comments live elsewhere in your API response.
  const comments: any[] = article?.comments ?? [];

  const related = (moreData?.data ?? [])
    .filter((a: any) => a.id !== articleId)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [articleId]);

  const onSubmit = (formData: { comment: string }) => {
    const payload = { ...formData, name: fullName, email };

    mutate({ id: articleId, payload }, { onSuccess: () => reset() });
  };

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
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-32 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <BookOpen className="h-7 w-7 text-gray-400" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Article not found
          </h1>
          <p className="mb-6 text-gray-500">
            It may have been moved or removed.
          </p>
          <Button>
            <Link to="/articles">Back to articles</Link>
          </Button>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <ReadingProgress />

      <article className="bg-white">
        {/* Header */}
        <header className="mx-auto max-w-3xl px-4 pb-10 pt-10">
          <Link
            to="/articles"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-Blue"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          {(article.category?.name ?? article.category) && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-Blue">
              {article.category?.name ?? article.category}
            </p>
          )}

          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl md:leading-[1.1]">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-500 md:text-xl">
              {article.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            {article.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(article.published_at)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {minutes} min read
            </span>
            {article.views != null && (
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {Number(article.views).toLocaleString()} views
              </span>
            )}
            {comments.length > 0 && (
              <a
                href="#comments"
                className="inline-flex items-center gap-1.5 hover:text-Blue"
              >
                <MessageCircle className="h-4 w-4" />
                {comments.length}
              </a>
            )}
          </div>
        </header>

        {/* Cover */}
        {article.featured_image && (
          <div className="mx-auto mb-12 max-w-5xl px-4 md:mb-16">
            <div className="overflow-hidden rounded-3xl bg-gray-100">
              <img
                src={article.featured_image}
                alt={article.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="mx-auto max-w-3xl px-4">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
              prose-p:leading-relaxed prose-p:text-gray-700
              prose-a:font-medium prose-a:text-Blue prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-Blue prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-600
              prose-img:rounded-2xl prose-li:marker:text-Blue
              first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-Blue"
          >
            {isHTML ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              article.content
                ?.split(/\r?\n\r?\n/)
                .map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))
            )}
          </div>

          {/* Share */}
          <div className="mt-14 flex flex-col gap-4 border-y border-gray-100 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-gray-900">
              Enjoyed this? Share it.
            </p>
            <ShareActions title={article.title} />
          </div>

          {/* Comments */}
          <section id="comments" className="scroll-mt-24 py-14">
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-gray-900">
              Comments
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-semibold text-gray-600">
                {comments.length}
              </span>
            </h2>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-10 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 transition-colors focus-within:border-Blue focus-within:bg-white"
            >
              <div className="flex gap-3">
                <Avatar name={fullName} />
                <div className="flex-1">
                  {fullName && (
                    <p className="mb-1 text-sm font-medium text-gray-900">
                      {fullName}
                    </p>
                  )}
                  <Textarea
                    rows={3}
                    placeholder="Share your thoughts…"
                    className="resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                    {...register("comment", { required: true })}
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                <span className="text-xs text-gray-400">
                  {email
                    ? "Be kind and constructive."
                    : "Sign in to post a comment."}
                </span>
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-full"
                  disabled={isPending || !commentValue.trim() || !email}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                      Posting…
                    </>
                  ) : (
                    <>
                      <Send className="mr-1.5 h-4 w-4" />
                      Post
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* List */}
            {comments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center">
                <MessageCircle className="mx-auto mb-3 h-7 w-7 text-gray-300" />
                <p className="text-sm text-gray-500">
                  No comments yet. Start the conversation.
                </p>
              </div>
            ) : (
              <ul className="space-y-6">
                {comments.map((c: any) => (
                  <li key={c.id} className="flex gap-3">
                    <Avatar name={c.name} size="sm" />
                    <div className="flex-1">
                      <div className="rounded-2xl rounded-tl-sm bg-gray-50 px-4 py-3">
                        <div className="mb-1 flex items-baseline justify-between gap-3">
                          <p className="text-sm font-semibold text-gray-900">
                            {c.name || "Anonymous"}
                          </p>
                          <span className="shrink-0 text-xs text-gray-400">
                            {timeAgo(c.created_at)}
                          </span>
                        </div>
                        <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                          {c.comment ?? c.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* More articles */}
        {related.length > 0 && (
          <section className="border-t border-gray-100 bg-gray-50/70 py-16">
            <div className="mx-auto max-w-6xl px-4">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Keep reading
                </h2>
                <Link
                  to="/articles"
                  className="inline-flex items-center gap-1 text-sm font-medium text-Blue hover:underline"
                >
                  View all <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a: any) => (
                  <RelatedCard key={a.id} a={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </HomeLayout>
  );
};

export default ArticleDetails;

// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Eye, Loader2 } from "lucide-react";

// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import HomeLayout from "@/layouts/HomeLayout";
// import { useApplicantProfile } from "@/hooks/profile";
// import { useArticle, useCreateComment } from "@/hooks/articles";

// interface ArticleCommentFormValues {
//   comment: string;
// }

// const ArticleDetails = () => {
//   const { id } = useParams();
//   const articleId = Number(id);

//   const { data: profile } = useApplicantProfile();

//   const firstName = profile?.applicant_profile?.first_name;
//   const lastName = profile?.applicant_profile?.last_name;
//   const email = profile?.applicant_profile?.email;
//   const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

//   const { data: article, isPending: isLoading } = useArticle(articleId);

//   const { mutate, isPending } = useCreateComment();

//   const { register, handleSubmit, reset } = useForm<ArticleCommentFormValues>();

//   const [showCommentForm, setShowCommentForm] = useState(false);

//   const isHTML = /<\/?[a-z][\s\S]*>/i.test(article?.content);

//   const onSubmit = (formData: ArticleCommentFormValues) => {
//     const payload = {
//       ...formData,
//       name: fullName,
//       email: email,
//     };

//     mutate(
//       { id: articleId, payload },
//       {
//         onSuccess: () => {
//           reset();
//           setShowCommentForm(false);
//         },
//       },
//     );
//   };

//   if (isLoading) {
//     return (
//       <Card>
//         <CardContent className="flex items-center justify-center py-10">
//           <Loader2 className="h-5 w-5 animate-spin mr-2" />
//           <span>Loading...</span>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <HomeLayout>
//       <div className="container mx-auto p-10">
//         <Card>
//           <CardContent>
//             <div className="bg-white overflow-hidden">
//               {/* Featured Image */}
//               <div className="h-72 md:h-96 w-full overflow-hidden">
//                 {article?.featured_image && (
//                   <img
//                     src={article?.featured_image}
//                     alt={article?.title}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//               </div>

//               <div className="p-6 flex flex-col">
//                 {/* Meta */}
//                 <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
//                   <span>{article?.published_at}</span>

//                   <div className="flex items-center gap-1">
//                     <Eye className="h-4 w-4 text-Orange" />
//                     <span>{article?.views}</span>
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h2 className="font-bold text-2xl md:text-3xl mb-4 text-Orange">
//                   {article?.title}
//                 </h2>

//                 {/* Content */}
//                 <div className="prose max-w-none">
//                   {isHTML ? (
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: article?.content,
//                       }}
//                     />
//                   ) : (
//                     article?.content
//                       ?.split(/\r?\n\r?\n/)
//                       .map((paragraph: string, index: number) => (
//                         <p key={index}>{paragraph}</p>
//                       ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </CardContent>

//           <CardFooter className="p-6">
//             {/* Comments */}
//             {showCommentForm ? (
//               <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="w-full space-y-4"
//               >
//                 <div>
//                   <label className="text-sm font-medium mb-1 block">
//                     Comment
//                   </label>
//                   <Textarea
//                     rows={5}
//                     {...register("comment", { required: true })}
//                   />
//                 </div>

//                 <div className="flex gap-2">
//                   <Button type="submit" disabled={isPending}>
//                     {isPending ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                         Submitting...
//                       </>
//                     ) : (
//                       "Submit"
//                     )}
//                   </Button>

//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setShowCommentForm(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             ) : (
//               <Button
//                 variant="outline"
//                 onClick={() => setShowCommentForm(true)}
//               >
//                 Add Comment
//               </Button>
//             )}
//           </CardFooter>
//         </Card>
//       </div>
//     </HomeLayout>
//   );
// };

// export default ArticleDetails;
