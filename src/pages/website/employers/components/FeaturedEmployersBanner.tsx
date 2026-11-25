import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export const RECRUITMENT_REGISTER_URL =
  "https://recruitment.ekazi.co.tz/register";
export const RECRUITMENT_LOGIN_URL = "https://recruitment.ekazi.co.tz/login";

type FeaturedEmployersBannerProps = {
  className?: string;
};

const heroImage =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop";

const FeaturedEmployersBanner: React.FC<FeaturedEmployersBannerProps> = ({
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="employers-hero-title"
      className={`relative isolate overflow-hidden bg-linear-to-br from-slate-50 via-white to-orange-50/60 ${className}`}
    >
      {/* Background decoration (same language as the homepage hero) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-32 h-[28rem] w-md rounded-full bg-Orange/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-Blue/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Content */}
        <div className="lg:col-span-6">
          <span className="animate__animated animate__fadeInDown inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-medium text-Orange shadow-sm backdrop-blur sm:text-sm">
            <Building2 size={14} />
            For employers
          </span>

          <h1
            id="employers-hero-title"
            className="animate__animated animate__fadeInDown mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-Blue sm:text-5xl lg:text-[52px]"
          >
            Hire smarter & manage recruitment{" "}
            <span className="bg-linear-to-r from-Orange to-orange-500 bg-clip-text text-transparent">
              effortlessly
            </span>
          </h1>

          <p className="animate__animated animate__fadeInLeft mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Publish jobs, manage applicants, collaborate with your hiring team
            and recruit exceptional talent, all from one powerful dashboard.
          </p>

          <div className="animate__animated animate__fadeInUp mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={RECRUITMENT_REGISTER_URL}
              className="inline-flex h-12 items-center justify-center gap-1 rounded-full bg-Orange px-7 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
            >
              Register
              <ArrowRight className="h-4 w-4" />
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/employers/request-demo")}
              className="h-12 rounded-full border-Blue/20 bg-white px-7 text-base  text-Blue transition hover:border-Blue hover:bg-Blue hover:text-white"
            >
              Request a Demo
            </Button>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Already hiring on Ekazi?{" "}
            <a
              href={RECRUITMENT_LOGIN_URL}
              className="font-semibold text-Blue underline-offset-4 hover:text-Orange hover:underline"
            >
              Sign in to your dashboard
            </a>
          </p>
        </div>

        {/* Media */}
        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <div className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-linear-to-br from-Orange to-orange-300 opacity-90 shadow-2xl shadow-orange-500/30" />
          <img
            src={heroImage}
            alt="A diverse team collaborating around laptops in a modern office"
            className="h-72 w-full rounded-3xl object-cover shadow-2xl shadow-slate-900/20 sm:h-[400px]"
          />
        </div>
      </div>

      <style>{`
        @keyframes emp-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        .emp-float { animation: emp-float 6s ease-in-out infinite; }
        .emp-float-delay { animation: emp-float 7s ease-in-out 1.5s infinite; }
        @media (prefers-reduced-motion: reduce) { .emp-float, .emp-float-delay { animation: none; } }
      `}</style>
    </section>
  );
};

export default FeaturedEmployersBanner;
