import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddPersonalitiesModal from "./AddPersonalitiesModal";
import SectionTitle from "../SectionTitle";

interface PersonalitiesProps {
  applicant: any;
}

const Personalities = ({ applicant }: PersonalitiesProps) => {
  const personalities = applicant?.profile?.personality ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Personalities Traits</SectionTitle>

        <AddPersonalitiesModal personalityData={personalities} />
      </div>

      <Separator />

      <div className="flex gap-2 flex-wrap">
        {personalities.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {personalities.map((item: any) => (
              <Badge key={item.id} variant="secondary">
                {item.personality?.name ?? "-"}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No personality traits added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Personalities;
