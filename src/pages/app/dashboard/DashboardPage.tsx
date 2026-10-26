import { Link } from "react-router-dom";
import { Bookmark, Briefcase, FileDown, Layers } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import RecommendedJobs from "./components/RecommendedJobs";
import TemplateSlider from "@/components/template-slider";
import { useDashboardStatistics } from "@/hooks/dashboard";
import Pipeline from "./components/Pipeline,";

const DashboardPage = () => {
  const { data } = useDashboardStatistics();

  console.log(data);

  const dashboard = data?.statisticsdashboard || {
    application: 0,
    download_cv: 0,
    savedjob: 0,
    searchjob: 0,
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Resume Downloads */}
            <Link to={"/app/downloaded-templates"}>
              <Card className="cursor-pointer">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <p className="text-xs">My CVs</p>
                    <h5 className="text-xl font-bold mb-0">
                      {dashboard.download_cv}
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-500 rounded-lg p-3">
                      <FileDown size={18} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Applications */}
            <Link to={"/app/applied-jobs"}>
              <Card className="cursor-pointer">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <p className="text-xs">Applications</p>
                    <h5 className="text-xl font-bold mb-0">
                      {dashboard.application}
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 text-green-600 rounded-lg p-3">
                      <Briefcase size={18} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Saved Jobs */}
            <Link to={"/app/saved-jobs"}>
              <Card className="cursor-pointer">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <p className="text-xs">Saved Jobs</p>
                    <h5 className="text-xl font-bold mb-0">
                      {dashboard.savedjob}
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-100 text-orange-600 rounded-lg p-3">
                      <Bookmark size={18} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Matched Jobs */}
            <Link to={"/app/matched-jobs"}>
              <Card className="cursor-pointer">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <p className="text-xs">Job Match</p>
                    <h5 className="text-xl  font-bold mb-0">
                      {/* {matchedJobs?.matches_count} */} 0
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-100 text-yellow-600 rounded-lg p-3">
                      <Layers size={18} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <Card size="sm">
            <CardContent className="space-y-4">
              {/* Applicant pipeline */}
              <Pipeline />

              {/* Recommended Jobs */}
              <RecommendedJobs />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <div className="sticky top-20 flex flex-col gap-4">
            <TemplateSlider />
            {/* <FeaturedCompanies /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
