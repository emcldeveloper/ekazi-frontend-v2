import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T19ChipProps {
  label?: string;
}

function T19Chip({ label }: T19ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#ff6601",
        color: "#fff",

        padding: "3px 8px",
        margin: "2px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        lineHeight: 1.2,
        textTransform: "capitalize",
      }}
    >
      {label}
    </span>
  );
}

interface T19SkillCardProps {
  title: string;
  children: ReactNode;
}

function T19SkillCard({ title, children }: T19SkillCardProps) {
  const BRAND = "#ff6601";
  return (
    <div
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,.08)",
        padding: "10px 12px",
        borderRadius: "6px",
        flex: "1 1 calc(33% - 8px)",
        minWidth: "120px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontWeight: "700",

          color: BRAND,
          marginBottom: "6px",
          textDecoration: "underline",
          textDecorationColor: "#ffb36b",
          textUnderlineOffset: "3px",
        }}
      >
        ◆ {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{children}</div>
    </div>
  );
}

interface T19SectionCardProps {
  title: string;
  children: ReactNode;
}

function T19SectionCard({ title, children }: T19SectionCardProps) {
  const BRAND = "#ff6601";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          fontWeight: "700",

          color: BRAND,
          borderBottom: `2px solid ${BRAND}`,
          paddingBottom: "3px",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>
      {children}
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

interface Template19Profile {
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

interface Template19Props {
  profile: Template19Profile;
}

export default function Template19({ profile }: Template19Props) {
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
  const BRAND = "#ff6601";

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
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Orange header — photo + text + contact bar */}
      <div style={{ background: BRAND, color: "#fff", padding: "16px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "14px",
          }}
        >
          <div style={{ flex: 1 }}>
            <h1
              style={{ fontWeight: "700", fontSize: "22px", margin: "0 0 2px" }}
            >
              {fullName}
            </h1>
            <div
              style={{
                fontWeight: "300",

                marginBottom: "8px",
              }}
            >
              {current_position}
            </div>
            <p
              style={{
                opacity: 0.95,
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
          {/* Octagon clip-path photo */}
          <div
            style={{
              width: "110px",
              height: "110px",
              flexShrink: 0,
              clipPath:
                "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)",
              border: "5px solid #fff",
              boxShadow: "0 6px 20px rgba(0,0,0,.25)",
              overflow: "hidden",
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/110x110?text=Photo"
              }
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/110x110?text=Photo")
              }
            />
          </div>
        </div>
      </div>

      {/* Contact bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          padding: "8px 16px",
          background: "#fff",
          borderBottom: `2px solid ${BRAND}`,
        }}
      >
        {[
          [<IconPhone />, phone],
          [<IconMail />, email],
          [<IconMapPin />, location],
        ].map(([icon, val], i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            {icon} {val}
          </span>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "12px 16px" }}>
        {/* Skills grid */}
        <T19SectionCard title="Skills & Traits">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {([
              ["Knowledge", knowledges],
              ["Software", softwares],
              ["Culture", cultures],
              ["Personality", personalities],
              ["Languages", languages],
              ["Tools", tools],
            ] as [string, NamedItem[]][]).map(([label, items]) => (
              <T19SkillCard key={label} title={label}>
                {items?.map((x, i) => (
                  <T19Chip key={i} label={x?.name} />
                ))}
              </T19SkillCard>
            ))}
          </div>
        </T19SectionCard>

        {/* Exp + Edu side by side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginTop: "10px",
          }}
        >
          <T19SectionCard title="Experience">
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    fontWeight: "600",

                    color: BRAND,
                  }}
                >
                  {exp.position}
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    {" "}
                    {exp.organization}
                  </span>
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    marginBottom: "3px",
                  }}
                >
                  {exp.dates}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: exp.responsibility,
                  }}
                  className="job-description"
                  style={{ margin: 0, paddingLeft: "14px", color: "#6b7280" }}
                />
              </div>
            ))}
          </T19SectionCard>

          <T19SectionCard title="Education">
            {educations.map((edu, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    fontWeight: "600",

                    color: BRAND,
                  }}
                >
                  {edu.level}
                </div>
                <div>{edu.college}</div>
                <div style={{ color: "#6b7280" }}>{edu.dates}</div>
              </div>
            ))}
          </T19SectionCard>
        </div>

        {referees.length > 0 && (
          <T19SectionCard title="Referees">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                    padding: "8px 10px",
                    borderLeft: `4px solid ${BRAND}`,
                    borderRadius: "6px",
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
            </div>
          </T19SectionCard>
        )}
      </div>
    </div>
  );
}
