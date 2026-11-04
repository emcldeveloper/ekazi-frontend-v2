import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T15SectionCardProps {
  title: string;
  children: ReactNode;
}

function T15SectionCard({ title, children }: T15SectionCardProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <h4 style={{ fontWeight: "700", margin: "0 0 8px" }}>{title}</h4>
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

interface Template15Profile {
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

interface Template15Props {
  profile: Template15Profile;
}

export default function Template15({ profile }: Template15Props) {
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
  const ORANGE = "#f97316";

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
      {/* Orange banner */}
      <div style={{ background: ORANGE, color: "#fff", padding: "16px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 2px" }}
            >
              {fullName}
            </h2>
            <div
              style={{
                fontWeight: "300",
                marginBottom: "8px",
              }}
            >
              {current_position}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",

                opacity: 0.95,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <IconPhone /> {phone}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <IconMail /> {email}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <IconMapPin /> {location}
              </span>
            </div>
          </div>
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
              border: "3px solid rgba(255,255,255,.95)",
              objectFit: "cover",
              flexShrink: 0,
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
            }
          />
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 4fr",
          height: "calc(100% - 110px)",
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: "14px 16px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <T15SectionCard title="About Me">
            <p
              style={{
                color: "#6b7280",
                margin: 0,
              }}
            >
              {summary}
            </p>
          </T15SectionCard>

          <T15SectionCard title="Experience">
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "10px",
                  borderRadius: "8px",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                  borderLeft: `5px solid ${ORANGE}`,
                }}
              >
                <div style={{ padding: "8px 12px" }}>
                  <div style={{ fontWeight: "600" }}>
                    {exp.position}
                    <span style={{ color: "#6b7280", fontWeight: 400 }}>
                      {" "}
                      @ {exp.organization}
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
              </div>
            ))}
          </T15SectionCard>

          <T15SectionCard title="Education">
            {educations.map((edu, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  borderRadius: "8px",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                  borderLeft: `5px solid ${ORANGE}`,
                }}
              >
                <div style={{ padding: "8px 12px" }}>
                  <div style={{ fontWeight: "600" }}>{edu.level}</div>
                  <div>{edu.college}</div>
                  <div style={{ color: "#6b7280" }}>{edu.dates}</div>
                </div>
              </div>
            ))}
          </T15SectionCard>
        </div>

        {/* Right */}
        <div
          style={{
            padding: "14px 14px 14px 0",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <T15SectionCard title="Languages">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {languages.map((l, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    maxWidth: "100%",
                    borderRadius: "20px",
                    background: ORANGE,
                    padding: "2px 10px",

                    color: "#fff",
                    textTransform: "capitalize",
                  }}
                >
                  {l.name}
                </span>
              ))}
            </div>
          </T15SectionCard>

          <T15SectionCard title="Skills & Tools">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {([
                ...knowledges.map((x) => ({ n: x.name, bg: "#475569" })),
                ...softwares.map((x) => ({ n: x.name, bg: "#111827" })),
                ...cultures.map((x) => ({ n: x.name, bg: ORANGE })),
                ...personalities.map((x) => ({
                  n: x.name,
                  bg: "#bae6fd",
                  color: "#0c4a6e",
                })),
              ] as { n: string; bg: string; color?: string }[]).map((x, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    maxWidth: "100%",
                    borderRadius: "20px",
                    background: x.bg,
                    padding: "2px 10px",

                    color: x.color || "#fff",
                    textTransform: "capitalize",
                    wordBreak: "break-word",
                  }}
                >
                  {x.n}
                </span>
              ))}
            </div>
          </T15SectionCard>

          {referees.length > 0 && (
            <T15SectionCard title="Referees">
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    borderRadius: "8px",
                    background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                    borderLeft: `5px solid ${ORANGE}`,
                  }}
                >
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                    <div style={{ color: "#6b7280" }}>{r.position}</div>
                    <div>{r.company}</div>
                    <div>{r.phone}</div>
                    <div>{r.email}</div>
                  </div>
                </div>
              ))}
            </T15SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
