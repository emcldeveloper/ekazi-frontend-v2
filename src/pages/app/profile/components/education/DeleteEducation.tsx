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

import { useDeleteEducation } from "@/hooks/profile";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Button } from "@/components/ui/button";

interface DeleteExperienceProps {
  educationId: number;
}

const DeleteEducation = ({ educationId }: DeleteExperienceProps) => {
  const { mutate: deleteEducation, isPending } = useDeleteEducation();

  const handleDeleteEducation = () => {
    deleteEducation(educationId, {
      onSuccess: (res) => {
        toast.success(res?.message || "Education deleted successfully.");
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
          <AlertDialogTitle>Delete Education?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this education.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDeleteEducation}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEducation;
