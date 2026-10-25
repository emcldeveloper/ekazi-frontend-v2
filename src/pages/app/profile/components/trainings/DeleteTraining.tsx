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

import { useDeleteTraining } from "@/hooks/profile";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Button } from "@/components/ui/button";

interface DeleteTrainingProps {
  trainingId: number;
}

const DeleteTraining = ({ trainingId }: DeleteTrainingProps) => {
  const { mutate: deleteTraining, isPending } = useDeleteTraining();

  const handleDeleteTraining = () => {
    deleteTraining(trainingId, {
      onSuccess: (res) => {
        toast.success(res?.message || "Training deleted.");
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
          <AlertDialogTitle>Delete Training?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this training.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDeleteTraining}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTraining;
