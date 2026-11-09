import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useIncrementJobView } from "@/hooks/jobs";
import JobDetails from "./JobDetails";

interface ViewJobProps {
  jobId: number;
}

const ViewJob = ({ jobId }: ViewJobProps) => {
  const isMobile = useIsMobile();

  const { mutate: incrementJobView } = useIncrementJobView();

  const handleJobClick = () => {
    incrementJobView(jobId);
  };

  return (
    <div>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger
            render={<Button variant="secondary" size="sm" />}
            onClick={handleJobClick}
          >
            View
          </DrawerTrigger>
          <DrawerContent className="border-none">
            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <JobDetails jobId={jobId} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet>
          <SheetTrigger
            render={
              <Button size="sm" variant="secondary" onClick={handleJobClick} />
            }
          >
            View
          </SheetTrigger>
          <SheetContent className="sm:max-w-3xl!">
            <div className="scrollbar overflow-y-auto p-4">
              <JobDetails jobId={jobId} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default ViewJob;
