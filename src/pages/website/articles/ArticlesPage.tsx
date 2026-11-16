import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Newspaper,
  SearchIcon,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useArticles } from "@/hooks/articles";
import { useDebounce } from "@/hooks/useDebounce";
import HomeLayout from "@/layouts/HomeLayout";

import ArticleCard from "./components/ArticleCard";
import ArticleCardSkeleton from "./components/ArticleCardSkeleton";
import ArticlesEmptyState from "./components/ArticlesEmptyState";

const PER_PAGE = 12;

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: articlesData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useArticles({
    page,
    limit: PER_PAGE,
    search: debouncedSearch,
  });

  const articles = articlesData?.data ?? [];

  const isSearching = search !== debouncedSearch;

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Replace with your API's pagination metadata if available.
  const hasNextPage = articles.length === PER_PAGE;

  const showLoading = isLoading || isSearching || isFetching;

  return (
    <HomeLayout>
      {/* PAGE HEADER */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-slate-50 via-white to-orange-50/60">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-Orange/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-Blue/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-medium text-Orange shadow-sm sm:text-sm">
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

          {/* SEARCH */}
          <div className="mt-8 max-w-2xl">
            <label className="flex items-center gap-3 rounded-full border border-gray-100 bg-white px-5 py-3 shadow-xl shadow-slate-200/60 transition focus-within:border-orange-200 focus-within:ring-4 focus-within:ring-orange-50">
              {isSearching ? (
                <Loader2 className="size-5 shrink-0 animate-spin text-Orange" />
              ) : (
                <SearchIcon className="size-5 shrink-0 text-gray-400" />
              )}

              <input
                type="search"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search articles by title or topic"
                aria-label="Search articles"
                className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-base [&::-webkit-search-cancel-button]:hidden"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  aria-label="Clear search"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </label>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="bg-[#FAFAFA] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {search && (
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-Blue sm:text-3xl">
                  Search Results
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {`Showing results for "${search}"`}
                </p>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {showLoading ? (
            <div
              role="status"
              aria-label="Loading articles"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.from({ length: PER_PAGE }).map((_, index) => (
                <ArticleCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border bg-white px-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Unable to load articles
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Something went wrong while fetching articles. Please try again.
              </p>

              <Button
                className="mt-5"
                variant="outline"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </div>
          ) : articles.length === 0 ? (
            <ArticlesEmptyState
              isSearching={Boolean(debouncedSearch)}
              onClearSearch={() => updateSearch("")}
            />
          ) : (
            <>
              {/* ARTICLE GRID */}
              <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article: any) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* PAGINATION */}
              {(page > 1 || hasNextPage) && (
                <div className="mt-12 flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    className="rounded-full"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Button>

                  <span className="text-sm font-medium text-gray-600">
                    Page {page}
                  </span>

                  <Button
                    variant="outline"
                    disabled={!hasNextPage}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="rounded-full"
                  >
                    Next
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </HomeLayout>
  );
};

export default ArticlesPage;
