import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  calculateDuration,
  formatDateRange,
  groupBy,
  sortByMostRecent,
} from "@/utils/experience";

import SectionTitle from "../SectionTitle";
import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";
import DeleteExperience from "./DeleteExperience";

interface Option {
  id: number;
  name: string;
}

interface ExperienceItem {
  id: number;
  applicant_id: number;
  position?: Option;
  position_level?: Option;
  industry?: Option;
  employer?: Option;
  region?: Option;
  start_salary?: Option;
  end_salary?: Option;
  sub_location?: string;
  responsibility?: string;
  remark?: string;
  start_date: string;
  end_date: string | null;
}

interface ExperienceProps {
  applicant: any;
}

const Experience = ({ applicant }: ExperienceProps) => {
  const experiences = useMemo(
    () =>
      sortByMostRecent<ExperienceItem>(applicant?.profile?.experience ?? []),
    [applicant],
  );

  const totalExperience = calculateDuration(experiences);

  const groupedExperience = useMemo(
    () => groupBy(experiences, (item) => item.employer?.id ?? item.id),
    [experiences],
  );

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle>Work Experience ({totalExperience.text})</SectionTitle>
        <AddExperience />
      </div>

      <Separator />

      {/* Empty state */}
      {groupedExperience.length === 0 ? (
        <div className="text-muted-foreground text-sm">
          No work experience added yet
        </div>
      ) : (
        <div className="space-y-4">
          {groupedExperience.map(([employerId, positions]) => {
            const first = positions[0];
            const duration = calculateDuration(positions);
            const location = [first?.sub_location, first?.region?.name]
              .filter(Boolean)
              .join(", ");

            return (
              <Card key={employerId} size="sm">
                <CardContent>
                  <div className="flex gap-4">
                    {/* Icon */}
                    {/* <div className="shrink-0">
                      <Building2 className="text-blue-600" />
                    </div> */}

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <h5 className="font-semibold mb-0">
                        {first?.employer?.name}
                      </h5>

                      {location && (
                        <div className="flex gap-4">
                          <p className="text-sm text-muted-foreground">
                            {location}
                          </p>
                          <Badge variant="secondary">{duration.text}</Badge>
                        </div>
                      )}

                      {/* Timeline */}
                      <div className="mt-3 space-y-4 relative border-l pl-4">
                        {positions.map((position) => (
                          <div
                            key={position.id}
                            className="flex justify-between"
                          >
                            {/* Dot */}
                            <div>
                              <span className="absolute left-[-6px] top-1 w-3 h-3 bg-blue-600 rounded-full" />

                              <div className="space-y-1">
                                <p className="font-medium gap-2">
                                  {position.position?.name}
                                  {position.position_level?.name && (
                                    <Badge variant="secondary">
                                      {position.position_level.name}
                                    </Badge>
                                  )}
                                </p>

                                {position.industry?.name && (
                                  <p className="text-sm">
                                    {position.industry.name} Industry
                                  </p>
                                )}

                                <p className="text-xs text-muted-foreground">
                                  {formatDateRange(
                                    position.start_date,
                                    position.end_date,
                                  )}
                                </p>

                                {position.responsibility && (
                                  <div className="text-sm">
                                    <strong>Responsibility:</strong>
                                    <div
                                      className="prose prose-sm max-w-none compact-prose"
                                      dangerouslySetInnerHTML={{
                                        __html: position.responsibility,
                                      }}
                                    />
                                  </div>
                                )}

                                {position.remark && (
                                  <p className="text-sm">
                                    <strong>Reason:</strong> {position.remark}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-1 shrink-0">
                              <EditExperience experience={position} />
                              <DeleteExperience experienceId={position.id} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Experience;
