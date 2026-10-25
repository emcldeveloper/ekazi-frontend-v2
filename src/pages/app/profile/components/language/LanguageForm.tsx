import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import SearchSelect from "react-select";

import { FieldLabel } from "@/components/ui/field";

import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";
import {
  useCreateLanguage,
  useLanguageRead,
  useLanguages,
  useLanguageSpeak,
  useLanguageUnderstand,
  useLanguageWrite,
  useUpdateLanguage,
} from "@/hooks/profile";
import type { Language, OptionType, SkillLevel } from "@/@types/universals";
import type { LanguagePayload } from "@/@types/profile/profile";

interface LanguageFormProps {
  language?: any;
  onLoadingChange?: (loading: boolean) => void;
}

const LanguageForm = ({ language, onLoadingChange }: LanguageFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LanguagePayload>();

  const { mutate: createLanguage, isPending: isCreating } = useCreateLanguage();

  const { mutate: updateLanguage, isPending: isUpdating } = useUpdateLanguage();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  const { data: languages } = useLanguages();
  const languageOptions =
    languages?.map((language: Language) => ({
      value: language.id,
      label: language.language_name,
    })) ?? [];

  const { data: reads } = useLanguageRead();
  const readOptions =
    reads?.map((read: SkillLevel) => ({
      value: read.id,
      label: read.name,
    })) ?? [];

  const { data: writes } = useLanguageWrite();
  const writeOptions =
    writes?.map((write: SkillLevel) => ({
      value: write.id,
      label: write.name,
    })) ?? [];

  const { data: speaks } = useLanguageSpeak();
  const speakOptions =
    speaks?.map((speak: SkillLevel) => ({
      value: speak.id,
      label: speak.name,
    })) ?? [];

  const { data: understands } = useLanguageUnderstand();
  const understandOptions =
    understands?.map((understand: SkillLevel) => ({
      value: understand.id,
      label: understand.name,
    })) ?? [];

  useEffect(() => {
    if (!language) {
      return;
    }

    reset({
      language_id: language.language?.id,
      read_id: language.read?.id,
      write_id: language.write?.id,
      speak_id: language.speak?.id,
      understand_id: language.understand?.id,
    });
  }, [language, reset]);

  const onSubmit = (data: LanguagePayload) => {
    if (language) {
      updateLanguage(
        { id: language?.id, payload: data },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Language updated");
            reset();
          },
          onError: (err) => {
            toast.error(getErrorMessage(err));
          },
        },
      );
    } else {
      createLanguage(data, {
        onSuccess: (res) => {
          toast.success(res?.message || "Language added successfully");
          reset();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      });
    }
  };

  /* -------------------- Fields Config -------------------- */
  const fields = [
    ["language_id", "Language", languageOptions],
    ["read_id", "Read", readOptions],
    ["write_id", "Write", writeOptions],
    ["speak_id", "Speak", speakOptions],
    ["understand_id", "Understand", understandOptions],
  ] as const;

  return (
    <form
      id="language-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {fields.map(([name, label, options]) => (
        <div key={name} className="grid md:grid-cols-4 gap-3 items-start">
          <FieldLabel className="md:col-span-1">{label} *</FieldLabel>

          <div className="md:col-span-3">
            <Controller
              name={name}
              control={control}
              rules={{ required: `${label} is required` }}
              render={({ field }) => (
                <SearchSelect
                  {...field}
                  options={options}
                  placeholder={`Select ${label.toLowerCase()}...`}
                  value={options.find(
                    (option: OptionType) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value ?? null)}
                  isSearchable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />

            {errors[name] && (
              <p className="text-sm text-destructive mt-1">
                {errors[name].message}
              </p>
            )}
          </div>
        </div>
      ))}
    </form>
  );
};

export default LanguageForm;
