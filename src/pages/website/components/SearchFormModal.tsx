import { Link } from "react-router-dom";

// shadcn components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface SearchFormModalProps {
  showModal: boolean;
  handleClose: () => void;
  filteredJobs: any;
  loading: boolean;
}

const SearchFormModal = ({
  showModal,
  handleClose,
  filteredJobs,
  loading,
}: SearchFormModalProps) => {
  return (
    <Dialog open={showModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Search Results</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 scrollbar max-h-[70vh] overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-2">
                <Spinner className="size-8" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="col-span-2 text-center text-muted-foreground">
                No jobs found.
              </div>
            ) : (
              filteredJobs.map((job: any) => {
                const jobTitle = job.job_position?.position_name || "job";

                const jobUrl = `/jobs/${jobTitle}`;

                return (
                  <Link to={jobUrl} state={{ job }} className="block">
                    <Card
                      key={job.id}
                      className="hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <CardContent className="flex items-center gap-3 w-full overflow-hidden">
                        {/* Logo */}
                        <div className="w-16 sm:w-20 flex justify-center shrink-0">
                          <img
                            src={
                              job.client?.logo
                                ? `https://api.ekazi.co.tz/${job.client.logo}`
                                : "/images/nodata.png"
                            }
                            alt="Company Logo"
                            className="h-12 sm:h-16 w-full object-contain"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex-col min-w-0">
                          <div className=" font-semibold text-foreground truncate wrap-break-words">
                            {job.job_position?.position_name || job.title}
                          </div>

                          <div className="text-sm text-muted-foreground">
                            {job.client?.client_name}
                          </div>

                          <div
                            className={`text-xs mt-1 ${
                              new Date(job.dead_line) < new Date()
                                ? "text-red-500"
                                : "text-green-600"
                            }`}
                          >
                            {new Date(job.dead_line) < new Date()
                              ? `Expired: ${new Date(job.dead_line).toLocaleDateString()}`
                              : `Deadline: ${new Date(job.dead_line).toLocaleDateString()}`}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchFormModal;
