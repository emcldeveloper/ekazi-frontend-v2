import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useOrganizations } from "@/hooks/universals";
import {
  useCreateProficiency,
  useProficiencies,
  useUpdateProficiency,
} from "@/hooks/profile";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import type { ProficiencyPayload } from "@/@types/profile/profile";
import type { OptionType } from "@/@types/universals";

interface ProficiencyFormProps {
  proficiency?: any;
  onLoadingChange?: (loading: boolean) => void;
}

const ProficiencyForm = ({
  proficiency,
  onLoadingChange,
}: ProficiencyFormProps) => {
  const [proficiencySearch, setProficiencySearch] = useState("");
  const [organizationSearch, setOrganizationSearch] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ProficiencyPayload>();

  const { mutate: createProficiency, isPending: isCreating } =
    useCreateProficiency();

  const { mutate: updateProficiency, isPending: isUpdating } =
    useUpdateProficiency();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  const { data: organizations } = useOrganizations({
    search: organizationSearch,
  });
  const organizationOptions = useMemo(
    () =>
      organizations?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [organizations],
  );

  const { data: proficiencies } = useProficiencies({
    search: proficiencySearch,
  });
  const proficiencyOptions = useMemo(
    () =>
      proficiencies?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [proficiencies],
  );

  useEffect(() => {
    if (!proficiency) return;

    if (proficiency) {
      reset({
        organization_id: proficiency.organization?.id,
        proficiency_id: proficiency.proficiency?.id,
        started: proficiency.started,
        ended: proficiency.ended,
        award: proficiency.award,
      });
    }
  }, [proficiency, reset]);

  const onSubmit = (data: ProficiencyPayload) => {
    const formData = new FormData();

    // Append regular fields
    formData.append("organization_id", String(data.organization_id));
    formData.append("proficiency_id", String(data.proficiency_id));
    formData.append("award", String(data.award));
    formData.append("started", String(data.started));
    formData.append("ended", String(data.ended));

    // Append the actual certificate file
    const attachment = data.attachment as unknown as FileList | undefined;

    if (attachment && attachment.length > 0) {
      formData.append("attachment", attachment[0]);
    }

    if (proficiency) {
      updateProficiency(
        { id: proficiency?.id, payload: formData },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Proficiency updated");
            reset();
          },
          onError: (err) => {
            toast.error(getErrorMessage(err));
          },
        },
      );
    } else {
      createProficiency(formData, {
        onSuccess: (res) => {
          toast.success(res?.message || "Proficiency added successfully");
          reset();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      });
    }
  };

  return (
    <form
      id="proficiency-form"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field>
          <FieldLabel>Organization *</FieldLabel>
          <Controller
            name="organization_id"
            control={control}
            rules={{ required: "Organization is required" }}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                options={organizationOptions}
                placeholder="Select organization_id..."
                onInputChange={(inputValue) => {
                  setOrganizationSearch(inputValue);
                }}
                value={organizationOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
              />
            )}
          />
          {errors.organization_id && (
            <FieldError>{errors.organization_id.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Proficiency *</FieldLabel>
          <Controller
            name="proficiency_id"
            control={control}
            rules={{ required: "Proficiency is required" }}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                options={proficiencyOptions}
                placeholder="Select proficiency_id..."
                onInputChange={(inputValue) => {
                  setProficiencySearch(inputValue);
                }}
                value={proficiencyOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
              />
            )}
          />
          {errors.proficiency_id && (
            <FieldError>{errors.proficiency_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Started *</FieldLabel>
          <Input
            type="date"
            {...register("started", { required: "Date is required" })}
          />
          {errors.started && <FieldError>{errors.started.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel>Ended *</FieldLabel>
          <Input
            type="date"
            {...register("ended", { required: "Date is required" })}
          />
          {errors.ended && <FieldError>{errors.ended.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Award Name *</FieldLabel>
          <Input
            {...register("award", { required: "Award name is required" })}
          />
          {errors.award && <FieldError>{errors.award.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Attachment *</FieldLabel>
          <Input
            type="file"
            accept=".pdf,.jpg,.png"
            {...register("attachment", {
              required: "Attachment is required",
            })}
          />
          {errors.attachment && (
            <FieldError>{errors.attachment.message}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ProficiencyForm;
