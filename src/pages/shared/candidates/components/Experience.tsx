import { Building2 } from "lucide-react";
import moment from "moment";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ExperienceProps {
  candidate: any;
}

interface DurationPosition {
  start_date: moment.MomentInput;
  end_date?: moment.MomentInput | null;
}

interface ExperienceDuration {
  years: number;
  months: number;
  text: string;
}

interface CandidateEmployer {
  id: string | number;
  name?: string;
}

interface CandidatePosition extends DurationPosition {
  id: string | number;
  applicant_id: string | number;
  employer: CandidateEmployer;
  position?: {
    id: number;
    name?: string;
  } | null;
  position_level?: {
    id: number;
    name?: string;
  } | null;
  industry?: {
    id: number;
    name?: string;
  } | null;
  region?: {
    id: number;
    name?: string;
  } | null;
  sub_location?: string | null;
  responsibility: string;
  remark?: string | null;
  start_salary?: {
    id: number;
    name?: string;
  } | null;
  end_salary?: {
    id: number;
    name?: string;
  } | null;
}

const Experience = ({ candidate }: ExperienceProps) => {
  const position: CandidatePosition[] = candidate?.experience ?? [];

  if (!position.length) {
    return null;
  }

  // Calculate duration for a set of positions
  const calculateDuration = (
    positions: DurationPosition[],
  ): ExperienceDuration => {
    let totalMonths = 0;

    positions.forEach((pos) => {
      const start = moment(pos.start_date);
      const end = pos.end_date ? moment(pos.end_date) : moment();
      const duration = moment.duration(end.diff(start));
      totalMonths += duration.asMonths();
    });

    const years = Math.floor(totalMonths / 12);
    const months = Math.round(totalMonths % 12);
    return { years, months, text: `${years} yrs - ${months} mos` };
  };

  const calculateTotalExperience = () => {
    if (!position) return { years: 0, months: 0, text: "0 yrs - 0 mos" };
    return calculateDuration(position);
  };

  const totalExperience = calculateTotalExperience();

  // Group experience by employer ID
  const groupedExperience = position.reduce(
    (groups: Record<string, CandidatePosition[]>, item) => {
      const employerId = String(item.employer.id);

      (groups[employerId] ??= []).push(item);

      return groups;
    },
    {},
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">
          Work Experience ({totalExperience.text})
        </CardTitle>
        <Separator />
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedExperience).map(([employerId, positions]) => {
            const employer = positions[0].employer;
            const duration = calculateDuration(positions);

            const location = [
              positions[0].sub_location?.trim(),
              positions[0].region?.name,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <div key={employerId} className="flex gap-4">
                {/* Icon */}
                <div className="mt-1">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Employer Info */}
                  <div className="flex justify-between flex-wrap gap-2">
                    <div>
                      <h5 className="font-semibold">{employer?.name}</h5>

                      {location && (
                        <p className="text-sm text-muted-foreground">
                          {location}
                        </p>
                      )}

                      <Badge variant="secondary" className="mt-1">
                        {duration.text}
                      </Badge>
                    </div>
                  </div>

                  {/* Positions */}
                  {/* Positions */}
                  <div className="mt-4 space-y-4">
                    {positions.map((position, idx) => (
                      <div key={position.id} className="flex gap-3">
                        {/* Timeline */}
                        {positions.length > 1 && (
                          <div className="relative w-4 flex flex-col items-center">
                            {idx < positions.length - 1 && (
                              <div className="absolute top-3 bottom-0 w-0.5 bg-muted" />
                            )}

                            <div className="w-3 h-3 rounded-full bg-muted-foreground z-10" />
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">
                            {position.position?.name}
                          </p>

                          {position.position_level?.name && (
                            <p className="text-sm text-muted-foreground">
                              {position.position_level.name}
                            </p>
                          )}

                          {position.industry?.name && (
                            <p className="text-sm">
                              {position.industry.name} Industry
                            </p>
                          )}

                          <p className="text-xs text-muted-foreground">
                            {moment(position.start_date).format("MMM YYYY")} -{" "}
                            {position.end_date
                              ? moment(position.end_date).format("MMM YYYY")
                              : "Present"}
                          </p>

                          <div className="mt-2 space-y-1 text-sm">
                            <div className="wrap-break-words">
                              <strong>Responsibility:</strong>

                              <div
                                className="prose prose-sm max-w-none
                prose-headings:font-semibold
                prose-ul:list-disc
                prose-ul:pl-6 dark:text-white"
                                dangerouslySetInnerHTML={{
                                  __html: position.responsibility,
                                }}
                              />
                            </div>

                            {position.remark && (
                              <div className="wrap-break-words">
                                <strong>Reason for Leaving:</strong>

                                <div
                                  className="prose prose-sm max-w-none
                  prose-headings:font-semibold
                  prose-ul:list-disc
                  prose-ul:pl-6 dark:text-white"
                                  dangerouslySetInnerHTML={{
                                    __html: position.remark,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Experience;
