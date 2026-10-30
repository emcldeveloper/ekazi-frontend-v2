import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capitalizeText, formatYear } from "@/utils/helpers";
import { Award } from "lucide-react";

interface ProficiencyProps {
  candidate: any;
}

const Proficiency = ({ candidate }: ProficiencyProps) => {
  const proficiencies = candidate?.proficiencies || [];

  if (proficiencies.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">Proficiencies</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proficiencies?.map((proficiency: any, index: any) => (
            <div key={index} className="flex gap-4">
              {/* Icon */}
              <div className="mt-1">
                <Award className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h6 className="font-semibold">
                  {proficiency.proficiency.name} -{" "}
                  <span className="font-normal text-muted-foreground">
                    {formatYear(proficiency.started)} -{" "}
                    {formatYear(proficiency.ended)}
                  </span>
                </h6>

                <p className="text-sm">
                  {capitalizeText(proficiency.award)} (
                  {capitalizeText(proficiency.organization?.name)})
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Proficiency;
