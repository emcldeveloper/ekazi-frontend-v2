import { Download } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { formatName, getFileNameFromUrl } from "@/utils/helpers";
import CreateReferee from "./CreateReferee";
import SectionTitle from "../SectionTitle";
import UpdateReferee from "./UpdateReferee";
import DeleteReferee from "./DeleteReferee";

interface RefereesProps {
  applicant: any;
}

const Referees = ({ applicant }: RefereesProps) => {
  const referees = applicant.profile?.referees ?? [];

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle>Referees</SectionTitle>

        <CreateReferee />
      </div>

      <Separator />

      {/* Content */}
      {referees.length > 0 ? (
        <div className="space-y-4">
          {referees.map((referee: any) => (
            <div key={referee.id}>
              <div className="flex gap-4">
                {/* Details */}
                <div className="flex-1 space-y-1 text-sm">
                  <div className="font-semibold">
                    {formatName(
                      referee.first_name,
                      referee.middle_name,
                      referee.last_name,
                    )}
                  </div>
                  {/* Employer */}
                  <p className="text-sm text-muted-foreground">
                    {referee.employer}
                  </p>

                  {/* Position */}
                  <p className=" text-foreground">{referee.position}</p>

                  {/* Contact */}
                  <p className="text-muted-foreground">{referee.email}</p>
                  <p className="text-muted-foreground">{referee.phone}</p>

                  {/* Attachment */}
                  {referee.type === "private" && referee.attachment && (
                    <a
                      href={referee.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                      title={getFileNameFromUrl(referee.attachment)}
                    >
                      <Download className="w-3.5 h-3.5" />
                      {getFileNameFromUrl(referee.attachment)}
                    </a>
                  )}
                </div>

                <div className="flex gap-1">
                  <UpdateReferee referee={referee} />
                  <DeleteReferee refereeId={referee.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-4 text-muted-foreground">
          No referees added
        </div>
      )}
    </div>
  );
};

export default Referees;
