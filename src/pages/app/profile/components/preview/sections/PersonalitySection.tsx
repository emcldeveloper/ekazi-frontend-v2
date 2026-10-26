import type { Skill } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeText } from "@/utils/helpers";
import { UserCheck } from "lucide-react";

interface PersonalitySectionProps {
  personalities: Skill[];
}

const PersonalitySection = ({ personalities }: PersonalitySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <UserCheck size={16} />
          </div>
          Personality
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {personalities.map((item: Skill) => (
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
