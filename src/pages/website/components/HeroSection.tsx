import { useEffect, useState } from "react";

import { useJobs } from "@/hooks/jobs";
import { useIndustries, useStatistics } from "@/hooks/universals";
import { BriefcaseBusiness, CheckCircle, GraduationCap } from "lucide-react";
import Counter from "@/components/counter-up";
import SearchFormModal from "./SearchFormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const { data: stats } = useStatistics();
  const { data: industries } = useIndustries({});

  const [filters, setFilters] = useState({
    search: "",
    industry: "",
  });

  const { data: jobsData, isLoading } = useJobs(filters);
  const jobs = jobsData?.data ?? [];

  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [localSearch, setLocalSearch] = useState(filters.search);

  // debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: localSearch,
      }));
    }, 300);

    return () => clearTimeout(timeout);
  }, [localSearch]);

  return (
    <section className="bg-gray-50 py-16 lg:py-0">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="animate__animated animate__fadeInDown text-4xl lg:text-5xl font-bold text-Blue leading-tight">
            A Place Where <span className="text-Orange">Employers</span> Meet
            Potential Candidates
          </h1>

          <p className="animate__animated animate__fadeInLeft mt-3 text-lg text-gray-600">
            Set your career in motion with Ekazi. Discover opportunities,
            connect with employers, and build your future.
          </p>

          {/* Search */}
          <div className="mt-8 flex flex-col md:flex-row gap-2">
            <Input
              placeholder="What are you looking for..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />

            <select
              className="px-2 py-2 truncate rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-Orange"
              value={filters.industry}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  industry: e.target.value,
                }))
              }
            >
              <option value="">Select Category</option>

              {industries?.map((ind: any) => (
                <option key={ind.id} value={ind.industry_name}>
                  {ind.industry_name}
                </option>
              ))}
            </select>

            <Button
              onClick={handleSearch}
              className="bg-Orange hover:bg-orange-600"
            >
              Search
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <BriefcaseBusiness
                className="mx-auto text-Orange mb-2"
                size={28}
              />
              <div className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={stats?.employers ?? 0} />
              </div>
              <p className="text-base text-gray-500">Employers</p>
            </div>

            <div className="text-center">
              <GraduationCap className="mx-auto text-Orange mb-2" size={30} />
              <div className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={stats?.job_seekers ?? 0} />
              </div>
              <p className="text-base text-gray-500">Job Seekers</p>
            </div>

            <div className="text-center">
              <CheckCircle className="mx-auto text-Orange mb-2" size={28} />
              <div className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={stats?.job_posts ?? 0} />
              </div>
              <p className="text-base text-gray-500">Job Posts</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex justify-center lg:justify-end">
          <img
            src="/assets/images/hero-img.png"
            alt="Professional woman"
            className="w-[380px] lg:w-[400px] object-contain"
          />
        </div>
      </div>

      <SearchFormModal
        showModal={showModal}
        handleClose={handleClose}
        filteredJobs={jobs}
        loading={isLoading}
      />
    </section>
  );
};

export default HeroSection;
