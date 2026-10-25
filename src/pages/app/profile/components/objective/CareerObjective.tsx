import { Separator } from "@/components/ui/separator";

import SectionTitle from "../SectionTitle";
import EditCareerObjective from "./EditCareerObjective";

interface CareerObjectiveProps {
  applicant: any;
}

const CareerObjective = ({ applicant }: CareerObjectiveProps) => {
  const careerObjective = applicant?.profile?.objective;

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle>Career Objectives</SectionTitle>

        <EditCareerObjective careerObjective={careerObjective} />
      </div>

      <Separator />

      {/* Content */}
      <div>
        {careerObjective ? (
          <p className="text-sm">{careerObjective}</p>
        ) : (
          <p className="text-sm">No career objective added yet</p>
        )}
      </div>
    </div>
  );
};

export default CareerObjective;
