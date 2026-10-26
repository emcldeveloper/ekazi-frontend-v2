import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

interface PreviewCoverLetterProps {
  formData: any;
}

const PreviewCoverLetter = ({ formData }: PreviewCoverLetterProps) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline">
            <Eye size={16} className="text-Orange" />
            Preview
          </Button>
        }
      />

      <DialogContent className="sm:max-w-3xl!">
        <DialogHeader>
          <DialogTitle>Cover Letter Preview</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
          <div className="p-6 border border-gray-300 rounded bg-white space-y-4">
            <div>
              <p className="font-semibold">
                {formData.firstName} {formData.lastName}
              </p>
              <p>{formData.yourAddress}</p>
              <p>{formData.email}</p>
              <p>{formData.phone}</p>
              <p>{formData.date}</p>
            </div>

            <div>
              <p>{formData.hiringManagerName}</p>
              <p>{formData.companyName}</p>
              <p>{formData.companyAddress}</p>
            </div>

            <p>Dear Mr/Mrs {formData.hiringManagerName},</p>

            <h5 className="font-semibold underline">
              RE: APPLICATION FOR {formData.position.toUpperCase()} POSITION
            </h5>

            <div className="whitespace-pre-wrap">{formData.letterContent}</div>

            <p>Sincerely,</p>
            <p>
              {formData.firstName} {formData.lastName}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewCoverLetter;
