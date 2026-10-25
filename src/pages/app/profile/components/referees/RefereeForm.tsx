import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/utils/axios-helpers";
import type { RefereePayload } from "@/@types/profile/profile";
import { useCreateReferee, useUpdateReferee } from "@/hooks/profile";

interface RefereeFormProps {
  referee?: any;
  onLoadingChange?: (loading: boolean) => void;
}

const RefereeForm = ({ referee, onLoadingChange }: RefereeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RefereePayload>();

  const { mutate: createReferee, isPending: isCreating } = useCreateReferee();

  const { mutate: updateReferee, isPending: isUpdating } = useUpdateReferee();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  useEffect(() => {
    if (!referee) return;

    if (referee) {
      reset({
        first_name: referee.first_name,
        middle_name: referee.middle_name,
        last_name: referee.last_name,
        referee_position: referee.position,
        employer: referee.employer,
        email: referee.email,
        phone: referee.phone,
      });
    }
  }, [referee, reset]);

  const onSubmit = (data: RefereePayload) => {
    if (referee) {
      updateReferee(
        { id: referee?.id, payload: data },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Referee updated");
            reset();
          },
          onError: (err) => {
            toast.error(getErrorMessage(err));
          },
        },
      );
    } else {
      createReferee(data, {
        onSuccess: (res) => {
          toast.success(res?.message || "Referee added successfully");
          reset();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      });
    }
  };

  return (
    <form id="referee-form" onSubmit={handleSubmit(onSubmit)}>
      {/* First Name */}
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field>
          <FieldLabel>First Name *</FieldLabel>
          <Input
            {...register("first_name", {
              required: "First name is required",
            })}
          />
          {errors.first_name && (
            <FieldError>{errors.first_name.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Middle Name *</FieldLabel>
          <Input
            {...register("middle_name", {
              required: "Middle name is required",
            })}
          />
          {errors.middle_name && (
            <FieldError>{errors.middle_name.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Last Name *</FieldLabel>
          <Input
            {...register("last_name", {
              required: "Last name is required",
            })}
          />
          {errors.last_name && (
            <FieldError>{errors.last_name.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Position *</FieldLabel>
          <Input
            {...register("referee_position", {
              required: "Position is required",
            })}
          />
          {errors.referee_position && (
            <FieldError>{errors.referee_position.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Employer *</FieldLabel>
          <Input
            {...register("employer", {
              required: "Employer is required",
            })}
          />
          {errors.employer && (
            <FieldError>{errors.employer.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Email *</FieldLabel>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Phone *</FieldLabel>
          <Input {...register("phone", { required: "Phone is required" })} />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RefereeForm;
