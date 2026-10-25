import { Loader, PencilLine } from "lucide-react";

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
import { Button } from "@/components/ui/button";

import ProficiencyForm from "./ProficiencyForm";
import { useState } from "react";

interface UpdateProficiencyProps {
  proficiency: any;
}

const UpdateProficiency = ({ proficiency }: UpdateProficiencyProps) => {
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
          <DialogTitle>Update Proficiency</DialogTitle>
          <DialogDescription>
            Update your professional certification.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[65vh] overflow-y-auto px-4">
          <ProficiencyForm
            proficiency={proficiency}
            onLoadingChange={setIsSubmitting}
          />
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" disabled={isSubmitting} form="proficiency-form">
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

export default UpdateProficiency;
