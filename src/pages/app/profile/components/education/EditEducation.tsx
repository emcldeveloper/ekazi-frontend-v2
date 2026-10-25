import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader, PencilLine } from "lucide-react";
import EducationForm from "./EducationForm";
import { useState } from "react";

interface EditEducationProps {
  education: any;
}

const EditEducation = ({ education }: EditEducationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm">
            <PencilLine />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Education</DialogTitle>
          <DialogDescription>
            Update your education information and qualifications.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[65vh] overflow-y-auto px-4">
          <EducationForm
            education={education}
            onLoadingChange={setIsSubmitting}
          />
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="education-form">
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEducation;
