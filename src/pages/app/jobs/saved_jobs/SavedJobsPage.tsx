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

import { formatDate } from "@/utils/helpers";
import { useSavedJobs } from "@/hooks/jobs";
import ViewSavedJob from "./ViewSavedJob";

const SavedJobsPage = () => {
  const { data: jobsData } = useSavedJobs();
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

          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Position & Company</TableHead>
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
                  const job = app.job || {};
                  const jobTitle =
                    job.job_position?.position_name || "Untitled Job";
                  const company = job.client?.client_name || "Unknown Company";

                  const postedOn = formatDate(job.publish_date);
                  const deadline = formatDate(job.dead_line);

                  const isExpired = job?.dead_line
                    ? new Date(job.dead_line) < new Date()
                    : false;

                  return (
                    <TableRow key={app.id}>
                      <TableCell className="pl-6">
                        <div className="font-semibold cursor-pointer hover:underline">
                          {jobTitle}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {company}
                        </div>
                      </TableCell>

                      <TableCell>{postedOn}</TableCell>

                      <TableCell>{deadline}</TableCell>

                      <TableCell className="text-center">
                        {isExpired ? (
                          <Badge variant="secondary">Closed</Badge>
                        ) : (
                          <Badge variant="default">Open</Badge>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        {/* <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            }
                          />

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleJobClick(job)}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu> */}
                        <ViewSavedJob selectedJob={job} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
