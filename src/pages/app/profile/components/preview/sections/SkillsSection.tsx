import type { Knowledge } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeText } from "@/utils/helpers";
import { Library } from "lucide-react";

interface SkillsSectionProps {
  knowledges: Knowledge[];
}

const SkillsSection = ({ knowledges }: SkillsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <Library size={16} />
          </div>
          Skills
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {knowledges.map((item: Knowledge) => (
          <Badge
            key={item.id}
            variant="secondary"
            className="max-w-50 truncate block"
          >
            {capitalizeText(item.knowledge?.name)}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
