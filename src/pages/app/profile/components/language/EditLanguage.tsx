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

import { Loader, PencilLine } from "lucide-react";
import LanguageForm from "./LanguageForm";
import { useState } from "react";

interface EditLanguageModalProps {
  language: any;
}

const EditLanguage = ({ language }: EditLanguageModalProps) => {
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
          <DialogTitle>Update Language</DialogTitle>
          <DialogDescription>
            Update your language details and proficiency level.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
          <LanguageForm language={language} onLoadingChange={setIsSubmitting} />
        </div>

        <DialogFooter className="flex justify-end gap-2 pt-4">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" disabled={isSubmitting} form="language-form">
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

export default EditLanguage;
