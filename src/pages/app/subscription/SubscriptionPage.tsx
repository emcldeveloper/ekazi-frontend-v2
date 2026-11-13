import { Check, Crown, Receipt, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SubscriptionCheckout from "./components/SubscriptionCheckout";

interface Plan {
  id: string;
  name: string;
  /** Price per month in TZS. 0 means free. */
  price: number;
  duration?: number;
  description: string;
  features: string[];
  isRecommended?: boolean;
}

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Paid" | "Failed" | "Refunded";
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Everything you need to start your job search.",
    features: [
      "Browse available jobs",
      "Apply for job opportunities",
      "Create your candidate profile",
      "Manage your applications",
    ],
  },
  {
    id: "featured",
    name: "Featured",
    price: 10000,
    duration: 12,
    description: "For active job seekers applying every week.",
    features: [
      "Everything included in Free",
      "Featured candidate badge",
      "Enhanced profile visibility",
      "Stand out in candidate listings",
      "Greater exposure to employers",
    ],
    isRecommended: true,
  },
];

const SUBSCRIPTION = {
  planId: "free",
  status: "Active" as const,
  /** ISO date the plan renews, or null for the free plan */
  renewsOn: null as string | null,
};

const PAYMENTS: Payment[] = [];

function formatPrice(amount: number): string {
  return `TZS ${amount.toLocaleString("en-US")}`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const SubscriptionPage = () => {
  const currentPlan =
    PLANS.find((plan) => plan.id === SUBSCRIPTION.planId) ?? PLANS[0];

  return (
    <div className="space-y-4">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-Blue">
          Subscription
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          See your plan, what you've used and the options for upgrading.
        </p>
      </header>

      {/* Plans */}
      <section aria-labelledby="plans-heading" className="mt-8">
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => {
            const isCurrent = plan.id === currentPlan.id;

            return (
              <Card
                key={plan.id}
                className={`relative overflow-visible ${
                  plan.isRecommended
                    ? "border border-Blue shadow-xl shadow-blue-900/10"
                    : "border border-slate-200/70"
                }`}
              >
                {plan.isRecommended && (
                  <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    Recommended
                  </span>
                )}
                <CardContent>
                  <div className="flex flex-col text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                        {plan.name}
                      </h3>
                      {plan.id === "premium" && (
                        <Crown
                          className="size-4 text-orange-500"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <p className="mt-1 text-sm">{plan.description}</p>

                    <p className="mt-5">
                      <span className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                        {plan.price === 0 ? "Free" : formatPrice(plan.price)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-sm"> / year</span>
                      )}
                    </p>

                    <ul className="mt-5 space-y-2.5 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      {isCurrent ? (
                        <Button
                          disabled={true}
                          className="w-full bg-emerald-100 text-sm font-semibold text-emerald-700"
                        >
                          <Check className="size-4" aria-hidden="true" />
                          Your current plan
                        </Button>
                      ) : (
                        <SubscriptionCheckout plan={plan} />
                        // <Button
                        //   type="button"
                        //   className={`w-full font-semibold  ${
                        //     isUpgrade
                        //       ? "bg-[#1D4FA3] text-white hover:bg-[#18428A]"
                        //       : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                        //   }`}
                        // >
                        //   {isUpgrade
                        //     ? `Upgrade to ${plan.name}`
                        //     : `Switch to ${plan.name}`}
                        // </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Billing history */}
      <section aria-labelledby="billing-heading" className="mt-8">
        <h2 id="billing-heading" className="text-xl font-bold">
          Billing history
        </h2>

        {PAYMENTS.length === 0 ? (
          <Card className="mt-4 h-full">
            <CardContent>
              <div className="px-6 py-12 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-100 text-primary">
                  <Receipt className="size-6" aria-hidden="true" />
                </span>
                <p className="mt-4 text-base font-semibold">No payments</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your receipts will appear here after you upgrade.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <ul className="mt-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-white">
            {PAYMENTS.map((payment) => (
              <li
                key={payment.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-slate-100 p-4 last:border-b-0 sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {payment.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(payment.date)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    payment.status === "Paid"
                      ? "bg-emerald-50 text-emerald-700"
                      : payment.status === "Failed"
                        ? "bg-red-50 text-red-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {payment.status}
                </span>
                <span className="w-28 text-right font-mono text-sm text-slate-900">
                  {formatPrice(payment.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default SubscriptionPage;
