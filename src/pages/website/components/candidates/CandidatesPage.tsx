import { useEffect, useRef, useState } from "react";
import { Loader2, SearchIcon, Users, X } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/data-pagination";

import { useFeaturedCandidates } from "@/hooks/candidates";
import { useDebounce } from "@/hooks/useDebounce";
import HomeLayout from "@/layouts/HomeLayout";
import CandidateCard from "./CandidateCard";

const CandidateCardSkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
      <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
      <div className="h-9 w-28 animate-pulse rounded-full bg-gray-100" />
    </div>
  </div>
);

const CandidatesPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(24);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    data: candidatesData,
    isLoading,
    isFetching,
  } = useFeaturedCandidates({
    page,
    limit: perPage,
    search: debouncedSearch,
  }) as any;

  const candidates = candidatesData?.data ?? [];
  const total = candidatesData?.total ?? candidatesData?.meta?.total;
  const isSearching = search !== debouncedSearch || (isFetching && !isLoading);

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

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setPage(1);
  };

  return (
    <HomeLayout>
      {/* PAGE HEADER */}
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
              <Users size={14} />
              Top talent
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl lg:text-5xl">
              Find the right <span className="text-Orange">Candidates</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:text-lg">
              Browse skilled professionals ready for their next role and connect
              with the right fit for your team.
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
                placeholder="Search by name, position or skill"
                aria-label="Search candidates"
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

      {/* RESULTS */}
      <section className="bg-white py-10 lg:py-14">
        <div
          ref={resultsRef}
          className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6"
        >
          {/* Results bar */}
          {!isLoading && candidates.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                {typeof total === "number" ? (
                  <>
                    <span className="font-semibold text-Blue">
                      {total.toLocaleString()}
                    </span>{" "}
                    {total === 1 ? "candidate" : "candidates"}
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-Blue">
                      {candidates.length}
                    </span>{" "}
                    candidates
                  </>
                )}
                {debouncedSearch && (
                  <>
                    {" "}
                    for{" "}
                    <span className="font-semibold text-Blue">
                      "{debouncedSearch}"
                    </span>
                  </>
                )}
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CandidateCardSkeleton key={i} />
              ))}
            </div>
          ) : candidates.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/60 py-12">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Users />
                  </EmptyMedia>
                  <EmptyTitle>
                    {debouncedSearch
                      ? "No matching candidates"
                      : "No candidates yet"}
                  </EmptyTitle>
                  <EmptyDescription>
                    {debouncedSearch
                      ? `We couldn't find anyone matching "${debouncedSearch}". Try a different name, position or skill.`
                      : "Candidate profiles will appear here soon. Please check back later."}
                  </EmptyDescription>
                </EmptyHeader>
                {debouncedSearch && (
                  <Button
                    variant="outline"
                    onClick={() => updateSearch("")}
                    className="mt-4 h-10 rounded-full border-Blue/20 px-6 text-Blue hover:border-Orange hover:bg-Orange hover:text-white"
                  >
                    Clear search
                  </Button>
                )}
              </Empty>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 gap-5 transition-opacity duration-300 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${
                isFetching ? "opacity-60" : "opacity-100"
              }`}
            >
              {candidates.map((candidate: any, i: number) => (
                <div
                  key={candidate.id}
                  className="candidate-card-in h-full transition-transform duration-300 hover:-translate-y-1 [&>*]:h-full"
                  style={{ animationDelay: `${Math.min(i, 11) * 40}ms` }}
                >
                  <CandidateCard candidate={candidate} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && candidates.length > 0 && (
            <div className="mt-10 border-t border-gray-100 pt-6">
              <DataPagination
                page={candidatesData?.page}
                perPage={candidatesData?.limit}
                totalPages={candidatesData?.totalPages}
                onPageChange={setPage}
                onPerPageChange={handlePerPageChange}
              />
            </div>
          )}
        </div>
      </section>

      <style>{`
        .candidate-card-in { animation: candidate-card-in 0.5s ease-out both; }
        @keyframes candidate-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) { .candidate-card-in { animation: none; } }
      `}</style>
    </HomeLayout>
  );
};

export default CandidatesPage;
