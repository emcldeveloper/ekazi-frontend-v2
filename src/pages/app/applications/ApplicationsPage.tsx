import { Link, useSearchParams } from "react-router-dom";
import { Briefcase, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useApplications } from "@/hooks/applications";
import { LoadingRow } from "../jobs/components/LoadingRow";
import OtherJobCard from "../jobs/components/OtherJobCard";
import AppViewJob from "../jobs/AppViewJob";

const JOBS_ROUTE = "/app/jobs";

const ApplicationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const jobIdParam = searchParams.get("jobId");

  const activeJobId =
    jobIdParam && /^\d+$/.test(jobIdParam) && Number(jobIdParam) > 0
      ? Number(jobIdParam)
      : null;

  const {
    data: applicationsData,
    isLoading,
    isError,
    refetch,
  } = useApplications();
  const applications = applicationsData?.data ?? [];

  const handleJobClick = (jobId: number) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set("jobId", String(jobId));
        return params;
      },
      { preventScrollReset: true },
    );
  };

  const handleJobClose = () => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.delete("jobId");
        return params;
      },
      { replace: true, preventScrollReset: true },
    );
  };

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
        <Card className="h-full">
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
                <Briefcase className="size-8" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-xl font-bold text-Blue">
                No applications yet
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                When you apply for a job on ekazi, it will appear here.
              </p>
              <Button className="mt-6">
                <Search className="size-4" aria-hidden="true" />
                <Link to={JOBS_ROUTE}>Search for jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <ul aria-label="Your applications" className="space-y-3">
        {applications.map((app: any) => {
          return (
            <li key={app?.id}>
              <OtherJobCard
                job={app}
                isActive={activeJobId === app.job_id}
                onClick={() => handleJobClick(app.job_id)}
              />
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

      {/* Job details Sheet / Drawer */}
      <AppViewJob
        jobId={activeJobId}
        open={activeJobId !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleJobClose();
          }
        }}
      />
    </div>
  );
};

export default ApplicationsPage;
