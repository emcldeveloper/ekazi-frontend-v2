import { useState, type ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { useApplications, useApplicationStages } from "@/hooks/applications";
import { formatDate } from "@/utils/helpers";

import InterviewDetailsModal from "./InterviewDetailsModal";
import ViewApplication from "./ViewApplication";

type InterviewDetails = NonNullable<
  ComponentProps<typeof InterviewDetailsModal>["interviewDetails"]
>;

declare global {
  interface Window {
    previewContractForm: (
      applicantId: number,
      jobId: number,
      stageId: number,
    ) => void;
  }
}

interface JobStageEntry {
  stage?: { stage_name?: string | null } | null;
  interview_details?: InterviewDetails | null;
  offer_details?: Record<string, unknown> | null;
}

interface AppliedJobJob {
  id: number;
  publish_date?: string | null;
  client?: { client_name?: string | null } | null;
  job_position?: { position_name?: string | null } | null;
  job_stages?: (JobStageEntry | null)[] | null;
}

interface AppliedJobApplication {
  job_id: number;
  applicant_id: number;
  status: string;
  created_at?: string | null;
  stage: { id: number };
  job: AppliedJobJob;
}

interface ApplicationStage {
  id: number;
  stage_number: number;
  stage_name: string;
}

const ApplicationsPage = () => {
  const navigate = useNavigate();

  const { data: applicationsData } = useApplications();
  const applications = applicationsData?.data ?? [];

  const { data: stages }: { data?: ApplicationStage[] } =
    useApplicationStages();

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showInterviewModal, setShowInterviewModal] = useState<boolean>(false);
  const [interviewDetails, setInterviewDetails] =
    useState<InterviewDetails | null>(null);

  const appliedJobIds = applications?.map((app: any) => app.job_id) || [];

  const filteredApplications = applications?.filter((app: any) => {
    if (statusFilter === "All") return true;
    return app.status === statusFilter;
  });

  const getStatusBadge = (app: AppliedJobApplication) => {
    const job = app.job;
    const status = app.status;

    const offerStage = job?.job_stages?.find(
      (s: JobStageEntry | null) => s?.stage?.stage_name === "Offer",
    );

    switch (status) {
      case "Interview":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-400 text-white cursor-pointer"
            onClick={() => {
              const interviewStage = job?.job_stages?.find(
                (s: JobStageEntry | null) =>
                  s?.stage?.stage_name === "Interview",
              );

              setInterviewDetails(interviewStage?.interview_details || null);
              setShowInterviewModal(true);
            }}
          >
            Interview
          </Badge>
        );

      case "Offer":
        return (
          <Badge
            className="bg-green-600 text-white cursor-pointer"
            onClick={() =>
              navigate("/jobseeker/job-offers", {
                state: { offers: offerStage?.offer_details },
              })
            }
          >
            Offer
          </Badge>
        );

      case "Employed":
        return (
          <Button
            size="sm"
            className="bg-green-600"
            onClick={() =>
              window.previewContractForm(app.applicant_id, job.id, app.stage.id)
            }
          >
            Employed
          </Button>
        );

      case "Screening":
        return <Badge className="bg-yellow-500">Screening</Badge>;

      default:
        return (
          <Badge variant="outline" className="bg-gray-300">
            {status}
          </Badge>
        );
    }
  };

  return (
    <>
      <Card>
        <CardContent className="space-y-4">
          <CardHeader className="p-0 flex items-center justify-between">
            <h5 className="text-xl text-Blue font-semibold">Applied Jobs</h5>

            <Badge variant="outline" className="text-black">
              {applications?.length || 0} Applications
            </Badge>
          </CardHeader>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Filter by Stage</span>

            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>

              {stages
                ?.sort((a, b) => a.stage_number - b.stage_number)
                .map((stage) => (
                  <option key={stage.id} value={stage.stage_name}>
                    {stage.stage_name}
                  </option>
                ))}
            </select>
          </div>

          <Separator />

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position & Company</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} /> Posted
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} /> Applied
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredApplications?.map((app: any) => {
                  const job = app.job;
                  const client = job?.client?.client_name;
                  const position = job?.job_position?.position_name || "";

                  return (
                    <TableRow key={app?.id}>
                      <TableCell>
                        <div className="font-medium cursor-pointer hover:underline">
                          {position}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {client}
                        </div>
                      </TableCell>

                      <TableCell>{formatDate(job?.publish_date)}</TableCell>

                      <TableCell>{formatDate(app.created_at)}</TableCell>

                      <TableCell>{getStatusBadge(app)}</TableCell>

                      {/* <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button variant="ghost" size="icon">
                                <MoreVertical size={16} />
                              </Button>
                            }
                          />

                          <DropdownMenuContent align="end">
                            {app.status === "Interview" && (
                              <DropdownMenuItem
                                onClick={() => {
                                  const interviewStage = job?.job_stages?.find(
                                    (s: JobStageEntry | null) =>
                                      s?.stage?.stage_name === "Interview",
                                  );

                                  setInterviewDetails(
                                    interviewStage?.interview_details || null,
                                  );
                                  setShowInterviewModal(true);
                                }}
                              >
                                <User className="mr-2 h-4 w-4" />
                                View Interview
                              </DropdownMenuItem>
                            )}

                            {app.status === "Offer" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate("/jobseeker/job-offers", {
                                    state: {
                                      offers: job?.job_stages?.find(
                                        (s: JobStageEntry | null) =>
                                          s?.stage?.stage_name === "Offer",
                                      )?.offer_details,
                                    },
                                  })
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Offer
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuItem
                              onClick={() => handleJobClick(job)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell> */}
                      <TableCell className="text-right">
                        <ViewApplication
                          selectedJob={job}
                          appliedJobIds={appliedJobIds}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          Showing {applications?.length || 0} applications
        </CardFooter>
      </Card>

      <InterviewDetailsModal
        show={showInterviewModal}
        onHide={() => setShowInterviewModal(false)}
        interviewDetails={interviewDetails}
      />
    </>
  );
};

export default ApplicationsPage;
