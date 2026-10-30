import { Card } from "@/components/ui/card";

import { BASE_URL, DEFAULT_IMG } from "@/config";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface PersonalDetailsProps {
  candidate: any;
}

const PersonalDetails = ({ candidate }: PersonalDetailsProps) => {
  const applicant = candidate.applicant_profile;

  // Full name
  const rawNameParts = [applicant.first_name, applicant.last_name];

  const fullName =
    rawNameParts
      .map((part) => part?.trim())
      .filter((part) => part && part !== "0")
      .join(" ") || "No Name Record";

  // Position
  const position = candidate.current_position ?? "No Position Record";

  // Profile Image
  const image = applicant.picture
    ? `${BASE_URL}/${applicant.picture.trim()}`
    : `${DEFAULT_IMG}`;

  return (
    <Card className="p-0">
      {/* Header background */}
      <div className="bg-Blue rounded-t-md h-[100px]" />

      {/* Content */}
      <div className="p-4">
        {/* Profile + Name */}
        <div className="flex items-center gap-4">
          {/* Image */}
          <div className="-mt-20">
            <img
              src={image}
              alt="Profile"
              className="w-[140px] h-36 object-cover rounded-md border-4 border-white shadow"
            />
          </div>

          <div className="flex justify-between w-full">
            <div className="space-y-2">
              <h5 className="text-Blue font-bold text-2xl mb-0">{fullName}</h5>
              <p className="text-muted-foreground">{position}</p>
              <Badge variant="secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-500" /> Not
                available
              </Badge>
            </div>

            <div>
              {candidate?.featured && (
                <Badge className="bg-Blue">
                  <Star className="text-orange-500 fill-orange-500" />
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center mt-4">
          {/* <Button
            className=" bg-Orange hover:bg-orange-900 text-white"
            disabled={availabilityText !== "Available for Job Vacancies"}
          >
            {availabilityText === "Available for Job Vacancies"
              ? "Hire Me"
              : "Unavailable"}
          </Button> */}

          {/* Location */}
          {/* <div className="flex items-center gap-2 text-Blue text-sm">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div> */}

          {/* Contact */}
          {/* <div
            onClick={() => (window.location.href = "https://ekazi.co.tz/login")}
            className="flex items-center gap-2 text-Blue text-sm cursor-pointer"
          >
            <Phone size={14} />
            <span>Contact Info</span>
          </div> */}
        </div>
      </div>
    </Card>
  );
};

export default PersonalDetails;
