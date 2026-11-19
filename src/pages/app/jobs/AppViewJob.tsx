import { Drawer, DrawerContent } from "@/components/ui/drawer";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useIsMobile } from "@/hooks/use-mobile";
import { useIncrementJobView } from "@/hooks/jobs";
import JobDetails from "./components/JobDetails";

import { useEffect, useRef } from "react";

interface ViewJobProps {
  jobId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppViewJob = ({ jobId, open, onOpenChange }: ViewJobProps) => {
  const isMobile = useIsMobile();

  const { mutate: incrementJobView } = useIncrementJobView();

  const lastViewedJobId = useRef<number | null>(null);

  // Increment views when a different job is opened
  useEffect(() => {
    if (!open || jobId === null) {
      lastViewedJobId.current = null;
      return;
    }

    if (lastViewedJobId.current !== jobId) {
      lastViewedJobId.current = jobId;
      incrementJobView(jobId);
    }
  }, [open, jobId, incrementJobView]);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90dvh] border-none">
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {jobId !== null && <JobDetails jobId={jobId} />}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col p-0 sm:max-w-3xl!">
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {jobId !== null && <JobDetails jobId={jobId} />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppViewJob;
