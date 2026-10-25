import { useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import SearchSelect from "react-select";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { getErrorMessage } from "@/utils/axios-helpers";
import { useRegister } from "@/hooks/auth";
import { useGenders } from "@/hooks/universals/useGenders";
import type {
  Country,
  Gender,
  MaritalStatus,
  OptionType,
  Region,
} from "@/@types/universals";
import { useMaritalStatus } from "@/hooks/universals/useMaritalStatus";
import { useCountries, useRegions } from "@/hooks/universals";
import type { RegisterPayload } from "@/@types/auth";
import SuccessRegisterModal from "./SuccessRegisterModal";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegisterPayload>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { mutate: registerUser, isPending } = useRegister();

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

  const { data: countries } = useCountries({});
  const countryOptions =
    countries?.map((country: Country) => ({
      value: country.id,
      label: country.name,
    })) ?? [];

  const { data: regions = [] } = useRegions({});

  const acceptedTerms = watch("terms");
  const selectedCountry = watch("country_id");

  const filteredRegions =
    regions
      ?.filter((region: Region) => region.country?.id === selectedCountry)
      .map((region: Region) => ({
        value: region.id,
        label: region.name,
      })) ?? [];

  const onSubmit = (data: RegisterPayload) => {
    registerUser(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Registered successfully");
        setShowModal(true);
        reset();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstname">First Name</FieldLabel>
              <Input
                id="text"
                type="firstname"
                {...register("firstname", {
                  required: "First name is required",
                })}
              />
              {errors.firstname && (
                <FieldError>{errors.firstname.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
              <Input
                id="text"
                type="lastname"
                {...register("lastname", { required: "Last name is required" })}
              />
              {errors.lastname && (
                <FieldError>{errors.lastname.message}</FieldError>
              )}
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
              <Input
                id="dob"
                type="date"
                {...register("dob", { required: "Date is required" })}
              />
              {errors.dob && <FieldError>{errors.dob.message}</FieldError>}
            </Field>

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
                    onChange={(option) => field.onChange(option?.value ?? null)}
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
                    onChange={(option) => field.onChange(option?.value ?? null)}
                  />
                )}
              />
              {errors.marital_status_id && (
                <FieldError>{errors.marital_status_id.message}</FieldError>
              )}
            </Field>

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
                    onChange={(option) => field.onChange(option?.value ?? null)}
                  />
                )}
              />
              {errors.country_id && (
                <p className="text-xs text-red-500">
                  {errors.country_id.message}
                </p>
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
                    onChange={(option) => field.onChange(option?.value ?? null)}
                  />
                )}
              />
              {errors.region_id && (
                <p className="text-xs text-red-500">
                  {errors.region_id.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Sub Location</FieldLabel>
              <Input
                id="address"
                type="text"
                {...register("address", {
                  required: "Sub location is required",
                })}
              />

              {errors.address && (
                <FieldError>{errors.address.message}</FieldError>
              )}
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                id="phone"
                type="text"
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon size={16} />
                  ) : (
                    <EyeOffIcon size={16} />
                  )}
                </span>
              </div>

              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <Input
                  id="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="******"
                  {...register("password_confirmation", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      (value ?? "").trim() === getValues("password").trim() ||
                      "Passwords do not match.",
                  })}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeIcon size={16} />
                  ) : (
                    <EyeOffIcon size={16} />
                  )}
                </span>
              </div>

              {errors.password_confirmation && (
                <FieldError>{errors.password_confirmation.message}</FieldError>
              )}
            </Field>
          </div>

          <FieldGroup>
            <Field orientation="horizontal">
              <Controller
                name="terms"
                control={control}
                rules={{
                  required: "You must accept Terms and Conditions",
                }}
                render={({ field }) => (
                  <Checkbox
                    id="terms-checkbox-2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-Blue "
                  />
                )}
              />

              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-2">
                  By clicking this checkbox, you will Agree to Our{" "}
                  <a href="#" className="text-Orange hover:underline">
                    Terms and Conditions.
                  </a>
                </FieldLabel>
                {errors.terms && (
                  <FieldError>{errors.terms.message}</FieldError>
                )}
              </FieldContent>
            </Field>

            <Button
              type="submit"
              disabled={isPending || !acceptedTerms}
              className="bg-Blue hover:bg-blue-800"
            >
              {isPending ? "Registering in..." : "Register"}
            </Button>
          </FieldGroup>

          <FieldSeparator>Or</FieldSeparator>

          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-Blue hover:text-blue-600">
              Login
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>

      <SuccessRegisterModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}
