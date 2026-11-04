import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T35ChipProps {
  label?: string;
}

function T35Chip({ label }: T35ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#dd8321",
        color: "#fff",
        padding: "3px 12px",
        margin: "2px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        fontWeight: "500",
      }}
    >
      {label}
    </span>
  );
}

interface T35SectionProps {
  title: string;
  children: ReactNode;
}

function T35Section({ title, children }: T35SectionProps) {
  const BRAND = "#dd8321";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          borderLeft: `4px solid ${BRAND}`,
          paddingLeft: "8px",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            color: BRAND,
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

interface T35TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T35TimelineItem({ item, isExperience }: T35TimelineItemProps) {
  const BRAND = "#dd8321";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "12px",
        paddingLeft: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-7px",
          top: "5px",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: BRAND,
        }}
      />
      <div
        style={{
          fontWeight: "600",
          color: BRAND,
          marginBottom: "1px",
        }}
      >
        {item?.dates}
      </div>
      <div style={{ fontWeight: "600" }}>{title}</div>
      <div style={{ fontStyle: "italic", color: "#555" }}>{org}</div>
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

interface TimelineEntry {
  position?: string;
  level?: string;
  degree?: string;
  organization?: string;
  college?: string;
  institution?: string;
  dates?: string;
  responsibility?: string;
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

interface Template35Profile {
  fullName: string;
  current_position: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  knowledges: NamedItem[];
  softwares: NamedItem[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template35Props {
  profile: Template35Profile;
}

export default function Template35({ profile }: Template35Props) {
  const {
    fullName,
    current_position,
    email,
    phone,
    location,
    summary,
    experiences,
    educations,
    knowledges,
    softwares,
    cultures,
    personalities,
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#dd8321";

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#222",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fdfdfd",
        overflow: "hidden",
      }}
    >
      {/* Amber header with circular photo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          borderBottom: `4px solid ${BRAND}`,
          background: "#fff",
          padding: "16px 20px 14px",
        }}
      >
        <img
          src={
            profileInfo?.picture
              ? `https://api.ekazi.co.tz/${profileInfo.picture}`
              : "https://placehold.co/90x90?text=Photo"
          }
          alt="profile"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: `5px solid ${BRAND}`,
            objectFit: "cover",
            flexShrink: 0,
          }}
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
          }
        />
        <div>
          <div style={{ fontSize: "22px", fontWeight: "700", color: BRAND }}>
            {fullName}
          </div>
          <div style={{ color: "#555", marginBottom: "5px" }}>
            {current_position}
          </div>
          <p
            style={{
              margin: 0,
              maxWidth: "500px",
            }}
          >
            {summary}
          </p>
        </div>
      </div>

      {/* Contact bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          padding: "8px 16px",
          background: "#fff",
          borderBottom: "2px solid #eee",
          color: "#555",
        }}
      >
        <span
          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <IconPhone /> {phone}
        </span>
        <span
          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <IconMail /> {email}
        </span>
        <span
          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <IconMapPin /> {location}
        </span>
      </div>

      {/* Body — single flow */}
      <div
        style={{
          padding: "12px 18px",
          height: "calc(100% - 148px)",
          overflow: "hidden",
        }}
      >
        <T35Section title="Experience">
          <div
            style={{
              position: "relative",
              marginLeft: "6px",
              paddingLeft: "16px",
              borderLeft: `2px solid ${BRAND}`,
            }}
          >
            {experiences.map((exp, i) => (
              <T35TimelineItem key={i} item={exp} isExperience />
            ))}
          </div>
        </T35Section>

        <T35Section title="Education">
          <div
            style={{
              position: "relative",
              marginLeft: "6px",
              paddingLeft: "16px",
              borderLeft: `2px solid ${BRAND}`,
            }}
          >
            {educations.map((edu, i) => (
              <T35TimelineItem key={i} item={edu} isExperience={false} />
            ))}
          </div>
        </T35Section>

        {(knowledges.length > 0 || softwares.length > 0) && (
          <T35Section title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[...knowledges, ...softwares].map((x, i) => (
                <T35Chip key={i} label={x?.name} />
              ))}
            </div>
          </T35Section>
        )}

        {languages.length > 0 && (
          <T35Section title="Languages">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {languages.map((l, i) => (
                <T35Chip key={i} label={l?.name} />
              ))}
            </div>
          </T35Section>
        )}

        {(cultures.length > 0 || personalities.length > 0) && (
          <T35Section title="Culture & Personality">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[...cultures, ...personalities].map((x, i) => (
                <T35Chip key={i} label={x?.name} />
              ))}
            </div>
          </T35Section>
        )}

        {referees.length > 0 && (
          <T35Section title="Referees">
            {referees.map((r, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  borderLeft: `4px solid ${BRAND}`,
                  paddingLeft: "8px",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                  padding: "8px 10px",
                }}
              >
                <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                <div
                  style={{
                    fontStyle: "italic",
                    color: "#555",
                  }}
                >
                  {r.position}
                </div>
                <div>{r.company}</div>
                <div>{r.phone}</div>
                <div style={{ wordBreak: "break-all" }}>{r.email}</div>
              </div>
            ))}
          </T35Section>
        )}
      </div>
    </div>
  );
}
