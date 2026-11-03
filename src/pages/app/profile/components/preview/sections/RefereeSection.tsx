import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capitalizeText } from "@/utils/helpers";

interface RefereeSectionProps {
  referees: any;
}

const RefereeSection = ({ referees }: RefereeSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Referees</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between space-y-3">
          {referees.map((referee: any) => (
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
