import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Calendar } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { useJobMatch } from "@/hooks/jobs/useJobMatch";
import { ViewJob } from "../../jobs";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/helpers";
import { useMemo } from "react";
import type { JobMatch } from "@/@types/jobs";
import { Skeleton } from "@/components/ui/skeleton";

const ALLOWED_RECOMMENDATIONS = ["Recommended", "Potential Match"];
const DISPLAY_LIMIT = 3;

const RecommendedJobs = () => {
  const { data: matchedJobs, isLoading } = useJobMatch({});

  const jobs = useMemo(() => {
    const all = matchedJobs?.data ?? [];
    return all
      .filter((job: any) =>
        ALLOWED_RECOMMENDATIONS.includes(job.recommendation),
      )
      .slice(0, DISPLAY_LIMIT);
  }, [matchedJobs]);

  const isEmpty = !isLoading && jobs.length === 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recommended jobs</CardTitle>
        {!isEmpty && (
          <CardAction>
            <Button
              variant="secondary"
              size="sm"
              render={<Link to="/app/jobs" />}
            >
              View All <ArrowRight />
            </Button>
          </CardAction>
        )}
      </CardHeader>

      {/* Empty state */}
      {isEmpty && (
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <BriefcaseBusiness className="size-6 text-muted-foreground" />
            </div>

            <div className="space-y-1">
              <h6 className="text-base font-semibold">
                No recommended jobs yet
              </h6>
              <p className="max-w-xs text-sm text-muted-foreground">
                Complete your profile to get better matches, or browse all
                available jobs in the meantime.
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              render={<Link to="/app/jobs" />}
            >
              Browse jobs <ArrowRight />
            </Button>
          </div>
        </CardContent>
      )}

      <CardContent>
        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-2">
            {Array.from({ length: DISPLAY_LIMIT }).map((_, i) => (
              <Card key={i}>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-20 rounded shrink-0" />

                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>

                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Job List */}
        {jobs.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            {jobs.map((job: JobMatch) => (
              <Card
                key={job.job_id}
                className="cursor-pointer hover:bg-muted/50 transition"
              >
                <CardContent>
                  <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="w-20 h-20 bg-muted rounded overflow-hidden shrink-0">
                      <img
                        src={`${IMG_BASE}${job.company_logo}`}
                        alt={job.company || "Logo"}
                        className="w-full h-full object-contain"
                        onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h6 className="font-bold mb-1 text-sm text-Orange">
                        {job.position}
                      </h6>

                      <div className="text-Blue flex items-center text-xs mb-1">
                        {job.company}
                      </div>

                      <div className="flex gap-1 items-center text-xs text-muted-foreground">
                        <Calendar size={14} /> {formatDate(job.deadline)}
                      </div>
                    </div>

                    <ViewJob jobId={job.job_id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedJobs;
