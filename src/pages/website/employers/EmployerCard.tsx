import { useState } from "react";
import { MapPin, Building2, ArrowUpRight } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import EmployerDetails from "./EmployerDetails";
import { BASE_URL, DEFAULT_IMG, IMG_BASE } from "@/config";

interface EmployerCardProps {
  employer: any;
}

const renderLocation = (employer: any) => {
  const locationParts = [];

  if (
    employer.addresses?.[0]?.sub_location &&
    employer.addresses?.[0].sub_location !== "1"
  ) {
    locationParts.push(employer.addresses?.[0].sub_location);
  }
  if (employer.addresses?.[0]?.region?.region_name) {
    locationParts.push(employer.addresses?.[0].region.region_name);
  }
  if (employer.addresses?.[0]?.region?.country?.name) {
    locationParts.push(employer.addresses?.[0].region.country.name);
  }

  return locationParts.join(", ") || "Location not available";
};

const getInitials = (name?: string) =>
  (name ?? "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

const EmployerLogo = ({ employer }: { employer: any }) => {
  const [failed] = useState(false);
  const hasLogo = employer.logo && !failed;

  const logo = employer.logo;
  const primaryLogo = logo ? `${BASE_URL}/${logo}` : DEFAULT_IMG;
  const secondaryLogo = logo ? `${IMG_BASE}/${logo}` : DEFAULT_IMG;

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
      {hasLogo ? (
        <img
          src={primaryLogo}
          alt={employer.client_name}
          onError={({ currentTarget: img }) => {
            const attempted = img.getAttribute("src");

            if (attempted === DEFAULT_IMG) return;

            img.src =
              attempted === primaryLogo && secondaryLogo !== primaryLogo
                ? secondaryLogo
                : DEFAULT_IMG;
          }}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span className="text-lg font-bold text-primary">
          {getInitials(employer.client_name)}
        </span>
      )}
    </div>
  );
};

const EmployerCard = ({ employer }: EmployerCardProps) => {
  const isMobile = useIsMobile();
  const industry = employer.industry?.industry_name;

  const triggerButton = (
    <Button
      variant="outline"
      className="w-full gap-1.5 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
    />
  );

  const triggerLabel = (
    <>
      View profile
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  return (
    <Card className="group relative h-full gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <div className="flex flex-1 flex-col p-5">
        {/* Logo + info side by side */}
        <div className="flex items-start gap-4">
          <EmployerLogo employer={employer} />

          <div className="min-w-0 flex-1 space-y-2">
            <h3
              className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary"
              title={employer.client_name}
            >
              {employer.client_name}
            </h3>

            {industry ? (
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{industry}</span>
              </span>
            ) : (
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Industry not available</span>
              </span>
            )}

            <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="line-clamp-2">{renderLocation(employer)}</span>
            </div>
          </div>
        </div>

        {/* Button pinned to the bottom so cards in a row align */}
        <div className="mt-auto pt-5">
          {isMobile ? (
            <Drawer>
              <DrawerTrigger render={triggerButton}>
                {triggerLabel}
              </DrawerTrigger>
              <DrawerContent className="border-none">
                <div className="flex-1 scroll-fade overflow-y-auto p-4">
                  <EmployerDetails employer={employer} />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Sheet>
              <SheetTrigger render={triggerButton}>{triggerLabel}</SheetTrigger>
              <SheetContent className="sm:max-w-3xl!">
                <div className="scrollbar overflow-y-auto px-4">
                  <EmployerDetails employer={employer} />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EmployerCard;
