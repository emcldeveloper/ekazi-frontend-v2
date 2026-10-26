import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import JobDetails from "../components/JobDetails";

interface ViewApplicationProps {
  selectedJob: any;
  appliedJobIds?: any;
}

const ViewSavedJob = ({ selectedJob, appliedJobIds }: ViewApplicationProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger render={<Button variant="link">View</Button>} />

          <DrawerContent>
            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <JobDetails job={selectedJob} appliedJobIds={appliedJobIds} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger render={<Button variant="link">View</Button>} />

          <SheetContent className="sm:max-w-3xl!">
            <div className="scrollbar overflow-y-auto px-4">
              <JobDetails job={selectedJob} appliedJobIds={appliedJobIds} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ViewSavedJob;
