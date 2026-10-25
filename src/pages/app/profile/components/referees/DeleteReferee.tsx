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

import { useDeleteReferee } from "@/hooks/profile";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Button } from "@/components/ui/button";

interface DeleteRefereeProps {
  refereeId: number;
}

const DeleteReferee = ({ refereeId }: DeleteRefereeProps) => {
  const { mutate: deleteReferee, isPending } = useDeleteReferee();

  const handleDeleteReferee = () => {
    deleteReferee(refereeId, {
      onSuccess: (res) => {
        toast.success(res?.message || "Referee deleted.");
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
          <AlertDialogTitle>Delete Referee?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this referee.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDeleteReferee}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteReferee;
