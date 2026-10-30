import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Crown, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Plan = {
  name: string;
  tagline: string;
  icon: LucideIcon;
  popular: boolean;
  price: string;
  period: string;
  button: string;
  features: string[];
};

const cvPlans: Plan[] = [
  {
    name: "Basic",
    tagline: "Get started and explore the essentials.",
    icon: Zap,
    popular: false,
    price: "3,000",
    period: "12 months",
    button: "Get Basic",
    features: [
      "Browse all CV templates",
      "Select from 5 templates from the library",
      "Download up to 3 CVs (watermarked)",
      "Pay 1,000 TZS per single CV download without watermark",
      "Pay 3,000 TZS per premium template download",
    ],
  },
  {
    name: "Standard",
    tagline: "Everything you need to stand out to employers.",
    icon: Sparkles,
    popular: true,
    price: "17,500",
    period: "12 months",
    button: "Get Standard",
    features: [
      "Browse all CV templates",
      "Select any template from the library",
      "Up to 20 watermark-free downloads",
      "5 premium templates download",
      "Featured candidate",
      "Application tracking and pipeline insights",
      "Dashboard insights and analytics",
    ],
  },
  {
    name: "Premium",
    tagline: "Unlimited power for serious job hunters.",
    icon: Crown,
    popular: false,
    price: "32,500",
    period: "12 months",
    button: "Get Premium",
    features: [
      "Browse all CV templates",
      "Select any template from the library",
      "50+ watermark-free downloads",
      "Unlimited premium templates download",
      "Featured candidate",
      "Application tracking and pipeline insights",
      "Dashboard insights and analytics",
    ],
  },
];

const JobseekerPricing = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-8 md:grid-cols-3 md:items-center">
      {cvPlans.map((plan) => {
        const Icon = plan.icon;
        const featured = plan.popular;

        return (
          <div
            key={plan.name}
            className={`group relative flex h-full flex-col rounded-3xl p-8 text-left transition-all duration-300 ${
              featured
                ? "bg-white text-gray-900 ring-2 ring-Blue shadow-2xl shadow-Blue/20 md:-my-4 md:py-12"
                : "bg-white text-gray-900 ring-1 ring-gray-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-Blue/10 hover:ring-Blue/30"
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
                <h3 className="text-xl font-bold">{plan.name}</h3>
              </div>

              <p className="mt-3 text-sm text-gray-500">{plan.tagline}</p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-gray-500">TZS</span>
                <span className="text-2xl md:text-3xl font-bold tracking-tight">
                  {plan.price}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">per {plan.period}</p>

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
                onClick={() => navigate("/login")}
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

export default JobseekerPricing;

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Check } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const cvPlans = [
//   {
//     name: "Basic",
//     popular: false,
//     price: "3,000",
//     period: "/12 months",
//     billing: "",
//     button: "Subscribe",
//     features: [
//       "Browse all CV templates",
//       "Select from 5 templates from the library",
//       "Download up to 3 CVs (watermarked)",
//       "Pay 1,000 TZS per single CV download without watermark",
//       "Pay 3000 TZS premium templates download",
//     ],
//   },
//   {
//     name: "Standard",
//     popular: true,
//     price: "17,500",
//     period: "/12 months",
//     billing: "",
//     button: "Subscribe",
//     features: [
//       "Browse all CV templates",
//       "Select any template from the library",
//       "Up to 20 watermark-free downloads",
//       "5 premium templates download",
//       "Featured candidate",
//       "Application tracking and pipeline insights",
//       "Dashboard insights and analytics",
//     ],
//   },
//   {
//     name: "Premium",
//     popular: false,
//     price: "32,500",
//     period: "/12 months",
//     billing: "",
//     button: "Subscribe",
//     features: [
//       "Browse all CV templates",
//       "Select any template from the library",
//       "50+ watermark-free downloads",
//       "Unlimited premium templates download",
//       "Featured candidate",
//       "Application tracking and pipeline insights",
//       "Dashboard insights and analytics",
//     ],
//   },
// ];

// const JobseekerPricing = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="grid md:grid-cols-3 gap-8">
//       {cvPlans.map((plan, index) => (
//         <div
//           key={index}
//           className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-start
//           hover:shadow-xl hover:-translate-y-1 transition duration-300"
//         >
//           <div className="flex items-center justify-between w-full">
//             <h3 className="text-xl font-semibold text-Orange">{plan.name}</h3>
//             {plan.popular && (
//               <Badge className="bg-blue-50 text-blue-700 ">Most Popular</Badge>
//             )}
//           </div>

//           {/* Price */}
//           <div className="mt-4">
//             <span className="text-3xl font-bold text-gray-900">
//               {plan.price} Tsh
//             </span>
//             <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
//           </div>

//           {/* Billing cycle */}
//           <p className="text-gray-500 text-sm mt-1 mb-6">{plan.billing}</p>

//           {/* Features */}
//           <ul className="space-y-3 flex-1">
//             {plan.features.map((feature, i) => (
//               <li
//                 key={i}
//                 className="flex items-start text-start text-sm text-gray-600"
//               >
//                 <Check className="w-4 h-4 text-green-600 mt-1 mr-3" />
//                 {feature}
//               </li>
//             ))}
//           </ul>

//           {/* Button */}
//           <Button
//             onClick={() => {
//               navigate("/login");
//             }}
//             className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-700"
//           >
//             {plan.button}
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default JobseekerPricing;
