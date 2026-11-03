import { Calendar } from "lucide-react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import { useApplications } from "@/hooks/applications";
import { formatDate } from "@/utils/helpers";

import ViewApplication from "./ViewApplication";

declare global {
  interface Window {
    previewContractForm: (
      applicantId: number,
      jobId: number,
      stageId: number,
    ) => void;
  }
}

const ApplicationsPage = () => {
  const { data: applicationsData } = useApplications();
  const applications = applicationsData?.data ?? [];

  const appliedJobIds = applications?.map((app: any) => app.job_id) || [];

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

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {applications?.map((app: any) => {
                  const job = app.job;
                  const client = job?.company;
                  const position = job?.position;

                  return (
                    <TableRow key={app?.id}>
                      <TableCell>
                        <div className="text-Orange font-medium">
                          {position}
                        </div>
                        <div className="text-sm text-Blue">{client}</div>
                      </TableCell>

                      <TableCell>{formatDate(job?.posted_on)}</TableCell>

                      <TableCell>{formatDate(app.applied_at)}</TableCell>

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
      </Card>
    </>
  );
};

export default ApplicationsPage;
