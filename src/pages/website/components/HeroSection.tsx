import { useSiteStatistics } from "@/hooks/universals";
import {
  BriefcaseBusiness,
  CheckCircle,
  GraduationCap,
  Search,
} from "lucide-react";
import Counter from "@/components/counter-up";

import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const { data: statistics } = useSiteStatistics();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = keyword.trim();
    navigate(search ? `/jobs?search=${encodeURIComponent(search)}` : "/jobs");
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-0">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 grid lg:grid-cols-2 gap-8 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="animate__animated animate__fadeInDown text-4xl lg:text-5xl font-bold text-Blue leading-tight">
            A Place Where <span className="text-Orange">Employers</span> Meet
            Potential Candidates
          </h1>

          <p className="animate__animated animate__fadeInLeft mt-3 text-base text-muted-foreground">
            Set your career in motion with Ekazi. Discover opportunities,
            connect with employers, and build your future.
          </p>

          {/* Search */}
          <form
            role="search"
            onSubmit={handleSearch}
            className="mt-8 flex max-w-xl flex-col gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-xl shadow-blue-900/10 sm:flex-row sm:items-center"
          >
            <label htmlFor="hero-search" className="sr-only">
              Job title or keyword
            </label>
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="hero-search"
                type="search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Job title, company ..."
                className="h-12 w-full rounded-xl bg-transparent pl-12 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              className="h-12  bg-Orange px-6 text-sm text-white transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4FA3] focus-visible:ring-offset-2"
            >
              Search jobs
            </Button>
          </form>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <BriefcaseBusiness
                className="mx-auto text-Orange mb-2"
                size={28}
              />
              <div className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={statistics?.employers ?? 0} />
              </div>
              <p className="text-base text-gray-500">Employers</p>
            </div>

            <div className="text-center">
              <GraduationCap className="mx-auto text-Orange mb-2" size={30} />
              <div className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={statistics?.job_seekers ?? 0} />
              </div>
              <p className="text-base text-gray-500">Job Seekers</p>
            </div>

            <div className="text-center">
              <CheckCircle className="mx-auto text-Orange mb-2" size={28} />
              <div className="text-2xl lg:text-3xl font-bold text-Blue m-0">
                <Counter end={statistics?.job_posts ?? 0} />
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
    </section>
  );
};

export default HeroSection;
