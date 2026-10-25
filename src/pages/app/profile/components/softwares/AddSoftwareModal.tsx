import { useEffect, useState } from "react";
import { Loader, PencilLine } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { getErrorMessage } from "@/utils/axios-helpers";
import { useSoftwares } from "@/hooks/universals";
import { useSaveSoftwares } from "@/hooks/profile";

interface SoftwareOption {
  value: number | string;
  label: string;
}

interface SoftwareFormValues {
  software: SoftwareOption[];
}

interface AddSoftwareModalProps {
  softwares: any;
}

const AddSoftwareModal = ({ softwares }: AddSoftwareModalProps) => {
  const [softwareSearch, setSoftwareSearch] = useState("");

  const { mutate: saveSoftware, isPending: isLoading } = useSaveSoftwares();

  const { data: softwaresData } = useSoftwares({ search: softwareSearch });
  const softwareOptions =
    softwaresData?.map((software: any) => ({
      value: software.id,
      label: software.software_name,
    })) ?? [];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SoftwareFormValues>();

  useEffect(() => {
    if (!softwares) return;

    const mapped = softwares
      .filter((item: any) => item.software?.id != null)
      .map((item: any) => ({
        value: item.software.id,
        label: item.software.name,
      }));

    reset({ software: mapped });
  }, [softwares, reset]);

  const onSubmit = (data: SoftwareFormValues) => {
    const payload = {
      software: data.software.map((k: { label: string }) => k.label),
    };

    saveSoftware(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Software saved successfully");
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
          <DialogTitle>Software Application</DialogTitle>
        </DialogHeader>

        <form id="softwares-form" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel>Software *</FieldLabel>
            <Controller
              name="software"
              control={control}
              rules={{
                validate: (value) =>
                  value?.length > 0 || "Please select at least one software",
              }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={softwareOptions}
                  isMulti
                  isSearchable
                  isClearable
                  placeholder="Select or create software..."
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                  onInputChange={(inputValue) => {
                    setSoftwareSearch(inputValue);
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />
            {errors.software && (
              <FieldError>{errors.software.message}</FieldError>
            )}
          </Field>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" disabled={isLoading} form="softwares-form">
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

export default AddSoftwareModal;
