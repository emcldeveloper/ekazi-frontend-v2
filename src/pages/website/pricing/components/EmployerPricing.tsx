import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    id: 1,
    title: "Basic Plan",
    type: "basic",
    popular: false,
    price: "100,000",
    subtitle: "Small Businesses and Startups",
    button: "Upgrade to Basic",
    features: [
      "Access to job seeker resumes",
      "Basic employer dashboard",
      "Job post analytics (views, applications)",
      "Post up to 10 job listings per month",
    ],
  },
  {
    id: 2,
    title: "Standard Plan",
    type: "standard",
    popular: true,
    price: "150,000",
    subtitle: "Medium-sized businesses",
    button: "Upgrade to Standard",
    features: [
      "Post up to 50 job listings per month",
      "Advanced resume search & filters",
      "Applicant tracking system (ATS)",
      "Email alerts for applicants",
      "Job post analytics",
    ],
  },
  {
    id: 3,
    title: "Premium Plan",
    type: "premium",
    popular: false,
    price: "300,000",
    subtitle: "Large corporations",
    button: "Upgrade to Premium",
    features: [
      "Top-tier resume database",
      "Advanced candidate matching",
      "Comprehensive analytics",
      "Custom recruitment tools",
      "Dedicated account manager",
      "Email alerts for applicants",
      "Premium job listing placement",
      "Unlimited job postings",
    ],
  },
  {
    id: 4,
    title: "Enterprise Plan",
    type: "enterprise",
    popular: false,
    price: "500,000",
    subtitle: "Enterprise companies",
    button: "Upgrade to Enterprise",
    features: [
      "Advanced analytics & reporting",
      "API access & integrations",
      "Custom branding & white-label",
      "Dedicated support team",
      "Tailored recruitment solutions",
      "Full job portal feature access",
    ],
  },
];

const EmployerPricing = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {plans.map((plan) => (
        <div
          key={plan.title}
          className={`flex flex-col text-start rounded-3xl bg-white p-6 shadow-sm ${
            plan.popular
              ? "border-Blue-600 ring-2 ring-Blue"
              : "border border-gray-200"
          }`}
        >
          {plan.popular && (
            <Badge className="bg-Blue text-white">Most Popular</Badge>
          )}

          <h3 className="mt-4 text-xl font-bold">{plan.title}</h3>
          <p className="mt-2 text-3xl font-bold text-Blue">{plan.price}</p>

          <div className="my-8 space-y-4">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-blue-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() =>
              (window.location.href = `https://recruitment.ekazi.co.tz/register?plan=${plan.id}`)
            }
            variant={plan.popular ? "default" : "outline"}
            className={`mt-auto w-full ${plan.popular ? "bg-Blue text-white hover:bg-blue-600" : ""}`}
          >
            Get Started
          </Button>
        </div>
      ))}
    </div>
  );
};

export default EmployerPricing;
