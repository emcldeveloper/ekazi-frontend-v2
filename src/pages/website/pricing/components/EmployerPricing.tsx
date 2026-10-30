import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Check,
  Crown,
  Rocket,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Plan = {
  id: number;
  title: string;
  type: string;
  icon: LucideIcon;
  popular: boolean;
  price: string;
  subtitle: string;
  button: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: 1,
    title: "Basic",
    type: "basic",
    icon: Rocket,
    popular: false,
    price: "100,000",
    subtitle: "For small businesses and startups",
    button: "Get Started",
    features: [
      "Access to job seeker resumes",
      "Basic employer dashboard",
      "Job post analytics (views, applications)",
      "Post up to 10 job listings per month",
    ],
  },
  {
    id: 2,
    title: "Standard",
    type: "standard",
    icon: Sparkles,
    popular: true,
    price: "150,000",
    subtitle: "For medium-sized businesses",
    button: "Get Started",
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
    title: "Premium",
    type: "premium",
    icon: Crown,
    popular: false,
    price: "300,000",
    subtitle: "For large corporations",
    button: "Get Started",
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
    title: "Enterprise",
    type: "enterprise",
    icon: Building2,
    popular: false,
    price: "500,000",
    subtitle: "For enterprise companies",
    button: "Get Started",
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
    <div className="grid gap-8 pt-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6 xl:items-center">
      {plans.map((plan) => {
        const Icon = plan.icon;
        const featured = plan.popular;

        return (
          <div
            key={plan.id}
            className={`group relative flex h-full flex-col rounded-3xl bg-white p-7 text-left text-gray-900 transition-all duration-300 ${
              featured
                ? "ring-2 ring-Blue shadow-2xl shadow-Blue/20 xl:-my-4 xl:py-11"
                : "ring-1 ring-gray-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-Blue/10 hover:ring-Blue/30"
            }`}
          >
            {/* Popular badge */}
            {featured && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-Orange px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-Orange/40">
                <Sparkles className="h-3.5 w-3.5" />
                Most Popular
              </span>
            )}

            <div className="relative flex flex-1 flex-col">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    featured
                      ? "bg-Blue/10 text-Blue"
                      : "bg-Orange/10 text-Orange"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{plan.title}</h3>
              </div>

              <p className="mt-3 text-sm text-gray-500">{plan.subtitle}</p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-gray-500">TZS</span>
                <span className="text-2xl md:3xl font-bold tracking-tight">
                  {plan.price}
                </span>
              </div>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-gray-100" />

              {/* Features */}
              <ul className="flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        featured
                          ? "bg-Orange text-white"
                          : "bg-Blue/10 text-Blue"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() =>
                  (window.location.href = `https://recruitment.ekazi.co.tz/register?plan=${plan.id}`)
                }
                className={`group/btn mt-8 h-12 w-full rounded-full text-base font-semibold transition-all duration-300 ${
                  featured
                    ? "bg-Orange text-white shadow-lg shadow-Orange/30 hover:bg-Orange hover:brightness-110"
                    : "bg-Blue/10 text-Blue hover:bg-Blue hover:text-white"
                }`}
              >
                {plan.button}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployerPricing;

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Check } from "lucide-react";

// const plans = [
//   {
//     id: 1,
//     title: "Basic Plan",
//     type: "basic",
//     popular: false,
//     price: "100,000",
//     subtitle: "Small Businesses and Startups",
//     button: "Upgrade to Basic",
//     features: [
//       "Access to job seeker resumes",
//       "Basic employer dashboard",
//       "Job post analytics (views, applications)",
//       "Post up to 10 job listings per month",
//     ],
//   },
//   {
//     id: 2,
//     title: "Standard Plan",
//     type: "standard",
//     popular: true,
//     price: "150,000",
//     subtitle: "Medium-sized businesses",
//     button: "Upgrade to Standard",
//     features: [
//       "Post up to 50 job listings per month",
//       "Advanced resume search & filters",
//       "Applicant tracking system (ATS)",
//       "Email alerts for applicants",
//       "Job post analytics",
//     ],
//   },
//   {
//     id: 3,
//     title: "Premium Plan",
//     type: "premium",
//     popular: false,
//     price: "300,000",
//     subtitle: "Large corporations",
//     button: "Upgrade to Premium",
//     features: [
//       "Top-tier resume database",
//       "Advanced candidate matching",
//       "Comprehensive analytics",
//       "Custom recruitment tools",
//       "Dedicated account manager",
//       "Email alerts for applicants",
//       "Premium job listing placement",
//       "Unlimited job postings",
//     ],
//   },
//   {
//     id: 4,
//     title: "Enterprise Plan",
//     type: "enterprise",
//     popular: false,
//     price: "500,000",
//     subtitle: "Enterprise companies",
//     button: "Upgrade to Enterprise",
//     features: [
//       "Advanced analytics & reporting",
//       "API access & integrations",
//       "Custom branding & white-label",
//       "Dedicated support team",
//       "Tailored recruitment solutions",
//       "Full job portal feature access",
//     ],
//   },
// ];

// const EmployerPricing = () => {
//   return (
//     <div className="grid gap-4 lg:grid-cols-4">
//       {plans.map((plan) => (
//         <div
//           key={plan.title}
//           className={`flex flex-col text-start rounded-3xl bg-white p-6 shadow-sm ${
//             plan.popular
//               ? "border-Blue-600 ring-2 ring-Blue"
//               : "border border-gray-200"
//           }`}
//         >
//           {plan.popular && (
//             <Badge className="bg-Blue text-white">Most Popular</Badge>
//           )}

//           <h3 className="mt-4 text-xl font-bold">{plan.title}</h3>
//           <p className="mt-2 text-3xl font-bold text-Blue">{plan.price}</p>

//           <div className="my-8 space-y-4">
//             {plan.features.map((feature) => (
//               <div key={feature} className="flex items-center gap-3 text-sm">
//                 <Check size={16} className="text-blue-500" />
//                 <span>{feature}</span>
//               </div>
//             ))}
//           </div>

//           <Button
//             onClick={() =>
//               (window.location.href = `https://recruitment.ekazi.co.tz/register?plan=${plan.id}`)
//             }
//             variant={plan.popular ? "default" : "outline"}
//             className={`mt-auto w-full ${plan.popular ? "bg-Blue text-white hover:bg-blue-600" : ""}`}
//           >
//             Get Started
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EmployerPricing;
