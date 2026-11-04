import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T36SectionProps {
  title: string;
  children: ReactNode;
}

function T36Section({ title, children }: T36SectionProps) {
  const ACCENT = "#0b3d6d";
  const RULE = "#6b89a7";
  return (
    <div style={{ marginTop: "18px" }}>
      <div
        style={{
          marginBottom: "10px",
          borderBottom: `1px solid ${RULE}`,
          paddingBottom: "4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: ".03em",
              color: ACCENT,
            }}
          >
            {title}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

interface T36RefereeCardProps {
  r: Referee;
}

function T36RefereeCard({ r }: T36RefereeCardProps) {
  const ACCENT = "#0b3d6d";
  const fullName = r?.fullName || "-";
  const role = [r?.position, r?.company].filter(Boolean).join(" | ");
  return (
    <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: "10px" }}>
      <div style={{ fontWeight: "700" }}>{fullName}</div>
      {role && <div style={{ color: "#5b6572", marginTop: "2px" }}>{role}</div>}
      {r?.phone && <div style={{ marginTop: "3px" }}>Phone: {r.phone}</div>}
      {r?.email && <div>Email: {r.email}</div>}
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

interface Template36Profile {
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
  languages: NamedItem[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template36Props {
  profile: Template36Profile;
}

export default function Template36({ profile }: Template36Props) {
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
    languages,
    cultures,
    personalities,
    referees,
    profile: profileInfo,
  } = profile;
  const ACCENT = "#0b3d6d";
  const MUTED = "#5b6572";

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
        color: "#1f2933",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fcfcfb",
        overflow: "hidden",
      }}
    >
      {/* Header: rectangular photo + name */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "90px 1fr",
          alignItems: "flex-start",
          gap: "18px",
          padding: "16px 20px 14px",
        }}
      >
        <div
          style={{
            height: "110px",
            width: "90px",
            overflow: "hidden",
            background: "#d2d7dc",
            flexShrink: 0,
          }}
        >
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/90x110?text=Photo"
            }
            alt="profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/90x110?text=Photo")
            }
          />
        </div>
        <div style={{ paddingTop: "2px" }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: ".02em",
              color: ACCENT,
              margin: "0 0 4px",
              lineHeight: 1.02,
              wordBreak: "break-word",
            }}
          >
            {fullName}
          </h1>
          {current_position && (
            <p
              style={{
                fontWeight: "500",
                color: MUTED,
                margin: "0 0 10px",
              }}
            >
              {current_position}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {([
              [<IconMapPin />, "Address", location],
              [<IconPhone />, "Phone", phone],
              [<IconMail />, "Email", email],
            ] as [ReactNode, string, string][])
              .filter(([, , v]) => v)
              .map(([icon, label, val]) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "14px 70px 1fr",
                    gap: "8px",
                  }}
                >
                  <span style={{ color: ACCENT, marginTop: "1px" }}>
                    {icon}
                  </span>
                  <span style={{ fontWeight: "700" }}>{label}:</span>
                  <span style={{ wordBreak: "break-word" }}>{val}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "0 20px 14px",
          overflow: "hidden",
          height: "calc(100% - 160px)",
        }}
      >
        {summary && (
          <T36Section title="Summary">
            <p
              style={{
                color: "#1f2933",
                textAlign: "justify",
              }}
            >
              {summary}
            </p>
          </T36Section>
        )}

        {experiences.length > 0 && (
          <T36Section title="Work Experience">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {experiences.map((exp, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "900",

                        margin: 0,
                      }}
                    >
                      {[exp?.position, exp?.organization]
                        .filter(Boolean)
                        .join(", ")}
                    </h3>
                    {exp?.dates && (
                      <span
                        style={{
                          flexShrink: 0,

                          fontWeight: "700",
                          textAlign: "right",
                        }}
                      >
                        {exp.dates}
                      </span>
                    )}
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
            </div>
          </T36Section>
        )}

        {educations.length > 0 && (
          <T36Section title="Education">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {educations.map((edu, i) => {
                const title = edu?.level || edu?.college || "Education";
                const sub = title === edu?.college ? "" : edu?.college;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "900" }}>{title}</div>
                      {sub && (
                        <div
                          style={{
                            color: MUTED,
                            marginTop: "1px",
                          }}
                        >
                          {sub}
                        </div>
                      )}
                    </div>
                    {edu?.dates && (
                      <span
                        style={{
                          flexShrink: 0,

                          fontWeight: "700",
                        }}
                      >
                        {edu.dates}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </T36Section>
        )}

        {skills.length > 0 && (
          <T36Section title="Skills">
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "16px",
                margin: 0,
              }}
            >
              {skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </T36Section>
        )}
        {swList.length > 0 && (
          <T36Section title="Software">
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "16px",
                margin: 0,
              }}
            >
              {swList.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </T36Section>
        )}
        {langList.length > 0 && (
          <T36Section title="Languages">
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "16px",
                margin: 0,
              }}
            >
              {langList.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </T36Section>
        )}
        {cultList.length > 0 && (
          <T36Section title="Culture Fit">
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "16px",
                margin: 0,
              }}
            >
              {cultList.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </T36Section>
        )}
        {persList.length > 0 && (
          <T36Section title="Personality">
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "16px",
                margin: 0,
              }}
            >
              {persList.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </T36Section>
        )}

        {referees.length > 0 && (
          <T36Section title="References">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {referees.map((r, i) => (
                <T36RefereeCard key={i} r={r} />
              ))}
            </div>
          </T36Section>
        )}
      </div>
    </div>
  );
}
