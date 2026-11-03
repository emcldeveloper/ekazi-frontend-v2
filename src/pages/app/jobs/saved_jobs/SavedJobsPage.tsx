import {
  Card,
  CardContent,
  CardHeader,
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
import { Separator } from "@/components/ui/separator";

import { useSavedJobs } from "@/hooks/jobs";
import ViewSavedJob from "./ViewSavedJob";
import { formatDate } from "@/utils/helpers";
import { DataPagination } from "@/components/data-pagination";
import { useState } from "react";

const SavedJobsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data: jobsData } = useSavedJobs({ page, limit: perPage });
  const savedJobs = jobsData?.data ?? [];

  return (
    <>
      <Card>
        <CardContent className="space-y-4">
          <CardHeader className="p-0 flex items-center justify-between">
            <h5 className="text-xl text-Blue font-semibold">Saved Jobs</h5>

            <Badge variant="outline">{savedJobs.length} jobs</Badge>
          </CardHeader>

          <Separator />

          <div className="w-full overflow-x-auto space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position & Company</TableHead>
                  <TableHead>Posted On</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {savedJobs.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-muted-foreground"
                    >
                      You have no saved jobs yet.
                    </TableCell>
                  </TableRow>
                )}

                {savedJobs.map((app: any) => {
                  return (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="text-Orange font-semibold">
                          {app.position}
                        </div>
                        <div className="text-sm text-Blue">{app.company}</div>
                      </TableCell>

                      <TableCell>{formatDate(app.posted_on)}</TableCell>

                      <TableCell>{formatDate(app.deadline)}</TableCell>

                      <TableCell className="text-center">
                        {app.status ? (
                          <Badge variant="secondary">Closed</Badge>
                        ) : (
                          <Badge variant="default">Open</Badge>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        <ViewSavedJob selectedJob={app} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

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
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-between items-center px-6 py-4 bg-muted/40">
          <div className="text-sm text-muted-foreground">
            Showing {savedJobs.length} saved jobs
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default SavedJobsPage;
