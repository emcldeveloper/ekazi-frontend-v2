import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cvPlans = [
  {
    name: "Basic",
    popular: false,
    price: "3,000",
    period: "/12 months",
    billing: "",
    button: "Subscribe",
    features: [
      "Browse all CV templates",
      "Select from 5 templates from the library",
      "Download up to 3 CVs (watermarked)",
      "Pay 1,000 TZS per single CV download without watermark",
      "Pay 3000 TZS premium templates download",
    ],
  },
  {
    name: "Standard",
    popular: true,
    price: "17,500",
    period: "/12 months",
    billing: "",
    button: "Subscribe",
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
    popular: false,
    price: "32,500",
    period: "/12 months",
    billing: "",
    button: "Subscribe",
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
    <div className="grid md:grid-cols-3 gap-8">
      {cvPlans.map((plan, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-start
          hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-semibold text-Orange">{plan.name}</h3>
            {plan.popular && (
              <Badge className="bg-blue-50 text-blue-700 ">Most Popular</Badge>
            )}
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">
              {plan.price} Tsh
            </span>
            <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
          </div>

          {/* Billing cycle */}
          <p className="text-gray-500 text-sm mt-1 mb-6">{plan.billing}</p>

          {/* Features */}
          <ul className="space-y-3 flex-1">
            {plan.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start text-start text-sm text-gray-600"
              >
                <Check className="w-4 h-4 text-green-600 mt-1 mr-3" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Button */}
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {plan.button}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default JobseekerPricing;
