import type { Training } from "@/@types/applicants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeText, formatDate } from "@/utils/helpers";
import { BookText } from "lucide-react";

interface TrainingSectionProps {
  trainings: Training[];
}

const TraniningSection = ({ trainings }: TrainingSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <BookText size={16} />
          </div>
          Trainings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trainings.map((item: Training) => (
            <div key={item.id} className="flex-1 space-y-1">
              <h3 className="text-base font-semibold">
                {capitalizeText(item.name)}
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  – {formatDate(item.started)} - {formatDate(item.ended)}
                </span>
              </h3>

              {/* Institution */}
              <p className="text-sm text-foreground">
                {capitalizeText(item.institution)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TraniningSection;
