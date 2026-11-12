import { useArticles } from "@/hooks/articles";
import ArticleCard from "./components/ArticleCard";
import { DataPagination } from "@/components/data-pagination";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { BookOpen, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const AppArticles = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const debounceSearch = useDebounce(search);

  const {
    data: articlesData,
    isLoading,
    isFetching,
  } = useArticles({
    page,
    limit: perPage,
    search: debounceSearch,
  });

  const articles = articlesData?.data ?? [];

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const showLoading = isLoading || isFetching;

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-Blue">
          Articles
        </h1>
      </header>

      {/* Search */}
      <div className="relative mt-6 w-full">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-11 rounded-xl bg-background pl-10 pr-10 shadow-none"
          aria-label="Search articles"
        />

        {search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleSearch("")}
            className="absolute right-2 top-1/2 size-7 -translate-y-1/2 rounded-full"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Loading state */}
      {showLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border bg-card"
            >
              <Skeleton className="aspect-video w-full rounded-none" />

              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>

                <Skeleton className="h-9 w-32 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : articles.length > 0 ? (
        /* Articles grid */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-12 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-primary">
            {search ? (
              <Search className="size-7" />
            ) : (
              <BookOpen className="size-7" />
            )}
          </div>

          <h3 className="text-2xl font-semibold">
            {search ? "No articles found" : "No articles yet"}
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {search
              ? `We couldn't find any articles matching "${search}". Try searching with a different keyword.`
              : "There are no articles available at the moment. Check back later for new articles and insights."}
          </p>

          {search && (
            <Button
              variant="outline"
              onClick={() => handleSearch("")}
              className="mt-5 gap-2 rounded-xl"
            >
              <X className="size-4" />
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!showLoading && articles.length > 0 && (
        <DataPagination
          page={articlesData?.pagination?.page}
          perPage={articlesData?.pagination?.per_page}
          totalPages={articlesData?.pagination?.total_pages}
          onPageChange={setPage}
          onPerPageChange={(value) => {
            setPerPage(value);
            setPage(1);
          }}
        />
      )}
    </div>
  );
};

export default AppArticles;
