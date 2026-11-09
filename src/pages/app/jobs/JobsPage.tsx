import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Briefcase } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import JobDetails from "./components/JobDetails";
import SidebarListJobs from "./components/SidebarListJobs";
import JobFilters from "./components/JobFilters";
import MatchedJobsPage from "./MatchedJobsPage";
import SavedJobsPage from "./SavedJobsPage";

const FindJobs = () => {
  const location = useLocation();

  const [selectedJob, setSelectedJob] = useState<{
    id: number;
  } | null>(null);
  const [activeJob, setActiveJob] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
    <div className="space-y-4">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-Blue">
          Find jobs
        </h1>
      </header>

      <Tabs defaultValue="all">
        <TabsList variant="line">
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="matched">Matched Jobs</TabsTrigger>
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div>
            {/* Filters */}
            <div className="mt-6">
              <JobFilters
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </div>

            {/* Layout */}
            <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
              {/* Sidebar */}
              <section
                aria-label="Job results"
                className="min-w-0 lg:col-span-5"
              >
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
              </section>

              {/* Job Details */}
              <section
                aria-label="Job details"
                className="hidden min-w-0 sm:block lg:sticky lg:top-6 lg:col-span-7"
              >
                {selectedJob ? (
                  <Card className="overflow-hidden rounded-3xl border-slate-200/70 bg-white shadow-none">
                    <CardContent className="p-5 sm:p-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
                      <JobDetails jobId={selectedJob.id} />
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-slate-200/70 bg-white p-6 text-center">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4FA3]">
                      <Briefcase className="size-6" aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-semibold text-slate-800">
                      Select a job to view its details
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Choose a job from the list to see the full description.
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="matched">
          <MatchedJobsPage />
        </TabsContent>
        <TabsContent value="saved">
          <SavedJobsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FindJobs;

// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Briefcase } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";

// import JobDetails from "./components/JobDetails";
// import SidebarListJobs from "./components/SidebarListJobs";
// import JobFilters from "./components/JobFilters";

// const FindJobs = () => {
//   const location = useLocation();

//   const [selectedJob, setSelectedJob] = useState<{
//     id: number;
//   } | null>(null);
//   const [activeJob, setActiveJob] = useState(null);
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);

//   const [filters, setFilters] = useState({
//     search: "",
//     industry: "",
//   });

//   // Read URL params
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const industryParam = params.get("industry");

//     if (industryParam) {
//       setFilters((prev) => ({
//         ...prev,
//         industry: industryParam,
//       }));
//     }
//   }, [location.search]);

//   const handleFilterChange = (filterValues: any) => {
//     setFilters((prev) => {
//       const isSame =
//         prev.search === filterValues.search &&
//         prev.industry === filterValues.industry;

//       if (isSame) return prev; // ✅ do nothing

//       setPage(1); // only reset if filters actually changed
//       return filterValues;
//     });
//   };

//   return (
//     <div>
//       <div className="space-y-4">
//         <h5 className="text-xl text-Blue font-semibold mb-3">Find Jobs</h5>

//         {/* Filters */}
//         <JobFilters
//           onFilterChange={handleFilterChange}
//           initialFilters={filters}
//         />

//         {/* Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* Sidebar */}
//           <div className="lg:col-span-5">
//             <SidebarListJobs
//               filters={filters}
//               selectedJob={selectedJob}
//               setSelectedJob={setSelectedJob}
//               setActiveJob={setActiveJob}
//               activeJob={activeJob}
//               page={page}
//               setPage={setPage}
//               perPage={perPage}
//               setPerPage={setPerPage}
//             />
//           </div>

//           {/* Job Details */}
//           <div className="hidden sm:block lg:col-span-7">
//             {selectedJob ? (
//               <Card>
//                 <CardContent>
//                   <JobDetails jobId={selectedJob.id} />
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
//                 <Briefcase className="w-10 h-10 mb-3 opacity-70" />
//                 <p className="text-sm md:text-base">
//                   Select a job to view its details
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FindJobs;
