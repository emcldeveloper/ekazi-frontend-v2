import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T18ChipProps {
  label?: string;
}

function T18Chip({ label }: T18ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#242a64",
        color: "#fff",
        padding: "3px 8px",
        margin: "2px",
        borderRadius: "5px",
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

interface T18SkillBlockProps {
  title: string;
  children: ReactNode;
}

function T18SkillBlock({ title, children }: T18SkillBlockProps) {
  const BRAND = "#242a64";
  return (
    <div
      style={{
        boxShadow: `0 3px 10px rgba(36,42,100,.12)`,
        padding: "10px 12px",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontWeight: "700",

          color: BRAND,
          marginBottom: "6px",
        }}
      >
        <span>◆</span>
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

interface T18SectionCardProps {
  title: string;
  children: ReactNode;
}

function T18SectionCard({ title, children }: T18SectionCardProps) {
  const BRAND = "#242a64";
  return (
    <div style={{ marginBottom: "14px" }}>
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

interface Template18Profile {
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

interface Template18Props {
  profile: Template18Profile;
}

export default function Template18({ profile }: Template18Props) {
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
  const BRAND = "#242a64";

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
      {/* Deep navy header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: BRAND,
          color: "#fff",
          padding: "20px 24px",
          borderRadius: "10px 10px 0 0",
        }}
      >
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
            objectFit: "cover",
            border: "4px solid #fff",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,.3)",
          }}
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/100x100?text=Photo")
          }
        />
        <div style={{ flex: 1 }}>
          <h1
            style={{ fontWeight: "700", fontSize: "22px", margin: "0 0 3px" }}
          >
            {fullName}
          </h1>
          <div
            style={{
              fontWeight: "300",
              opacity: 0.9,

              marginBottom: "8px",
            }}
          >
            {current_position}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {[
              [<IconPhone />, phone],
              [<IconMail />, email],
              [<IconMapPin />, location],
            ].map(([icon, val], i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(255,255,255,.9)",
                  color: BRAND,
                  fontWeight: "600",
                  borderRadius: "999px",
                  padding: "2px 10px",
                }}
              >
                {icon} {val}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 14px" }}>
        <T18SectionCard title="About Me">
          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.6",
              margin: 0,
              textAlign: "justify",
            }}
          >
            {summary}
          </p>
        </T18SectionCard>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 8fr",
            gap: "14px",
          }}
        >
          {/* Left — skills */}
          <div>
            <T18SectionCard title="Skills & Traits">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {([
                  ["Knowledge", knowledges],
                  ["Software", softwares],
                  ["Culture", cultures],
                  ["Personality", personalities],
                  ["Languages", languages],
                  ["Tools", tools],
                ] as [string, NamedItem[]][]).map(([label, items]) => (
                  <T18SkillBlock key={label} title={label}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {items?.map((x, i) => (
                        <T18Chip key={i} label={x?.name} />
                      ))}
                    </div>
                  </T18SkillBlock>
                ))}
              </div>
            </T18SectionCard>
          </div>

          {/* Right — experience, education, referees */}
          <div>
            <T18SectionCard title="Experience">
              {experiences.map((exp, i) => (
                <div key={i} style={{ display: "flex", marginBottom: "10px" }}>
                  <div
                    style={{
                      marginTop: "5px",
                      marginRight: "10px",
                      width: "10px",
                      height: "10px",
                      background: BRAND,
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  <div>
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
                      style={{
                        margin: 0,
                        paddingLeft: "14px",
                        color: "#6b7280",
                      }}
                    />
                  </div>
                </div>
              ))}
            </T18SectionCard>

            <T18SectionCard title="Education">
              {educations.map((edu, i) => (
                <div key={i} style={{ display: "flex", marginBottom: "10px" }}>
                  <div
                    style={{
                      marginTop: "5px",
                      marginRight: "10px",
                      width: "10px",
                      height: "10px",
                      background: BRAND,
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  <div>
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
                </div>
              ))}
            </T18SectionCard>

            {referees.length > 0 && (
              <T18SectionCard title="Referees">
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                      marginBottom: "8px",
                      padding: "8px 10px",
                      borderLeft: `5px solid ${BRAND}`,
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
              </T18SectionCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
