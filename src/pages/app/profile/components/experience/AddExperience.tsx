import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader, PlusIcon } from "lucide-react";
import ExperienceForm from "./ExperienceForm";
import { useState } from "react";

const AddExperience = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm">
            <PlusIcon />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
          <ExperienceForm onLoadingChange={setIsSubmitting} />
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

export default AddExperience;
