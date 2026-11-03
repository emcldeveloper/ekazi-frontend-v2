import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capitalizeText } from "@/utils/helpers";

interface SkillsSectionProps {
  knowledges: any;
}

const SkillsSection = ({ knowledges }: SkillsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Skills</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {knowledges.map((item: any) => (
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
