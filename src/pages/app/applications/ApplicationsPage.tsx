import { Link } from "react-router-dom";
import { Briefcase, CalendarDays, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useApplications } from "@/hooks/applications";
import { formatDate } from "@/utils/helpers";
import ViewApplication from "./ViewApplication";

const JOBS_ROUTE = "/app/jobs";

function LoadingRow() {
  return (
    <li className="flex animate-pulse items-center gap-4 rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5">
      <div className="size-12 shrink-0 rounded-2xl bg-[#ECECF3]" />
      <div className="min-w-0 flex-1 space-y-2.5">
        <div className="h-4 w-1/2 rounded-full bg-[#ECECF3]" />
        <div className="h-3 w-1/3 rounded-full bg-[#ECECF3]" />
        <div className="h-3 w-3/5 rounded-full bg-[#ECECF3]" />
      </div>
    </li>
  );
}

const ApplicationsPage = () => {
  const {
    data: applicationsData,
    isLoading,
    isError,
    refetch,
  } = useApplications();
  const applications = applicationsData?.data ?? [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <ul aria-hidden="true" className="space-y-3">
          <LoadingRow />
          <LoadingRow />
          <LoadingRow />
        </ul>
      );
    }

    if (isError) {
      return (
        <div
          role="alert"
          className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200/70 bg-white px-6 py-16 text-center"
        >
          <p className="font-semibold text-slate-800">
            We couldn't load your applications.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
            className="h-11 rounded-xl border-slate-200 bg-white px-5 font-semibold text-slate-800 shadow-none hover:bg-slate-50"
          >
            Try again
          </Button>
        </div>
      );
    }

    if (applications.length === 0) {
      return (
        <div className="rounded-3xl border border-slate-200/70 bg-white px-6 py-16 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
            <Briefcase className="size-8" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-xl font-bold text-slate-950">
            No applications yet
          </h2>
          <p className="mt-2 text-base text-slate-600">
            When you apply for a job on ekazi, it will appear here.
          </p>
          <Link
            to={JOBS_ROUTE}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1D4FA3] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-[#18428A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2"
          >
            <Search className="size-4" aria-hidden="true" />
            Search for jobs
          </Link>
        </div>
      );
    }

    return (
      <ul aria-label="Your applications" className="space-y-3">
        {applications.map((app: any) => {
          const job = app.job;

          return (
            <li
              key={app?.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
            >
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-lg overflow-hidden shrink-0">
                  <img
                    src={
                      job.company_logo
                        ? `https://api.ekazi.co.tz/${job.company_logo}`
                        : "/employer.png"
                    }
                    alt="company logo"
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="break-word text-base font-semibold text-slate-950">
                    {job?.position}
                  </h2>
                  <p className="mt-0.5 break-word text-sm font-medium text-slate-600">
                    {job?.company}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      Posted {formatDate(job?.posted_on)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      Applied {formatDate(app.applied_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <ViewApplication selectedJob={job} />
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-Blue">
            Applied jobs
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep track of the jobs you've applied for on ekazi.
          </p>
        </div>
        {!isLoading && !isError && (
          <span className="shrink-0 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            {applications.length}{" "}
            {applications.length === 1 ? "application" : "applications"}
          </span>
        )}
      </header>

      <section aria-busy={isLoading} className="mt-6">
        {renderContent()}
      </section>
    </div>
  );
};

export default ApplicationsPage;
