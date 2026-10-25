import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDeleteProficiency } from "@/hooks/profile";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Button } from "@/components/ui/button";

interface DeleteProficiencyProps {
  proficiencyId: number;
}

const DeleteProficiency = ({ proficiencyId }: DeleteProficiencyProps) => {
  const { mutate: deleteProficiency, isPending } = useDeleteProficiency();

  const handleDeleteProficiency = () => {
    deleteProficiency(proficiencyId, {
      onSuccess: (res) => {
        toast.success(res?.message || "Proficiency deleted.");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button disabled={isPending} variant="destructive" size="sm">
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Proficiency?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this proficiency.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDeleteProficiency}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProficiency;
