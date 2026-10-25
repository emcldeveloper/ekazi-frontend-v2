import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  capitalizeText,
  formatYear,
  getFileNameFromUrl,
} from "@/utils/helpers";
import CreateTraining from "./CreateTraining";
import SectionTitle from "../SectionTitle";
import { Badge } from "@/components/ui/badge";
import UpdateTraining from "./UpdateTraining";
import DeleteTraining from "./DeleteTraining";

interface TrainingsProps {
  applicant: any;
}

const Trainings = ({ applicant }: TrainingsProps) => {
  const trainings = applicant.profile?.training ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Trainings & Workshops</SectionTitle>

        <CreateTraining />
      </div>

      <Separator />

      {/* Content */}
      {trainings.length > 0 ? (
        <div className="space-y-4">
          {trainings.map((training: any) => (
            <div key={training.id}>
              <div className="flex gap-4">
                <div className="flex-1 space-y-1 text-sm">
                  {/* Title */}
                  <div className="flex gap-2 font-semibold">
                    {capitalizeText(training.name)}
                    <Badge variant="secondary">
                      {formatYear(training.started)} -{" "}
                      {formatYear(training.ended)}
                    </Badge>
                  </div>

                  {/* Institution */}
                  <p className="text-sm text-foreground">
                    {training.institution}
                  </p>

                  {/* Attachment */}
                  {training.attachment && (
                    <a
                      href={training.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {getFileNameFromUrl(training.attachment)}
                    </a>
                  )}
                </div>

                <div className="flex gap-1">
                  <UpdateTraining training={training} />
                  <DeleteTraining trainingId={training.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-4 text-muted-foreground">
          No trainings or workshops added
        </div>
      )}
    </div>
  );
};

export default Trainings;
