import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capitalizeText, formatDate } from "@/utils/helpers";

interface TrainingSectionProps {
  trainings: any;
}

const TraniningSection = ({ trainings }: TrainingSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Trainings</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trainings.map((item: any) => (
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
