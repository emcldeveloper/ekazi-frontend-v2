import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/helpers";
import { AwardIcon } from "lucide-react";

interface TrainingProps {
  candidate: any;
}

const Training = ({ candidate }: TrainingProps) => {
  const trainings = candidate?.training || [];

  if (trainings.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">
          Trainings & Workshops
        </CardTitle>
        <Separator />
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {trainings?.map((training: any, index: any) => (
            <div key={index} className="flex gap-4">
              {/* Icon */}
              <div className="mt-1">
                <AwardIcon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 text-sm">
                <h6 className="font-semibold">
                  {training.name} -{" "}
                  <span className="font-normal text-muted-foreground">
                    {formatDate(training.started)} -{" "}
                    {formatDate(training.ended)}
                  </span>
                </h6>

                <p className="text-sm text-muted-foreground">
                  {training.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Training;
