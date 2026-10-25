import { useState } from "react";
import { StarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import type { RateEmployerPayload } from "@/@types/employers";
import { useRateEmployer } from "@/hooks/employers";
import { getErrorMessage } from "@/utils/axios-helpers";

interface RateModalProps {
  clientId: number;
}

const RateModal = ({ clientId }: RateModalProps) => {
  const [rating, setRating] = useState(0);

  const { register, handleSubmit, reset } = useForm<RateEmployerPayload>();

  const { mutate: rateEmployer, isPending } = useRateEmployer();

  const onSubmit = (data: RateEmployerPayload) => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    const payload = {
      ...data,
      rating,
      client_id: clientId,
    };

    rateEmployer(payload, {
      onSuccess: (res) => {
        toast.success(res?.message ?? "Rate succesful");
        reset();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Rate</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
        </DialogHeader>

        <form id="rate-employer-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Your Rating</FieldLabel>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((val: number) => (
                  <Button
                    key={val}
                    type="button"
                    variant="ghost"
                    onClick={() => setRating(val)}
                  >
                    <StarIcon
                      className={`w-6 h-6 ${
                        rating >= val
                          ? "fill-orange-500 text-orange-500"
                          : "text-gray-300"
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </Field>

            <Field>
              <FieldLabel>Comment</FieldLabel>
              <Textarea
                {...register("comment")}
                placeholder="Enter your feedback..."
              />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter className="flex justify-between gap-2">
          <Button type="submit" form="rate-employer-form" disabled={isPending}>
            {isPending ? "Submiting" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RateModal;
