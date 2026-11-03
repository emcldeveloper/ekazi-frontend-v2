import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capitalizeText } from "@/utils/helpers";

interface CultureSectionProps {
  cultures: any;
}

const CultureSection = ({ cultures }: CultureSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Culture</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {cultures.map((item: any) => {
            return (
              <Badge key={item.id} variant="secondary">
                {capitalizeText(item.culture?.name)}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CultureSection;
