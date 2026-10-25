import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import AddSoftwareModal from "./AddSoftwareModal";
import SectionTitle from "../SectionTitle";

interface SoftwaresProps {
  applicant: any;
}

const Softwares = ({ applicant }: SoftwaresProps) => {
  const softwares = applicant.profile?.software ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Softwares</SectionTitle>

        <AddSoftwareModal softwares={softwares} />
      </div>

      <Separator />

      <div className="flex gap-2 flex-wrap">
        {softwares.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {softwares.map((item: any) => (
              <Badge key={item.id} variant="secondary">
                {item.software?.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No software added yet</p>
        )}
      </div>
    </div>
  );
};

export default Softwares;
