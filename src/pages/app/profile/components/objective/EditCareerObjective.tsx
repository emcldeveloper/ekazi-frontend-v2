import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSaveObjective } from "@/hooks/profile";
import type { ObjectivePayload } from "@/@types/profile/profile";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Loader, PencilLine } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface EditCareerObjectiveProps {
  careerObjective: string;
}

const EditCareerObjective = ({ careerObjective }: EditCareerObjectiveProps) => {
  const { mutate, isPending: isLoading } = useSaveObjective();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ObjectivePayload>();

  const objectiveValue = useWatch({
    control,
    name: "objective",
    defaultValue: "",
  });

  const charCount = objectiveValue.length;

  /* Prefill */
  useEffect(() => {
    if (!careerObjective) return;

    reset({
      objective: careerObjective,
    });
  }, [, careerObjective, reset]);

  const onSubmit = (data: ObjectivePayload) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Career objective updated");
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

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
          <DialogTitle>Career Objectives</DialogTitle>
          <DialogDescription>
            Share your career goals and aspirations.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
          <form id="objective-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel>Objective *</FieldLabel>
                <Textarea
                  rows={8}
                  placeholder="Start typing..."
                  maxLength={500}
                  {...register("objective", {
                    required: "Career objective is required",
                    minLength: {
                      value: 10,
                      message: "Objective should be at least 10 characters",
                    },
                  })}
                />

                <div className="flex justify-between mt-1">
                  {errors.objective ? (
                    <FieldError>{errors.objective.message}</FieldError>
                  ) : (
                    <span />
                  )}

                  <p className="text-xs text-muted-foreground">
                    {charCount} / 500
                  </p>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="objective-form" disabled={isLoading}>
            {isLoading ? (
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

export default EditCareerObjective;
