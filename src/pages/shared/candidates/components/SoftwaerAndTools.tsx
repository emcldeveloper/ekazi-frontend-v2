import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SoftwareAndToolsProps {
  candidate: any;
}

const SoftwareandTools = ({ candidate }: SoftwareAndToolsProps) => {
  const softwares = candidate?.softwares || [];
  const tools = candidate?.tools || [];

  if (softwares.length === 0 || tools.length === 0) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-Blue text-lg">Softwares</CardTitle>
          <Separator />
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {softwares?.map((item: any, index: any) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm capitalize"
              >
                {item?.software.name?.toLowerCase()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-Blue text-lg">Tools</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tools?.map((item: any, index: any) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm capitalize"
              >
                {item.tool?.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SoftwareandTools;
