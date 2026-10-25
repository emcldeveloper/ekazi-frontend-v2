import { useEffect, useState } from "react";
import SearchSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  useColleges,
  useCourses,
  useEducationLevels,
  useMajors,
} from "@/hooks/universals";
import type {
  College,
  Course,
  EducationLevel,
  Major,
  OptionType,
} from "@/@types/universals";
import type { EducationPayload } from "@/@types/profile/profile";
import { useCreateEducation, useUpdateEducation } from "@/hooks/profile";
import { getErrorMessage } from "@/utils/axios-helpers";

interface EducationFormProps {
  education?: any;
  onLoadingChange?: (loading: boolean) => void;
}

const EducationForm = ({ education, onLoadingChange }: EducationFormProps) => {
  const [collegeSearch, setCollegeSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [majorSearch, setMajorSearch] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<EducationPayload>();

  const { mutate: saveEducation, isPending: isCreating } = useCreateEducation();

  const { mutate: updateEducation, isPending: isUpdating } =
    useUpdateEducation();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  const { data: courses } = useCourses({ search: courseSearch });
  const { data: majors } = useMajors({ search: majorSearch });
  const { data: colleges } = useColleges({ search: collegeSearch });

  // Build options from the record being edited
  const selectedCollege = education?.college
    ? { value: education.college.id, label: education.college.name }
    : null;
  const selectedCourse = education?.course_id
    ? { value: education.course_id.id, label: education.course_id.name }
    : null;
  const selectedMajor = education?.major_id
    ? { value: education.major_id.id, label: education.major_id.name }
    : null;

  // Merge helper: adds the selected option if the API list doesn't contain it
  const withSelected = (
    options: OptionType[],
    selected: OptionType | null,
  ): OptionType[] =>
    selected && !options.some((o) => o.value === selected.value)
      ? [selected, ...options]
      : options;

  const collegeOptions = withSelected(
    colleges?.map((c: College) => ({ value: c.id, label: c.college_name })) ??
      [],
    selectedCollege,
  );
  const courseOptions = withSelected(
    courses?.map((c: Course) => ({ value: c.id, label: c.name })) ?? [],
    selectedCourse,
  );
  const majorOptions = withSelected(
    majors?.map((m: Major) => ({ value: m.id, label: m.name })) ?? [],
    selectedMajor,
  );

  const { data: educationLevels } = useEducationLevels();
  const educationLevelOptions =
    educationLevels?.map((education_level_id: EducationLevel) => ({
      value: education_level_id.id,
      label: education_level_id.education_level,
    })) ?? [];

  useEffect(() => {
    if (education) {
      reset({
        education_level_id: education.education_level?.id,
        college_id: education.college?.id,
        course_id: education.course_id?.id,
        major_id: education.major_id?.id,
        started: education.started,
        ended: education.ended,
      });
    }
  }, [education, reset]);

  const onSubmit = (data: EducationPayload) => {
    const formData = new FormData();

    // Append regular fields
    formData.append("education_level_id", String(data.education_level_id));
    formData.append("college_id", String(data.college_id));
    formData.append("course_id", String(data.course_id));
    formData.append("major_id", String(data.major_id));
    formData.append("started", String(data.started));
    formData.append("ended", String(data.ended));

    // Append the actual certificate file
    const attachment = data.attachment as unknown as FileList | undefined;

    if (attachment && attachment.length > 0) {
      formData.append("attachment", attachment[0]);
    }

    if (education) {
      updateEducation(
        { id: education?.id, payload: formData },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Education created succesfully");
          },
          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        },
      );
    } else {
      saveEducation(formData, {
        onSuccess: (res) => {
          toast.success(res?.message || "Education created succesfully");
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      });
    }
  };

  return (
    <form
      id="education-form"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      {/* Level */}
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field>
          <FieldLabel>Level *</FieldLabel>
          <Controller
            name="education_level_id"
            control={control}
            rules={{
              required: "Level is required",
            }}
            render={({ field }) => (
              <SearchSelect
                {...field}
                isClearable
                className="text-sm"
                placeholder="E.g diploma, bachelors etc"
                options={educationLevelOptions}
                value={educationLevelOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
              />
            )}
          />
          {errors.education_level_id && (
            <FieldError>{errors.education_level_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Institution *</FieldLabel>
          <Controller
            name="college_id"
            control={control}
            rules={{ required: "College is required" }}
            render={({ field }) => (
              <CreatableSelect
                className="text-sm"
                placeholder="Eg. university, college, school etc."
                {...field}
                options={collegeOptions}
                value={collegeOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
                onInputChange={(inputValue) => {
                  setCollegeSearch(inputValue);
                }}
              />
            )}
          />
          {errors.college_id && (
            <FieldError>{errors.college_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Course/Subject *</FieldLabel>
          <Controller
            name="course_id"
            control={control}
            rules={{ required: "Course is required" }}
            render={({ field }) => (
              <CreatableSelect
                className="text-sm"
                placeholder="Eg. Business Administration etc."
                {...field}
                options={courseOptions}
                value={courseOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
                onInputChange={(inputValue) => {
                  setCourseSearch(inputValue);
                }}
              />
            )}
          />
          {errors.course_id && (
            <FieldError>{errors.course_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Specialized In</FieldLabel>
          <Controller
            name="major_id"
            control={control}
            rules={{ required: "Major is required" }}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                options={majorOptions}
                value={majorOptions.find(
                  (option: OptionType) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value ?? null)}
                onInputChange={(inputValue) => {
                  setMajorSearch(inputValue);
                }}
              />
            )}
          />
          {errors.major_id && (
            <FieldError>{errors.major_id.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Started *</FieldLabel>
          <Input
            type="date"
            {...register("started", {
              required: "Started date is required",
            })}
            className="md:col-span-3"
          />
          {errors.started && <FieldError>{errors.started.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Ended *</FieldLabel>
          <Input
            type="date"
            {...register("ended", {
              required: "Finish date is required",
            })}
            className="md:col-span-3"
          />
          {errors.ended && <FieldError>{errors.ended.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Certificate *</FieldLabel>
          <Input
            type="file"
            accept=".pdf"
            {...register("attachment", {
              required: education?.id ? false : "Certificate is required",
              validate: (files) => {
                if (!files) return true;
                if (files instanceof FileList && files.length === 0)
                  return true;

                const file = files instanceof FileList ? files[0] : files;
                const maxSize = 10 * 1024 * 1024;

                if (file.size > maxSize) {
                  return "Max file size is 10MB";
                }

                return true;
              },
            })}
          />

          {errors.attachment && (
            <FieldError>{errors.attachment.message}</FieldError>
          )}

          {education && (
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to keep existing certificate
            </p>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default EducationForm;
