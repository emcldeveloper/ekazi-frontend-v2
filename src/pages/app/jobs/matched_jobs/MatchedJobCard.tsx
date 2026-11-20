import { Card, CardContent } from "@/components/ui/card";
import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { capitalizeText, formatDate } from "@/utils/helpers";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface MatchedJob {
  job_id: number;
  title: string | null;
  position: string | null;
  industry: string | null;
  position_level: string | null;
  company: string;
  company_logo: string | null;
  posted_on: string | null;
  deadline: string | null;
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
  years_experience_required: number;
  applicant_experience_years: number;
  matched_criteria: number;
  total_criteria: number;
  match_percentage: number;
  recommendation: string;
}

interface MatchedJobCardProps {
  job: MatchedJob;
  isActive?: boolean;
  onClick?: () => void;
}

const MatchedJobCard = ({
  job,
  isActive = false,
  onClick,
}: MatchedJobCardProps) => {
  const jobTitle = job.position || job.title || "Untitled position";
  const address = job.location?.addresses?.[0];
  const region = job.location?.region?.name;
  const countryName = job.location?.country?.name;
  const companyName = job.company;
  const companyLogo = job.company_logo;

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
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "group relative cursor-pointer overflow-hidden border py-0",
        "transition-all duration-200 ease-in-out",
        "hover:border-Blue/50 hover:bg-blue-50/30 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-Blue",
        isActive
          ? "border-Blue bg-blue-50/50 shadow-md ring-1 ring-Blue/20 dark:bg-Blue/10"
          : "border-border bg-card",
      )}
    >
      {/* Active indicator */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-1 bg-Blue transition-opacity duration-200",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        )}
      />

      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
        {/* Company logo */}
        <div className="flex h-[75px] w-[120px] shrink-0 items-center justify-center rounded-lg p-2">
          <img
            src={
              companyLogo
                ? `${IMG_BASE}/${companyLogo.replace(/^\/+/, "")}`
                : DEFAULT_IMG
            }
            alt={companyName || "Company Logo"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_IMG;
            }}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Job information */}
        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <h3
              className={cn(
                "truncate text-base font-semibold transition-colors",
                isActive ? "text-Blue" : "text-Orange",
              )}
            >
              {capitalizeText(jobTitle)}
            </h3>

            <p className="text-sm font-medium text-Blue">{job.company}</p>

            {job.industry && (
              <p className="text-sm text-muted-foreground">
                {capitalizeText(job.industry)}
              </p>
            )}
          </div>

          {/* Job details */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {job.job_type?.name && <span>{job.job_type.name}</span>}

            {location && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span>{location}</span>
              </>
            )}

            {job.deadline && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span>{formatDate(job.deadline)}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchedJobCard;
