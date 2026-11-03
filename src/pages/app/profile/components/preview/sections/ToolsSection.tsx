import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { capitalizeText } from "@/utils/helpers";

interface ToolsSectionProps {
  tools: any;
}

export const ToolsSection = ({ tools }: ToolsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">Tools</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tools.map((item: any) => (
            <Badge key={item.id} variant="secondary">
              {capitalizeText(item.tool?.name)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
