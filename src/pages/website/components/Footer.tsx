import { useState, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  BsFacebook,
  BsLinkedin,
  BsInstagram,
  BsWhatsapp,
} from "react-icons/bs";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import ContactModal from "./ContactModal";
import MapModal from "./MapModal";

const EMPLOYER_LOGIN = "https://api.ekazi.co.tz/login";

/* ---------- Types ---------- */

interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

interface InternalLinkItem {
  label: string;
  to: string;
  badge?: string;
  requiresAuth?: boolean;
  external?: false;
}

interface ExternalLinkItem {
  label: string;
  href: string;
  badge?: string;
  external: true;
}

type FooterLinkItem = InternalLinkItem | ExternalLinkItem;

interface FooterLinkProps {
  item: FooterLinkItem;
  onRequireAuth?: () => void;
}

interface ColumnTitleProps {
  children: ReactNode;
}

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export interface FooterProps {
  /** Called instead of navigating to /login for links that need sign-in (e.g. open a login modal). */
  onRequireAuth?: () => void;
}

/* ---------- Data ---------- */

const socials: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://facebook.com/eKazi.co.tz",
    icon: BsFacebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ekazi-online-recruitment-platform/",
    icon: BsLinkedin,
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VayXx2m0VycFOUT7wI1K",
    icon: BsWhatsapp,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ekazi.co.tz?igsh=M2VyNW5keTlnbHFn",
    icon: BsInstagram,
  },
];

const jobSeekerLinks: FooterLinkItem[] = [
  { label: "Browse jobs", to: "/jobs" },
  { label: "Employers", to: "/employers" },
  { label: "CV builder", to: "/cv-builder", badge: "Free" },
  { label: "Salary calculator", to: "/salary-calculator" },
  { label: "View applications", to: "/login", requiresAuth: true },
  { label: "Job alerts", to: "/login", requiresAuth: true },
];

const employerLinks: FooterLinkItem[] = [
  { label: "Post a job", href: EMPLOYER_LOGIN, external: true },
  { label: "Featured candidates", to: "/candidates" },
  { label: "Applicant tracking", href: EMPLOYER_LOGIN, external: true },
  { label: "Search resumes", href: EMPLOYER_LOGIN, external: true },
];

/* ---------- Sub-components ---------- */

/* Shared link style: slides right on hover and shows an orange underline */
const linkClass =
  "group inline-flex items-center gap-2 py-1.5 text-sm text-white/75 no-underline transition-all duration-300 hover:translate-x-1 hover:text-white";

const FooterLink = ({ item, onRequireAuth }: FooterLinkProps) => {
  const content = (
    <>
      <span className="h-1 w-1 rounded-full bg-Orange/0 transition-all duration-300 group-hover:bg-Orange" />
      <span className="relative">
        {item.label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-Orange transition-all duration-300 group-hover:w-full" />
      </span>
      {item.badge && (
        <span className="rounded-full bg-Orange px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          {item.badge}
        </span>
      )}
      {item.external && (
        <ArrowUpRight
          size={13}
          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        {content}
      </a>
    );
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // If a login modal handler is passed in, use it instead of navigating
    if (item.requiresAuth && onRequireAuth) {
      e.preventDefault();
      onRequireAuth();
    }
  };

  return (
    <Link to={item.to} className={linkClass} onClick={handleClick}>
      {content}
    </Link>
  );
};

const ColumnTitle = ({ children }: ColumnTitleProps) => (
  <h6 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
    <span className="h-px w-5 bg-Orange" />
    {children}
  </h6>
);

const ActionCard = ({
  icon: Icon,
  title,
  subtitle,
  onClick,
}: ActionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-left backdrop-blur transition hover:border-white/30 hover:bg-white/15"
  >
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white transition group-hover:bg-Orange">
      <Icon size={16} />
    </span>
    <span className="flex-1">
      <span className="block text-sm font-medium text-white">{title}</span>
      <span className="block text-xs text-white/60">{subtitle}</span>
    </span>
    <ArrowRight
      size={15}
      className="text-white/50 transition group-hover:translate-x-1 group-hover:text-white"
    />
  </button>
);

/* ---------- Footer ---------- */

const Footer = ({ onRequireAuth }: FooterProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full overflow-hidden bg-Blue text-white">
      {/* Decorative background glows + dotted grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-Orange/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      {/* Main footer content */}
      <div className="container relative mx-auto px-4 py-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img
              src="/assets/logos/ekazi-white.png"
              alt="eKazi"
              className="mb-5 w-32"
            />
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              An online recruitment management platform designed for employers,
              recruiters, job seekers and freelancers.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:border-Orange hover:bg-Orange hover:shadow-lg hover:shadow-Orange/30"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Job seeker */}
          <div className="lg:col-span-3">
            <ColumnTitle>Job seekers</ColumnTitle>
            <ul className="space-y-1">
              {jobSeekerLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} onRequireAuth={onRequireAuth} />
                </li>
              ))}
            </ul>
          </div>

          {/* Employer */}
          <div className="lg:col-span-2">
            <ColumnTitle>Employers</ColumnTitle>
            <ul className="space-y-1">
              {employerLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <ColumnTitle>Company</ColumnTitle>
            <ul className="space-y-1">
              <li>
                <FooterLink item={{ label: "About us", to: "/about" }} />
              </li>
            </ul>

            <div className="mt-4 space-y-3">
              <ActionCard
                icon={MapPin}
                title="Find our office"
                subtitle="View on map"
                onClick={() => setShowMap(true)}
              />
              <ActionCard
                icon={Mail}
                title="Contact us"
                subtitle="We usually reply within a day"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/15 bg-black/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm sm:px-10 md:flex-row">
          <p className="text-white/65">
            © {currentYear}{" "}
            <span className="font-medium text-white">eKazi</span>. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/terms"
              className="text-white/65 no-underline transition hover:text-white"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="text-white/65 no-underline transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-Orange text-white shadow-lg shadow-black/20 transition hover:-translate-y-1"
            >
              <ArrowUp
                size={18}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      <ContactModal show={showModal} handleClose={() => setShowModal(false)} />
      <MapModal show={showMap} handleClose={() => setShowMap(false)} />
    </footer>
  );
};

export default Footer;
