import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import ProfileDetails from "./ProfileDetails";
import { Eye } from "lucide-react";

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
          <DrawerTrigger
            render={
              <Button
                variant="outline"
                className="w-full border-Blue font-semibold text-Blue hover:bg-Blue/5 hover:text-Blue"
              >
                Preview profile
              </Button>
            }
          />

          <DrawerContent>
            <div className="flex-1 scroll-fade overflow-y-auto">
              <ProfileDetails applicant={applicant} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                className="w-full border-Blue font-semibold text-Blue hover:bg-Blue/5 hover:text-Blue"
              >
                <Eye />
                Preview profile
              </Button>
            }
          />

          <SheetContent className="sm:max-w-3xl!">
            <div className="scrollbar overflow-y-auto">
              <ProfileDetails applicant={applicant} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ProfilePreview;
