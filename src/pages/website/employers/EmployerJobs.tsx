import { Briefcase, MapPin, CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useEmployerJobs } from "@/hooks/jobs";
import { formatDate } from "@/utils/helpers";
import { DEFAULT_IMG } from "@/config";

interface EmployerJobsProps {
  employer: any;
}

const EmployerJobs = ({ employer }: EmployerJobsProps) => {
  const { data: jobsData, isPending: isLoading } = useEmployerJobs({});
  const jobs = jobsData?.data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue">
          Jobs at {employer.client_name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-sm">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No job postings found for this employer.
          </p>
        ) : (
          <div className="space-y-3">
            {jobs.map((job: any) => (
              <Card key={job.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Logo */}
                    <div className="md:col-span-2 flex justify-center md:justify-start">
                      <img
                        src={
                          job.employer?.logo
                            ? `https://api.ekazi.co.tz/${job.employer.logo}`
                            : DEFAULT_IMG
                        }
                        alt="Employer Logo"
                        className="w-[70px] h-[70px] rounded-full object-cover"
                      />
                    </div>

                    {/* Job Info */}
                    <div className="md:col-span-8">
                      <h5 className="text-primary font-semibold mb-1">
                        {job.job_position?.position_name || "Untitled Position"}
                      </h5>

                      <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4" />
                        {job.job_type?.type_name}
                        <span>•</span>
                        <MapPin className="w-4 h-4" />
                        {job.job_addresses?.[0]?.region?.region_name},{" "}
                        {job.job_addresses?.[0]?.region?.country?.name}
                      </div>

                      <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                        <span>
                          <strong>Level:</strong>{" "}
                          {job.position_level?.position_name || "Not specified"}
                        </span>
                        <span>•</span>
                        <CalendarDays className="w-4 h-4" />
                        <span>
                          <strong>Deadline:</strong> {formatDate(job.dead_line)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex flex-col items-center md:items-end gap-2">
                      {job.featured === 1 && (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-400 text-black"
                        >
                          Featured
                        </Badge>
                      )}

                      <Button variant="outline" size="sm">
                        View Job
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployerJobs;
