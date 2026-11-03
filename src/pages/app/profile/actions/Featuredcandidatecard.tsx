import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Crown, Sparkles } from "lucide-react";

// Replace with plans from your API if they are dynamic.
const PLANS = [
  { id: "monthly", label: "1 month", price: "TZS 10,000", note: "" },
  { id: "quarterly", label: "3 months", price: "TZS 25,000", note: "Save 17%" },
  { id: "yearly", label: "12 months", price: "TZS 90,000", note: "Best value" },
];

const BENEFITS = [
  "Top placement in employer candidate searches",
  "Featured badge on your public profile",
  "Shown on the homepage featured candidates list",
  "Priority alerts to recruiters in your field",
];

type Props = {
  applicant: any;
  onSubscribe?: (planId: string) => Promise<void> | void;
};

const FeaturedCandidateCard = ({ applicant, onSubscribe }: Props) => {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState(PLANS[1].id);
  const [submitting, setSubmitting] = useState(false);

  // Adjust to your applicant model.
  const isFeatured = Boolean(applicant?.is_featured);
  const featuredUntil = applicant?.featured_until
    ? new Date(applicant.featured_until).toLocaleDateString()
    : null;

  const handleSubscribe = async () => {
    try {
      setSubmitting(true);
      await onSubscribe?.(plan);
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (isFeatured) {
    return (
      <Card className="border-amber-300/60 bg-amber-50/60 dark:bg-amber-950/20">
        <CardContent className="flex items-start gap-3">
          <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/50">
            <Crown className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Featured candidate</p>
              <Badge variant="secondary">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {featuredUntil
                ? `Your profile is featured until ${featuredUntil}.`
                : "Your profile is featured to employers."}
            </p>
            <Button
              variant="link"
              className="h-auto p-0 text-sm"
              onClick={() => setOpen(true)}
            >
              Extend subscription
            </Button>
          </div>
        </CardContent>
        {renderDialog()}
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <Sparkles className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 opacity-15" />
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            <p className="font-semibold">Become a featured candidate</p>
          </div>
          <p className="text-sm opacity-90">
            Stand out to employers and get discovered faster.
          </p>
        </div>

        <ul className="space-y-1.5 text-sm">
          {BENEFITS.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="opacity-95">{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm">
            From <span className="font-semibold">{PLANS[0].price}</span>/month
          </p>
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Subscribe
          </Button>
        </div>
      </CardContent>
      {renderDialog()}
    </Card>
  );

  function renderDialog() {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Featured candidate
            </DialogTitle>
            <DialogDescription>
              Choose how long you want to be featured.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2" role="radiogroup">
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={plan === p.id}
                onClick={() => setPlan(p.id)}
                className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                  plan === p.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:bg-muted/60"
                }`}
              >
                <div>
                  <p className="font-medium">{p.label}</p>
                  {p.note && (
                    <p className="text-xs text-emerald-600">{p.note}</p>
                  )}
                </div>
                <p className="font-semibold">{p.price}</p>
              </button>
            ))}
          </div>

          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {b}
              </li>
            ))}
          </ul>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubscribe} disabled={submitting}>
              {submitting ? "Processing…" : "Continue to payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default FeaturedCandidateCard;
