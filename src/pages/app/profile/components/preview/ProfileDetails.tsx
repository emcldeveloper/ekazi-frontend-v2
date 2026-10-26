import { ChartBar, List, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import { capitalizeText } from "@/utils/helpers";
import { BASE_URL } from "@/config";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import LanguageSection from "./sections/LanguageSection";
import ProficiencySection from "./sections/ProficiencySection";
import TraniningSection from "./sections/TraniningSection";
import SkillsSection from "./sections/SkillsSection";
import CultureSection from "./sections/CultureSection";
import PersonalitySection from "./sections/PersonalitySection";
import SoftwareSection from "./sections/SoftwareSection";
import { ToolsSection } from "./sections/ToolsSection";
import RefereeSection from "./sections/RefereeSection";

interface JobseekerDetailsProps {
  applicant: any;
}

const ProfileDetails = ({ applicant }: JobseekerDetailsProps) => {
  const profile = applicant.profile?.applicant_profile;
  const objectives = applicant.profile?.objective;
  const educations = applicant.profile?.education ?? [];
  const referees = applicant.profile?.referees ?? [];
  const experiences = applicant.profile?.experience ?? [];
  const trainings = applicant.profile?.training ?? [];
  const languages = applicant.profile?.language ?? [];
  const cultures = applicant.profile?.culture ?? [];
  const personalities = applicant.profile?.applicant_personality ?? [];
  const proficiencies = applicant.profile?.proficiency ?? [];
  const knowledges = applicant.profile?.knowledge ?? [];
  const softwares = applicant.profile?.software ?? [];
  const tools = applicant.profile?.tools ?? [];
  const location = applicant.profile?.address?.[0];

  const isLoading = false;

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <>
          <div className="space-y-6">
            <Card>
              <CardContent className="flex flex-col flex-wrap gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={
                        profile?.picture
                          ? `${BASE_URL}/${profile.picture}`
                          : "/images/default-img.jpeg"
                      }
                      alt={profile?.first_name || "Profile"}
                    />

                    <AvatarFallback>
                      {profile?.first_name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold">
                        {capitalizeText(
                          `${profile?.first_name} ${profile?.middle_name} ${profile?.last_name}`,
                        )}
                      </h2>
                    </div>
                    <p className="text-muted-foreground">
                      {capitalizeText(applicant?.current_position)}
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center">
                      <div className="flex items-center gap-1">
                        <MailIcon className="h-4 w-4" />
                        {profile?.email}
                      </div>

                      <div className="flex items-center gap-1">
                        <PhoneIcon className="h-4 w-4" />
                        {applicant?.phone?.[0]?.phone_number}
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        {location?.sub_location}, {location?.region?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            {applicant?.career_summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase ">
                    <div className="bg-blue-100 text-primary p-2 rounded-md">
                      <ChartBar size={16} />
                    </div>
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {applicant?.career_summary}
                  </p>
                </CardContent>
              </Card>
            )}

            {objectives && (
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">
                    <div className="bg-blue-100 text-primary p-2 rounded-md">
                      <List size={16} />
                    </div>
                    Objectives
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {objectives}
                  </p>
                </CardContent>
              </Card>
            )}

            {experiences.length > 0 && (
              <ExperienceSection experiences={experiences} />
            )}

            {educations.length > 0 && (
              <EducationSection educations={educations} />
            )}

            {languages.length > 0 && <LanguageSection languages={languages} />}

            {proficiencies.length > 0 && (
              <ProficiencySection proficiencies={proficiencies} />
            )}

            {trainings.length > 0 && <TraniningSection trainings={trainings} />}

            {knowledges.length > 0 && <SkillsSection knowledges={knowledges} />}

            {cultures.length > 0 && <CultureSection cultures={cultures} />}

            {personalities.length > 0 && (
              <PersonalitySection personalities={personalities} />
            )}

            {softwares.length > 0 && <SoftwareSection softwares={softwares} />}

            {tools.length > 0 && <ToolsSection tools={tools} />}

            {referees.length > 0 && <RefereeSection referees={referees} />}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
