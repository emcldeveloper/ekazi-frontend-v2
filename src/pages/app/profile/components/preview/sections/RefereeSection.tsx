import type { Referee } from "@/@types/applicants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeText } from "@/utils/helpers";
import { Users } from "lucide-react";

interface RefereeSectionProps {
  referees: Referee[];
}

const RefereeSection = ({ referees }: RefereeSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <Users size={16} />
          </div>
          Referees
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between space-y-3">
          {referees.map((referee: Referee) => (
            <div key={referee.id} className="flex-1 space-y-1">
              <h3 className="text-sm font-semibold">
                {capitalizeText(
                  `${referee.first_name} ${referee.middle_name} ${referee.last_name}`,
                )}
              </h3>

              <p className="text-sm text-foreground">
                {capitalizeText(referee.position)}
              </p>

              <p className="text-sm text-muted-foreground">
                {capitalizeText(referee.employer)}
              </p>

              <p className="text-xs text-muted-foreground">{referee.email}</p>
              <p className="text-xs">{referee.phone}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RefereeSection;
