import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SearchSelect from "react-select";
import CreatableSelect from "react-select/creatable";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  useCountries,
  useCompanies,
  useIndustries,
  usePositions,
  usePositionLevel,
  useRegions,
  useSalaryRanges,
  useExperienceType,
} from "@/hooks/universals";

import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import type { ExperiencePayload } from "@/@types/profile/profile";
import type {
  Company,
  Country,
  ExperienceType,
  Industry,
  OptionType,
  Position,
  PositionLevel,
  Region,
  SalaryRange,
} from "@/@types/universals";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import RichTextEditor from "@/components/rich-text-editor";
import { useCreateExperience, useUpdateExperience } from "@/hooks/profile";

interface ExperienceFormProps {
  experience?: any;
}

const ExperienceForm = ({ experience }: ExperienceFormProps) => {
  const [employerSearch, setEmployerSearch] = useState("");
  const [positionSearch, setPositionSearch] = useState("");
  const [industrySearch] = useState("");
  const [currentRole, setCurrentRole] = useState(() => !experience?.end_date);

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ExperiencePayload>();

  const { mutate: createExperience, isPending: isCreating } =
    useCreateExperience();

  const { mutate: updateExperience, isPending: isUpdating } =
    useUpdateExperience();

  const isLoading = isCreating || isUpdating;

  /* ---------------- Master data ---------------- */
  const { data: employers } = useCompanies({ search: employerSearch });
  const employerOptions =
    employers?.map((employer: Company) => ({
      value: employer.id,
      label: employer.name,
    })) ?? [];

  const { data: countries } = useCountries({});
  const countryOptions =
    countries?.map((country: Country) => ({
      value: country.id,
      label: country.name,
    })) ?? [];

  const { data: regions } = useRegions({});
  const regionOptions =
    regions?.map((region: Region) => ({
      value: region.id,
      label: region.name,
    })) ?? [];

  const { data: positions } = usePositions({ search: positionSearch });
  const positionOptions =
    positions?.map((position: Position) => ({
      value: position.id,
      label: position.name,
    })) ?? [];

  const { data: industries } = useIndustries({ search: industrySearch });
  const industryOptions =
    industries?.map((industry: Industry) => ({
      value: industry.id,
      label: industry.name,
    })) ?? [];

  const { data: positionLevels } = usePositionLevel();
  const levelsOptions =
    positionLevels?.map((level: PositionLevel) => ({
      value: level.id,
      label: level.name,
    })) ?? [];

  const { data: salaryRanges } = useSalaryRanges();
  const rangesOptions =
    salaryRanges?.map((range: SalaryRange) => ({
      value: range.id,
      label: range.low,
    })) ?? [];

  const { data: experienceTypes } = useExperienceType();
  const typesOptions =
    experienceTypes?.map((type: ExperienceType) => ({
      value: type.id,
      label: type.name,
    })) ?? [];

  useEffect(() => {
    setCurrentRole(!experience?.end_date);
  }, [experience?.id, experience?.end_date]);

  // Pre fill
  useEffect(() => {
    if (!experience) return;

    reset({
      experience_type_id: experience?.experience_type_id,
      applicant_employer_id: experience?.applicant_employer_id,
      country_id: experience?.country_id,
      region_id: experience?.region_id,
      sub_location: experience?.sub_location,
      position_id: experience?.position_id,
      position_level_id: experience?.position_level_id,
      industry_id: experience?.industry_id,
      start_date: experience?.start_date,
      end_date: experience?.end_date,
      start_salary_id: experience?.start_salary_id,
      end_salary_id: experience?.end_salary_id,
      responsibility: experience?.responsibility,
      remark: experience?.remark,
    });
  }, [experience, reset]);

  /* ---------------- Submit ---------------- */
  const onSubmit = (data: ExperiencePayload) => {
    const payload = {
      ...data,
      ended: currentRole ? null : data.end_date,
    };

    if (experience) {
      updateExperience(
        { id: experience?.id, payload },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Experience updated");
            reset();
          },
          onError: (err) => {
            toast.error(getErrorMessage(err));
          },
        },
      );
    } else {
      createExperience(payload, {
        onSuccess: (res) => {
          toast.success(res?.message || "Experience added successfully");
          reset();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Experience type + Employer */}
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
          <Field>
            <FieldLabel>Experience Type *</FieldLabel>
            <Controller
              name="experience_type_id"
              control={control}
              rules={{
                required: "Experience is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={typesOptions}
                  value={typesOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.experience_type_id && (
              <FieldError>{errors.experience_type_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Employer *</FieldLabel>
            <Controller
              name="applicant_employer_id"
              control={control}
              rules={{ required: "Employer is required" }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={employerOptions}
                  onInputChange={(inputValue) => {
                    setEmployerSearch(inputValue);
                  }}
                  isClearable
                />
              )}
            />
            {errors.applicant_employer_id && (
              <FieldError>{errors.applicant_employer_id.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        {/* Location */}
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
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
              <FieldError>{errors.country_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Region *</FieldLabel>
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
                  options={regionOptions}
                  value={regionOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
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
              placeholder="Sub location"
              {...register("sub_location", {
                required: "Sub location is required",
              })}
            />
            {errors.sub_location && (
              <FieldError>{errors.sub_location.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        {/* Position */}
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
          <Field>
            <FieldLabel>Position *</FieldLabel>
            <Controller
              name="position_id"
              control={control}
              rules={{ required: "Position is required" }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={positionOptions}
                  onInputChange={(inputValue) => {
                    setPositionSearch(inputValue);
                  }}
                  isClearable
                />
              )}
            />
            {errors.position_id && (
              <FieldError>{errors.position_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Position Level *</FieldLabel>
            <Controller
              name="position_level_id"
              control={control}
              rules={{
                required: "Level is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={levelsOptions}
                  value={levelsOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.position_level_id && (
              <FieldError>{errors.position_level_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Industry *</FieldLabel>
            <Controller
              name="industry_id"
              control={control}
              rules={{
                required: "Industry is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={industryOptions}
                  value={industryOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.industry_id && (
              <FieldError>{errors.industry_id.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        {/* Dates */}
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
          <Field>
            <FieldLabel>Start Date *</FieldLabel>
            <Input
              type="date"
              {...register("start_date", { required: "Date is required" })}
            />
            {errors.start_date && (
              <FieldError>{errors.start_date.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>End Date *</FieldLabel>
            <Input
              type="date"
              disabled={currentRole}
              {...register("end_date")}
            />
          </Field>

          <Field orientation="horizontal">
            <Checkbox
              checked={currentRole}
              onCheckedChange={() => setCurrentRole((v) => !v)}
            />
            <FieldLabel className="text-sm">
              I am currently working in this role
            </FieldLabel>
          </Field>
        </FieldGroup>

        <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
          <Field>
            <FieldLabel>Start Salary Range *</FieldLabel>
            <Controller
              name="start_salary_id"
              control={control}
              rules={{
                required: "Salary is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={rangesOptions}
                  value={rangesOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.start_salary_id && (
              <FieldError>{errors.start_salary_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>End Salary Range *</FieldLabel>
            <Controller
              name="end_salary_id"
              control={control}
              rules={{
                required: "Salary is required",
              }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  isClearable
                  options={rangesOptions}
                  value={rangesOptions.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                />
              )}
            />
            {errors.end_salary_id && (
              <FieldError>{errors.end_salary_id.message}</FieldError>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <FieldLabel>Responsibilities</FieldLabel>

            <Controller
              name="responsibility"
              control={control}
              rules={{ required: "Responsibilities are required" }}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />

            {errors.responsibility && (
              <FieldError>{errors.responsibility.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Reasons for leaving *</FieldLabel>
            <Textarea
              rows={3}
              placeholder="Reason for Leaving"
              {...register("remark", { required: "Remarks are required" })}
            />
            {errors.remark && <FieldError>{errors.remark.message}</FieldError>}
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-Blue text-white hover:bg-blue-900"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default ExperienceForm;
