import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function PaymentModal({
  open,
  onClose,
  plan,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  plan: { name: string; price: string | number; period: string } | null;
  onSuccess?: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!phone) {
      alert("Please enter phone number");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/subscribe", {
        plan: plan?.name,
        phone,
      });

      alert("Payment request sent. Check your phone 📱");
      onSuccess?.();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Subscribe to {plan.name}
          </DialogTitle>
          <DialogDescription>
            Complete your payment using mobile money
          </DialogDescription>
        </DialogHeader>

        {/* Plan Info */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-1">
          <p className="text-sm text-gray-500">Plan</p>
          <p className="font-medium">{plan.name}</p>

          <p className="text-sm text-gray-500 mt-2">Price</p>
          <p className="text-lg font-bold text-blue-600">
            {plan.price} Tsh {plan.period}
          </p>
        </div>

        {/* Phone Input */}
        <div className="space-y-2 mt-4">
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            placeholder="2557XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            onClick={handlePayment}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
