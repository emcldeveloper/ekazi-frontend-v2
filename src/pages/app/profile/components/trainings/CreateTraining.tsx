import { Loader, Plus } from "lucide-react";

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
import TrainingForm from "./TrainingForm";
import { useState } from "react";

const CreateTraining = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm">
            <Plus />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Training</DialogTitle>
          <DialogDescription>
            Add your completed or ongoing professional training.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
          <TrainingForm onLoadingChange={setIsSubmitting} />
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="training-form">
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

export default CreateTraining;
