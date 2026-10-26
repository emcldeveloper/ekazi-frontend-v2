import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useIsMobile } from "@/hooks/use-mobile";
import { Loader } from "lucide-react";
import JobDetails from "../components/JobDetails";

interface ViewMatchedJobProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  jobDetails?: any;
  isLoading?: boolean;
}

const ViewMatchedJob = ({
  open,
  onOpenChange,
  jobDetails,
  isLoading = false,
}: ViewMatchedJobProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="border-none max-h-[90dvh]">
          <DrawerHeader>
            <DrawerTitle>
              {jobDetails?.job_position?.position_name || "Job Details"}
            </DrawerTitle>
            <DrawerDescription>
              {jobDetails?.client?.client_name || "Company information"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 min-h-0 scroll-fade overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-40">
                <Loader className="animate-spin" />
              </div>
            ) : jobDetails ? (
              <JobDetails job={jobDetails} />
            ) : (
              <p className="text-sm text-muted-foreground">No job selected.</p>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-3xl w-full overflow-hidden p-0">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle>
            {jobDetails?.job_position?.position_name || "Job Details"}
          </SheetTitle>
        </SheetHeader>

        <div className="scrollbar h-[calc(100dvh-6rem)] overflow-y-auto px-6 pb-6">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-40">
              <Loader className="animate-spin" />
            </div>
          ) : jobDetails ? (
            <JobDetails job={jobDetails} />
          ) : (
            <p className="text-sm text-muted-foreground">No job selected.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewMatchedJob;
