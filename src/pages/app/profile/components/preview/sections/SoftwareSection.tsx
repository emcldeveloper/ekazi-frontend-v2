import type { Software } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeText } from "@/utils/helpers";
import { LaptopMinimal } from "lucide-react";

interface SoftwareSectionProps {
  softwares: Software[];
}

const SoftwareSection = ({ softwares }: SoftwareSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <LaptopMinimal size={16} />
          </div>
          Software
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {softwares.map((item: Software) => (
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
