import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, type LucideIcon } from "lucide-react";

/* ---------- Types ---------- */

interface Perk {
  label: string;
  icon: LucideIcon;
}

interface CTAAction {
  label: string;
  to: string;
}

export interface CTASectionProps {
  /** Small pill text above the heading */
  eyebrow?: string;
  title?: string;
  description?: string;
  perks?: Perk[];
  primary?: CTAAction;
  secondary?: CTAAction;
}

/* ---------- Component ---------- */

const CTASection = ({
  eyebrow = "Your next role is waiting",
  title = "Ready to take the next step in your career?",
  description = "Build a standout CV, discover jobs that fit you, and apply in one click.",
  primary = { label: "Register", to: "/register" },
  secondary = { label: "Browse jobs", to: "/jobs" },
}: CTASectionProps) => {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-Orange p-8 shadow-2xl shadow-Orange/30 md:p-12">
          {/* Decorations */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-14 -top-14 h-60 w-60 rounded-full border-34 border-white/15" />
            <div className="absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-black/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>

          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            {/* Text */}
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <Sparkles size={14} />
                {eyebrow}
              </span>
              <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                {title}
              </h2>
              <p className="mt-3 max-w-lg text-base text-white/85">
                {description}
              </p>

              {/* Actions */}
              <div className="flex w-full flex-col gap-3 mt-4 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  to={primary.to}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-Orange no-underline shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {primary.label}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                {secondary && (
                  <Link
                    to={secondary.to}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white no-underline backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    {secondary.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
