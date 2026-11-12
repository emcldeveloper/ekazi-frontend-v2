import { Card, CardContent } from "@/components/ui/card";

import { useSavedJobs, useSaveJob } from "@/hooks/jobs";
import { formatDate } from "@/utils/helpers";
import { DataPagination } from "@/components/data-pagination";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { CalendarDays, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewJob from "../components/ViewJob";

const SavedJobsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [savingJobId, setSavingJobId] = useState<number | null>(null);

  const { data: jobsData } = useSavedJobs({ page, limit: perPage });
  const savedJobs = jobsData?.data ?? [];

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

  return (
    <div className="space-y-4 mt-6">
      <ul className="space-y-3">
        {savedJobs.map((job: any) => (
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
    </div>
  );
};

export default SavedJobsPage;

//  <div className="space-y-4">
//       <section className="mt-6 flex flex-1 items-center justify-center rounded-3xl border border-slate-200/70 bg-white px-6 py-16 text-center">
//         <div className="max-w-md">
//           <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
//             <Bookmark className="size-8" aria-hidden="true" />
//           </span>

//           <h2 className="mt-6 text-xl font-bold text-Blue">
//             No saved jobs yet
//           </h2>
//           <p className="mt-2 text-sm text-muted-foreground">
//             When you save a job, it will appear here.
//           </p>
//         </div>
//       </section>
//     </div>
