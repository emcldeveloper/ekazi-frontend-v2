import { Separator } from "@/components/ui/separator";

import AddEducationModal from "./AddEducation";
import { formatDate } from "@/utils/helpers";
import EditEducation from "./EditEducation";
import DeleteEducation from "./DeleteEducation";
import SectionTitle from "../SectionTitle";
import { Download } from "lucide-react";
import { getFileNameFromUrl, getFileUrl } from "@/utils/file-helpers";

interface EducationProps {
  applicant: any;
}

const Education = ({ applicant }: EducationProps) => {
  const educationList = applicant?.education ?? [];

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle>Education details</SectionTitle>

        <AddEducationModal />
      </div>

      <Separator />

      {/* Content */}
      {educationList.length > 0 ? (
        <div className="space-y-3">
          {educationList.map((education: any) => (
            <div key={education.id}>
              <div className="flex gap-4">
                {/* Details */}
                <div className="flex-1 space-y-1">
                  <div className="text-sm font-semibold">
                    {education.college?.name}
                  </div>
                  <div className="text-sm first-letter:ont-semibold">
                    {/* {capitalizeText(education.education_level?.name)} in{" "} */}
                    {education.course?.name}
                  </div>

                  {education.major?.name && (
                    <div className="text-xs italic font-medium">
                      Major: {education.major.name}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    {formatDate(education.started)} –{" "}
                    {formatDate(education.ended)}
                  </p>

                  {/* Attachment */}
                  {education.attachment && (
                    <a
                      href={getFileUrl(education.attachment)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {getFileNameFromUrl(education.attachment)}
                    </a>
                  )}
                </div>

                <div>
                  <EditEducation education={education} />
                  <DeleteEducation educationId={education?.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-sm text-muted-foreground">
          No education records found
        </div>
      )}
    </div>
  );
};

export default Education;
