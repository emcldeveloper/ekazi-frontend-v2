import type { Culture } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeText } from "@/utils/helpers";
import { UserPen } from "lucide-react";

interface CultureSectionProps {
  cultures: Culture[];
}

const CultureSection = ({ cultures }: CultureSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <UserPen size={16} />
          </div>
          Culture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {cultures.map((item: Culture) => {
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
