import { useState } from "react";
import { Bookmark } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { useDeleteSavedJob, useSavedJobs } from "@/hooks/jobs";
import { DataPagination } from "@/components/data-pagination";
import { LoadingRow } from "../components/LoadingRow";
import AppViewJob from "../AppViewJob";
import SavedJobCard from "./SavedJobCard";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Card, CardContent } from "@/components/ui/card";

const SavedJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const jobIdParam = searchParams.get("jobId");

  const activeJobId =
    jobIdParam && /^\d+$/.test(jobIdParam) && Number(jobIdParam) > 0
      ? Number(jobIdParam)
      : null;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [unsavingJobId, setUnsavingJobId] = useState<number | null>(null);

  const { data: jobsData, isLoading } = useSavedJobs({ page, limit: perPage });
  const savedJobs = jobsData?.data ?? [];

  const { mutate: unsaveJob } = useDeleteSavedJob();

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

  const handleUnsaveJob = (jobId: number) => {
    setUnsavingJobId(jobId);

    unsaveJob(jobId, {
      onSuccess: () => {
        toast.success("Job removed from saved jobs");
        setUnsavingJobId(null);
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
        setUnsavingJobId(null);
      },
    });
  };

  return (
    <div className="space-y-4 mt-6">
      {isLoading ? (
        <ul aria-hidden="true" className="space-y-3">
          <LoadingRow />
          <LoadingRow />
          <LoadingRow />
        </ul>
      ) : savedJobs.length > 0 ? (
        <ul className="space-y-3">
          {savedJobs.map((job: any) => (
            <li key={job?.job_id}>
              <SavedJobCard
                job={job}
                isActive={activeJobId === job.job_id}
                onClick={() => handleJobClick(job.job_id)}
                onUnsave={handleUnsaveJob}
                isUnsaving={unsavingJobId === job.job_id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Card className="mt-6 h-full">
          <CardContent>
            <section className="flex flex-1 items-center justify-center text-center">
              <div className="max-w-md">
                <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
                  <Bookmark className="size-8" aria-hidden="true" />
                </span>

                <h2 className="mt-6 text-xl font-bold text-Blue dark:text-white">
                  No saved jobs yet
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  When you save a job, it will appear here.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {savedJobs.length > 0 && (
        <DataPagination
          page={jobsData?.page}
          perPage={jobsData?.limit}
          totalPages={jobsData?.totalPages}
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

export default SavedJobsPage;
