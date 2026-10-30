import { GraduationCap, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EducationRecord {
  id: number;
  applicant_id: number;
  education_level?: {
    id?: number;
    name?: string;
  } | null;
  course?: {
    id?: number;
    name?: string;
  } | null;
  major?: {
    id?: number;
    name?: string;
  } | null;
  college?: {
    id?: number;
    name?: string;
    town?: string | null;
    registration?: string | null;
  } | null;
  attachment?: string | null;
  started?: string | null;
  ended?: string | null;
}

interface EducationProps {
  candidate: {
    education?: EducationRecord[];
  };
}

const Education = ({ candidate }: EducationProps) => {
  const education: EducationRecord[] = candidate?.education ?? [];

  if (!education.length) {
    return null;
  }

  //* Select the highest level of education based on education_level.id
  const higherEducation = education.reduce((prev, curr) => {
    return (curr.education_level?.id ?? 0) > (prev.education_level?.id ?? 0)
      ? curr
      : prev;
  });

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      timeZone: "UTC",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">Education</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent>
        <div className="flex gap-4">
          {/* Icon */}
          <div className="mt-1 shrink-0">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>

          {/* Details */}
          <div className="space-y-1 min-w-0">
            <h6 className="font-semibold">
              {higherEducation.course?.name && (
                <>{higherEducation.course.name.trim()}</>
              )}
            </h6>

            {higherEducation.education_level?.name && (
              <div className="min-w-0 wrap-break-word">
                Level: {higherEducation.education_level?.name}
              </div>
            )}

            {higherEducation.major?.name && (
              <div className="min-w-0 wrap-break-word">
                Major: {higherEducation.major.name}
              </div>
            )}

            <p className="text-sm text-foreground">
              {higherEducation.college?.name?.trim()}
            </p>

            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4 shrink-0" />
              {formatDate(higherEducation.started)} -{" "}
              {formatDate(higherEducation.ended)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Education;
