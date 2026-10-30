import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  Info,
  Landmark,
  ReceiptText,
  Wallet,
} from "lucide-react";

import HomeLayout from "@/layouts/HomeLayout";
import SalaryCalculator from "./components/SalaryCalculator";

const STEPS = [
  {
    icon: Wallet,
    title: "Enter your gross salary",
    text: "Start with your monthly salary before anything is taken off.",
  },
  {
    icon: ReceiptText,
    title: "See your deductions",
    text: "The calculator works out tax and statutory deductions for you.",
  },
  {
    icon: Landmark,
    title: "Get your take-home pay",
    text: "See exactly what lands in your account each month.",
  },
];

const SalaryCalculatorPage = () => {
  return (
    <HomeLayout>
      {/* ===== PAGE HEADER ===== */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-slate-50 via-white to-orange-50/60">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-Orange/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-Blue/10 blur-3xl" />
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

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 md:pb-28 md:pt-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-medium text-Orange shadow-sm backdrop-blur sm:text-sm">
              <Calculator size={14} />
              Salary calculator
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl lg:text-5xl">
              Know your <span className="text-Orange">take-home pay</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:text-lg">
              Work out your net salary after tax and deductions in seconds.
              Useful when comparing job offers or negotiating your pay.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CALCULATOR ===== */}
      <section className="relative z-10 -mt-14 bg-transparent md:-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl shadow-slate-200/70 sm:p-6 lg:p-8">
            <SalaryCalculator />
          </div>

          <p className="mt-4 flex items-start gap-2 text-sm text-gray-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-Orange" />
            Results are estimates for guidance only. Your actual pay may differ
            depending on your employer, benefits and any other deductions.
          </p>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-Orange/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-Orange sm:text-sm">
              <Info size={14} />
              How it works
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-Blue sm:text-4xl">
              From gross to <span className="text-Orange">net</span>
            </h2>
            <p className="mt-3 text-base text-gray-600 sm:text-lg">
              Three quick steps to understand what you'll really earn.
            </p>
          </div>

          <ol className="relative mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
            <div
              aria-hidden
              className="absolute left-[16.66%] right-[16.66%] top-[2.75rem] hidden h-px border-t-2 border-dashed border-orange-200 md:block"
            />
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-Orange text-white shadow-lg shadow-orange-500/30 ring-8 ring-white">
                  <Icon size={22} />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-Blue text-xs font-bold text-white ring-2 ring-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-Blue">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-Blue px-6 py-10 shadow-2xl shadow-slate-900/20 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14 lg:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25" />
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-Orange/30 blur-3xl" />
            </div>

            <div className="max-w-xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to earn <span className="text-Orange">more</span>?
              </h2>
              <p className="mt-2 text-white/70">
                Browse open roles from top employers and find your next
                opportunity.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex h-12 w-full items-center justify-center gap-1 rounded-full bg-Orange px-7 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:w-auto"
            >
              Explore jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default SalaryCalculatorPage;
