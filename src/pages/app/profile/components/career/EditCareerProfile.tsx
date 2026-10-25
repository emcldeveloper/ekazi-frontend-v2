import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

import { getErrorMessage } from "@/utils/axios-helpers";
import { Loader, PencilLine } from "lucide-react";
import { useSaveCareerProfile } from "@/hooks/profile";
import type { CareerPayload } from "@/@types/profile/profile";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface EditCareerProfileProps {
  careerSummary: string;
}

const EditCareerProfile = ({ careerSummary }: EditCareerProfileProps) => {
  const { mutate, isPending: isLoading } = useSaveCareerProfile();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CareerPayload>();

  /* Prefill */
  useEffect(() => {
    if (!careerSummary) return;

    reset({
      career: careerSummary,
    });
  }, [careerSummary, reset]);

  const careerValue = useWatch({
    control,
    name: "career",
    defaultValue: "",
  });

  const charCount = careerValue.length;

  const onSubmit = (data: CareerPayload) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Career profile updated");
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
          <DialogTitle>Career Summary</DialogTitle>
          <DialogDescription>Briefly introduce yourself</DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
          <form id="summary-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel className="text-sm font-medium">
                  About Me *
                </FieldLabel>
                <Textarea
                  rows={10}
                  placeholder="Start typing..."
                  maxLength={1000}
                  {...register("career", {
                    required: "Career profile is required",
                    minLength: {
                      value: 20,
                      message:
                        "Career profile should be at least 20 characters",
                    },
                  })}
                />

                {/* Error + Counter */}
                <div className="flex justify-between mt-1">
                  {errors.career ? (
                    <FieldError>{errors.career.message}</FieldError>
                  ) : (
                    <span />
                  )}

                  <p className="text-xs text-muted-foreground">
                    {charCount} / 1000
                  </p>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="summary-form" disabled={isLoading}>
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

export default EditCareerProfile;
