import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T24ChipProps {
  label?: string | NamedItem;
  bg: string;
  color?: string;
}

function T24Chip({ label, bg, color = "#fff" }: T24ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        padding: "3px 8px",
        margin: "2px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        textTransform: "capitalize",
      }}
    >
      {typeof label === "string" ? label : label?.name}
    </span>
  );
}

interface T24ContactItemProps {
  icon: ReactNode;
  value: string;
}

function T24ContactItem({ icon, value }: T24ContactItemProps) {
  const BRAND = "#0c2b3b";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        marginBottom: "10px",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          width: "24px",
          height: "24px",
          border: "1px solid rgba(12,43,59,.15)",
          background: "rgba(12,43,59,.04)",
          color: BRAND,
        }}
      >
        {icon}
      </span>
      <div
        style={{
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

interface T24CardBlockProps {
  children: ReactNode;
}

function T24CardBlock({ children }: T24CardBlockProps) {
  return (
    <div
      style={{
        boxShadow: "0 1px 4px rgba(0,0,0,.07)",
        borderRadius: "14px",
        padding: "12px 14px",
        marginBottom: "10px",
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}

interface T24SectionProps {
  title: string;
  children: ReactNode;
}

function T24Section({ title, children }: T24SectionProps) {
  const BRAND = "#0c2b3b";
  return (
    <div style={{ marginBottom: "6px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "6px",
          fontWeight: "700",
          color: BRAND,
          textTransform: "uppercase",
          borderBottom: `2px solid ${BRAND}`,
          paddingBottom: "3px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

interface T24TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T24TimelineItem({ item, isExperience }: T24TimelineItemProps) {
  const BRAND = "#0c2b3b";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div style={{ position: "relative", marginBottom: "12px" }}>
      <div
        style={{
          position: "absolute",
          left: "-19px",
          top: "4px",
          width: "12px",
          height: "12px",
          background: BRAND,
          borderRadius: "50%",
        }}
      />
      <div style={{ fontWeight: "600", color: BRAND }}>{title}</div>
      {org ? (
        <div style={{ color: "#6b7280", marginBottom: "1px" }}>{org}</div>
      ) : null}
      <div style={{ color: "#6b7280", marginBottom: "3px" }}>{item?.dates}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: item.responsibility as string,
        }}
        className="job-description"
        style={{ margin: 0, paddingLeft: "14px" }}
      />
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface Experience {
  position: string;
  organization: string;
  dates: string;
  responsibility: string;
}

interface Education {
  level: string;
  college: string;
  dates: string;
}

interface TimelineEntry {
  position?: string;
  organization?: string;
  level?: string;
  degree?: string;
  college?: string;
  institution?: string;
  dates?: string;
  responsibility?: string;
}

interface Referee {
  fullName: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template24Profile {
  fullName: string;
  current_position: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  softwares: NamedItem[];
  knowledges: NamedItem[];
  tools: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template24Props {
  profile: Template24Profile;
}

export default function Template24({ profile }: Template24Props) {
  const {
    fullName,
    current_position,
    email,
    phone,
    location,
    summary,
    experiences,
    educations,
    cultures,
    personalities,
    softwares,
    knowledges,
    tools,
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#0c2b3b";

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#1f2937",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Deep navy rounded header */}
      <div
        style={{
          background: BRAND,
          color: "#fff",
          padding: "20px 24px 18px",
          borderRadius: "0 0 32px 32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "3px",
              }}
            >
              {fullName}
            </div>
            <div style={{ opacity: 0.88, marginBottom: "8px" }}>
              {current_position}
            </div>
            <p
              style={{
                margin: 0,
                opacity: 0.9,
              }}
            >
              {summary}
            </p>
          </div>
          <div
            style={{
              width: "120px",
              height: "150px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "5px solid #fff",
              boxShadow: "0 8px 20px rgba(0,0,0,.25)",
              flexShrink: 0,
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/120x150?text=Photo"
              }
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/120x150?text=Photo")
              }
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          gap: "12px",
          padding: "14px 16px",
          height: "calc(100% - 190px)",
        }}
      >
        {/* Left */}
        <div style={{ overflow: "hidden" }}>
          <T24CardBlock>
            <T24Section title="Contact">
              <T24ContactItem icon={<IconPhone />} value={phone} />
              <T24ContactItem icon={<IconMail />} value={email} />
              <T24ContactItem icon={<IconMapPin />} value={location} />
            </T24Section>
          </T24CardBlock>

          <T24CardBlock>
            <T24Section title="Skills">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {[...knowledges, ...softwares, ...tools].map((x, i) => (
                  <T24Chip key={i} label={x?.name} bg="#6b7280" />
                ))}
              </div>
            </T24Section>
          </T24CardBlock>

          {languages.length > 0 && (
            <T24CardBlock>
              <T24Section title="Languages">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {languages.map((l, i) => (
                    <T24Chip key={i} label={l?.name} bg={BRAND} />
                  ))}
                </div>
              </T24Section>
            </T24CardBlock>
          )}

          {(cultures.length > 0 || personalities.length > 0) && (
            <T24CardBlock>
              <T24Section title="Culture & Personality">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {cultures.map((x, i) => (
                    <T24Chip
                      key={i}
                      label={x?.name}
                      bg="#0dcaf0"
                      color="#000"
                    />
                  ))}
                  {personalities.map((x, i) => (
                    <T24Chip
                      key={i}
                      label={x?.name}
                      bg="#ffc107"
                      color="#000"
                    />
                  ))}
                </div>
              </T24Section>
            </T24CardBlock>
          )}
        </div>

        {/* Right */}
        <div style={{ overflow: "hidden" }}>
          <T24CardBlock>
            <T24Section title="Experience">
              <div
                style={{
                  borderLeft: `4px solid ${BRAND}`,
                  marginLeft: "6px",
                  paddingLeft: "14px",
                }}
              >
                {experiences.map((exp, i) => (
                  <T24TimelineItem key={i} item={exp} isExperience />
                ))}
              </div>
            </T24Section>
          </T24CardBlock>

          <T24CardBlock>
            <T24Section title="Education">
              <div
                style={{
                  borderLeft: `4px solid ${BRAND}`,
                  marginLeft: "6px",
                  paddingLeft: "14px",
                }}
              >
                {educations.map((edu, i) => (
                  <T24TimelineItem key={i} item={edu} isExperience={false} />
                ))}
              </div>
            </T24Section>
          </T24CardBlock>

          {referees.length > 0 && (
            <T24CardBlock>
              <T24Section title="Referees">
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                      borderRadius: "8px",
                      padding: "8px 10px",
                      marginBottom: "6px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        color: BRAND,
                      }}
                    >
                      {r.fullName}
                    </div>
                    <div style={{ color: "#6b7280" }}>{r.position}</div>
                    <div>{r.company}</div>
                    <div>{r.phone}</div>
                    <div>{r.email}</div>
                  </div>
                ))}
              </T24Section>
            </T24CardBlock>
          )}
        </div>
      </div>
    </div>
  );
}
