import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useApplicantProfile } from "@/hooks/profile/useApplicantProfile";
import PersonalInfo from "./components/personal_info/PersonalInfo";
import CareerProfile from "./components/career/CareerProfile";
import CareerObjective from "./components/objective/CareerObjective";
import Experience from "./components/experience/Experience";
import Education from "./components/education/Education";
import Skills from "./components/skills/Skills";
import Softwares from "./components/softwares/Softwares";
import Tools from "./components/tools/Tools";
import Personalities from "./components/personalities/Personalities";
import Cultures from "./components/cultures/Cultures";
import Language from "./components/language/Language";
import Proficiencies from "./components/proficiencies/Proficiencies";
import Trainings from "./components/trainings/Trainings";
import Referees from "./components/referees/Referees";

import ProfileCompletionCard from "./actions/Profilecompletioncard";
import PublicProfileCard from "./actions/Publicprofilecard";
import ProfileSettingsCard from "./actions/Profilesettingscard";
import LoadingState from "@/components/loading-state";
import PromoCard from "@/components/promos/PromoCard";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { data: applicant, isLoading } = useApplicantProfile();
  // const completion = Number(
  //   applicant?.profile_completion?.total_percentage ?? 0,
  // );

  // TODO: wire these to your API mutations.
  // const handleSubscribe = async (planId: string) => {
  //   console.log("subscribe to featured plan", planId);
  // };
  const handleSettingChange = async (key: string, value: boolean) => {
    console.log("update setting", key, value);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      {!isLoading && (
        <PromoCard
          title="Get noticed first"
          description="Become a featured candidate and appear at the top of employer searches."
          icon={<BadgeCheck className="size-5" />}
          backgroundColor="#C4F2E1"
          buttonText="Subscribe now"
          onButtonClick={() => {
            navigate("/app/subscription");
          }}
        />
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="order-2 space-y-4 md:order-1 md:col-span-2">
          <Card>
            <CardContent>
              <div className="space-y-8">
                <PersonalInfo applicant={applicant} />
                <CareerProfile applicant={applicant} />
                <CareerObjective applicant={applicant} />
                <Experience applicant={applicant} />
                <Education applicant={applicant} />
                <Skills applicant={applicant} />
                <Softwares applicant={applicant} />
                <Tools applicant={applicant} />
                <Personalities applicant={applicant} />
                <Cultures applicant={applicant} />
                <Language applicant={applicant} />
                <Proficiencies applicant={applicant} />
                <Trainings applicant={applicant} />
                <Referees applicant={applicant} />
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="order-1 md:order-2 md:col-span-1">
          <div className="space-y-4 md:sticky md:top-4">
            {isLoading ? (
              <>
                <Skeleton className="h-56 w-full rounded-xl" />
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-44 w-full rounded-xl" />
              </>
            ) : (
              <>
                <ProfileCompletionCard applicant={applicant} />
                <PublicProfileCard applicant={applicant} />
                <ProfileSettingsCard
                  applicant={applicant}
                  onChange={handleSettingChange}
                />
                {/* <FeaturedCandidateCard
                    applicant={applicant}
                    onSubscribe={handleSubscribe}
                  /> */}
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
