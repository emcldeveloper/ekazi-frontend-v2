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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { getErrorMessage } from "@/utils/axios-helpers";
import { useSaveSkill } from "@/hooks/profile";
import { useKnowledges } from "@/hooks/universals";
import { Loader, PencilLine } from "lucide-react";

interface SkillOption {
  value: number | string;
  label: string;
}

interface SkillsFormValues {
  knowledge: SkillOption[];
}

interface AddSkillsModalProps {
  skills: any;
}

const AddSkillsModal = ({ skills }: AddSkillsModalProps) => {
  const [knowledgeSearch, setKnowledgeSearch] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillsFormValues>();

  const { mutate: saveSkills, isPending } = useSaveSkill();

  const { data: knowledges } = useKnowledges({ search: knowledgeSearch });
  const knowledgeOptions =
    knowledges?.map((level: any) => ({
      value: level.id,
      label: level.name,
    })) ?? [];

  useEffect(() => {
    if (!skills) return;

    const mapped = skills
      .filter((item: any) => item.knowledge?.id != null)
      .map((item: any) => ({
        value: item.knowledge.id,
        label: item.knowledge.name,
      }));

    reset({ knowledge: mapped });
  }, [skills, reset]);

  const onSubmit = (data: SkillsFormValues) => {
    const payload = {
      knowledge: data.knowledge.map((k: { label: string }) => k.label),
    };

    saveSkills(payload, {
      onSuccess: (res) => {
        toast.success(res?.success || "Skills saved successfully");
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
          <DialogTitle>Key Skills & Competencies</DialogTitle>
          <DialogDescription>
            Add your key skills and strengths relevant to your career.
          </DialogDescription>
        </DialogHeader>

        <form id="skills-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Skills *</FieldLabel>
              <Controller
                name="knowledge"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length > 0 || "Please select at least one skill",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    placeholder="Select or create skills..."
                    isMulti
                    isSearchable
                    isClearable
                    options={knowledgeOptions}
                    onInputChange={(inputValue) => {
                      setKnowledgeSearch(inputValue);
                    }}
                    value={field.value}
                    onChange={(selected) => {
                      field.onChange(selected ? selected : []);
                    }}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                )}
              />
              {errors.knowledge && (
                <FieldError>{errors.knowledge.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" disabled={isPending} form="skills-form">
            {isPending ? (
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

export default AddSkillsModal;
