import type { ReactNode } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Sen font files from @fontsource/sen (npm i @fontsource/sen).
// react-pdf needs .ttf or .woff (not .woff2).
import sen400 from "@fontsource/sen/files/sen-latin-400-normal.woff?url";
import sen600 from "@fontsource/sen/files/sen-latin-600-normal.woff?url";
import sen700 from "@fontsource/sen/files/sen-latin-700-normal.woff?url";

import {
  EyeIcon,
  UsersIcon,
  BriefcaseIcon,
  BanknoteIcon,
  CalendarIcon,
  SendIcon,
  BookmarkIcon,
  ExternalLinkIcon,
  WhatsAppIcon,
  LinkedInIcon,
  FacebookIcon,
} from "./JobPdfIcons";
import type { PdfIcon } from "./JobPdfIcons";

/* ---------- Types ---------- */

/** A parsed chunk of the duties / requirements HTML. */
export type PdfBlock =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean };

export interface JobPdfLinks {
  view: string;
  apply: string;
  save: string;
  home: string;
  whatsapp: string;
  linkedin: string;
  facebook: string;
}

interface Named {
  id?: number;
  name?: string | null;
}

/** The job fields this PDF reads (shape of the latest API response). */
export interface JobPdfData {
  dead_line?: string | null;
  years_experience?: string | number | null;
  total_applicants?: number | null;
  total_non_user_applicants?: number | null;
  job_externalUrl?: string;

  client?: { name?: string | null; logo?: string | null } | null;
  position?: Named | null;
  position_level?: Named | null;
  job_type?: Named | null;
  gender?: Named | null;
  currency?: { currency_name?: string | null } | null;

  salaries?:
    | {
        from_salary?: string | number | null;
        to_salary?: string | number | null;
      }[]
    | null;

  statistics?: { job_views?: number | null }[] | null;

  report_to?:
    | {
        report_to?: string | null;
        supervises?: string | null;
        interacts_with?: string | null;
      }[]
    | null;

  // Despite the name, this array holds the duties
  requirements?: { main_duties?: string | null }[] | null;
  other_requirements?: { other_requirement?: string | null }[] | null;
}

export interface JobPdfDocumentProps {
  job: JobPdfData;
  logo?: string | null;
  links: JobPdfLinks;
  duties: PdfBlock[];
  requirements: PdfBlock[];
}

Font.register({
  family: "Sen",
  fonts: [
    { src: sen400, fontWeight: 400 },
    { src: sen600, fontWeight: 600 },
    { src: sen700, fontWeight: 700 },
  ],
});
// Don't split words with hyphens across lines
Font.registerHyphenationCallback((word) => [word]);

// Match these to your Tailwind theme (bg-Blue / text-orange-500)
const BLUE = "#1e3a8a";
const ORANGE = "#f97316";
const MUTED = "#6b7280";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 56,
    paddingHorizontal: 40,
    fontSize: 10,
    fontFamily: "Sen",
    color: "#111827",
    lineHeight: 1.5,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  logo: { maxWidth: 110, maxHeight: 64, objectFit: "contain", marginRight: 14 },
  title: { fontSize: 17, fontWeight: 700 },
  company: { fontSize: 11, color: MUTED, marginTop: 2 },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginVertical: 12,
  },

  stats: { flexDirection: "row", flexWrap: "wrap" },
  stat: {
    width: "33.33%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statIcon: { marginRight: 5 },

  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 12, fontWeight: 600, marginBottom: 6 },
  row: { flexDirection: "row", marginBottom: 3 },
  rowLabel: { width: "33%", fontWeight: 600 },
  rowValue: { width: "67%", color: MUTED },

  para: { marginBottom: 5 },
  subheading: { fontWeight: 600, marginTop: 4, marginBottom: 3 },
  li: { flexDirection: "row", marginBottom: 3, paddingLeft: 6 },
  bullet: { width: 16 },
  liText: { flex: 1 },

  actions: { flexDirection: "row", marginTop: 4 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10,
    textDecoration: "none",
  },
  btnPrimary: { backgroundColor: BLUE },
  btnOutline: { borderWidth: 1, borderColor: "#d1d5db" },
  btnIcon: { marginRight: 6 },
  btnTextPrimary: { color: "#ffffff", fontWeight: 600 },
  btnTextOutline: { color: "#111827", fontWeight: 600 },
  closed: { color: "#b91c1c", fontWeight: 600 },

  shareLabel: { fontSize: 9, color: MUTED, marginTop: 14, marginBottom: 6 },
  shareRow: { flexDirection: "row" },
  shareLink: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
    textDecoration: "none",
  },
  shareText: { fontSize: 9, color: "#111827", marginLeft: 5 },
  url: { fontSize: 8, color: MUTED, marginTop: 10 },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#9ca3af",
  },
});

const Stat = ({
  icon: Icon,
  children,
}: {
  icon: PdfIcon;
  children: ReactNode;
}) => (
  <View style={styles.stat}>
    <Icon size={12} color={ORANGE} style={styles.statIcon} />
    <Text>{children}</Text>
  </View>
);

const Row = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <View style={styles.row} wrap={false}>
      <Text style={styles.rowLabel}>{label}:</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  ) : null;

const RichText = ({ blocks }: { blocks: PdfBlock[] }) => (
  <>
    {blocks.map((b, i) => {
      if (b.type === "h")
        return (
          <Text key={i} style={styles.subheading}>
            {b.text}
          </Text>
        );
      if (b.type === "list")
        return (
          <View key={i} style={{ marginBottom: 5 }}>
            {b.items.map((item, idx) => (
              <View key={idx} style={styles.li} wrap={false}>
                <Text style={styles.bullet}>
                  {b.ordered ? `${idx + 1}.` : "•"}
                </Text>
                <Text style={styles.liText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      return (
        <Text key={i} style={styles.para}>
          {b.text}
        </Text>
      );
    })}
  </>
);

interface LinkProps {
  href: string;
  label: string;
  icon: PdfIcon;
}

const LinkButton = ({
  href,
  label,
  icon: Icon,
  primary = false,
}: LinkProps & { primary?: boolean }) => (
  <Link
    src={href}
    style={[styles.btn, primary ? styles.btnPrimary : styles.btnOutline]}
  >
    <Icon size={11} color={primary ? "#ffffff" : BLUE} style={styles.btnIcon} />
    <Text style={primary ? styles.btnTextPrimary : styles.btnTextOutline}>
      {label}
    </Text>
  </Link>
);

const ShareLink = ({ href, label, icon: Icon }: LinkProps) => (
  <Link src={href} style={styles.shareLink}>
    <Icon size={13} />
    <Text style={styles.shareText}>{label}</Text>
  </Link>
);

const JobPdfDocument = ({
  job,
  logo,
  links,
  duties,
  requirements,
}: JobPdfDocumentProps) => {
  const isExpired = job.dead_line
    ? new Date(job.dead_line) < new Date()
    : false;

  const sal = job.salaries?.[0];
  const salary =
    sal?.from_salary || sal?.to_salary
      ? `${job.currency?.currency_name ?? ""} ${sal?.from_salary ?? 0} - ${
          sal?.to_salary ?? ""
        }`.trim()
      : "Negotiable";

  const deadline = job.dead_line
    ? new Date(job.dead_line).toDateString()
    : "Not specified";

  const position = job.position?.name ?? "Job Opening";
  const company = job.client?.name ?? "";

  const reporting = job.report_to?.[0];
  const hasReporting =
    reporting?.report_to || reporting?.supervises || reporting?.interacts_with;

  const views = job.statistics?.[0]?.job_views ?? 0;
  const applicants =
    (job.total_applicants ?? 0) + (job.total_non_user_applicants ?? 0);

  return (
    <Document
      title={`${position}${company ? ` - ${company}` : ""}`}
      author={company}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {logo ? <Image src={logo} style={styles.logo} /> : null}
          <View style={{ flex: 1 }}>
            <Link
              src={links.view}
              style={{ textDecoration: "none", color: "#111827" }}
            >
              <Text style={styles.title}>{position}</Text>
            </Link>
            {company ? <Text style={styles.company}>{company}</Text> : null}
          </View>
        </View>

        <View style={styles.hr} />

        {/* Stats — same icons and layout as the website */}
        <View style={styles.stats}>
          <Stat icon={EyeIcon}>{views} Views</Stat>
          <Stat icon={UsersIcon}>{applicants} Applicants</Stat>
          <Stat icon={BriefcaseIcon}>{job.job_type?.name || "-"}</Stat>
          <Stat icon={BanknoteIcon}>{salary}</Stat>
          <Stat icon={CalendarIcon}>{deadline}</Stat>
        </View>

        <View style={styles.hr} />

        {hasReporting ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reporting Structure</Text>
            <Row label="Report To" value={reporting?.report_to} />
            <Row label="Supervision" value={reporting?.supervises} />
            <Row label="Interacts With" value={reporting?.interacts_with} />
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Requirements</Text>
          <Row label="Job Level" value={job.position_level?.name} />
          <Row label="Gender" value={job.gender?.name} />
          <Row
            label="Experience"
            value={
              job.years_experience ? `${job.years_experience} Years` : null
            }
          />
        </View>

        <View style={styles.hr} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={40}>
            Main Duties
          </Text>
          <RichText blocks={duties} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={40}>
            Other Requirements
          </Text>
          <RichText blocks={requirements} />
        </View>

        <View style={styles.hr} />

        {/* Actions */}
        <View wrap={false}>
          {isExpired ? (
            <Text style={styles.closed}>This vacancy has closed.</Text>
          ) : (
            <View style={styles.actions}>
              <LinkButton
                href={links.apply}
                label="Apply Now"
                icon={SendIcon}
                primary
              />
              <LinkButton
                href={links.save}
                label="Save Job"
                icon={BookmarkIcon}
              />
              <LinkButton
                href={links.home}
                label="View on Website"
                icon={ExternalLinkIcon}
              />
            </View>
          )}

          <Text style={styles.shareLabel}>Share this job</Text>
          <View style={styles.shareRow}>
            <ShareLink
              href={links.whatsapp}
              label="WhatsApp"
              icon={WhatsAppIcon}
            />
            <ShareLink
              href={links.linkedin}
              label="LinkedIn"
              icon={LinkedInIcon}
            />
            <ShareLink
              href={links.facebook}
              label="Facebook"
              icon={FacebookIcon}
            />
          </View>

          <Link src={links.view} style={styles.url}>
            {links.view}
          </Link>
        </View>

        {/* Footer on every page */}
        <View style={styles.footer} fixed>
          {/* Plain text: links inside a repeating (fixed) footer get misplaced by react-pdf */}
          <Text>{links.home.replace(/^https?:\/\//, "")}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default JobPdfDocument;
