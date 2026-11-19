import { Link, useSearchParams } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useJobMatch } from "@/hooks/jobs/useJobMatch";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { DataPagination } from "@/components/data-pagination";
import { LoadingRow } from "../components/LoadingRow";
import AppViewJob from "../AppViewJob";
import MatchedJobCard from "./MatchedJobCard";

const PROFILE_ROUTE = "/job/profile";

const MatchedJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const jobIdParam = searchParams.get("jobId");

  const activeJobId =
    jobIdParam && /^\d+$/.test(jobIdParam) && Number(jobIdParam) > 0
      ? Number(jobIdParam)
      : null;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: jobsData,
    isLoading,
    isError,
    refetch,
  } = useJobMatch({ page, limit: perPage });
  const matchedJobs = jobsData?.data ?? [];

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
    if (isLoading)
      return (
        <ul aria-hidden="true" className="space-y-3">
          <LoadingRow />
          <LoadingRow />
          <LoadingRow />
        </ul>
      );

    if (isError) {
      return (
        <div
          role="alert"
          className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200/70 bg-white px-6 py-16 text-center"
        >
          <p className="font-semibold text-slate-800">
            We couldn't load matched jobs.
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

    if (matchedJobs.length === 0) {
      return (
        <Card className="h-full">
          <CardContent>
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
                <BriefcaseBusiness className="size-8" aria-hidden="true" />
              </span>

              <h2 className="text-xl font-bold">No matched jobs yet</h2>

              <p className="text-sm text-muted-foreground">
                Jobs that fit your profile will appear here.
                <br /> Keep your profile up to date to improve your matches.
              </p>

              <Button>
                <Link to={PROFILE_ROUTE}>Update profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <ul aria-label="Matched jobs" className="space-y-3">
        {matchedJobs.map((job: any) => (
          <li key={job?.id}>
            <MatchedJobCard
              job={job}
              isActive={activeJobId === job.job_id}
              onClick={() => handleJobClick(job.job_id)}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-4">
      <section aria-busy={isLoading} className="mt-6">
        {renderContent()}
      </section>

      {/* Pagination */}
      {matchedJobs.length > 0 && (
        <DataPagination
          page={jobsData?.current_page}
          perPage={jobsData?.per_page}
          totalPages={jobsData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}

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

export default MatchedJobsPage;
