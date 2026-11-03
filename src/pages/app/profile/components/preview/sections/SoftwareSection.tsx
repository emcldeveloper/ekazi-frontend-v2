import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capitalizeText } from "@/utils/helpers";

interface SoftwareSectionProps {
  softwares: any;
}

const SoftwareSection = ({ softwares }: SoftwareSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Software</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {softwares.map((item: any) => (
            <Badge key={item.id} variant="secondary">
              {capitalizeText(item.software?.name)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareSection;
