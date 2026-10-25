import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useIndustries } from "@/hooks/universals";
import { useJobs } from "@/hooks/jobs";
import Navbar from "../components/Navbar";
import { Loader, SearchIcon } from "lucide-react";
import { DataPagination } from "@/components/data-pagination";
import JobCard from "./JobCard";
import { useDebounce } from "@/hooks/useDebounce";

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search from URL
  const searchFromUrl = searchParams.get("search") ?? "";

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState(searchFromUrl);
  const [industry, setIndustry] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  //   fetch industries
  const { data: industries } = useIndustries();

  //    fetch jobs
  const { data: jobsData, isLoading } = useJobs({
    page,
    limit: perPage,
    search: debouncedSearch,
    industry,
  });

  const jobs = jobsData?.data ?? [];

  return (
    <div>
      <Navbar />

      <div className="container mx-auto max-w-6xl my-10 px-4">
        {/* Filters */}
        <div className="w-full mb-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex-1 w-full">
              <Select
                value={industry || "All Industries"}
                onValueChange={(value) => {
                  setIndustry(value === null || value === "all" ? "" : value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries?.map((industry: any) => (
                    <SelectItem
                      key={industry.id}
                      value={industry?.industry_name}
                    >
                      {industry?.industry_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="flex-2 w-full">
              <InputGroup className="w-full">
                <InputGroupInput
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <Loader className="animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex items-center justify-center text-center h-20">
            <p>No jobs found!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {jobs.map((job: any) => (
              <div key={job.id}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}

        {jobs.length > 0 && (
          <DataPagination
            page={jobsData?.current_page}
            perPage={jobsData?.per_page}
            totalPages={jobsData?.total_pages}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default JobsPage;
