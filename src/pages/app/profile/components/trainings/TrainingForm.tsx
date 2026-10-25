import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { toast } from "sonner";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { getErrorMessage } from "@/utils/axios-helpers";
import {
  useCreateTraining,
  useTrainings,
  useUpdateTraining,
} from "@/hooks/profile";
import { useOrganizations } from "@/hooks/universals";
import type { TrainingPayload } from "@/@types/profile/profile";

interface TrainingFormProps {
  training?: any;
  onLoadingChange?: (loading: boolean) => void;
}

const TrainingForm = ({ training, onLoadingChange }: TrainingFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrainingPayload>();

  const { mutate: createTraining, isPending: isCreating } = useCreateTraining();

  const { mutate: updateTraining, isPending: isUpdating } = useUpdateTraining();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  const { data: trainings } = useTrainings();
  const trainingOptions = useMemo(
    () =>
      trainings?.map((t: any) => ({
        value: t.id,
        label: t.name,
      })) ?? [],
    [trainings],
  );

  const { data: institutions } = useOrganizations({});
  const institutionOptions = useMemo(
    () =>
      institutions?.map((t: any) => ({
        value: t.id,
        label: t.name,
      })) ?? [],
    [training],
  );

  useEffect(() => {
    if (!training) return;

    if (training) {
      reset({
        name: training?.name,
        institution: training.institution,
        started: training.started,
        ended: training.ended,
      });
    }
  }, [training, reset]);

  const onSubmit = (data: TrainingPayload) => {
    const formData = new FormData();

    // Append regular fields
    formData.append("name", String(data.name));
    formData.append("institution", String(data.institution));
    formData.append("started", String(data.started));
    formData.append("ended", String(data.ended));

    // Append the actual certificate file
    const attachment = data.attachment as unknown as FileList | undefined;

    if (attachment && attachment.length > 0) {
      formData.append("attachment", attachment[0]);
    }

    if (training) {
      updateTraining(
        { id: training?.id, payload: formData },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Training updated");
            reset();
          },
          onError: (err) => {
            toast.error(getErrorMessage(err));
          },
        },
      );
    } else {
      createTraining(formData, {
        onSuccess: (res) => {
          toast.success(res?.message || "Training added successfully");
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
      id="training-form"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      {/* Training */}
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field>
          <FieldLabel>Training Name *</FieldLabel>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Training name is required" }}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                options={trainingOptions}
                placeholder="Select training..."
              />
            )}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel>Institution *</FieldLabel>
          <Controller
            name="institution"
            control={control}
            rules={{ required: "Institution is required" }}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                options={institutionOptions}
                placeholder="Select institution..."
              />
            )}
          />
          {errors.institution && (
            <p className="text-sm text-destructive mt-1">
              {errors.institution.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel>Started *</FieldLabel>
          <Input
            type="date"
            {...register("started", {
              required: "Date started is required",
            })}
          />
          {errors.institution && (
            <p className="text-sm text-destructive mt-1">
              {errors.institution.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel>Ended *</FieldLabel>
          <Input
            type="date"
            {...register("ended", { required: "Date ended is required" })}
          />
          {errors.institution && (
            <p className="text-sm text-destructive mt-1">
              {errors.institution.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel>Attachment *</FieldLabel>
          <Input
            type="file"
            accept=".pdf"
            {...register("attachment", {
              required: !training,
            })}
          />
          {errors.institution && (
            <p className="text-sm text-destructive mt-1">
              {errors.institution.message}
            </p>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default TrainingForm;
