import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Loader, PencilLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import CreatableSelect from "react-select/creatable";
import { usePersonalities, useSavePersonalities } from "@/hooks/profile";
import { getErrorMessage } from "@/utils/axios-helpers";

interface PersonalityOption {
  value: number | string;
  label: string;
}

interface PersonalityFormValues {
  personality: PersonalityOption[];
}

interface AddPersonalitiesModalProps {
  personalityData: any;
}

const AddPersonalitiesModal = ({
  personalityData,
}: AddPersonalitiesModalProps) => {
  const [searchPersonality, setSearchPersonality] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalityFormValues>();

  const { mutate, isPending: isLoading } = useSavePersonalities();

  const { data: personalities } = usePersonalities({
    search: searchPersonality,
  });
  const personalityOptions =
    personalities?.map((level: any) => ({
      value: level.id,
      label: level.name,
    })) ?? [];

  useEffect(() => {
    if (!personalityData) return;

    const mapped = personalityData
      .filter((item: any) => item.personality?.id != null)
      .map((item: any) => ({
        value: item.personality.id,
        label: item.personality.name,
      }));

    reset({ personality: mapped });
  }, [personalityData, reset]);

  const onSubmit = (data: PersonalityFormValues) => {
    const payload = {
      personalities: data.personality.map((k: { label: string }) => k.label),
    };

    mutate(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Personality saved successfully");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
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
          <DialogTitle>Personality Traits</DialogTitle>
        </DialogHeader>

        <form id="personalities-form" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel>Personality *</FieldLabel>
            <Controller
              name="personality"
              control={control}
              rules={{
                validate: (value) =>
                  value?.length > 0 || "Please select at least one personality",
              }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={personalityOptions}
                  isMulti
                  isSearchable
                  isClearable
                  placeholder="Select personalities..."
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  onInputChange={(inputValue) => {
                    setSearchPersonality(inputValue);
                  }}
                />
              )}
            />

            {errors.personality && (
              <p className="text-sm text-red-500">
                {errors.personality.message}
              </p>
            )}
          </Field>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" disabled={isLoading} form="personalities-form">
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

export default AddPersonalitiesModal;
