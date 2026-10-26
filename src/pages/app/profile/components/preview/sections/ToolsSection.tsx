import type { Tool } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeText } from "@/utils/helpers";
import { SlidersVertical } from "lucide-react";

interface ToolsSectionProps {
  tools: Tool[];
}

export const ToolsSection = ({ tools }: ToolsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <SlidersVertical size={16} />
          </div>
          Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tools.map((item: Tool) => (
            <Badge key={item.id} variant="secondary">
              {capitalizeText(item.tool?.name)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
