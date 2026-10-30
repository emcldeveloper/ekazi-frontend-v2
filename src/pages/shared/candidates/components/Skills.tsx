import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SkillsProps {
  candidate: any;
}

const Skills = ({ candidate }: SkillsProps) => {
  const knowledges = candidate?.knowledge || [];

  if (knowledges.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">Career Skills</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {knowledges?.map((item: any, index: any) => (
            <Badge key={index} variant="outline" className="text-sm capitalize">
              {item?.knowledge?.name?.toLowerCase()}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;
