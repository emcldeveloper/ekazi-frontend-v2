import { useMemo } from "react";

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
import type { PromoSlide } from "@/components/promos/Promocarousel";
import {
  BrowseCvIllustration,
  FeaturedIllustration,
  ProfileIllustration,
} from "@/components/promos/Promoillustrations";
import PromoCarousel from "@/components/promos/Promocarousel";
import ProfileCompletionCard from "./actions/Profilecompletioncard";
import PublicProfileCard from "./actions/Publicprofilecard";
import ProfileSettingsCard from "./actions/Profilesettingscard";
import LoadingState from "@/components/loading-state";

const ProfilePage = () => {
  const { data: applicant, isLoading } = useApplicantProfile();
  const completion = Number(
    applicant?.profile_completion?.total_percentage ?? 0,
  );

  const promoSlides = useMemo<PromoSlide[]>(() => {
    const slides: PromoSlide[] = [
      {
        id: "featured",
        eyebrow: "Get noticed first",
        title:
          "Become a featured candidate and appear at the top of employer searches",
        cta: { label: "Subscribe now", href: "/subscription" }, // TODO: your route
        className: "bg-Orange",
        illustration: <FeaturedIllustration />,
      },
      {
        id: "complete-profile",
        eyebrow: `Your profile is ${completion}% complete`,
        title:
          "Complete your profile to get up to 3× more views from employers",
        cta: {
          label: "Complete profile",
          onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        },
        className: "bg-Blue",
        illustration: <ProfileIllustration />,
      },
      {
        id: "browse-cvs",
        eyebrow: "Need inspiration?",
        title: "Browse professional CVs and templates to make yours stand out",
        cta: { label: "Browse CVs", href: "/cv-templates" }, // TODO: your route
        className: "bg-[#0f3d73]",
        illustration: <BrowseCvIllustration />,
      },
    ];
    // Don't nag users whose profile is already complete.
    return completion >= 100
      ? slides.filter((s) => s.id !== "complete-profile")
      : slides;
  }, [completion]);

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
        <PromoCarousel
          slides={promoSlides}
          storageKey="profile-promo-dismissed"
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
