import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { capitalizeText } from "@/utils/helpers";

interface PersonalitySectionProps {
  personalities: any;
}

const PersonalitySection = ({ personalities }: PersonalitySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Personality</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {personalities.map((item: any) => (
            <Badge
              key={item.id}
              variant="secondary"
              className="text-sm px-3 py-1 rounded-md hover:bg-muted transition"
            >
              {capitalizeText(item.name)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalitySection;
