import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T17ChipProps {
  label?: string;
}

function T17Chip({ label }: T17ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#32489e",
        color: "#fff",

        padding: "3px 8px",
        margin: "2px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        lineHeight: 1.1,
        textTransform: "capitalize",
      }}
    >
      {label}
    </span>
  );
}

interface T17CardBlockProps {
  children: ReactNode;
}

function T17CardBlock({ children }: T17CardBlockProps) {
  return (
    <div
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,.07)",
        marginBottom: "12px",
        padding: "12px 14px",
      }}
    >
      {children}
    </div>
  );
}

interface T17SectionCardProps {
  title: string;
  children: ReactNode;
  brand: string;
}

function T17SectionCard({ title, children, brand }: T17SectionCardProps) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "inline-block",
          fontWeight: "700",

          color: brand,
          borderBottom: `2px solid ${brand}`,
          letterSpacing: ".5px",
          marginBottom: "10px",
          paddingBottom: "2px",
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

interface Template17Profile {
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

interface Template17Props {
  profile: Template17Profile;
}

export default function Template17({ profile }: Template17Props) {
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
  const BRAND = "#32489e";

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
        boxShadow: `0 3px 10px rgba(50,72,158,.12)`,
      }}
    >
      {/* Navy header with photo */}
      <div style={{ background: BRAND, color: "#fff", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
              boxShadow: "0 2px 8px rgba(0,0,0,.2)",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/100x100?text=Photo")
            }
          />
          <div style={{ flex: 1, textAlign: "left" }}>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "22px",
                letterSpacing: ".5px",
                margin: "0 0 3px",
              }}
            >
              {fullName}
            </h1>
            <div style={{ fontWeight: "300", marginBottom: "0" }}>
              {current_position}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 8fr",
            gap: "14px",
          }}
        >
          {/* Left */}
          <div>
            <T17CardBlock>
              <div
                style={{
                  fontWeight: "700",

                  color: BRAND,
                  marginBottom: "8px",
                }}
              >
                Contact
              </div>
              {[
                [<IconPhone />, phone],
                [<IconMail />, email],
                [<IconMapPin />, location],
              ].map(([icon, val], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "6px",

                    marginBottom: "5px",
                  }}
                >
                  {icon}
                  <span style={{ wordBreak: "break-all" }}>{val}</span>
                </div>
              ))}
            </T17CardBlock>

            <T17CardBlock>
              <div
                style={{
                  fontWeight: "700",

                  color: BRAND,
                  marginBottom: "6px",
                }}
              >
                Languages
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {languages.map((l, i) => (
                  <T17Chip key={i} label={l?.name} />
                ))}
              </div>
            </T17CardBlock>

            <T17CardBlock>
              <div
                style={{
                  fontWeight: "700",

                  color: BRAND,
                  marginBottom: "6px",
                }}
              >
                Skills & Tools
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {[...(knowledges || []), ...(softwares || [])].map((x, i) => (
                  <T17Chip key={i} label={x?.name} />
                ))}
              </div>
            </T17CardBlock>

            <T17CardBlock>
              <div
                style={{
                  fontWeight: "700",

                  color: BRAND,
                  marginBottom: "6px",
                }}
              >
                Culture & Personality
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {[...(cultures || []), ...(personalities || [])].map((x, i) => (
                  <T17Chip key={i} label={x?.name} />
                ))}
              </div>
            </T17CardBlock>
          </div>

          {/* Right */}
          <div>
            <T17SectionCard title="About Me" brand={BRAND}>
              <p
                style={{
                  color: "#6b7280",

                  margin: 0,
                  textAlign: "justify",
                }}
              >
                {summary}
              </p>
            </T17SectionCard>

            <T17SectionCard title="Experience" brand={BRAND}>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    boxShadow: "0 1px 2px rgba(0,0,0,.06)",
                    borderLeft: `5px solid ${BRAND}`,
                    padding: "6px 10px",
                  }}
                >
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
                    style={{ margin: 0, paddingLeft: "14px", color: "#374151" }}
                  />
                </div>
              ))}
            </T17SectionCard>

            <T17SectionCard title="Education" brand={BRAND}>
              {educations.map((edu, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    borderLeft: `5px solid ${BRAND}`,
                    padding: "6px 10px",
                    boxShadow: "0 1px 2px rgba(0,0,0,.06)",
                  }}
                >
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
            </T17SectionCard>

            {referees.length > 0 && (
              <T17SectionCard title="Referees" brand={BRAND}>
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "8px",
                      borderLeft: `5px solid ${BRAND}`,
                      padding: "6px 10px",
                      boxShadow: "0 1px 2px rgba(0,0,0,.06)",
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
              </T17SectionCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
