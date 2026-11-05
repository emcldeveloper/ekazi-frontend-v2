import { Link } from "react-router-dom";
import { Bookmark, Briefcase, FileDown, Layers, Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import RecommendedJobs from "./components/RecommendedJobs";
import { useDashboardStatistics } from "@/hooks/dashboard";
import Pipeline from "./components/Pipeline,";
import { useApplicantProfile } from "@/hooks/profile";
import { getGreeting } from "@/utils/helpers";

const DashboardPage = () => {
  const { data: applicant } = useApplicantProfile();
  const applicantName = applicant?.applicant_profile?.first_name;

  const { data } = useDashboardStatistics();

  const dashboard = data?.statisticsdashboard || {
    application: 0,
    download_cv: 0,
    savedjob: 0,
    searchjob: 0,
  };

  const stats = [
    {
      label: "My CVs",
      value: dashboard.download_cv,
      to: "/app/downloaded-templates",
      icon: FileDown,
      iconClassName: "bg-blue-50 text-[#1D4FA3]",
    },
    {
      label: "Applications",
      value: dashboard.application,
      to: "/app/applied-jobs",
      icon: Briefcase,
      iconClassName: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Saved jobs",
      value: dashboard.savedjob,
      to: "/app/saved-jobs",
      icon: Bookmark,
      iconClassName: "bg-orange-50 text-orange-600",
    },
    {
      label: "Matched jobs",
      // value: matchedJobs?.matches_count,
      value: 0,
      to: "/app/matched-jobs",
      icon: Layers,
      iconClassName: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="space-y-4">
      {/* welcome note */}
      <section className="flex flex-col gap-4 rounded-3xl text-Blue md:flex-row md:items-center lg:justify-between dark:text-white">
        <div className="min-w-0">
          <h1 className="break-word text-2xl font-bold tracking-tight">
            {getGreeting(applicantName)}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back to ekazi.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button render={<Link to="/app/jobs" />}>
            <Search className="size-4" aria-hidden="true" />
            Find jobs
          </Button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, iconClassName }) => (
          <Card key={label}>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs">{label}</p>
                  <h5 className="text-xl font-bold mb-0">{value}</h5>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-lg p-3 ${iconClassName}`}>
                    <Icon size={18} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Applicant pipeline */}
        <div className="flex-1">
          <Pipeline />
        </div>

        <div className="flex-1">
          {/* Recommended Jobs */}
          <RecommendedJobs />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
