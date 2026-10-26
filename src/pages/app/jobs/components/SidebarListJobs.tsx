import { useEffect, useRef, useState } from "react";
import { MapPin, Building2, Briefcase, Calendar } from "lucide-react";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { useIsMobile } from "@/hooks/use-mobile";

import { capitalizeText } from "@/utils/helpers";
import { DataPagination } from "@/components/data-pagination";
import JobDetails from "./JobDetails";
import { useIncrementJobView, useJobs } from "@/hooks/jobs";

interface SidebarListJobsProps {
  filters: any;
  selectedJob: any;
  setSelectedJob: any;
  setActiveJob: any;
  activeJob: any;
  page: any;
  setPage: any;
  perPage: any;
  setPerPage: any;
}

const SidebarListJobs = ({
  filters,
  selectedJob,
  setSelectedJob,
  setActiveJob,
  activeJob,
  page,
  setPage,
  perPage,
  setPerPage,
}: SidebarListJobsProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const isMobile = useIsMobile();

  const { mutate: incrementJobView } = useIncrementJobView();

  const { data: jobsData, isLoading } = useJobs({
    page,
    limit: perPage,
    search: filters.search,
    industry: filters.industry,
  });

  const jobs = jobsData?.data ?? [];

  const hasUserSelected = useRef(false);

  useEffect(() => {
    if (jobs.length > 0 && !hasUserSelected.current) {
      const firstJob = jobs[0];
      setActiveJob(firstJob);
      setSelectedJob(firstJob);
    }
  }, [jobs, setActiveJob, setSelectedJob]);

  const handleJobClick = (job: any) => {
    hasUserSelected.current = true;

    setActiveJob(job);
    setSelectedJob(job);

    incrementJobView(job.id);

    if (isMobile) {
      setOpenDrawer(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-20">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      <div className="max-h-auto overflow-y-auto pr-2 space-y-3">
        {jobs.map((job: any) => {
          const isActive = activeJob?.id === job.id;

          return (
            <Card
              key={job.id}
              onClick={() => handleJobClick(job)}
              className={`cursor-pointer py-4 ${
                isActive
                  ? "bg-muted border border-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <CardContent className="px-4">
                <div className="flex gap-4">
                  {/* Logo */}
                  <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-lg overflow-hidden shrink-0">
                    <img
                      src={
                        job.client?.logo
                          ? `https://api.ekazi.co.tz/${job.client.logo}`
                          : "/employer.png"
                      }
                      alt="company logo"
                      className="max-w-[80%] max-h-[80%] object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1 flex-1 text-sm">
                    {/* Position */}
                    <p className="font-semibold leading-snug flex items-center gap-1">
                      <Briefcase size={16} />
                      {capitalizeText(job.position?.position_name)}
                    </p>

                    {/* Company */}
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 size={16} />
                      {capitalizeText(job.client?.client_name)}
                    </p>

                    {/* Location */}
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={16} />
                      {[
                        job.addresses?.[0]?.sub_location,
                        job.addresses?.[0]?.region?.region_name,
                        job.addresses?.[0]?.region?.country?.name,
                      ]
                        .filter(Boolean)
                        .map(capitalizeText)
                        .join(", ")}
                    </p>

                    {/* Date */}
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar size={16} />{" "}
                      {new Date(job.publish_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Pagination */}
        {!isLoading && (
          <DataPagination
            page={jobsData?.current_page}
            perPage={jobsData?.per_page}
            totalPages={jobsData?.total_pages}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        )}
      </div>

      {/* Job Details mobile screen */}
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="border-none">
          <div className="flex-1 scroll-fade overflow-y-auto p-4">
            {selectedJob && (
              <JobDetails
                job={selectedJob}
                // closeModal={() => setOpenDrawer(false)}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SidebarListJobs;
