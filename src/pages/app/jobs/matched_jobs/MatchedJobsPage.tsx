import { Link } from "react-router-dom";
import { BriefcaseBusiness, CalendarDays, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useJobMatch } from "@/hooks/jobs/useJobMatch";
import { formatDate } from "@/utils/helpers";
import ViewJob from "../components/ViewJob";
import { Card, CardContent } from "@/components/ui/card";
import { useSaveJob } from "@/hooks/jobs";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { DataPagination } from "@/components/data-pagination";

const PROFILE_ROUTE = "/app/profile";

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

const MatchedJobsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [savingJobId, setSavingJobId] = useState<number | null>(null);

  const {
    data: jobsData,
    isLoading,
    isError,
    refetch,
  } = useJobMatch({ page, limit: perPage });
  const matchedJobs = jobsData?.data ?? [];

  const { mutate: saveJobMutate } = useSaveJob();

  const handleSaveJob = (jobId: number) => {
    setSavingJobId(jobId);

    saveJobMutate(
      { job_id: jobId },
      {
        onSuccess: (res) => {
          toast.success(res?.message ?? "Saved");
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
        onSettled: () => {
          setSavingJobId(null);
        },
      },
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
            <Card>
              <CardContent>
                <div className="flex flex-col gap-4 justify-between md:flex-row">
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
                          <CalendarDays
                            className="size-3.5"
                            aria-hidden="true"
                          />
                          Posted {formatDate(job?.posted_on)}
                        </span>
                        {/* <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    Applied {formatDate(.applied_at)}
                  </span> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0 self-end sm:self-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={savingJobId === job.job_id}
                      onClick={() => handleSaveJob(job.job_id)}
                    >
                      {savingJobId === job.job_id ? (
                        <>
                          <Loader className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>

                    <ViewJob jobId={job.job_id} />
                  </div>
                </div>
              </CardContent>
            </Card>
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
    </div>
  );
};

export default MatchedJobsPage;
