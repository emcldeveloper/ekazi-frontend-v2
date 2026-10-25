import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";

interface PreviewProfileProps {
  applicant: any;
}

const ProfilePreview = ({ applicant }: PreviewProfileProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger render={<Button variant="outline">Preview</Button>} />

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle />
              <DrawerDescription />
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              {/* <JobseekerDetails jobseekerId={jobseekerId} /> */}
            </div>

            <DrawerFooter>
              <div className="flex items-center gap-2">Actions</div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger render={<Button variant="outline">Preview</Button>} />

          <SheetContent className="sm:max-w-3xl!">
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>

            <div className="scrollbar overflow-y-auto px-4">
              {/* <JobseekerDetails jobseekerId={jobseekerId} /> */}
            </div>

            <SheetFooter>
              <div className="flex items-center gap-4">Actions</div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ProfilePreview;
