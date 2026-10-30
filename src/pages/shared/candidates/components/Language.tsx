import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface LanguageProps {
  candidate: any;
}

const Language = ({ candidate }: LanguageProps) => {
  const languages = candidate?.language || [];

  if (languages.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">Languages</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {languages.map((ability: any) => (
            <Badge
              key={ability.id}
              variant="outline"
              className="text-sm capitalize"
            >
              {ability.language?.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Language;
