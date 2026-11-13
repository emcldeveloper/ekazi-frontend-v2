import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useInitiatePayment } from "@/hooks/subscription";
import { getErrorMessage } from "@/utils/axios-helpers";
import { formatCurrency, formatMoney } from "@/utils/helpers";

type PaymentForm = {
  phone: string;
};

interface SubscriptionCheckoutProps {
  plan: any;
}

const SubscriptionCheckout = ({ plan }: SubscriptionCheckoutProps) => {
  const taxRate = 0.18;
  const tax = plan.price * taxRate;
  const subTotal = plan.price - tax;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentForm>({
    defaultValues: {
      phone: "",
    },
  });

  const { mutate: createPayment, isPending } = useInitiatePayment();

  const onSubmit = async (data: PaymentForm) => {
    const payload = {
      plan_id: 3,
      phone: data.phone,
    };

    createPayment(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Subscription payment was succesfully");
        reset();
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
          <Button variant="default" className="w-full">
            Upgrade to featured
          </Button>
        }
      />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Upgrade to Featured</DialogTitle>

          <DialogDescription>
            Complete your subscription securely using Mobile Money.
          </DialogDescription>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  {plan.name}
                  <span className="text-xs text-muted-foreground">
                    {plan.duration} / month
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right">
                {formatCurrency(plan.price)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Subtotal</TableCell>
              <TableCell className="text-right">
                {formatMoney(subTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Tax</TableCell>
              <TableCell className="text-right">{formatMoney(tax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Total</TableCell>
              <TableCell className="text-right">
                {formatMoney(plan.price)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <form id="subscription-payment-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                placeholder="0712345678"
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />
              {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            type="submit"
            form="subscription-payment-form"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Processing...
              </>
            ) : (
              "Pay now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionCheckout;
