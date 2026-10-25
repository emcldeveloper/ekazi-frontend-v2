import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddToolsModal from "./AddToolsModal";
import SectionTitle from "../SectionTitle";

interface ToolsProps {
  applicant: any;
}

const Tools = ({ applicant }: ToolsProps) => {
  const toolsList = applicant?.profile?.tools ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Tools</SectionTitle>

        {/* Modal */}
        <AddToolsModal toolsList={toolsList} />
      </div>

      <Separator />

      <div className="flex gap-2 flex-wrap">
        {toolsList.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {toolsList.map((item: any) => (
              <Badge
                key={item.id}
                variant="secondary"
                className="px-3 py-1 rounded-md hover:bg-muted transition"
              >
                {item.tool?.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No tools added yet</p>
        )}
      </div>
    </div>
  );
};

export default Tools;
