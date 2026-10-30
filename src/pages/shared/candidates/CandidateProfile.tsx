import PersonalDetails from "./components/PersonalDetails";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Culture from "./components/Culture";
import Personality from "./components/Personality";
import Skills from "./components/Skills";
import SoftwareandTools from "./components/SoftwaerAndTools";
import Language from "./components/Language";
import Proficiency from "./components/Proficiency";
import Training from "./components/Training";
import JobFit from "./components/JobFit";
import ProfileAssessment from "./components/ProfileAssessment";
import { useCandidatesDetails } from "@/hooks/candidates";
import LoadingState from "@/components/loading-state";

interface CandidateProfileProps {
  candidateId: number;
}

const CandidateProfile = ({ candidateId }: CandidateProfileProps) => {
  const { data: candidate, isLoading } = useCandidatesDetails(candidateId);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="py-10 space-y-6">
      <PersonalDetails candidate={candidate} />
      <About candidate={candidate} />
      <Experience candidate={candidate} />
      <Education candidate={candidate} />
      <Culture candidate={candidate} />
      <Personality candidate={candidate} />
      <Skills candidate={candidate} />
      <SoftwareandTools candidate={candidate} />
      <Language candidate={candidate} />
      <Proficiency candidate={candidate} />
      <Training candidate={candidate} />
      <JobFit candidate={candidate} />
      <ProfileAssessment candidate={candidate} />
    </div>
  );
};

export default CandidateProfile;
