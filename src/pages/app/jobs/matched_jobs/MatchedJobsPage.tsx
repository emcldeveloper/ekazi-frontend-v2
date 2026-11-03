import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, CalendarDays, MapPin, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { DEFAULT_IMG, IMG_BASE } from "@/config";
import { useIncrementJobView } from "@/hooks/jobs";
import { useJobMatch } from "@/hooks/jobs/useJobMatch";
import { formatDate } from "@/utils/helpers";
import ViewMatchedJob from "./ViewMatchedJob";

// Change this if your candidate profile lives at a different route.
const PROFILE_ROUTE = "/app/profile";
const CLOSING_SOON_DAYS = 7;
const SKELETON_COUNT = 6;

type JobAddress = {
  region?: {
    region_name?: string;
    country?: { name?: string } | null;
  } | null;
};

type MatchedJob = {
  id: number;
  position: string;
  company?: string;
  company_logo?: string | null;
  deadline?: string | null;
  job_addresses?: JobAddress[];
};

const getDaysLeft = (deadline?: string | null) => {
  if (!deadline) return null;

  const end = new Date(deadline);
  if (Number.isNaN(end.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return Math.round((end.getTime() - today.getTime()) / 86_400_000);
};

const getDeadlineLabel = (daysLeft: number | null) => {
  if (daysLeft === null || daysLeft > CLOSING_SOON_DAYS) return null;
  if (daysLeft < 0) return "Closed";
  if (daysLeft === 0) return "Closes today";
  if (daysLeft === 1) return "Closes tomorrow";
  return `Closes in ${daysLeft} days`;
};

const getLocation = (addresses: JobAddress[] = []) => {
  const region = addresses[0]?.region;
  const place = [region?.region_name, region?.country?.name]
    .filter(Boolean)
    .join(", ");

  if (!place) return null;
  return addresses.length > 1
    ? `${place} +${addresses.length - 1} more`
    : place;
};

const JobCard = ({
  job,
  onSelect,
}: {
  job: MatchedJob;
  onSelect: (job: MatchedJob) => void;
}) => {
  const location = getLocation(job.job_addresses);
  const daysLeft = getDaysLeft(job.deadline);
  const deadlineLabel = getDeadlineLabel(daysLeft);
  const isClosed = daysLeft !== null && daysLeft < 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(job)}
      className="flex h-full w-full flex-col rounded-lg border bg-card text-left transition-colors hover:border-Blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      <div className="flex flex-1 items-start gap-4 p-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white p-1">
          <img
            src={
              job.company_logo ? `${IMG_BASE}${job.company_logo}` : DEFAULT_IMG
            }
            alt=""
            className="h-full w-full object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_IMG;
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-Blue">
            {job.position}
          </h3>

          {job.company && (
            <p className="mt-1 truncate text-sm text-foreground">
              {job.company}
            </p>
          )}

          {location && (
            <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{location}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 border-t px-4 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {job.deadline
            ? `Deadline: ${formatDate(job.deadline)}`
            : "No deadline listed"}
        </span>

        {deadlineLabel && (
          <span
            className={
              isClosed
                ? "rounded-full border px-2 py-0.5 font-medium"
                : "rounded-full border border-Orange px-2 py-0.5 font-medium text-Orange"
            }
          >
            {deadlineLabel}
          </span>
        )}
      </div>
    </button>
  );
};

const JobsLoading = () => (
  <div role="status" aria-label="Loading matched jobs">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-hidden="true">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div key={index} className="rounded-lg border">
          <div className="flex items-start gap-4 p-4">
            <Skeleton className="h-14 w-14 shrink-0 rounded-md motion-reduce:animate-none" />
            <div className="flex-1 space-y-2.5">
              <Skeleton className="h-4 w-4/5 motion-reduce:animate-none" />
              <Skeleton className="h-3.5 w-1/2 motion-reduce:animate-none" />
              <Skeleton className="h-3.5 w-2/3 motion-reduce:animate-none" />
            </div>
          </div>
          <div className="flex min-h-11 items-center border-t px-4 py-2">
            <Skeleton className="h-3 w-2/5 motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const JobsMessage = ({
  icon,
  title,
  description,
  action,
  isAlert = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action: ReactNode;
  isAlert?: boolean;
}) => (
  <div
    role={isAlert ? "alert" : undefined}
    className="mx-auto flex max-w-sm flex-col items-center px-4 py-12 text-center"
  >
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-Blue">{title}</h3>
    <p className="mb-5 mt-1 text-sm text-muted-foreground">{description}</p>
    {action}
  </div>
);

const MatchedJobsPage = () => {
  const [selectedJob, setSelectedJob] = useState<MatchedJob | null>(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: jobsData,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useJobMatch();
  const matchedJobs: MatchedJob[] = jobsData?.data ?? [];

  const { mutate: incrementJobView } = useIncrementJobView();

  const handleJobClick = (job: MatchedJob) => {
    setSelectedJob(job);
    incrementJobView({ job_id: job.id });
    setShowModal(true);
  };

  const handleModalChange = (open: boolean) => {
    setShowModal(open);

    if (!open) {
      setSelectedJob(null);
    }
  };

  const renderContent = () => {
    if (isLoading) return <JobsLoading />;

    // A failed background refresh keeps showing the jobs already loaded.
    if (isError && matchedJobs.length === 0) {
      return (
        <JobsMessage
          isAlert
          icon={<AlertCircle className="h-6 w-6" aria-hidden="true" />}
          title="Your matched jobs didn't load"
          description="Check your connection and try again."
          action={
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Trying again..." : "Try again"}
            </Button>
          }
        />
      );
    }

    if (matchedJobs.length === 0) {
      return (
        <JobsMessage
          icon={<SearchX className="h-6 w-6" aria-hidden="true" />}
          title="No matched jobs yet"
          description="Jobs that fit your profile will appear here. Keep your profile up to date to improve your matches."
          action={
            <Button>
              <Link to={PROFILE_ROUTE}>Update profile</Link>
            </Button>
          }
        />
      );
    }

    return (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {matchedJobs.map((job) => (
          <li key={job.id} className="min-w-0">
            <JobCard job={job} onSelect={handleJobClick} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Card>
        <CardContent className="space-y-4">
          <CardHeader className="p-0">
            <h2 className="text-xl font-semibold text-Blue">Best Matches</h2>
            {!isLoading && matchedJobs.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {matchedJobs.length}{" "}
                {matchedJobs.length === 1 ? "job fits" : "jobs fit"} your
                profile
              </p>
            )}
          </CardHeader>

          <Separator />

          {renderContent()}
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

// import { useState } from "react";

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// import { DEFAULT_IMG, IMG_BASE } from "@/config";
// import { useJobMatch } from "@/hooks/jobs/useJobMatch";
// import { useIncrementJobView } from "@/hooks/jobs";
// import ViewMatchedJob from "./ViewMatchedJob";
// import { formatDate } from "@/utils/helpers";

// const MatchedJobsPage = () => {
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const { data: jobsData } = useJobMatch();
//   const matchedJobs = jobsData?.data ?? [];

//   const { mutate: incrementJobView } = useIncrementJobView();

//   const handleJobClick = (job: any) => {
//     setSelectedJob(job);
//     incrementJobView(job.id);
//     setShowModal(true);
//   };

//   const handleModalChange = (open: any) => {
//     setShowModal(open);

//     if (!open) {
//       setSelectedJob(null);
//     }
//   };

//   return (
//     <>
//       <Card>
//         <CardContent className="space-y-4">
//           <CardHeader className="p-0 flex items-center justify-between">
//             <h5 className="text-xl text-Blue font-semibold">
//               Jobs match for you
//             </h5>
//           </CardHeader>

//           <Separator />

//           <div className="grid sm:grid-cols-2 gap-4">
//             {matchedJobs.map((job: any) => (
//               <Card
//                 key={job.id}
//                 onClick={() => handleJobClick(job)}
//                 className="mb-3 cursor-pointer hover:bg-muted/40 transition rounded-xl"
//               >
//                 <CardContent>
//                   <div className="flex gap-4 items-center">
//                     <div className="w-20 h-20 bg-muted rounded overflow-hidden">
//                       <img
//                         src={`${IMG_BASE}${job.company_logo}`}
//                         alt={job.company || "Company Logo"}
//                         className="w-full h-full object-contain"
//                         onError={(e) => {
//                           e.currentTarget.onerror = null;
//                           e.currentTarget.src = DEFAULT_IMG;
//                         }}
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <h6 className="text-base text-Orange font-semibold">
//                         {job.position}
//                       </h6>

//                       <div className="text-sm  text-Blue mb-1">
//                         {job.company}
//                       </div>

//                       {job.job_addresses?.[0]?.region?.region_name && (
//                         <div className="text-sm text-muted-foreground">
//                           {job.job_addresses[0].region.region_name},{" "}
//                           {job.job_addresses[0].region.country?.name}
//                         </div>
//                       )}

//                       <p className="text-xs text-muted-foreground mt-1">
//                         Deadline: {formatDate(job.deadline)}
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <ViewMatchedJob
//         open={showModal}
//         onOpenChange={handleModalChange}
//         jobDetails={selectedJob}
//       />
//     </>
//   );
// };

// export default MatchedJobsPage;
