import { useEffect, useRef, useState, type ElementType } from "react";
import {
  ArrowRight,
  Building2,
  LogIn,
  Loader2,
  SearchIcon,
  Users,
  X,
} from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/data-pagination";

import { useEmployers } from "@/hooks/employers";
import { useSiteStatistics } from "@/hooks/universals";
import { useDebounce } from "@/hooks/useDebounce";
import HomeLayout from "@/layouts/HomeLayout";
import EmployerCard from "./EmployerCard";
import FeaturedEmployersBanner, {
  RECRUITMENT_LOGIN_URL,
} from "./components/FeaturedEmployersBanner";

const SectionHeading = ({
  badge,
  icon: Icon,
  title,
  highlight,
  subtitle,
}: {
  badge: string;
  icon: ElementType;
  title: string;
  highlight: string;
  subtitle: string;
}) => (
  <div className="max-w-2xl">
    <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-Orange sm:text-sm">
      <Icon size={14} />
      {badge}
    </span>
    <h2 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl">
      {title} <span className="text-Orange">{highlight}</span>
    </h2>
    <p className="mt-3 text-base text-gray-600 sm:text-lg">{subtitle}</p>
  </div>
);

const EmployerCardSkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
      <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
      <div className="h-9 w-28 animate-pulse rounded-full bg-gray-100" />
    </div>
  </div>
);

const EmployersPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(24);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const directoryRef = useRef<HTMLDivElement>(null);

  const { data: statistics } = useSiteStatistics();
  const {
    data: employersData,
    isLoading,
    isFetching,
  } = useEmployers({
    page,
    limit: perPage,
    search: debouncedSearch,
  }) as any;

  const employers = employersData?.data ?? [];
  const total = employersData?.total ?? employersData?.meta?.total;
  const isSearching = search !== debouncedSearch || (isFetching && !isLoading);

  const employerCount = statistics?.employers
    ? `${Number(statistics.employers).toLocaleString()}+`
    : undefined;

  // Bring the directory back into view when the page changes (not on first load).
  const prevPage = useRef(page);
  useEffect(() => {
    if (prevPage.current === page) return;
    prevPage.current = page;
    directoryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
      {/* 1. HERO — employer entry point */}
      <FeaturedEmployersBanner employerCount={employerCount} />

      {/* 4. DIRECTORY — companies already hiring */}
      <section className="bg-white py-16 lg:py-24">
        <div
          ref={directoryRef}
          className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              badge="Trusted by leading companies"
              icon={Users}
              title="Companies already"
              highlight="hiring on Ekazi"
              subtitle="Join organisations across every industry that find their talent here."
            />

            {/* Search */}
            <label className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm transition focus-within:border-orange-200 focus-within:ring-4 focus-within:ring-orange-50 md:w-80">
              {isSearching ? (
                <Loader2 className="h-5 w-5 shrink-0 animate-spin text-Orange" />
              ) : (
                <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
              )}
              <input
                type="search"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search companies"
                aria-label="Search employers"
                className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  aria-label="Clear search"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>

          <div className="mt-10 lg:mt-12">
            {!isLoading && employers.length > 0 && (
              <p className="mb-6 text-sm text-gray-500">
                {typeof total === "number" ? (
                  <>
                    <span className="font-semibold text-Blue">
                      {total.toLocaleString()}
                    </span>{" "}
                    {total === 1 ? "employer" : "employers"}
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-Blue">
                      {employers.length}
                    </span>{" "}
                    {employers.length === 1 ? "employer" : "employers"}
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
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <EmployerCardSkeleton key={i} />
                ))}
              </div>
            ) : employers.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/60 py-12">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Building2 />
                    </EmptyMedia>
                    <EmptyTitle>
                      {debouncedSearch
                        ? "No matching employers"
                        : "Be the first employer here"}
                    </EmptyTitle>
                    <EmptyDescription>
                      {debouncedSearch
                        ? `We couldn't find any company matching "${debouncedSearch}". Try a different name.`
                        : "Sign in to the recruitment platform and post your first job to appear here."}
                    </EmptyDescription>
                  </EmptyHeader>
                  {debouncedSearch ? (
                    <Button
                      variant="outline"
                      onClick={() => updateSearch("")}
                      className="mt-4 h-10 rounded-full border-Blue/20 px-6 text-Blue hover:border-Orange hover:bg-Orange hover:text-white"
                    >
                      Clear search
                    </Button>
                  ) : (
                    <a
                      href={RECRUITMENT_LOGIN_URL}
                      className="mt-4 inline-flex h-10 items-center gap-1 rounded-full bg-Orange px-6 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                      Post a Job <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </Empty>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 gap-5 transition-opacity duration-300 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${
                  isFetching ? "opacity-60" : "opacity-100"
                }`}
              >
                {employers.map((employer: any, i: number) => (
                  <div
                    key={employer.id}
                    className="employer-card-in h-full transition-transform duration-300 hover:-translate-y-1 [&>*]:h-full"
                    style={{ animationDelay: `${Math.min(i, 11) * 40}ms` }}
                  >
                    <EmployerCard employer={employer} />
                  </div>
                ))}
              </div>
            )}

            {!isLoading &&
              employers.length > 0 &&
              Number(employersData?.totalPages) > 0 && (
                <div className="mt-10 border-t border-gray-100 pt-6">
                  <DataPagination
                    page={employersData?.page}
                    perPage={employersData?.limit}
                    totalPages={employersData?.totalPages}
                    onPageChange={setPage}
                    onPerPageChange={handlePerPageChange}
                  />
                </div>
              )}
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-Blue px-6 py-10 shadow-2xl shadow-slate-900/20 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14 lg:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25" />
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-Orange/30 blur-3xl" />
            </div>

            <div className="max-w-xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to find your next{" "}
                <span className="text-Orange">great hire</span>?
              </h2>
              <p className="mt-2 text-white/70">
                Sign in to your employer dashboard and post a job today.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={RECRUITMENT_LOGIN_URL}
                className="inline-flex h-12 items-center justify-center gap-1 rounded-full bg-Orange px-7 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Post a Job
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={RECRUITMENT_LOGIN_URL}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 text-white backdrop-blur transition hover:border-white hover:bg-white hover:text-Blue"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .employer-card-in { animation: employer-card-in 0.5s ease-out both; }
        @keyframes employer-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) { .employer-card-in { animation: none; } }
      `}</style>
    </HomeLayout>
  );
};

export default EmployersPage;
