import { Card, CardContent } from "@/components/ui/card";
import PersonalInfo from "./components/personal_info/PersonalInfo";
import { useApplicantProfile } from "@/hooks/profile/useApplicantProfile";
import { Loader } from "lucide-react";
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
import TemplateSlider from "@/components/template-slider";

const ProfilePage = () => {
  const { data: applicant, isLoading } = useApplicantProfile();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardContent>
              {isLoading ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-4">
          <div className="sticky top-20 flex flex-col gap-4 ">
            <TemplateSlider />
            {/* <FeaturedCompanies /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
