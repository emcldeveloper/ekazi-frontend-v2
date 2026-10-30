import { ArrowRight, Eye } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { useIsMobile } from "@/hooks/use-mobile";

import JobDetails from "./JobDetails";
import PremiumBadge from "@/components/premium-badge";
import { capitalizeText } from "@/utils/helpers";
import { useIncrementJobView } from "@/hooks/jobs";

interface JobCardProps {
  job: any;
}

const JobCard = ({ job }: JobCardProps) => {
  const isMobile = useIsMobile();

  //   Count Job Views
  const { mutate: incrementJobView } = useIncrementJobView();

  // Extracting safer values
  const jobTitle = job.position?.name;
  const region = job.addresses?.[0]?.region?.region_name;
  const countryName = job.addresses?.[0]?.region?.country?.name;
  const safeCountry = countryName?.toLowerCase();
  const featuredCompany = job?.featured;

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-3">
          <div className="w-[120px] h-[75px] flex items-center justify-center">
            <img
              src={
                job.client?.logo
                  ? `${IMG_BASE}${job.client?.logo}`
                  : `${DEFAULT_IMG}`
              }
              alt={job.client?.name || "Company Logo"}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {featuredCompany && <PremiumBadge />}
        </div>

        {/* Title + Company */}
        <div className="mb-2">
          <h6 className="text-Orange font-semibold truncate">
            {capitalizeText(jobTitle)}
          </h6>
          <p className="text-sm text-Blue">{job.client?.name}</p>
        </div>

        {/* Details */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Industry: {job.industry?.name || "N/A"}</div>

          <div>Job Type: {job.type?.name}</div>

          {/* Location */}
          <div>
            {safeCountry === "remote" ? (
              <span>Location: Remote</span>
            ) : job?.addresses?.length > 0 ? (
              <span>
                Location:{" "}
                {job?.addresses[0].sub_location
                  ? `${capitalizeText(job?.addresses[0].sub_location)}`
                  : ""}
                {region && `, ${region}`}
                {countryName ? `, ${countryName}` : ""}
              </span>
            ) : (
              <span>Location: N/A</span>
            )}
          </div>

          {/* Deadline */}
          <div>
            <span className="text-Blue font-semibold">Deadline:</span>{" "}
            {job.dead_line
              ? new Date(job.dead_line).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-row-reverse justify-between items-center bg-white">
        {isMobile ? (
          <Drawer>
            <DrawerTrigger
              render={
                <Button
                  variant="secondary"
                  onClick={() => incrementJobView(job.id)}
                  className="transition hover:bg-Orange hover:text-white"
                >
                  View <ArrowRight />
                </Button>
              }
            />

            <DrawerContent className="border-none">
              <div className="flex-1 scroll-fade overflow-y-auto p-4">
                <JobDetails jobId={job.id} />
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="secondary"
                  onClick={() => incrementJobView(job.id)}
                  className="transition hover:bg-Orange hover:text-white"
                >
                  View <ArrowRight />
                </Button>
              }
            />
            <SheetContent className="sm:max-w-3xl!">
              <div className="scrollbar overflow-y-auto px-4">
                <JobDetails jobId={job.id} />
              </div>
            </SheetContent>
          </Sheet>
        )}

        <div className="flex items-center gap-1 text-sm">
          <Eye size={16} className="text-Orange" />
          <span>{job.statistics?.[0]?.job_views ?? 0}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
