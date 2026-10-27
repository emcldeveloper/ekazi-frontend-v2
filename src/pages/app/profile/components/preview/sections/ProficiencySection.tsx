import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeText, formatDate } from "@/utils/helpers";
import { BookMarked } from "lucide-react";

interface ProficiencySectionProps {
  proficiencies: any;
}

const ProficiencySection = ({ proficiencies }: ProficiencySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <BookMarked size={16} />
          </div>
          Proficiency
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {proficiencies.map((item: any) => (
            <div key={item.id} className="flex-1 space-y-1">
              <h3 className="text-base font-semibold">
                {capitalizeText(item.proficiency?.name)}
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  – {formatDate(item.started)} - {formatDate(item.ended)}
                </span>
              </h3>

              {/* Award */}
              <p className="text-sm uppercase">
                {capitalizeText(item.award)}{" "}
                {item.organization?.name && (
                  <span className="text-muted-foreground normal-case">
                    ({capitalizeText(item.organization.name)})
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProficiencySection;
