import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import JobCard from "./jobs/JobCard";
import { useJobs } from "@/hooks/jobs";

const FeaturedJobsSection = () => {
  const navigate = useNavigate();

  const { data: jobsData, isLoading } = useJobs({});
  const jobs = jobsData?.data ?? [];

  return (
    <section>
      <div className="container mx-auto px-4 sm:px-10 my-8">
        <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
          Latest Jobs
        </h2>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.slice(0, 9).map((job: any) => (
            <div key={job.id}>
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center my-4">
            <Spinner className="size-8" />
          </div>
        )}

        {/* View More */}
        <div className="flex justify-center my-6">
          <Button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 bg-Blue hover:bg-blue-700 text-white"
          >
            View More <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
