import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BriefcaseBusiness,
  LayoutGrid,
  Loader2,
  SearchIcon,
  X,
} from "lucide-react";
import { IconFolderCode } from "@tabler/icons-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/data-pagination";

import { useIndustries } from "@/hooks/universals";
import { useJobs } from "@/hooks/jobs";
import { useDebounce } from "@/hooks/useDebounce";
import HomeLayout from "@/layouts/HomeLayout";
import { capitalizeText } from "@/utils/helpers";
import JobCard from "./JobCard";

const ALL = "all";

const JobCardSkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
        </div>
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
      <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
      <div className="h-9 w-24 animate-pulse rounded-full bg-gray-100" />
    </div>
  </div>
);

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(24);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [industry, setIndustry] = useState(searchParams.get("industry") ?? "");

  const debouncedSearch = useDebounce(search, 500);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { data: industries } = useIndustries({});
  const {
    data: jobsData,
    isLoading,
    isFetching,
  } = useJobs({
    page,
    limit: perPage,
    search: debouncedSearch,
    industry,
  }) as any;

  const jobs = jobsData?.data ?? [];
  const total = jobsData?.total ?? jobsData?.meta?.total;
  const isSearching = search !== debouncedSearch || (isFetching && !isLoading);
  const hasFilters = Boolean(debouncedSearch || industry);

  // Keep the URL in sync so filtered results can be shared or bookmarked.
  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedSearch.trim()) next.set("search", debouncedSearch.trim());
    if (industry) next.set("industry", industry);
    setSearchParams(next, { replace: true });
  }, [debouncedSearch, industry, setSearchParams]);

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

  const updateIndustry = (value: string | null) => {
    setIndustry(!value || value === ALL ? "" : value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setIndustry("");
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
              <BriefcaseBusiness size={14} />
              Fresh opportunities
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl lg:text-5xl">
              Find your next <span className="text-Orange">Job</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:text-lg">
              Explore open roles from top employers and filter by the industry
              that fits your skills.
            </p>
          </div>

          {/* Search + industry */}
          <div className="mt-8 flex max-w-3xl flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-slate-200/60 transition focus-within:border-orange-200 sm:flex-row sm:items-center sm:rounded-full">
            <label className="flex flex-1 items-center gap-3 px-4 py-2">
              {isSearching ? (
                <Loader2 className="h-5 w-5 shrink-0 animate-spin text-Orange" />
              ) : (
                <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
              )}
              <input
                type="search"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Job title, keyword or company"
                aria-label="Search jobs"
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

            <div className="hidden h-8 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2 border-t border-gray-100 px-2 pt-2 sm:w-64 sm:border-t-0 sm:pt-0">
              <LayoutGrid className="ml-2 h-[18px] w-[18px] shrink-0 text-gray-400" />
              <Select value={industry || ALL} onValueChange={updateIndustry}>
                <SelectTrigger
                  aria-label="Industry"
                  className="h-10 w-full min-w-0 border-0 bg-transparent px-2 text-sm text-gray-700 shadow-none focus-visible:ring-0 sm:text-base"
                >
                  <SelectValue placeholder="All industries">
                    {industry ? capitalizeText(industry) : "All industries"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All industries</SelectItem>
                  {industries?.map((item: any) => (
                    <SelectItem key={item.id} value={item.name}>
                      {capitalizeText(item.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          {!isLoading && (jobs.length > 0 || hasFilters) && (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {jobs.length > 0 && (
                <p className="text-sm text-gray-500">
                  {typeof total === "number" ? (
                    <>
                      <span className="font-semibold text-Blue">
                        {total.toLocaleString()}
                      </span>{" "}
                      {total === 1 ? "job" : "jobs"}
                    </>
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-semibold text-Blue">
                        {jobs.length}
                      </span>{" "}
                      jobs
                    </>
                  )}
                </p>
              )}

              {debouncedSearch && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 py-1 pl-3 pr-1 text-xs text-gray-600">
                  "{debouncedSearch}"
                  <button
                    type="button"
                    onClick={() => updateSearch("")}
                    aria-label="Remove search filter"
                    className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {industry && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 py-1 pl-3 pr-1 text-xs font-medium text-Orange">
                  {capitalizeText(industry)}
                  <button
                    type="button"
                    onClick={() => updateIndustry(ALL)}
                    aria-label="Remove industry filter"
                    className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-orange-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-medium text-gray-500 underline-offset-4 hover:text-Orange hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/60 py-12">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <IconFolderCode />
                  </EmptyMedia>
                  <EmptyTitle>
                    {hasFilters ? "No matching jobs" : "No jobs available yet"}
                  </EmptyTitle>
                  <EmptyDescription>
                    {hasFilters
                      ? "We couldn't find any jobs for these filters. Try a different keyword or industry."
                      : "There are no job openings right now. Please check back later for new opportunities."}
                  </EmptyDescription>
                </EmptyHeader>
                {hasFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4 h-10 rounded-full border-Blue/20 px-6 text-Blue hover:border-Orange hover:bg-Orange hover:text-white"
                  >
                    Clear filters
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
              {jobs.map((job: any, i: number) => (
                <div
                  key={job.id}
                  className="job-card-in h-full transition-transform duration-300 hover:-translate-y-1 [&>*]:h-full"
                  style={{ animationDelay: `${Math.min(i, 11) * 40}ms` }}
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && jobs.length > 0 && (
            <div className="mt-10 border-t border-gray-100 pt-6">
              <DataPagination
                page={jobsData?.page}
                perPage={jobsData?.limit}
                totalPages={jobsData?.totalPages}
                onPageChange={setPage}
                onPerPageChange={handlePerPageChange}
              />
            </div>
          )}
        </div>
      </section>

      <style>{`
        .job-card-in { animation: job-card-in 0.5s ease-out both; }
        @keyframes job-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) { .job-card-in { animation: none; } }
      `}</style>
    </HomeLayout>
  );
};

export default JobsPage;
