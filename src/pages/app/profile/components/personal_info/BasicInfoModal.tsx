import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Loader, PencilLine } from "lucide-react";
import { toast } from "sonner";
import SearchSelect from "react-select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  useCountries,
  useGenders,
  useMaritalStatus,
  useRegions,
} from "@/hooks/universals";
import { useSavePersonalInfo } from "@/hooks/profile";
import type {
  Country,
  Gender,
  MaritalStatus,
  OptionType,
  Region,
} from "@/@types/universals";

import { getErrorMessage } from "@/utils/axios-helpers";
import type { PersonalInfoPayload } from "@/@types/profile/personal-info";

interface BasicInfoModalProps {
  applicant: any;
}

const BasicInfoModal = ({ applicant }: BasicInfoModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<PersonalInfoPayload>();

  const { mutate: savePersonalInfo, isPending } = useSavePersonalInfo();

  const [searchRegion, setSearchRegion] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  const { data: genders } = useGenders();
  const genderOptions =
    genders?.map((gender: Gender) => ({
      value: gender.id,
      label: gender.name,
    })) ?? [];

  const { data: maritalStatuses } = useMaritalStatus();
  const maritalStatusOptions =
    maritalStatuses?.map((status: MaritalStatus) => ({
      value: status.id,
      label: status.name,
    })) ?? [];

  const { data: countries } = useCountries({ search: searchCountry });
  const countryOptions =
    countries?.map((country: Country) => ({
      value: country.id,
      label: country.name,
    })) ?? [];

  const { data: regions = [] } = useRegions({ search: searchRegion });

  const selectedCountry = watch("country_id");

  const filteredRegions =
    regions
      ?.filter((region: Region) => region.country?.id === selectedCountry)
      .map((region: Region) => ({
        value: region.id,
        label: region.name,
      })) ?? [];

  useEffect(() => {
    if (!applicant) return;

    const profile = applicant?.applicant_profile;
    const address = applicant?.address?.[0];
    const phone = applicant?.phone?.[0];

    reset({
      first_name: profile.first_name,
      middle_name: profile.middle_name,
      last_name: profile.last_name,
      dob: profile.dob,
      gender_id: profile?.gender?.id,
      marital_status_id: profile?.marital_status.id,

      phone: phone.phone_number,

      sub_location: address.sub_location,
      postal: address.postal,
      country_id: address.region.country.id,
      region_id: address.region?.id,
    });
  }, [applicant, reset]);

  const onSubmit = (data: PersonalInfoPayload) => {
    savePersonalInfo(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Profile updated");
        reset();
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
      <DialogContent className="overflow-visible sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Personal Information</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 max-h-[65vh] overflow-y-auto px-4">
          <form
            id="personal-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup className="sm:flex-row">
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
                <FieldLabel>Middle Name</FieldLabel>
                <Input {...register("middle_name")} />
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
            </FieldGroup>

            {/* Gender / Marital / DOB */}
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <Controller
                  name="gender_id"
                  control={control}
                  rules={{
                    required: "Gender is required",
                  }}
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      isClearable
                      options={genderOptions}
                      value={genderOptions.find(
                        (option: OptionType) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                    />
                  )}
                />
                {errors.gender_id && (
                  <FieldError>{errors.gender_id.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="marital_status_id">
                  Marital Status
                </FieldLabel>
                <Controller
                  name="marital_status_id"
                  control={control}
                  rules={{
                    required: "Marital status is required",
                  }}
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      isClearable
                      options={maritalStatusOptions}
                      value={maritalStatusOptions.find(
                        (option: OptionType) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                    />
                  )}
                />
                {errors.marital_status_id && (
                  <FieldError>{errors.marital_status_id.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Date of Birth *</FieldLabel>
                <Input
                  type="date"
                  {...register("dob", {
                    required: "Date is required",
                  })}
                />
                {errors.dob && <FieldError>{errors.dob.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Phone *</FieldLabel>
                <Input
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                />
                {errors.phone && (
                  <FieldError>{errors.phone.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            {/* Region */}
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
              <Field>
                <FieldLabel>Country</FieldLabel>
                <Controller
                  name="country_id"
                  control={control}
                  rules={{
                    required: "Country is required",
                  }}
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      isClearable
                      options={countryOptions}
                      value={countryOptions.find(
                        (option: OptionType) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                      onInputChange={(inputValue) => {
                        setSearchCountry(inputValue);
                      }}
                    />
                  )}
                />
                {errors.country_id && (
                  <FieldError>{errors.country_id.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Region</FieldLabel>
                <Controller
                  name="region_id"
                  control={control}
                  rules={{
                    required: "Region is required",
                  }}
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      isClearable
                      isDisabled={!selectedCountry}
                      options={filteredRegions}
                      value={filteredRegions.find(
                        (option: OptionType) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                      onInputChange={(inputValue) => {
                        setSearchRegion(inputValue);
                      }}
                    />
                  )}
                />
                {errors.region_id && (
                  <FieldError>{errors.region_id.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Sub Location *</FieldLabel>
                <Input
                  {...register("sub_location", {
                    required: "Sub location is required",
                  })}
                />
                {errors.sub_location && (
                  <FieldError>{errors.sub_location.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Postal Address</FieldLabel>
                <Input {...register("postal")} />
              </Field>
            </FieldGroup>
          </form>
        </div>

        <DialogFooter className="pt-4">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="personal-form" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BasicInfoModal;
