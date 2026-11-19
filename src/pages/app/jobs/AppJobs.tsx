import { useJobs, useJobsByCategory } from "@/hooks/jobs";
import { DataPagination } from "@/components/data-pagination";
import { useState } from "react";
import { Briefcase, SearchIcon } from "lucide-react";

import { LoadingRow } from "./components/LoadingRow";
import AppJobCard from "./AppJobCard";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeText } from "@/utils/helpers";
import { useIndustries } from "@/hooks/universals";
import { Card, CardContent } from "@/components/ui/card";
import AppViewJob from "./AppViewJob";
import JobsCategorySidebar from "./components/JobsCategorySidebar";

const ALL = "all";

const AppJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const jobIdParam = searchParams.get("jobId");

  const activeJobId =
    jobIdParam && /^\d+$/.test(jobIdParam) && Number(jobIdParam) > 0
      ? Number(jobIdParam)
      : null;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const industry = searchParams.get("industry") ?? "";

  const debouncedSearch = useDebounce(search, 500);

  const { data: jobsCategories = [], isLoading: categoriesLoading } =
    useJobsByCategory();

  const { data: industries } = useIndustries({});
  const selectedIndustry = industries?.find(
    (item: any) => String(item.id) === industry,
  );

  const { data: jobsData, isLoading } = useJobs({
    page,
    limit: perPage,
    search: debouncedSearch,
    industry: industry,
  });
  const savedJobs = jobsData?.data ?? [];

  const updateIndustry = (value: string | null) => {
    const industryId = !value || value === ALL ? "" : value;

    setPage(1);

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        if (industryId) {
          params.set("industry", industryId);
        } else {
          params.delete("industry");
        }

        // Close the currently selected job
        params.delete("jobId");

        return params;
      },
      { preventScrollReset: true },
    );
  };

  const handleJobClick = (jobId: number) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set("jobId", String(jobId));
        return params;
      },
      { preventScrollReset: true },
    );
  };

  const handleJobClose = () => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.delete("jobId");
        return params;
      },
      { replace: true, preventScrollReset: true },
    );
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main jobs section */}
        <main className="min-w-0 space-y-4">
          {/* Search and industry filters */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <InputGroup className="w-full flex-2">
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

            <div className="md:hidden flex-1 w-full">
              <Select value={industry || ALL} onValueChange={updateIndustry}>
                <SelectTrigger aria-label="Industry" className="w-full ">
                  <SelectValue placeholder="All industries">
                    {selectedIndustry
                      ? capitalizeText(selectedIndustry.name)
                      : "All industries"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={ALL}>All industries</SelectItem>

                  {industries?.map((item: any) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {capitalizeText(item.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Jobs list */}
          {isLoading ? (
            <ul aria-hidden="true" className="space-y-3">
              <LoadingRow />
              <LoadingRow />
              <LoadingRow />
            </ul>
          ) : savedJobs.length > 0 ? (
            <ul className="space-y-3">
              {savedJobs.map((job: any) => (
                <li key={job.id}>
                  <AppJobCard
                    job={job}
                    isActive={activeJobId === job.id}
                    onClick={() => handleJobClick(job.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <span className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-Blue">
                  <Briefcase className="size-8" />
                </span>

                <h2 className="mt-5 text-xl font-bold text-Blue">
                  No jobs found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {savedJobs.length > 0 && (
            <DataPagination
              page={jobsData?.page}
              perPage={jobsData?.limit}
              totalPages={jobsData?.totalPages}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          )}
        </main>

        {/* Categories sidebar */}
        <aside className="hidden order-first lg:block lg:order-last lg:sticky lg:top-20">
          <JobsCategorySidebar
            categories={jobsCategories}
            selectedCategory={industry}
            onCategoryChange={updateIndustry}
            isLoading={categoriesLoading}
          />
        </aside>
      </div>

      {/* Job details Sheet / Drawer */}
      <AppViewJob
        jobId={activeJobId}
        open={activeJobId !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleJobClose();
          }
        }}
      />
    </div>
  );
};

export default AppJobs;
