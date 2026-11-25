import { Card, CardContent } from "@/components/ui/card";
import { BASE_URL, DEFAULT_IMG, IMG_BASE } from "@/config";
import { capitalizeText, formatDate } from "@/utils/helpers";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: any;
  isActive?: boolean;
  onClick?: () => void;
}

const AppJobCard = ({ job, isActive = false, onClick }: JobCardProps) => {
  const jobTitle = job.position?.name;
  const address = job.addresses?.[0];
  const region = address?.region?.region_name;
  const countryName = address?.region?.country?.name;
  // const featuredCompany = job?.featured;

  const location = [
    address?.sub_location ? capitalizeText(address.sub_location) : null,
    region,
    countryName,
  ]
    .filter(Boolean)
    .join(", ");

  const logo = job.client?.logo;
  const primaryLogo = logo ? `${BASE_URL}/${logo}` : DEFAULT_IMG;
  const secondaryLogo = logo ? `${IMG_BASE}/${logo}` : DEFAULT_IMG;

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

      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        {/* Company logo */}
        <div className="flex h-[75px] w-[120px] shrink-0 items-center justify-center rounded-lg p-2">
          <img
            key={primaryLogo}
            src={primaryLogo}
            alt={job.client?.name || "Company Logo"}
            className="max-h-full max-w-full object-contain"
            onError={({ currentTarget: img }) => {
              const attempted = img.getAttribute("src");

              if (attempted === DEFAULT_IMG) return;

              img.src =
                attempted === primaryLogo && secondaryLogo !== primaryLogo
                  ? secondaryLogo
                  : DEFAULT_IMG;
            }}
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
              {capitalizeText(jobTitle || "Untitled position")}
            </h3>

            <p className="text-sm font-medium text-Blue">{job.client?.name}</p>

            <p>{job.industry?.name && <span>{job.industry.name}</span>}</p>
          </div>

          {/* Job details */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {job.type?.name && <span>{job.type.name}</span>}

            {location && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span>{location}</span>
              </>
            )}

            {job.dead_line && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span>{formatDate(job.dead_line)}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppJobCard;
