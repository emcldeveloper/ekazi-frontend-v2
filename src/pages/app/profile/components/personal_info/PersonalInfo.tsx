import { Mail, MapPin, Phone } from "lucide-react";

import ProfileImageModal from "./ProfileImageModal";
import { BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import ProfilePreview from "../preview/ProfilePreview";

interface PersonalInfoProps {
  applicant: any;
}

const PersonalInfo = ({ applicant }: PersonalInfoProps) => {
  const profile = applicant?.profile?.applicant_profile;
  const address = applicant?.profile?.address?.[0];
  const phone = applicant?.profile?.phone?.[0];

  // const bgImage = profile?.background_picture
  //   ? `${BASE_URL}/${profile.background_picture.replace(/^\//, "")}`
  //   : `${BASE_URL}/svg/dotted.svg`;

  const profileImage = profile?.picture
    ? `${BASE_URL}/${profile.picture.replace(/^\//, "")}`
    : `${BASE_URL}/uploads/picture/pre_photo.jpg`;

  return (
    <div className="flex justify-between space-y-6">
      <div className="flex items-center gap-8">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow"
          />

          <div className="absolute bottom-0 left-20 h-6 w-6">
            <ProfileImageModal />
          </div>
        </div>

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
      </div>

      <div className="flex gap-2">
        <ProfilePreview applicant={applicant} />
        <Button variant="default">Settings</Button>
      </div>
    </div>
  );
};

export default PersonalInfo;

// import moment from "moment";
// import { Mail, MapPin, Phone } from "lucide-react";

// import { Separator } from "@/components/ui/separator";

// import BasicInfoModal from "./BasicInfoModal";
// import ProfileImageModal from "./ProfileImageModal";
// import BackgroundImageModal from "./BackgroundImageModal";
// import { BASE_URL } from "@/config";
// import SectionTitle from "../SectionTitle";

// interface PersonalInfoProps {
//   applicant: any;
// }

// const PersonalInfo = ({ applicant }: PersonalInfoProps) => {
//   const profile = applicant?.profile?.applicant_profile;
//   const address = applicant?.profile?.address?.[0];
//   const phone = applicant?.profile?.phone?.[0];

//   const bgImage = profile?.background_picture
//     ? `${BASE_URL}/${profile.background_picture.replace(/^\//, "")}`
//     : `${BASE_URL}/svg/dotted.svg`;

//   const profileImage = profile?.picture
//     ? `${BASE_URL}/${profile.picture.replace(/^\//, "")}`
//     : `${BASE_URL}/uploads/picture/pre_photo.jpg`;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="relative">
//         {/* Background */}
//         <img
//           src={bgImage}
//           alt="Background"
//           className="w-full h-[120px] object-cover rounded-md"
//         />

//         {/* Edit background */}
//         <div className="absolute top-2 right-2 h-8 w-8">
//           <BackgroundImageModal />
//         </div>

//         {/* Profile image */}
//         <div className="absolute -bottom-10 left-4">
//           <div className="relative">
//             <img
//               src={profileImage}
//               alt="Profile"
//               className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow"
//             />

//             <div className="absolute bottom-0 right-0 h-6 w-6">
//               <ProfileImageModal />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="pt-12 space-y-2">
//         <div className="flex items-center justify-between">
//           <SectionTitle>Personal Information</SectionTitle>

//           <BasicInfoModal applicant={applicant} />
//         </div>

//         <Separator />

//         {/* Name */}
//         <p className="text-base font-medium">
//           {profile?.first_name} {profile?.middle_name} {profile?.last_name}
//         </p>

//         {/* Meta */}
//         <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
//           <div className="flex items-center gap-1">
//             <MapPin size={12} />
//             <span>
//               {/* {address?.region}, {address?.name || "Tanzania"} */}
//               {address?.sub_location}, {address?.region?.name}
//             </span>
//           </div>

//           <span>|</span>
//           <span className="flex items-center gap-1">
//             <Mail size={12} />
//             {profile?.email}
//           </span>

//           <span>|</span>
//           <span className="flex items-center gap-1">
//             <Phone size={12} />
//             {phone?.phone_number}
//           </span>
//         </div>

//         {/* Member since */}
//         {profile?.created_at && (
//           <p className="text-xs text-muted-foreground mt-1">
//             Member since {moment(profile.created_at).format("YYYY")}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;
