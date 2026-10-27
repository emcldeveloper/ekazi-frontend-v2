import { Download } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import {
  capitalizeText,
  formatYear,
  getFileNameFromUrl,
} from "@/utils/helpers";
import CreateProficiency from "./CreateProficiency";
import SectionTitle from "../SectionTitle";
import UpdateProficiency from "./UpdateProficiency";
import DeleteProficiency from "./DeleteProficiency";

interface ProficienciesProps {
  applicant: any;
}

const Proficiencies = ({ applicant }: ProficienciesProps) => {
  const proficiencies = applicant.profile?.proficiency ?? [];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Proficiency qualification</SectionTitle>

        <CreateProficiency />
      </div>

      <Separator />

      {/* Content */}
      {proficiencies.length > 0 ? (
        <div className="space-y-4">
          {proficiencies.map((item: any) => (
            <div key={item.id}>
              <div className="flex gap-4">
                {/* Details */}
                <div className="flex-1 space-y-1">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-base font-semibold">
                      {item.proficiency?.name}
                    </h3>
                  </div>

                  {/* Award */}
                  <p className="text-sm uppercase">
                    {capitalizeText(item.award)}{" "}
                    {item.organization?.name && (
                      <span className="text-muted-foreground normal-case">
                        ({capitalizeText(item.organization.name)})
                      </span>
                    )}
                  </p>

                  <div>
                    {formatYear(item.started)} - {formatYear(item.ended)}
                  </div>

                  {/* Attachment */}
                  {item.attachment && (
                    <a
                      href={item.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {getFileNameFromUrl(item.attachment)}
                    </a>
                  )}
                </div>

                <div className="flex gap-1">
                  <UpdateProficiency proficiency={item} />
                  <DeleteProficiency proficiencyId={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-4 text-muted-foreground">
          No proficiency qualifications added
        </div>
      )}
    </div>
  );
};

export default Proficiencies;
