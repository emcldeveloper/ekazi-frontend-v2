import { MapPin, Building2 } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import EmployerDetails from "./EmployerDetails";

interface EmployerCardProps {
  employer: any;
}

const EmployerCard = ({ employer }: EmployerCardProps) => {
  const isMobile = useIsMobile();

  const renderLocation = (employer: any) => {
    const locationParts = [];

    if (
      employer.client_location?.sub_location &&
      employer.client_location.sub_location !== "1"
    ) {
      locationParts.push(employer.client_location.sub_location);
    }
    if (employer.client_location?.region?.region_name) {
      locationParts.push(employer.client_location.region.region_name);
    }
    if (employer.client_location?.region?.country?.name) {
      locationParts.push(employer.client_location.region.country.name);
    }

    return locationParts.join(", ") || "Location not available";
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-12 items-center gap-4">
          {/* Logo */}
          <div className="col-span-3 md:col-span-2 flex justify-center">
            <img
              src={
                employer.logo
                  ? `https://api.ekazi.co.tz/${employer.logo}`
                  : "/img/default.png"
              }
              alt={employer.client_name}
              className="w-20 object-contain rounded-md"
            />
          </div>

          {/* Info */}
          <div className="col-span-6 md:col-span-8 space-y-1">
            <h6 className="text-primary font-semibold truncate">
              {employer.client_name}
            </h6>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>
                {employer.industry?.industry_name || "Industry not available"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{renderLocation(employer)}</span>
            </div>
          </div>

          {/* View Button */}
          <div className="col-span-3 md:col-span-2 flex justify-end">
            {isMobile ? (
              <Drawer>
                <DrawerTrigger render={<Button variant="outline" size="sm" />}>
                  View
                </DrawerTrigger>
                <DrawerContent className="border-none">
                  <div className="flex-1 scroll-fade overflow-y-auto p-4">
                    <EmployerDetails employer={employer} />
                  </div>
                </DrawerContent>
              </Drawer>
            ) : (
              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="sm" />}>
                  View
                </SheetTrigger>
                <SheetContent className="sm:max-w-3xl!">
                  <div className="scrollbar overflow-y-auto px-4">
                    <EmployerDetails employer={employer} />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployerCard;
