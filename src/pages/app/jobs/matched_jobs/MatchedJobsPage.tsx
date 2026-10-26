import { formatDistanceToNow } from "date-fns";
import { Building2 } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { useJobMatch } from "@/hooks/jobs/useJobMatch";
import { useIncrementJobView } from "@/hooks/jobs";
import ViewMatchedJob from "./ViewMatchedJob";

const MatchedJobsPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: jobsData } = useJobMatch();
  const matchedJobs = jobsData?.matches ?? [];

  const { mutate: incrementJobView } = useIncrementJobView();

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    incrementJobView(job.id);
    setShowModal(true);
  };

  const handleModalChange = (open: any) => {
    setShowModal(open);

    if (!open) {
      setSelectedJob(null);
    }
  };

  return (
    <>
      <Card>
        <CardContent className="space-y-4">
          <CardHeader className="p-0 flex items-center justify-between">
            <h5 className="text-xl text-Blue font-semibold">
              Jobs match for you
            </h5>
          </CardHeader>

          <Separator />

          <div className="grid sm:grid-cols-2 gap-4">
            {matchedJobs.map((job: any) => (
              <Card
                key={job.id}
                onClick={() => handleJobClick(job)}
                className="mb-3 cursor-pointer hover:bg-muted/40 transition rounded-xl"
              >
                <CardContent>
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-muted rounded overflow-hidden">
                      <img
                        src={`${IMG_BASE}${job.client?.logo || ""}`}
                        alt={job.client?.client_name || "Company Logo"}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = DEFAULT_IMG;
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <h6 className="font-semibold">
                        {job.job_position?.position_name || "Untitled"}
                      </h6>

                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Building2 className="h-4 w-4 mr-2" />
                        {job.client?.client_name || "N/A"}
                      </div>

                      {job.job_addresses?.[0]?.region?.region_name && (
                        <div className="text-sm text-muted-foreground">
                          {job.job_addresses[0].region.region_name},{" "}
                          {job.job_addresses[0].region.country?.name}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground mt-1">
                        Posted:{" "}
                        {job.created_at
                          ? formatDistanceToNow(new Date(job.created_at), {
                              addSuffix: true,
                            })
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <ViewMatchedJob
        open={showModal}
        onOpenChange={handleModalChange}
        jobDetails={selectedJob}
      />
    </>
  );
};

export default MatchedJobsPage;
