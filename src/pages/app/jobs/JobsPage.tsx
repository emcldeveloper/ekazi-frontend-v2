import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Briefcase } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import JobDetails from "./components/JobDetails";
import SidebarListJobs from "./components/SidebarListJobs";
import JobFilters from "./components/JobFilters";

const FindJobs = () => {
  const location = useLocation();

  const [selectedJob, setSelectedJob] = useState(null);
  const [activeJob, setActiveJob] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const [filters, setFilters] = useState({
    search: "",
    industry: "",
  });

  // Read URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const industryParam = params.get("industry");

    if (industryParam) {
      setFilters((prev) => ({
        ...prev,
        industry: industryParam,
      }));
    }
  }, [location.search]);

  const handleFilterChange = (filterValues: any) => {
    setFilters((prev) => {
      const isSame =
        prev.search === filterValues.search &&
        prev.industry === filterValues.industry;

      if (isSame) return prev; // ✅ do nothing

      setPage(1); // only reset if filters actually changed
      return filterValues;
    });
  };

  return (
    <div>
      <Card>
        <CardContent className="space-y-4">
          <h5 className="text-xl text-Blue font-semibold mb-3">Find Jobs</h5>

          <Separator />

          {/* Filters */}
          <JobFilters
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-5">
              <SidebarListJobs
                filters={filters}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                setActiveJob={setActiveJob}
                activeJob={activeJob}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </div>

            {/* Job Details */}
            <div className="hidden sm:block lg:col-span-7">
              {selectedJob ? (
                <Card>
                  <CardContent>
                    <JobDetails job={selectedJob} />
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
                  <Briefcase className="w-10 h-10 mb-3 opacity-70" />
                  <p className="text-sm md:text-base">
                    Select a job to view its details
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FindJobs;
