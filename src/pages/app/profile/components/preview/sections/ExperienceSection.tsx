import { useMemo } from "react";
import moment from "moment";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Experience, ExperienceGroup } from "@/@types/applicants";
import { Building2 } from "lucide-react";
import { capitalizeText } from "@/utils/helpers";
import { Separator } from "@/components/ui/separator";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const calculateDuration = (positions: Experience[] = []) => {
  let totalMonths = 0;

  positions.forEach((position) => {
    const start = moment(position.start_date);
    const end = position.end_date ? moment(position.end_date) : moment();

    totalMonths += moment.duration(end.diff(start)).asMonths();
  });

  const roundedMonths = Math.round(totalMonths);
  const years = Math.floor(roundedMonths / 12);
  const months = roundedMonths % 12;

  return {
    years,
    months,
    text: `${years} yrs - ${months} mos`,
  };
};

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const totalExperience = useMemo(
    () => calculateDuration(experiences),
    [experiences],
  );

  const groupedExperience = useMemo(() => {
    if (!experiences?.length) return [];

    const groups = experiences.reduce(
      (acc: Record<string, ExperienceGroup>, experience) => {
        // Group by the unique employer ID
        const employerId = String(experience.employer?.id);

        if (!acc[employerId]) {
          acc[employerId] = {
            employer: experience.employer?.name ?? "Unknown Company",
            region: experience.region?.name ?? "",
            sub_location: experience.sub_location ?? "",
            positions: [],
          };
        }

        acc[employerId].positions.push(experience);

        return acc;
      },
      {},
    );

    return Object.values(groups).map((group) => ({
      ...group,
      positions: [...group.positions].sort(
        (a, b) =>
          new Date(b.end_date ?? Date.now()).getTime() -
          new Date(a.end_date ?? Date.now()).getTime(),
      ),
    }));
  }, [experiences]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <Building2 size={16} />
          </div>
          Experience ({totalExperience.text})
        </CardTitle>
      </CardHeader>

      <CardContent>
        {groupedExperience.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            No work experience added yet
          </div>
        ) : (
          <div className="space-y-6">
            {groupedExperience.map((group) => {
              const employer = capitalizeText(group.employer);
              const duration = calculateDuration(group.positions);
              const hasMultiplePositions = group.positions.length > 1;

              return (
                <div key={group.employer} className="space-y-3">
                  {hasMultiplePositions && (
                    <>
                      <h5 className=" font-semibold">{employer}</h5>

                      <p className="text-sm text-muted-foreground">
                        {[group.sub_location, group.region]
                          .filter(Boolean)
                          .join(", ")}
                      </p>

                      <Badge variant="secondary" className="w-fit">
                        {duration.text}
                      </Badge>
                    </>
                  )}

                  <div
                    className={
                      hasMultiplePositions
                        ? "relative mt-3 space-y-4 border-l pl-4"
                        : "space-y-2"
                    }
                  >
                    {group.positions.map((position) => (
                      <div key={position.id} className="relative space-y-1">
                        {hasMultiplePositions && (
                          <span className="absolute -left-5.5 top-1.5 h-3 w-3 rounded-full bg-blue-600" />
                        )}

                        {!hasMultiplePositions && (
                          <>
                            <h5 className="text-base mb-0 font-semibold">
                              {employer}
                            </h5>

                            <p className="text-sm text-muted-foreground">
                              {[position.sub_location, position.region?.name]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          </>
                        )}

                        <p className="text-base font-medium">
                          {capitalizeText(position.position?.name ?? "")}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          {position.industry?.name && (
                            <p className="text-sm text-muted-foreground">
                              {capitalizeText(position.industry.name)} Industry
                            </p>
                          )}

                          <Separator orientation="vertical" />

                          <p className="text-sm text-muted-foreground">
                            {moment(position.start_date).format("MMM YYYY")} -{" "}
                            {position.end_date
                              ? moment(position.end_date).format("MMM YYYY")
                              : "Present"}
                          </p>
                        </div>

                        <div className="text-sm">
                          <strong>Responsibility:</strong>{" "}
                          <span
                            className="prose prose-sm"
                            dangerouslySetInnerHTML={{
                              __html: position.responsibility || "",
                            }}
                          />
                        </div>

                        {position.remark && (
                          <p className="text-sm">
                            <strong>Reason:</strong>{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: position.remark,
                              }}
                            />
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
