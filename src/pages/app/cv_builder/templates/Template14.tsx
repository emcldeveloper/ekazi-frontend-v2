import type { ReactNode } from "react";

interface T14SectionProps {
  title: string;
  children: ReactNode;
}

function T14Section({ title, children }: T14SectionProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          marginBottom: "6px",
          letterSpacing: ".02em",
        }}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

interface TagBadgeProps {
  children: ReactNode;
  bg: string;
  color?: string;
}

function TagBadge({ children, bg, color = "#fff" }: TagBadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        marginRight: "4px",
        marginBottom: "4px",
        textTransform: "capitalize",
        padding: "2px 8px",

        borderRadius: "4px",
        background: bg,
        color,
      }}
    >
      {children}
    </span>
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

interface Template14Profile {
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
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template14Props {
  profile: Template14Profile;
}

export default function Template14({ profile }: Template14Props) {
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
    languages,
    referees,
    profile: profileInfo,
  } = profile;

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
      }}
    >
      {/* Gradient header */}
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5, #f59e0b)",
          color: "#fff",
          padding: "20px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/100x100?text=Photo"
            }
            alt="profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,.95)",
              objectFit: "cover",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(0,0,0,.2)",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/100x100?text=Photo")
            }
          />
          <div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "26px",
                margin: "0 0 3px",
              }}
            >
              {fullName}
            </h1>
            <div style={{ opacity: 0.75, marginBottom: "8px" }}>
              {current_position}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",

                opacity: 0.9,
              }}
            >
              <span>{location}</span>
              <span>|</span>
              <span style={{ whiteSpace: "nowrap" }}>{phone}</span>
              <span>|</span>
              <span style={{ whiteSpace: "nowrap" }}>{email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "calc(100% - 140px)",
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: "14px 14px",
            borderRight: "1px solid #f1f5f9",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <T14Section title="Profile">
            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {summary}
            </p>
          </T14Section>

          <T14Section title="Languages">
            {languages.map((l, i) => (
              <TagBadge key={i} bg="#4b5563" color="#fff">
                {l.name}
              </TagBadge>
            ))}
          </T14Section>

          <T14Section title="Skills">
            {knowledges.map((x, i) => (
              <TagBadge key={i} bg="#0ea5e9" color="#fff">
                {x.name}
              </TagBadge>
            ))}
          </T14Section>

          <T14Section title="Software">
            {softwares.map((x, i) => (
              <TagBadge key={i} bg="#f1f5f9" color="#1f2937">
                {x.name}
              </TagBadge>
            ))}
          </T14Section>

          <T14Section title="Culture">
            {cultures.map((x, i) => (
              <TagBadge key={i} bg="#f59e0b" color="#fff">
                {x.name}
              </TagBadge>
            ))}
          </T14Section>

          <T14Section title="Personality">
            {personalities.map((x, i) => (
              <TagBadge key={i} bg="#111827" color="#fff">
                {x.name}
              </TagBadge>
            ))}
          </T14Section>
        </div>

        {/* Right */}
        <div
          style={{
            padding: "14px 16px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <T14Section title="Experience">
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontWeight: "400",
                    marginBottom: "2px",
                  }}
                >
                  {exp.position}
                  <span style={{ color: "#6b7280" }}>
                    {" "}
                    | {exp.organization}
                  </span>
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  {exp.dates}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: exp.responsibility,
                  }}
                  className="job-description"
                  style={{ margin: 0, paddingLeft: "14px" }}
                />
              </div>
            ))}
          </T14Section>

          <T14Section title="Education">
            {educations.map((edu, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div>{edu.level}</div>
                <div>{edu.college}</div>
                <div style={{ color: "#6b7280" }}>{edu.dates}</div>
              </div>
            ))}
          </T14Section>

          {referees.length > 0 && (
            <T14Section title="Referees">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      flex: "1 1 calc(50% - 4px)",
                      border: "1px solid #e5e7eb",
                      padding: "8px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    <div style={{ fontWeight: "400" }}>{r.fullName}</div>
                    <div style={{ color: "#6b7280" }}>{r.position}</div>
                    <div>{r.company}</div>
                    <div>{r.phone}</div>
                    <div>{r.email}</div>
                  </div>
                ))}
              </div>
            </T14Section>
          )}
        </div>
      </div>
    </div>
  );
}
