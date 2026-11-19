import { Loader2, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { capitalizeText, formatDate } from "@/utils/helpers";
import { cn } from "@/lib/utils";

export interface SavedJob {
  cart_id: number;
  job_id: number;
  title: string | null;
  position: string | null;
  company: string;
  company_logo: string | null;
  posted_on: string | null;
  deadline: string | null;
  status: string;
  job_type: {
    id: number;
    name: string;
  } | null;
  view_count: number;
  location: {
    country: {
      id: number;
      name: string;
    } | null;
    region: {
      id: number;
      name: string;
    } | null;
    addresses: {
      id: number;
      sub_location: string | null;
    }[];
  } | null;
  added_at: string | null;
}

interface SavedJobCardProps {
  job: SavedJob;
  isActive?: boolean;
  onClick?: () => void;
  onUnsave?: (jobId: number) => void;
  isUnsaving?: boolean;
}

const SavedJobCard = ({
  job,
  isActive = false,
  onClick,
  onUnsave,
  isUnsaving = false,
}: SavedJobCardProps) => {
  const jobTitle = job.position || job.title || "Untitled position";

  const companyName = job.company;
  const companyLogo = job.company_logo;
  const jobType = job.job_type?.name;

  const address = job.location?.addresses?.[0];
  const region = job.location?.region?.name;
  const countryName = job.location?.country?.name;

  const location = [
    address?.sub_location ? capitalizeText(address.sub_location) : null,
    region,
    countryName,
  ]
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index)
    .join(", ");

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border py-0",
        "transition-all duration-200 ease-in-out",
        "hover:border-Blue/50 hover:bg-blue-50/30 hover:shadow-md",
        isActive
          ? "border-Blue bg-blue-50/50 shadow-md ring-1 ring-Blue/20 dark:bg-Blue/10"
          : "border-border bg-card",
      )}
    >
      {/* Full-card clickable overlay */}
      <button
        type="button"
        onClick={onClick}
        aria-label={`View ${jobTitle} details`}
        aria-pressed={isActive}
        className={cn(
          "absolute inset-0 z-0 cursor-pointer rounded-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-Blue",
        )}
      />

      {/* Active indicator */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-1 bg-Blue transition-opacity duration-200",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        )}
      />

      {/* Unsave button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isUnsaving}
        aria-label={`Remove ${jobTitle} from saved jobs`}
        title="Remove from saved jobs"
        onClick={(e) => {
          e.stopPropagation();
          onUnsave?.(job.job_id);
        }}
        className={cn(
          "absolute right-3 top-3 z-20 size-9 rounded-full",
          "bg-background/90 shadow-sm transition-all",
          "hover:bg-red-50 hover:text-red-600",
          "dark:hover:bg-red-950/30",
        )}
      >
        {isUnsaving ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </Button>

      {/* Card content */}
      <CardContent
        className={cn(
          "pointer-events-none relative z-10",
          "flex flex-col gap-4 p-5 pr-14",
          "sm:flex-row sm:items-center",
        )}
      >
        {/* Company logo */}
        <div className="flex h-[75px] w-[120px] shrink-0 items-center justify-center rounded-lg  p-2">
          <img
            src={companyLogo ? `${IMG_BASE}${companyLogo}` : DEFAULT_IMG}
            alt={companyName || "Company Logo"}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Job information */}
        <div className="min-w-0 flex-1">
          <div className="mb-2">
            {/* Job title */}
            <h3
              className={cn(
                "truncate text-base font-semibold transition-colors",
                isActive ? "text-Blue" : "text-Orange",
              )}
            >
              {capitalizeText(jobTitle)}
            </h3>

            {/* Company name */}
            <p className="text-sm font-medium text-Blue">{companyName}</p>
          </div>

          {/* Job details */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {jobType && <span>{jobType}</span>}

            {location && (
              <>
                {jobType && (
                  <Separator orientation="vertical" className="h-4" />
                )}

                <span>{location}</span>
              </>
            )}

            {job.deadline && (
              <>
                {(jobType || location) && (
                  <Separator orientation="vertical" className="h-4" />
                )}

                <span>{formatDate(job.deadline)}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedJobCard;
