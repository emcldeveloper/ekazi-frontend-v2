import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const ViewJob = () => {
  const isMobile = useIsMobile();

  // const { mutate: incrementJobView } = useIncrementJobView();

  // const handleJobClick = (jobId: number) => {
  //   incrementJobView(jobId);
  // };

  return (
    <div>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger
            render={<Button variant="outline" />}
            // onClick={() => incrementJobView(job.id)}
            className="text-sm"
          >
            View
          </DrawerTrigger>
          <DrawerContent className="border-none">
            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              {/* <JobDetails /> */}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet>
          <SheetTrigger
            render={
              <Button
                size="sm"
                variant="link"
                // onClick={() => incrementJobView(job.id)}
              />
            }
          >
            View
          </SheetTrigger>
          <SheetContent className="sm:max-w-3xl!">
            <div className="scrollbar overflow-y-auto p-4">
              {/* <JobDetails /> */}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default ViewJob;
