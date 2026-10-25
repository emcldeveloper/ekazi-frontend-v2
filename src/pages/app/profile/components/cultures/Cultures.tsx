import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddCulturesModal from "./AddCulturesModal";
import SectionTitle from "../SectionTitle";

interface CulturesProps {
  applicant: any;
}

const Cultures = ({ applicant }: CulturesProps) => {
  const cultures = applicant?.profile?.culture ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Culture Fit</SectionTitle>

        <AddCulturesModal cultureData={cultures} />
      </div>

      <Separator />

      <div className="flex gap-2 flex-wrap">
        {cultures.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {cultures.map((item: any) => {
              return (
                <Badge key={item.id} variant="secondary">
                  {item.culture?.name}
                </Badge>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No culture fit added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Cultures;
