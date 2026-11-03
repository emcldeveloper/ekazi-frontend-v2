import { Mail, MapPin, Phone } from "lucide-react";

import { BASE_URL } from "@/config";
import ProfileImageModal from "./ProfileImageModal";
import BasicInfoModal from "./BasicInfoModal";

interface PersonalInfoProps {
  applicant: any;
}

const PersonalInfo = ({ applicant }: PersonalInfoProps) => {
  const profile = applicant?.applicant_profile;
  const address = applicant?.address?.[0];
  const phone = applicant?.phone?.[0];

  // const bgImage = profile?.background_picture
  //   ? `${BASE_URL}/${profile.background_picture.replace(/^\//, "")}`
  //   : `${BASE_URL}/svg/dotted.svg`;

  const profileImage = profile?.picture
    ? `${BASE_URL}/${profile.picture.replace(/^\//, "")}`
    : `${BASE_URL}/uploads/picture/pre_photo.jpg`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-20 sm:w-40">
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow"
          />

          <div className="absolute bottom-0 left-20 h-6 w-6">
            <ProfileImageModal />
          </div>
        </div>

        <div className="flex justify-between w-full  gap-2">
          <div className="space-y-1">
            <p className="text-base font-medium sm:text-2xl">
              {profile?.first_name} {profile?.middle_name} {profile?.last_name}
            </p>

            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>
                {address?.sub_location}, {address?.region?.name}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Mail size={12} />
              <span>{profile?.email}</span>
            </div>

            <div className="flex items-center gap-1">
              <Phone size={12} />
              <span>{phone?.phone_number}</span>
            </div>
          </div>

          <BasicInfoModal applicant={applicant} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
