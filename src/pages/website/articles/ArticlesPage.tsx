import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileSearch,
  Loader2,
  Mail,
  Newspaper,
  SearchIcon,
  TrendingUp,
  X,
} from "lucide-react";

import { useArticles } from "@/hooks/articles";
import { useDebounce } from "@/hooks/useDebounce";
import HomeLayout from "@/layouts/HomeLayout";

const PER_PAGE = 24;

/* ------------------------------------------------------------------ */
/* Data helpers — adjust field names to match your API                 */
/* ------------------------------------------------------------------ */

type Article = {
  id: string | number;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime: number;
  href: string;
};

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalize = (a: any): Article => {
  const body = stripHtml(a.content ?? a.body ?? "");
  return {
    id: a.id,
    title: a.title ?? "Untitled",
    excerpt:
      a.excerpt ??
      a.summary ??
      a.description ??
      (body ? body.slice(0, 180) + "…" : ""),
    image: a.image ?? a.cover_image ?? a.thumbnail ?? a.image_url ?? a.banner,
    category: a.category?.name ?? a.category ?? a.tag,
    author: a.author?.name ?? a.author ?? a.user?.name,
    date: a.published_at ?? a.created_at,
    readTime: Math.max(1, Math.round(body.split(" ").length / 200)),
    href: `/articles/${a.id}`,
  };
};

const formatDate = (d?: string) => {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

const Cover = ({ src, alt }: { src?: string; alt: string }) => {
  const [failed, setFailed] = useState(false);

  return src && !failed ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-100">
      <BookOpen className="h-8 w-8 text-Orange/40" />
    </div>
  );
};

const Meta = ({ a, light }: { a: Article; light?: boolean }) => (
  <div
    className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${
      light ? "text-white/75" : "text-gray-500"
    }`}
  >
    {a.author && (
      <span className={`font-medium ${light ? "text-white" : "text-Blue"}`}>
        {a.author}
      </span>
    )}
    {a.author && a.date && <span aria-hidden>•</span>}
    {a.date && <span>{formatDate(a.date)}</span>}
    <span aria-hidden>•</span>
    <span className="inline-flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {a.readTime} min read
    </span>
  </div>
);

/* Large featured card with image and overlaid text */
const FeaturedArticle = ({ a }: { a: Article }) => (
  <Link
    to={a.href}
    className="group relative flex min-h-[420px] overflow-hidden rounded-3xl bg-Blue shadow-xl shadow-slate-900/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 lg:min-h-[520px]"
  >
    <div className="absolute inset-0">
      <Cover src={a.image} alt={a.title} />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/45 to-transparent" />

    <div className="relative mt-auto w-full p-6 md:p-10">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-Orange px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-orange-500/30">
          Featured
        </span>
        {a.category && (
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {a.category}
          </span>
        )}
      </div>
      <h2 className="mb-3 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
        {a.title}
      </h2>
      <p className="mb-5 line-clamp-2 max-w-xl text-sm text-white/75 md:text-base">
        {a.excerpt}
      </p>
      <div className="flex items-center justify-between gap-4">
        <Meta a={a} light />
        <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-Blue transition-all duration-300 group-hover:rotate-45 group-hover:bg-Orange group-hover:text-white sm:flex">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </div>
  </Link>
);

/* Compact numbered row for the trending list */
const TrendingArticle = ({ a, index }: { a: Article; index: number }) => (
  <Link
    to={a.href}
    className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-white hover:shadow-sm"
  >
    <span className="w-7 shrink-0 text-2xl font-extrabold leading-none text-orange-200 transition-colors group-hover:text-Orange">
      {String(index).padStart(2, "0")}
    </span>
    <div className="min-w-0 flex-1">
      {a.category && (
        <p className="mb-1 text-xs font-medium text-Orange">{a.category}</p>
      )}
      <h3 className="mb-1.5 line-clamp-2 font-bold leading-snug text-Blue transition-colors group-hover:text-Orange">
        {a.title}
      </h3>
      <p className="text-xs text-gray-500">
        {[formatDate(a.date), `${a.readTime} min`].filter(Boolean).join(" · ")}
      </p>
    </div>
    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-4 ring-orange-50">
      <Cover src={a.image} alt={a.title} />
    </div>
  </Link>
);

/* Standard grid card */
const ArticleCard = ({ a }: { a: Article }) => (
  <Link
    to={a.href}
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <Cover src={a.image} alt={a.title} />
      {a.category && (
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-Orange shadow-sm backdrop-blur">
          {a.category}
        </span>
      )}
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-Blue transition-colors group-hover:text-Orange">
        {a.title}
      </h3>
      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
        {a.excerpt}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <Meta a={a} />
        <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-Orange" />
      </div>
    </div>
  </Link>
);

/* Skeletons */
const Shimmer = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-2xl bg-gray-100 ${className}`} />
);

const LoadingState = () => (
  <div className="space-y-12">
    <div className="grid gap-8 lg:grid-cols-5">
      <Shimmer className="h-[420px] rounded-3xl lg:col-span-3 lg:h-[520px]" />
      <div className="space-y-3 lg:col-span-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-24" />
        ))}
      </div>
    </div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Shimmer key={i} className="h-80" />
      ))}
    </div>
  </div>
);

const getPageNumbers = (current: number, total: number) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    data: articlesData,
    isLoading,
    isFetching,
  } = useArticles({
    page,
    limit: PER_PAGE,
    search: debouncedSearch,
  }) as any;

  const allArticles: Article[] = useMemo(
    () => (articlesData?.data ?? []).map(normalize),
    [articlesData],
  );

  // Categories found in the current results (client-side filter).
  const categories = useMemo(
    () =>
      Array.from(
        new Set(allArticles.map((a) => a.category).filter(Boolean)),
      ) as string[],
    [allArticles],
  );

  const articles = category
    ? allArticles.filter((a) => a.category === category)
    : allArticles;

  // Adjust to your API's pagination shape.
  const meta = articlesData?.meta ?? articlesData?.pagination ?? {};
  const total: number = meta.total ?? articlesData?.total ?? allArticles.length;
  const totalPages: number = Math.max(
    1,
    meta.last_page ??
      meta.totalPages ??
      articlesData?.totalPages ??
      Math.ceil(total / PER_PAGE),
  );

  const isSearching = search !== debouncedSearch || (isFetching && !isLoading);
  const hasFilters = Boolean(debouncedSearch || category);

  // Magazine layout only on the landing view; plain grid when searching/filtering/paging.
  const showMagazine = page === 1 && !hasFilters && articles.length >= 3;
  const featured = showMagazine ? articles[0] : null;
  const trending = showMagazine ? articles.slice(1, 5) : [];
  const rest = showMagazine ? articles.slice(5) : articles;

  // Bring the results back into view when the page changes (not on first load).
  const prevPage = useRef(page);
  useEffect(() => {
    if (prevPage.current === page) return;
    prevPage.current = page;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory(null);
    setPage(1);
  };

  const gridTitle = debouncedSearch
    ? `Results for "${debouncedSearch}"`
    : (category ?? (showMagazine ? "More articles" : "Latest articles"));

  return (
    <HomeLayout>
      {/* ===== PAGE HEADER ===== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/60">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-Orange/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-Blue/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-medium text-Orange shadow-sm backdrop-blur sm:text-sm">
              <Newspaper size={14} />
              Career insights
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl lg:text-5xl">
              Articles & <span className="text-Orange">Insights</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:text-lg">
              Career advice, industry trends and practical guides to help you
              grow, fresh every week.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-2xl">
            <label className="flex items-center gap-3 rounded-full border border-gray-100 bg-white px-5 py-3 shadow-xl shadow-slate-200/60 transition focus-within:border-orange-200 focus-within:ring-4 focus-within:ring-orange-50">
              {isSearching ? (
                <Loader2 className="h-5 w-5 shrink-0 animate-spin text-Orange" />
              ) : (
                <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
              )}
              <input
                type="search"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search articles by title or topic"
                aria-label="Search articles"
                className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none sm:text-base [&::-webkit-search-cancel-button]:hidden"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  aria-label="Clear search"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="bg-white py-10 lg:py-14">
        <div
          ref={resultsRef}
          className="mx-auto max-w-7xl scroll-mt-24 space-y-14 px-4 sm:px-6"
        >
          {/* Category chips */}
          {!isLoading && categories.length > 0 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              {[null, ...categories].map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c ?? "all"}
                    type="button"
                    onClick={() => {
                      setCategory(c);
                      setPage(1);
                    }}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-Orange bg-Orange text-white shadow-md shadow-orange-500/20"
                        : "border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:text-Orange"
                    }`}
                  >
                    {c ?? "All"}
                  </button>
                );
              })}
            </div>
          )}

          {isLoading ? (
            <LoadingState />
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-gray-200 bg-white/60 px-6 py-16 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-Orange">
                <FileSearch className="h-6 w-6" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-Blue">
                {hasFilters ? "No matching articles" : "No articles yet"}
              </h2>
              <p className="mb-6 max-w-sm text-gray-500">
                {hasFilters
                  ? "Nothing matches your search. Try another keyword or category."
                  : "New articles are on the way. Check back soon."}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="h-10 rounded-full border border-Blue/20 px-6 text-sm font-medium text-Blue transition hover:border-Orange hover:bg-Orange hover:text-white"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div
              className={`space-y-14 transition-opacity duration-300 ${isFetching ? "opacity-60" : "opacity-100"}`}
            >
              {/* Featured + Trending */}
              {featured && (
                <div className="grid gap-8 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                    <FeaturedArticle a={featured} />
                  </div>
                  <div className="rounded-3xl bg-gradient-to-b from-slate-50 to-white p-3 lg:col-span-2 lg:p-4">
                    <div className="mb-2 flex items-center gap-2 px-3 pt-2">
                      <TrendingUp className="h-5 w-5 text-Orange" />
                      <h2 className="text-lg font-extrabold tracking-tight text-Blue">
                        Trending now
                      </h2>
                    </div>
                    <div className="space-y-1">
                      {trending.map((a, i) => (
                        <TrendingArticle key={a.id} a={a} index={i + 1} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div>
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-2xl font-extrabold tracking-tight text-Blue sm:text-3xl">
                      {gridTitle}
                    </h2>
                    {!category && (
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold text-Blue">
                          {total.toLocaleString()}
                        </span>{" "}
                        {total === 1 ? "article" : "articles"}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {rest.map((a, i) => (
                      <div
                        key={a.id}
                        className="article-card-in h-full"
                        style={{ animationDelay: `${Math.min(i, 11) * 40}ms` }}
                      >
                        <ArticleCard a={a} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className="flex items-center justify-center gap-1 border-t border-gray-100 pt-8"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-Blue transition hover:border-Orange hover:text-Orange disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {getPageNumbers(page, totalPages).map((p, i) =>
                    p === "…" ? (
                      <span key={`gap-${i}`} className="px-2 text-gray-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        aria-current={p === page ? "page" : undefined}
                        className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${
                          p === page
                            ? "bg-Blue text-white shadow-md"
                            : "text-gray-600 hover:bg-orange-50 hover:text-Orange"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-Blue transition hover:border-Orange hover:text-Orange disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-3xl bg-Blue px-6 py-10 shadow-2xl shadow-slate-900/20 sm:px-10 md:grid-cols-2 lg:px-14 lg:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25" />
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-Orange/30 blur-3xl" />
            </div>

            <div className="flex items-start gap-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-Orange text-white ring-4 ring-Orange/25 sm:flex">
                <Mail size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Never miss an <span className="text-Orange">article</span>
                </h2>
                <p className="mt-2 text-white/70">
                  Get the best career reads in your inbox every week.
                </p>
              </div>
            </div>

            <form
              className="flex flex-col gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur sm:flex-row sm:rounded-full"
              onSubmit={
                (e) =>
                  e.preventDefault() /* hook up to your newsletter endpoint */
              }
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-12 min-w-0 flex-1 rounded-xl bg-white px-5 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-4 focus:ring-orange-200 sm:rounded-full"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-1 rounded-xl bg-Orange px-6 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 sm:rounded-full"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        .article-card-in { animation: article-card-in 0.5s ease-out both; }
        @keyframes article-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) { .article-card-in { animation: none; } }
      `}</style>
    </HomeLayout>
  );
};

export default ArticlesPage;

// import { useState } from "react";
// import { Loader2, SearchIcon } from "lucide-react";

// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/components/ui/input-group";

// import { useArticles } from "@/hooks/articles";
// import ArticleCard from "./components/ArticleCard";
// import { useDebounce } from "@/hooks/useDebounce";
// import HomeLayout from "@/layouts/HomeLayout";

// const ArticlesPage = () => {
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(25);
//   const [search, setSearch] = useState("");

//   const debouncedSearch = useDebounce(search, 500);

//   const { data: articlesData, isLoading } = useArticles({
//     page,
//     limit: perPage,
//     search: debouncedSearch,
//   });
//   const articles = articlesData?.data ?? [];

//   return (
//     <HomeLayout>
//       <div className="container mx-auto max-w-6xl my-10 px-4">
//         <div className="mb-4">
//           <h1 className="text-2xl font-bold mb-4 text-Blue">Articles</h1>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="md:col-span-2 space-y-4">
//             <InputGroup className="w-full">
//               <InputGroupInput
//                 placeholder="Search jobs..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//               />
//               <InputGroupAddon>
//                 <SearchIcon />
//               </InputGroupAddon>
//             </InputGroup>

//             {isLoading ? (
//               <div className="flex justify-center">
//                 <Loader2 className="animate-spin" />
//               </div>
//             ) : articles.length === 0 ? (
//               <div className="flex justify-center">No articles</div>
//             ) : (
//               <div className="flex flex-col gap-4">
//                 {articles?.map((article: any) => (
//                   <ArticleCard key={article.id} article={article} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// };

// export default ArticlesPage;
