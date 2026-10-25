import { Separator } from "@/components/ui/separator";
import EditCareerProfile from "./EditCareerProfile";
import SectionTitle from "../SectionTitle";

interface CareerProfileProps {
  applicant: any;
}

const CareerProfile = ({ applicant }: CareerProfileProps) => {
  const careerSummary = applicant?.profile?.career_summary;

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle>Career Summary (About Me)</SectionTitle>

        <EditCareerProfile careerSummary={careerSummary} />
      </div>

      <Separator />

      {careerSummary ? (
        <p className="text-sm">{careerSummary}</p>
      ) : (
        <p className="text-sm">No career summary added yet.</p>
      )}
    </div>
  );
};

export default CareerProfile;
