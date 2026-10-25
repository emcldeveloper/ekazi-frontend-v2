import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { toast } from "sonner";

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

import { useCreateCulture, useCultures } from "@/hooks/profile";
import { getErrorMessage } from "@/utils/axios-helpers";
import { Loader, PencilLine } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface CultureOption {
  value: number | string;
  label: string;
}

interface CultureFormValues {
  culture: CultureOption[];
}

interface AddCulturesModalProps {
  cultureData: any;
}

const AddCulturesModal = ({ cultureData }: AddCulturesModalProps) => {
  const [searchCulture, setSearchCulture] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CultureFormValues>();

  const { mutate, isPending: isLoading } = useCreateCulture();

  const { data: cultures } = useCultures({ search: searchCulture });
  const cultureOptions =
    cultures?.map((level: any) => ({
      value: level.id,
      label: level.culture_name,
    })) ?? [];

  useEffect(() => {
    if (!cultureData) return;

    const mapped = cultureData
      .filter((item: any) => item.culture?.id != null)
      .map((item: any) => ({
        value: item.culture.id,
        label: item.culture.name,
      }));

    reset({ culture: mapped });
  }, [cultureData, reset]);

  const onSubmit = (data: CultureFormValues) => {
    const payload = {
      cultures: data.culture.map((k: { label: string }) => k.label),
    };
    mutate(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
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
          <DialogTitle>Culture Fit</DialogTitle>
          <DialogDescription>
            Highlight your values, work style, and how you collaborate with
            others.
          </DialogDescription>
        </DialogHeader>

        <form id="culture-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Field */}
          <FieldGroup>
            <Field>
              <FieldLabel>Culture *</FieldLabel>
              <Controller
                name="culture"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.length > 0 || "Please select at least one culture",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={cultureOptions}
                    isMulti
                    isSearchable
                    isClearable
                    placeholder="Select or create culture..."
                    value={field.value}
                    onChange={(selected) => field.onChange(selected ?? [])}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onInputChange={(inputValue) => {
                      setSearchCulture(inputValue);
                    }}
                  />
                )}
              />

              {errors.culture && (
                <FieldError>{errors.culture.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" disabled={isLoading} form="culture-form">
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

export default AddCulturesModal;
