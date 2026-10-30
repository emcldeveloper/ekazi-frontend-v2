import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CultureProps {
  candidate: any;
}

const Culture = ({ candidate }: CultureProps) => {
  const cultures = candidate?.culture || [];

  if (cultures.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Blue text-lg">
          Work Compatibility Profile
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {cultures.map((item: any, index: any) => {
            const cultureName =
              item?.culture?.name?.trim() || "Unknown Culture";

            return (
              <Badge
                key={index}
                variant="outline"
                className="text-sm capitalize"
              >
                {cultureName}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Culture;
