import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PersonalityProps {
  candidate: any;
}

const Personality = ({ candidate }: PersonalityProps) => {
  const personalities = candidate?.personality || [];

  if (personalities.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">Personality Traits</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        {/* Personality Items */}
        <div className="flex flex-wrap gap-2">
          {personalities?.map((item: any, index: any) => (
            <Badge key={index} variant="outline" className="text-sm capitalize">
              {item.personality?.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Personality;
