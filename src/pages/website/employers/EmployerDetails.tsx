import { useState } from "react";
import {
  Building2,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Globe,
  Navigation,
  BadgeCheck,
  Star,
  Users,
  Flag,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { IMG_BASE } from "@/config";
import JoinModal from "./components/JoinModal";
import MessageModal from "./components/MessageModal";
import RateModal from "./components/RateModal";
import EmployerJobs from "./EmployerJobs";
import { formatDate } from "@/utils/helpers";

interface EmployerDetailsProps {
  employer: any;
}

/* ---------- helpers ---------- */

const getInitials = (name?: string) =>
  (name ?? "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

/** Treats null, "", "null", "1" and whitespace-only strings as empty, and collapses tabs/newlines. */
const clean = (value?: string | null) => {
  if (!value) return null;
  const text = value.replace(/\s+/g, " ").trim();
  return text && text !== "null" && text !== "1" ? text : null;
};

/** Supports both the details shape (addresses[]) and the list shape (client_location). */
const getAddress = (employer: any) =>
  employer.addresses?.[0] ?? employer.client_location ?? null;

const buildLocation = (address: any) =>
  [
    clean(address?.sub_location),
    clean(address?.region?.region_name),
    clean(address?.region?.country?.name),
  ]
    .filter(Boolean)
    .join(", ");

const toUrl = (website: string) =>
  /^https?:\/\//i.test(website) ? website : `https://${website}`;

/** Removes duplicates and empty values from a list of strings. */
const uniq = (values: (string | null | undefined)[]) =>
  Array.from(new Set(values.map((v) => clean(v)).filter(Boolean))) as string[];

/* ---------- small building blocks ---------- */

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
    <span className="h-4 w-1 rounded-full bg-primary" />
    {children}
  </h3>
);

const Pill = ({
  icon: Icon,
  children,
  tone = "muted",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  tone?: "muted" | "primary" | "success" | "warning";
}) => {
  const tones = {
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary font-medium",
    success:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${tones[tone]}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {children}
    </span>
  );
};

interface ContactTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  wide?: boolean;
}

const ContactTile = ({
  icon: Icon,
  label,
  value,
  href,
  external,
  wide,
}: ContactTileProps) => {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover/tile:bg-primary group-hover/tile:text-primary-foreground">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span
          className={`block text-sm font-medium text-foreground ${
            wide ? "" : "truncate"
          }`}
        >
          {value}
        </span>
      </span>
      {href && (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/tile:opacity-100" />
      )}
    </>
  );

  const className = `group/tile flex items-center gap-3 rounded-xl border bg-card p-3 transition-colors ${
    wide ? "sm:col-span-2" : ""
  }`;

  return href ? (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`${className} hover:border-primary/40 hover:bg-primary/5`}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

/* ---------- main component ---------- */

const EmployerDetails = ({ employer }: EmployerDetailsProps) => {
  const [logoFailed, setLogoFailed] = useState(false);
  const hasLogo = employer.logo && !logoFailed;

  const address = getAddress(employer);
  const location = buildLocation(address);
  const streetAddress = clean(address?.location_notes);

  const industry = clean(employer.industry?.industry_name);
  const isVerified = Boolean(employer.is_verified);
  const isFeatured = Boolean(employer.featured);
  const foundedYear = employer.founded_year;
  const companySize = clean(
    employer.companySize?.size_name ?? employer.companySize?.name,
  );

  const memberSince = employer.created_at
    ? new Date(employer.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  // Details endpoint uses phones/emails/descriptions; list uses client_* — support both.
  const phones = uniq(
    (employer.phones ?? employer.client_phones ?? []).map(
      (p: any) => p.phone_number,
    ),
  );
  const emails = uniq(
    (employer.emails ?? employer.client_emails ?? []).map(
      (e: any) => e.client_email,
    ),
  );
  const descriptionEntry =
    employer.descriptions?.[0] ?? employer.client_description ?? null;
  const website =
    clean(address?.website) ?? clean(descriptionEntry?.website) ?? null;

  const tagline = clean(employer.business);
  const about = clean(employer.additional_info);
  const description = clean(descriptionEntry?.description);

  const hasContact =
    location || streetAddress || phones.length || emails.length || website;

  return (
    <div className="space-y-10 py-8">
      {/* ===== HEADER ===== */}
      <header className="space-y-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white shadow-sm">
            {hasLogo ? (
              <img
                src={`${IMG_BASE}${employer.logo}`}
                alt={employer.client_name}
                onError={() => setLogoFailed(true)}
                className="h-full w-full object-contain p-3"
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {getInitials(employer.client_name)}
              </span>
            )}
          </div>

          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
                {employer.client_name}
              </h2>
              {isVerified && (
                <BadgeCheck
                  className="h-6 w-6 shrink-0 fill-primary text-primary-foreground"
                  aria-label="Verified employer"
                />
              )}
            </div>

            {tagline && (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {isVerified && (
                <Pill icon={BadgeCheck} tone="success">
                  Verified
                </Pill>
              )}
              {isFeatured && (
                <Pill icon={Star} tone="warning">
                  Featured
                </Pill>
              )}
              {industry && (
                <Pill icon={Building2} tone="primary">
                  {industry}
                </Pill>
              )}
              {location && <Pill icon={MapPin}>{location}</Pill>}
              {companySize && <Pill icon={Users}>{companySize} employees</Pill>}
              {foundedYear && (
                <Pill icon={Flag}>Founded {formatDate(foundedYear)}</Pill>
              )}
              {memberSince && (
                <Pill icon={CalendarDays}>Member since {memberSince}</Pill>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 border-y py-4">
          <JoinModal employer={employer} />
          <MessageModal clientId={employer.id} />
          <RateModal clientId={employer.id} />
        </div>
      </header>

      {/* ===== ABOUT ===== */}
      <section className="space-y-4">
        <SectionTitle>About the company</SectionTitle>

        {about || description ? (
          <div className="space-y-3">
            {about && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                {about}
              </p>
            )}
            {description && description !== about && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No description available.
          </p>
        )}
      </section>

      {/* ===== CONTACT ===== */}
      <section className="space-y-4">
        <SectionTitle>Get in touch</SectionTitle>

        {hasContact ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {streetAddress && (
              <ContactTile
                icon={Navigation}
                label="Address"
                value={streetAddress}
                wide
              />
            )}
            {location && (
              <ContactTile icon={MapPin} label="Region" value={location} />
            )}
            {phones.map((phone) => (
              <ContactTile
                key={phone}
                icon={Phone}
                label="Phone"
                value={phone}
                href={`tel:${phone.replace(/\s+/g, "")}`}
              />
            ))}
            {emails.map((email) => (
              <ContactTile
                key={email}
                icon={Mail}
                label="Email"
                value={email}
                href={`mailto:${email}`}
              />
            ))}
            {website && (
              <ContactTile
                icon={Globe}
                label="Website"
                value={website.replace(/^https?:\/\//i, "").replace(/\/$/, "")}
                href={toUrl(website)}
                external
              />
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No contact information provided.
          </p>
        )}
      </section>

      {/* ===== JOBS ===== */}
      <section className="space-y-4">
        <SectionTitle>Open positions</SectionTitle>
        <EmployerJobs employer={employer} />
      </section>
    </div>
  );
};

export default EmployerDetails;

// import { Building2, Clock, MapPin, Phone, Mail, Globe } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { DEFAULT_IMG, IMG_BASE } from "@/config";
// import JoinModal from "./components/JoinModal";
// import MessageModal from "./components/MessageModal";
// import RateModal from "./components/RateModal";
// import EmployerJobs from "./EmployerJobs";

// interface EmployerDetailsProps {
//   employer: any;
// }

// const EmployerDetails = ({ employer }: EmployerDetailsProps) => {
//   const logoUrl = employer.logo
//     ? `${IMG_BASE}${employer.logo}`
//     : `${DEFAULT_IMG}`;

//   const createdAt = employer.created_at
//     ? new Date(employer.created_at).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       })
//     : "";

//   const region = employer.addresses?.[0]?.region?.region_name;
//   const country = employer.addresses?.[0]?.region?.country?.name;
//   const location = employer.addresses?.[0]?.sub_location;

//   const phone = employer.client_phones?.[0]?.phone_number;
//   const email = employer.client_emails?.[0]?.client_email;
//   const website = employer.client_description?.website;

//   const additionalInfo =
//     employer.additional_info || "No additional info provided.";
//   const description =
//     employer.client_description?.description || "No description available.";

//   return (
//     <div className="py-10 space-y-4">
//       <Card>
//         <CardContent className="space-y-4">
//           <div className="flex gap-6">
//             <div className="w-30 h-30">
//               <img
//                 src={logoUrl}
//                 alt="Client Logo"
//                 className="w-full object-contain"
//               />
//             </div>

//             <div className="w-full flex justify-between text-sm text-muted-foreground">
//               {/* Info */}
//               <div className="space-y-1">
//                 <h5 className="text-lg text-Blue font-bold uppercase">
//                   {employer.client_name}
//                 </h5>

//                 <div className="flex items-center gap-2">
//                   <Building2 size={16} />
//                   <p>
//                     {employer.industry?.industry_name ||
//                       "Industry not available"}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Clock size={16} />
//                   <p>{createdAt}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-4 items-center justify-between">
//             <JoinModal employer={employer} />

//             <MessageModal clientId={employer.id} />

//             <RateModal clientId={employer.id} />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-Orange">Contact Information</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Contact */}
//           <div className="space-y-1">
//             <p className=" flex items-center gap-2">
//               <MapPin size={16} />
//               {location}, {region}, {country}
//             </p>

//             {phone && (
//               <p className=" flex items-center gap-2">
//                 <Phone size={16} />
//                 {phone}
//               </p>
//             )}
//             {email && (
//               <p className="flex items-center gap-2">
//                 <Mail size={16} />
//                 {email}
//               </p>
//             )}
//             {website && (
//               <p className="flex items-center gap-2">
//                 <Globe size={16} />
//                 <a
//                   href={`https://${website}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="hover:underline"
//                 >
//                   {website}
//                 </a>
//               </p>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-Orange">About Company</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="fw-bold text-primary mb-3">{additionalInfo}</p>
//           <p className="text-muted">{description}</p>
//         </CardContent>
//       </Card>

//       <EmployerJobs employer={employer} />
//     </div>
//   );
// };

// export default EmployerDetails;
