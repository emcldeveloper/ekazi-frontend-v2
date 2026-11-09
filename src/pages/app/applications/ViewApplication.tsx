import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import { JobDetails } from "../jobs";

interface ViewApplicationProps {
  selectedJob: any;
}

const ViewApplication = ({ selectedJob }: ViewApplicationProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger
            render={
              <Button size="sm" variant="secondary">
                View
              </Button>
            }
          />

          <DrawerContent>
            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <JobDetails jobId={selectedJob.id} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger
            render={
              <Button size="sm" variant="secondary">
                View
              </Button>
            }
          />

          <SheetContent className="sm:max-w-3xl!">
            <div className="scrollbar overflow-y-auto px-4">
              <JobDetails jobId={selectedJob.id} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ViewApplication;
