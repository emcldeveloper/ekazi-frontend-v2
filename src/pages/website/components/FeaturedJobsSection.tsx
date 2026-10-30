import { useNavigate } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { IconFolderCode } from "@tabler/icons-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

import { useJobs } from "@/hooks/jobs";
import JobCard from "../jobs/JobCard";

const MAX_JOBS = 9;

const JobCardSkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
    <div className="mt-5 flex gap-2">
      <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" />
      <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100" />
    </div>
    <div className="mt-5 h-3 w-1/3 animate-pulse rounded bg-gray-100" />
  </div>
);

const FeaturedJobsSection = () => {
  const navigate = useNavigate();

  const { data: jobsData, isLoading } = useJobs({});
  const jobs = jobsData?.data ?? [];
  const total = jobsData?.total ?? jobsData?.meta?.total ?? jobs.length;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white py-16">
      {/* background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-Orange/10 blur-3xl" />
        <div className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-Blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl">
              Latest <span className="text-Orange">Jobs</span>
            </h2>
          </div>

          <Button
            onClick={() => navigate("/jobs")}
            variant="outline"
            className="hidden h-11 rounded-full border-Blue/20 px-6 text-Blue transition hover:border-Orange hover:bg-Orange hover:text-white md:inline-flex"
          >
            View all jobs
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="mt-10 lg:mt-12">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {jobs.slice(0, MAX_JOBS).map((job: any, i: number) => (
                <div
                  key={job.id}
                  className="job-card-in h-full transition-transform duration-300 hover:-translate-y-1 [&>*]:h-full"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/60 py-12">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <IconFolderCode />
                  </EmptyMedia>
                  <EmptyTitle>No Jobs Available Yet</EmptyTitle>
                  <EmptyDescription>
                    There are no job openings available right now. Please check
                    back later for new opportunities that match your skills and
                    career goals.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {!isLoading && jobs.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-Blue px-6 py-8 text-center shadow-xl shadow-slate-900/20 sm:flex-row sm:justify-between sm:px-10 sm:text-left">
            <div className="flex items-center gap-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-Orange text-white ring-4 ring-Orange/25 sm:flex">
                <BriefcaseBusiness size={22} />
              </div>
              <div>
                <p className="text-lg font-bold text-white sm:text-xl">
                  {total > MAX_JOBS
                    ? `${total.toLocaleString()}+ jobs waiting for you`
                    : "Looking for more opportunities?"}
                </p>
                <p className="text-sm text-white/60">
                  Browse every open role and filter by what matters to you.
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/jobs")}
              className="h-11 w-full rounded-full bg-Orange px-7 font-semibold shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:w-auto"
            >
              Explore all jobs
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <style>{`
        .job-card-in { animation: job-card-in 0.5s ease-out both; }
        @keyframes job-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) { .job-card-in { animation: none; } }
      `}</style>
    </section>
  );
};

export default FeaturedJobsSection;

// import { useNavigate } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { IconFolderCode } from "@tabler/icons-react";

// import {
//   Empty,
//   EmptyDescription,
//   EmptyHeader,
//   EmptyMedia,
//   EmptyTitle,
// } from "@/components/ui/empty";
// import { Button } from "@/components/ui/button";

// import { useJobs } from "@/hooks/jobs";
// import JobCard from "../jobs/JobCard";
// import LoadingState from "@/components/loading-state";

// const FeaturedJobsSection = () => {
//   const navigate = useNavigate();

//   const { data: jobsData, isLoading } = useJobs({});
//   const jobs = jobsData?.data ?? [];

//   return (
//     <section className="">
//       <div className="container mx-auto px-4 sm:px-10 py-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
//               Latest Jobs
//             </h2>
//           </div>

//           <Button
//             variant="link"
//             onClick={() => navigate("/jobs")}
//             className="text-Blue text-base"
//           >
//             View all jobs <ArrowRight className="w-4 h-4" />
//           </Button>
//         </div>

//         {isLoading ? (
//           <LoadingState />
//         ) : jobs.length > 0 ? (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {jobs.slice(0, 9).map((job: any) => (
//               <div key={job.id}>
//                 <JobCard job={job} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <Empty>
//             <EmptyHeader>
//               <EmptyMedia variant="icon">
//                 <IconFolderCode />
//               </EmptyMedia>
//               <EmptyTitle>No Jobs Available Yet</EmptyTitle>
//               <EmptyDescription>
//                 There are no job openings available right now. Please check back
//                 later for new opportunities that match your skills and career
//                 goals.
//               </EmptyDescription>
//             </EmptyHeader>
//           </Empty>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedJobsSection;
