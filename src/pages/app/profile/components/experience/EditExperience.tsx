import { Loader, PencilLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ExperienceForm from "./ExperienceForm";
import { useState } from "react";

interface EditExperienceProps {
  experience: any;
}

const EditExperience = ({ experience }: EditExperienceProps) => {
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

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
          <ExperienceForm
            experience={experience}
            onLoadingChange={setIsSubmitting}
          />
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="experience-form">
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

export default EditExperience;
