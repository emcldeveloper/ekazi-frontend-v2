import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T27ChipProps {
  label?: string;
  bg: string;
  color?: string;
  border?: string;
}

function T27Chip({ label, bg, color = "#fff", border }: T27ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        border: border || "none",

        padding: "2px 8px",
        margin: "2px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        wordBreak: "break-word",

        textTransform: "capitalize",
        fontWeight: "600",
      }}
    >
      {label}
    </span>
  );
}

interface T27SectionProps {
  title: string;
  children: ReactNode;
}

function T27Section({ title, children }: T27SectionProps) {
  const BRAND = "#881337";
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          fontWeight: "700",

          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: BRAND,
          borderBottom: `2px solid ${BRAND}`,
          paddingBottom: "3px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

interface T27TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
  isLast?: boolean;
}

function T27TimelineItem({ item, isExperience, isLast }: T27TimelineItemProps) {
  const BRAND = "#881337";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div style={{ position: "relative", paddingBottom: isLast ? 0 : "20px" }}>
      <div
        style={{
          position: "absolute",
          left: "-17px",
          top: "10px",
          width: "8px",
          height: "8px",
          background: BRAND,
          borderRadius: "50%",
          transform: "translateX(-50%)",
          boxShadow: "0 4px 10px rgba(0,0,0,.1)",
          border: "2px solid #fff",
        }}
      />
      <div
        style={{
          fontWeight: "600",

          color: "#1f2937",
        }}
      >
        {title}
      </div>
      <div style={{ color: "#6b7280" }}>{org}</div>
      <div style={{ color: "#6b7280", marginTop: "1px" }}>{item?.dates}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: item.responsibility as string,
        }}
        className="job-description"
        style={{ margin: 0, paddingLeft: "14px", color: "#374151" }}
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

interface Template27Profile {
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

interface Template27Props {
  profile: Template27Profile;
}

export default function Template27({ profile }: Template27Props) {
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
  const BRAND = "#881337";
  const GRAD = "linear-gradient(to right, #670023cc, #3a0015)";

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
        borderRadius: "12px",
      }}
    >
      {/* Deep rose gradient header */}
      <div
        style={{ background: GRAD, color: "#fff", padding: "18px 22px 14px" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div style={{ flexShrink: 0, textAlign: "center" }}>
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
                objectFit: "cover",
                border: "5px solid #fff",
                boxShadow: "0 4px 12px rgba(0,0,0,.28)",
              }}
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              {fullName}
            </div>
            <div style={{ opacity: 0.9, marginBottom: "8px" }}>
              {current_position}
            </div>
            <p
              style={{
                opacity: 0.92,
                margin: 0,
              }}
            >
              {summary}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {[
                [<IconPhone />, phone],
                [<IconMail />, email],
                [<IconMapPin />, location],
              ].map(([icon, val], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "rgba(255,255,255,.15)",
                    border: "1px solid rgba(255,255,255,.25)",
                    borderRadius: "8px",
                    padding: "3px 8px",
                  }}
                >
                  {icon}
                  <span style={{ wordBreak: "break-all" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 4fr",
          padding: "14px 16px",
          gap: "16px",
          height: "calc(100% - 155px)",
        }}
      >
        {/* Left */}
        <div style={{ overflow: "hidden" }}>
          <T27Section title="Experience">
            <div
              style={{
                position: "relative",
                paddingLeft: "20px",
                borderLeft: `1px solid rgba(136,19,55,.25)`,
                marginLeft: "4px",
              }}
            >
              {experiences.map((exp, i) => (
                <T27TimelineItem
                  key={i}
                  item={exp}
                  isExperience
                  isLast={i === experiences.length - 1}
                />
              ))}
            </div>
          </T27Section>

          <T27Section title="Education">
            <div
              style={{
                position: "relative",
                paddingLeft: "20px",
                borderLeft: `1px solid rgba(136,19,55,.25)`,
                marginLeft: "4px",
              }}
            >
              {educations.map((edu, i) => (
                <T27TimelineItem
                  key={i}
                  item={edu}
                  isExperience={false}
                  isLast={i === educations.length - 1}
                />
              ))}
            </div>
          </T27Section>
        </div>

        {/* Right */}
        <div style={{ overflow: "hidden" }}>
          <T27Section title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {knowledges.map((k, i) => (
                <T27Chip
                  key={i}
                  label={k?.name}
                  bg={`rgba(136,19,55,.1)`}
                  color={BRAND}
                  border={`1px solid rgba(136,19,55,.25)`}
                />
              ))}
              {softwares.map((s, i) => (
                <T27Chip
                  key={i}
                  label={s?.name}
                  bg="rgba(17,24,39,.05)"
                  color="#1f2937"
                  border="1px solid rgba(17,24,39,.15)"
                />
              ))}
            </div>
          </T27Section>

          {languages.length > 0 && (
            <T27Section title="Languages">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {languages.map((l, i) => (
                  <T27Chip
                    key={i}
                    label={l?.name}
                    bg={`rgba(136,19,55,.08)`}
                    color={BRAND}
                    border={`1px solid rgba(136,19,55,.2)`}
                  />
                ))}
              </div>
            </T27Section>
          )}

          {(cultures.length > 0 || personalities.length > 0) && (
            <T27Section title="Culture & Personality">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {cultures.map((x, i) => (
                  <T27Chip
                    key={i}
                    label={x?.name}
                    bg="rgba(186,230,253,.5)"
                    color="#0c4a6e"
                    border="1px solid rgba(186,230,253,.8)"
                  />
                ))}
                {personalities.map((x, i) => (
                  <T27Chip
                    key={i}
                    label={x?.name}
                    bg="rgba(253,230,138,.5)"
                    color="#78350f"
                    border="1px solid rgba(253,230,138,.8)"
                  />
                ))}
              </div>
            </T27Section>
          )}

          {referees.length > 0 && (
            <T27Section title="Referees">
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #e5e7eb",
                    background: "#f8fafc",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",

                      wordBreak: "break-word",
                    }}
                  >
                    {r.fullName}
                  </div>
                  <div style={{ color: "#6b7280" }}>{r.position}</div>
                  <div style={{ wordBreak: "break-word" }}>{r.company}</div>
                  <div>{r.phone}</div>
                  <div style={{ wordBreak: "break-all" }}>{r.email}</div>
                </div>
              ))}
            </T27Section>
          )}
        </div>
      </div>
    </div>
  );
}
