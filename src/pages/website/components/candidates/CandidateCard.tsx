import { ArrowRight, Eye, MapPin } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import { capitalizeText } from "@/utils/helpers";
import CandidateProfile from "@/pages/shared/candidates/CandidateProfile";
import { useAddCandidateView } from "@/hooks/candidates";
import { BASE_URL } from "@/config";

const DEFAULT_AVATAR = "/assets/images/default-user.jpeg";

interface CandidateCardProps {
  candidate: any;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const isMobile = useIsMobile();

  const candidateId = candidate?.id;
  const { mutate: addViewCount } = useAddCandidateView(candidateId);

  const name =
    [candidate.first_name, candidate.middle_name, candidate.last_name]
      .map((part) => part?.trim())
      .filter((part) => part && part !== "0")
      .join(" ") || "No Name";

  const position = candidate.current_position?.trim() || "No Position Records";

  const location =
    [
      candidate.address?.[0]?.sub_location,
      candidate.address?.[0]?.region?.region_name,
      candidate.address?.[0]?.region?.country?.name,
    ]
      .filter(Boolean)
      .map((part: string) => part.trim())
      .join(", ") || "Location not specified";

  const isAvailable = candidate.available === "0";

  const image = candidate.picture
    ? `${BASE_URL}/${candidate.picture.trim()}`
    : DEFAULT_AVATAR;

  const views = Number(candidate?.view_number ?? 0);

  const trigger = (
    <Button
      variant="secondary"
      onClick={() => addViewCount()}
      className="transition hover:bg-Orange hover:text-white"
    >
      View
      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Button>
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10">
      <div className="flex flex-1 flex-col p-5">
        {/* Avatar + details side by side */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={image}
              alt={name}
              loading="lazy"
              onError={(e) => {
                if (!e.currentTarget.src.endsWith(DEFAULT_AVATAR)) {
                  e.currentTarget.src = DEFAULT_AVATAR;
                }
              }}
              className="h-16 w-16 rounded-full object-cover shadow-md ring-4 ring-orange-50 transition-transform duration-300 group-hover:scale-105 group-hover:ring-orange-100"
            />
            <span
              title={isAvailable ? "Available" : "Not available"}
              className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                isAvailable ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            {/* Name & position */}
            <h3 className="truncate text-lg font-bold text-Blue">
              {capitalizeText(name)}
            </h3>
            <p className="truncate text-sm text-gray-500">
              {capitalizeText(position)}
            </p>

            {/* Meta chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-600">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-Orange" />
                <span className="truncate">{capitalizeText(location)}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  isAvailable
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isAvailable ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                {isAvailable ? "Open to work" : "Not available"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
            <span
              className="inline-flex items-center gap-1.5 text-sm text-gray-500"
              title="Profile views"
            >
              <Eye className="h-4 w-4 text-gray-400" />
              {views.toLocaleString()}
              <span className="text-gray-400">
                {views === 1 ? "view" : "views"}
              </span>
            </span>

            {isMobile ? (
              <Drawer>
                <DrawerTrigger render={trigger} />
                <DrawerContent className="border-none">
                  <div className="scroll-fade flex-1 overflow-y-auto p-4">
                    <CandidateProfile candidateId={candidateId} />
                  </div>
                </DrawerContent>
              </Drawer>
            ) : (
              <Sheet>
                <SheetTrigger render={trigger} />
                <SheetContent className="sm:max-w-3xl!">
                  <div className="scrollbar overflow-y-auto px-4">
                    <CandidateProfile candidateId={candidateId} />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default CandidateCard;

// import { Eye, MapPin, MoveRight } from "lucide-react";

// import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import { useIsMobile } from "@/hooks/use-mobile";
// import { Separator } from "@/components/ui/separator";
// import { capitalizeText } from "@/utils/helpers";
// import CandidateProfile from "@/pages/shared/candidates/CandidateProfile";
// import { useAddCandidateView } from "@/hooks/candidates";
// import { BASE_URL } from "@/config";
// import { Badge } from "@/components/ui/badge";

// interface CandidateCardProps {
//   candidate: any;
// }

// const CandidateCard = ({ candidate }: CandidateCardProps) => {
//   const isMobile = useIsMobile();

//   const candidateId = candidate?.id;

//   const { mutate: addViewCount } = useAddCandidateView(candidateId);

//   const rawNameParts = [
//     candidate.first_name,
//     candidate.middle_name,
//     candidate.last_name,
//   ];

//   const name =
//     rawNameParts
//       .map((part) => part?.trim())
//       .filter((part) => part && part !== "0")
//       .join(" ") || "No Name";

//   const position = candidate.current_position.trim() ?? "No Position Records";

//   const locationParts = [
//     candidate.address?.[0]?.sub_location,
//     candidate.address?.[0]?.region?.region_name,
//     candidate.address?.[0]?.region?.country?.name,
//   ];

//   const location =
//     locationParts
//       .filter(Boolean)
//       .map((part) => part.trim())
//       .join(", ") || "Location not specified";

//   const availability =
//     candidate.available === "0"
//       ? "Available for Job Vacancies"
//       : "Not Available";

//   const image = candidate.picture
//     ? `${BASE_URL}/${candidate.picture.trim()}`
//     : "/assets/images/default-user.jpeg";

//   const views = candidate?.view_number ?? 0;

//   return (
//     <Card>
//       <CardContent className="space-y-4">
//         {/* Top Section */}
//         <div className="flex items-center gap-3">
//           {/* Image */}
//           <img
//             src={image}
//             alt={name}
//             className="w-[70px] h-[70px] rounded-full object-cover transition-transform duration-300 hover:scale-105"
//           />

//           {/* Info */}
//           <div className="flex-1 min-w-0">
//             <h6 className="text-Blue font-bold text-lg truncate">
//               {capitalizeText(name)}
//             </h6>

//             <div className="text-muted-foreground truncate">
//               {capitalizeText(position)}
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <Badge variant="secondary">
//             <MapPin />
//             {capitalizeText(location)}
//           </Badge>

//           <Badge variant="secondary">
//             <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />{" "}
//             {availability}
//           </Badge>
//         </div>

//         {/* Divider */}
//         <Separator />

//         {/* Footer Stats */}
//         <div className="flex justify-between items-center text-sm text-muted-foreground">
//           {/* Views */}
//           <div className="flex items-center gap-1">
//             <Eye className="w-4 h-4 text-gray-500" />
//             <span>{views}</span>
//           </div>

//           {isMobile ? (
//             <Drawer>
//               <DrawerTrigger
//                 render={
//                   <Button
//                     variant="link"
//                     size="sm"
//                     onClick={() => addViewCount()}
//                     className="text-Blue"
//                   >
//                     View profile <MoveRight />
//                   </Button>
//                 }
//               />

//               <DrawerContent className="border-none">
//                 <div className="flex-1 scroll-fade overflow-y-auto p-4">
//                   <CandidateProfile candidateId={candidateId} />
//                 </div>
//               </DrawerContent>
//             </Drawer>
//           ) : (
//             <Sheet>
//               <SheetTrigger
//                 render={
//                   <Button
//                     variant="link"
//                     size="sm"
//                     onClick={() => addViewCount()}
//                     className="text-Blue"
//                   >
//                     View profile <MoveRight />
//                   </Button>
//                 }
//               />

//               <SheetContent className="sm:max-w-3xl!">
//                 <div className="scrollbar overflow-y-auto px-4">
//                   <CandidateProfile candidateId={candidateId} />
//                 </div>
//               </SheetContent>
//             </Sheet>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CandidateCard;
