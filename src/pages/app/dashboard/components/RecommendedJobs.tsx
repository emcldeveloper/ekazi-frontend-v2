import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { useJobMatch } from "@/hooks/jobs/useJobMatch";
import { ViewJob } from "../../jobs";

const RecommendedJobs = () => {
  const applicant_id = Number(localStorage.getItem("applicantId"));

  const { data: matchedJobs } = useJobMatch(31941);
  const jobs = matchedJobs?.matches ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-2">
        <h5 className="font-bold text-base mb-0">Recommended jobs for you</h5>

        <Link
          to="/app/jobs"
          className="text-primary flex items-center gap-2 text-sm hover:underline"
        >
          View All Jobs <ArrowRight />
        </Link>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 gap-4 space-y-3">
        {jobs.slice(0, 7).map((job: any) => (
          <Card
            key={job.id}
            className="cursor-pointer hover:bg-muted/50 transition"
          >
            <CardContent>
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-20 h-20 bg-muted rounded overflow-hidden shrink-0">
                  <img
                    src={`${IMG_BASE}${job.client?.logo || ""}`}
                    alt={job.client?.client_name || "Company Logo"}
                    className="w-full h-full object-contain"
                    onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h6 className="font-bold mb-1 text-sm">
                    {job.job_position?.position_name || "Untitled"}
                  </h6>

                  <div className="text-muted-foreground flex items-center text-xs mb-1">
                    <Building2 className="mr-2" />
                    {job.client?.client_name}
                  </div>

                  {job.job_addresses?.[0]?.region?.region_name && (
                    <div className="text-muted-foreground text-xs mb-1">
                      {job.job_addresses?.[0]?.region?.region_name},{" "}
                      {job.job_addresses?.[0]?.region?.country?.name}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Posted{" "}
                    {job.publish_date
                      ? formatDistanceToNow(new Date(job.publish_date), {
                          addSuffix: true,
                        })
                      : "Not specified"}
                  </p>
                </div>

                <ViewJob />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;
