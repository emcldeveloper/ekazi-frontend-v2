import { useEffect, useState } from "react";
import { Loader, PencilLine } from "lucide-react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { getErrorMessage } from "@/utils/axios-helpers";
import { useTools } from "@/hooks/universals";
import { useSaveTools } from "@/hooks/profile";

interface ToolOption {
  value: number | string;
  label: string;
}

interface ToolsFormValues {
  tools: ToolOption[];
}

interface AddToolsModalProps {
  toolsList: any;
}

const AddToolsModal = ({ toolsList }: AddToolsModalProps) => {
  const [toolSearch, setToolSearch] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ToolsFormValues>();

  const { mutate: saveTools, isPending } = useSaveTools();

  const { data: toolsData } = useTools({ search: toolSearch });
  const toolOptions =
    toolsData?.map((item: any) => ({
      value: item.id,
      label: item.tool_name,
    })) ?? [];

  useEffect(() => {
    if (!toolsList) return;

    const mapped = toolsList
      .filter((item: any) => item.tool?.id != null)
      .map((item: any) => ({
        value: item.tool.id,
        label: item.tool.name,
      }));

    reset({ tools: mapped });
  }, [toolsList, reset]);

  const onSubmit = (data: ToolsFormValues) => {
    const payload = {
      tools: data.tools.map((k: { label: string }) => k.label),
    };

    saveTools(payload, {
      onSuccess: (res) => {
        toast.success(res?.success || "Tools saved successfully");
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
          <DialogTitle>Tools & Technologies</DialogTitle>
        </DialogHeader>

        <form id="tools-form" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel>Tools *</FieldLabel>
            <Controller
              name="tools"
              control={control}
              rules={{
                validate: (value) =>
                  value?.length > 0 || "Please select at least one tool",
              }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={toolOptions}
                  isMulti
                  isSearchable
                  isClearable
                  placeholder="Select or create tools..."
                  value={field.value}
                  onChange={(selected) => field.onChange(selected ?? [])}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  onInputChange={(inputValue) => {
                    setToolSearch(inputValue);
                  }}
                />
              )}
            />

            {errors.tools && (
              <p className="text-sm text-red-500">{errors.tools.message}</p>
            )}
          </Field>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" disabled={isPending} form="tools-form">
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

export default AddToolsModal;
