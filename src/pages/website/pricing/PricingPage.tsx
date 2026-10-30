import { useId, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeDollarSign,
  ChevronDown,
  Headphones,
  HelpCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";

import EmployerPricing from "./components/EmployerPricing";
import JobseekerPricing from "./components/JobseekerPricing";
import HomeLayout from "@/layouts/HomeLayout";

// Where employers sign in to buy a plan / post jobs.
const RECRUITMENT_LOGIN_URL = "https://recruitment.ekazi.co.tz/login";

type Tab = "applicants" | "employers";

const TABS: { id: Tab; label: string }[] = [
  { id: "applicants", label: "Job Seekers" },
  { id: "employers", label: "Employers" },
];

const TAB_CONTENT: Record<
  Tab,
  { eyebrow: string; title: string; highlight: string; subtitle: string }
> = {
  applicants: {
    eyebrow: "Pricing for job seekers",
    title: "Land your next role",
    highlight: "faster",
    subtitle:
      "Stand out to employers, get matched with the right opportunities, and track every application in one place.",
  },
  employers: {
    eyebrow: "Pricing for employers",
    title: "Hire top talent",
    highlight: "with ease",
    subtitle:
      "Post jobs, reach qualified candidates, and manage your hiring pipeline from a single, simple dashboard.",
  },
};

const TRUST = [
  {
    icon: ShieldCheck,
    title: "Secure & private",
    text: "Your data and payments are protected with industry-standard security.",
  },
  {
    icon: Zap,
    title: "Instant activation",
    text: "Your plan goes live the moment payment is confirmed. No waiting.",
  },
  {
    icon: Headphones,
    title: "Real human support",
    text: "Questions about your plan? Our team is here to help, every step of the way.",
  },
];

const FAQS = [
  {
    q: "Can I change my plan later?",
    a: "Yes. You can upgrade or downgrade at any time from your account settings. Changes take effect from your next billing cycle.",
  },
  {
    q: "Is there a free option?",
    a: "Absolutely. Every account starts on a free plan so you can explore the platform before committing to a paid tier.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major debit and credit cards as well as mobile money. All payments are processed securely.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term contracts. Cancel whenever you like and you'll keep access until the end of your billing period.",
  },
];

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("applicants");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqId = useId();

  const content = TAB_CONTENT[activeTab];
  const isEmployer = activeTab === "employers";

  return (
    <HomeLayout>
      {/* ===== PAGE HEADER ===== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/60">
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

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div key={activeTab} className="pricing-fade max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-medium text-Orange shadow-sm backdrop-blur sm:text-sm">
              <BadgeDollarSign size={14} />
              {content.eyebrow}
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-Blue sm:text-4xl lg:text-5xl">
              {content.title}{" "}
              <span className="relative whitespace-nowrap">
                <span className="bg-gradient-to-r from-Orange to-orange-400 bg-clip-text text-transparent">
                  {content.highlight}
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-Orange/40"
                >
                  <path
                    d="M2 9C50 3 150 3 198 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              {content.subtitle}
            </p>
          </div>

          {/* Audience toggle */}
          <div
            role="tablist"
            aria-label="Choose pricing audience"
            className="relative mt-8 inline-grid grid-cols-2 rounded-full border border-gray-100 bg-white p-1.5 shadow-xl shadow-slate-200/60"
          >
            <span
              aria-hidden
              className={`absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-0.375rem)] rounded-full bg-Blue shadow-md transition-transform duration-300 ease-out motion-reduce:transition-none ${
                isEmployer ? "translate-x-full" : "translate-x-0"
              }`}
            />
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`pricing-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls="pricing-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-Orange focus-visible:ring-offset-2 sm:px-10 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-500 hover:text-Blue"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING CARDS ===== */}
      <section className="bg-white py-10 lg:py-14">
        <div
          id="pricing-panel"
          role="tabpanel"
          aria-labelledby={`pricing-tab-${activeTab}`}
          className="mx-auto max-w-7xl px-4 sm:px-6"
        >
          <div key={activeTab} className="pricing-fade">
            {isEmployer ? <EmployerPricing /> : <JobseekerPricing />}
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {TRUST.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-Orange transition-colors duration-300 group-hover:bg-Orange group-hover:text-white">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-Blue">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-Blue/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-Orange sm:text-sm">
              <HelpCircle size={14} />
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-Blue sm:text-4xl">
              Frequently asked <span className="text-Orange">questions</span>
            </h2>
            <p className="mt-3 text-base text-gray-600 sm:text-lg">
              Everything you need to know before choosing a plan. Can't find
              your answer?{" "}
              <Link
                to="/contact"
                className="font-semibold text-Blue underline-offset-4 hover:text-Orange hover:underline"
              >
                Talk to our team
              </Link>
              .
            </p>
          </div>

          <div className="space-y-3 lg:col-span-7">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              const panelId = `${faqId}-panel-${i}`;
              const buttonId = `${faqId}-button-${i}`;

              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-orange-200 shadow-xl shadow-orange-500/10"
                      : "border-gray-100 shadow-sm hover:border-gray-200"
                  }`}
                >
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-Orange rounded-2xl"
                  >
                    <span
                      className={`font-semibold ${isOpen ? "text-Orange" : "text-Blue"}`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-Orange text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 leading-relaxed text-gray-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
                Not sure which plan is{" "}
                <span className="text-Orange">right for you</span>?
              </h2>
              <p className="mt-2 text-white/70">
                Talk to our team and we'll help you pick the plan that fits your
                goals.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center gap-1 rounded-full bg-Orange px-7 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
              {isEmployer ? (
                <a
                  href={RECRUITMENT_LOGIN_URL}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white hover:text-Blue"
                >
                  Post a Job
                </a>
              ) : (
                <Link
                  to="/register"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white hover:text-Blue"
                >
                  Start for free
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .pricing-fade { animation: pricing-fade 0.45s ease-out both; }
        @keyframes pricing-fade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) { .pricing-fade { animation: none; } }
      `}</style>
    </HomeLayout>
  );
};

export default PricingPage;
