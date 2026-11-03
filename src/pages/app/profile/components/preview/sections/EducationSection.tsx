import { GraduationCap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { capitalizeText, formatYear } from "@/utils/helpers";

interface EducationSectionProps {
  educations: any;
}

const EducationSection = ({ educations }: EducationSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Education</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        {educations.map((education: any) => (
          <div className="space-y-1">
            <div className="flex gap-2.5">
              <div>
                <div className="bg-blue-100 text-primary p-2 rounded-md">
                  <GraduationCap />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold">
                  {/* {capitalizeText(education.education_level.name)}{" "} */}
                  {capitalizeText(education.course?.name) &&
                    `${capitalizeText(education.course?.name)}`}
                </h3>
                <p className="text-base text-muted-foreground">
                  {capitalizeText(education.college?.name)}
                </p>

                <p className="text-sm text-muted-foreground">
                  {formatYear(education.started)} –{" "}
                  {formatYear(education.ended)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
