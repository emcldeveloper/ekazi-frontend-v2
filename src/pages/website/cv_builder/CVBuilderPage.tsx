import { useState, type ElementType } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  GraduationCap,
  LayoutTemplate,
  Send,
  Sparkles,
  User,
  UserCheck,
  Wrench,
} from "lucide-react";

import HomeLayout from "@/layouts/HomeLayout";
import { TEMPLATES } from "@/pages/app/cv_builder/data";

// Where "Build your CV" sends people. Swap to "/register" if new users should sign up first.
const START_ROUTE = "/login";

const PROFILE_SECTIONS = [
  { icon: User, label: "Personal information" },
  { icon: GraduationCap, label: "Education background" },
  { icon: Briefcase, label: "Work experience" },
  { icon: Wrench, label: "Professional skills" },
  { icon: Award, label: "Certifications" },
  { icon: UserCheck, label: "Referees" },
];

const STEPS = [
  {
    icon: User,
    title: "Sign in or register",
    text: "Create your free Ekazi account, or log in if you already have one.",
  },
  {
    icon: FileText,
    title: "Build your profile",
    text: "We guide you step by step to capture everything employers look for.",
  },
  {
    icon: LayoutTemplate,
    title: "Pick a template",
    text: "Choose a professional design and switch layouts instantly to suit each job.",
  },
  {
    icon: Download,
    title: "Download or apply",
    text: "Download your CV for any application, or apply to jobs on Ekazi directly.",
  },
];

const SectionHeading = ({
  badge,
  icon: Icon,
  title,
  highlight,
  subtitle,
}: {
  badge: string;
  icon: ElementType;
  title: string;
  highlight: string;
  subtitle: string;
}) => (
  <div className="max-w-2xl">
    <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-Orange sm:text-sm">
      <Icon size={14} />
      {badge}
    </span>
    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-Blue sm:text-4xl">
      {title} <span className="text-Orange">{highlight}</span>
    </h2>
    <p className="mt-3 text-base text-gray-600 sm:text-lg">{subtitle}</p>
  </div>
);

const CVBuilderPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = TEMPLATES.length;
  const current = TEMPLATES[currentIndex];

  const goTo = (i: number) => setCurrentIndex((i + count) % count);

  return (
    <HomeLayout>
      {/* ===== HERO ===== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/60">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-Orange/20 blur-3xl" />
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
          <div className="lg:col-span-7">
            <span className="animate__animated animate__fadeInDown inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-medium text-Orange shadow-sm backdrop-blur sm:text-sm">
              <Sparkles size={14} />
              Free CV builder
            </span>

            <h1 className="animate__animated animate__fadeInDown mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-Blue sm:text-5xl lg:text-[52px]">
              Create a job-winning CV{" "}
              <span className="relative whitespace-nowrap">
                <span className="bg-gradient-to-r from-Orange to-orange-400 bg-clip-text text-transparent">
                  in minutes
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

            <p className="animate__animated animate__fadeInLeft mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Build a complete, structured and market-ready professional profile
              at no cost. Download your CV for any application, or use it to
              apply for vacancies directly on Ekazi.
            </p>

            <div className="animate__animated animate__fadeInUp mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to={START_ROUTE}
                className="inline-flex h-12 items-center justify-center gap-1 rounded-full bg-Orange px-7 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
              >
                Build your CV now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#templates"
                className="inline-flex h-12 items-center justify-center rounded-full border border-Blue/20 bg-white px-7 text-base font-medium text-Blue transition hover:border-Blue hover:bg-Blue hover:text-white"
              >
                Browse templates
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
              {["100% free", "Multiple templates", "Download anytime"].map(
                (item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4 text-Orange" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Template preview */}
          <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div className="relative mx-auto max-w-[380px]">
              {/* stacked "pages" behind */}
              <div
                aria-hidden
                className="absolute inset-0 translate-x-5 translate-y-5 rotate-6 rounded-3xl bg-gradient-to-br from-Orange to-orange-300 opacity-90 shadow-2xl shadow-orange-500/30"
              />
              <div
                aria-hidden
                className="absolute inset-0 translate-x-2 translate-y-2 rotate-2 rounded-3xl bg-white shadow-lg"
              />

              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-slate-900/15">
                {count > 0 && (
                  <Link
                    to={START_ROUTE}
                    aria-label={`Use the ${current.name} template`}
                    className="group block h-full w-full"
                  >
                    <img
                      key={currentIndex}
                      src={current.image}
                      alt={`${current.name} CV template`}
                      className="cv-fade h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                )}

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goTo(currentIndex - 1)}
                      aria-label="Previous template"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-Blue shadow-lg backdrop-blur transition hover:bg-Orange hover:text-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(currentIndex + 1)}
                      aria-label="Next template"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-Blue shadow-lg backdrop-blur transition hover:bg-Orange hover:text-white"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Template name chip */}
              {count > 0 && (
                <div className="cv-float absolute -bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50 text-Orange">
                    <LayoutTemplate className="h-5 w-5" />
                  </div>
                  <div className="text-xs text-gray-500">
                    <p className="text-sm font-bold text-Blue">
                      {current.name}
                    </p>
                    Template {currentIndex + 1} of {count}
                  </div>
                </div>
              )}
            </div>

            {/* Dots */}
            {count > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {TEMPLATES.map((t: any, i: number) => (
                  <button
                    key={t.id ?? t.name ?? i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${t.name} template`}
                    aria-current={i === currentIndex}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "w-8 bg-Orange"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== WHAT YOU CAN ADD ===== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              badge="Your complete profile"
              icon={FileText}
              title="Everything employers"
              highlight="want to see"
              subtitle="After you sign in, the builder guides you through each part of your professional profile, all saved in one place."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {PROFILE_SECTIONS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-Orange transition-colors duration-300 group-hover:bg-Orange group-hover:text-white">
                  <Icon size={20} />
                </div>
                <span className="font-semibold text-Blue">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-Orange/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            badge="How it works"
            icon={Send}
            title="From profile to"
            highlight="polished CV"
            subtitle="Four simple steps to a CV you can send anywhere."
          />

          <ol className="relative mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
            <div
              aria-hidden
              className="absolute left-[12.5%] right-[12.5%] top-[2.75rem] hidden h-px border-t-2 border-dashed border-orange-200 lg:block"
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

      {/* ===== TEMPLATE GALLERY ===== */}
      {count > 0 && (
        <section
          id="templates"
          className="scroll-mt-24 bg-white py-16 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              badge="Templates"
              icon={LayoutTemplate}
              title="Choose a design that"
              highlight="fits you"
              subtitle="Switch between layouts at any time to match different industries, job applications or preferred length."
            />

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:mt-12 lg:grid-cols-4">
              {TEMPLATES.map((t: any, i: number) => (
                <Link
                  key={t.id ?? t.name ?? i}
                  to={START_ROUTE}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                    <img
                      src={t.image}
                      alt={`${t.name} CV template`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-Blue/80 via-Blue/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1 rounded-full bg-Orange px-4 py-2 text-sm font-semibold text-white shadow-lg">
                        Use template
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-gray-100 px-4 py-3">
                    <span className="truncate font-semibold text-Blue">
                      {t.name}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-Orange" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
                Turn your experience into a{" "}
                <span className="text-Orange">polished CV</span>
              </h2>
              <p className="mt-2 text-white/70">
                Create your profile today. It's free and takes just a few
                minutes.
              </p>
            </div>

            <Link
              to={START_ROUTE}
              className="inline-flex h-12 w-full items-center justify-center gap-1 rounded-full bg-Orange px-7 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:w-auto"
            >
              Build your CV now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .cv-fade { animation: cv-fade 0.4s ease-out both; }
        @keyframes cv-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cv-float { 0%,100% { transform: translate(-50%, 0) } 50% { transform: translate(-50%, -6px) } }
        .cv-float { animation: cv-float 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .cv-fade, .cv-float { animation: none; } }
      `}</style>
    </HomeLayout>
  );
};

export default CVBuilderPage;
