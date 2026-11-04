import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

const TEAL = "#15a39a";

interface T69SectionHeaderProps {
  icon: ReactNode;
  title: string;
}

function T69SectionHeader({ icon, title }: T69SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          background: TEAL,
          padding: "4px",
          color: "#fff",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <h2
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: "#333",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

interface T69BulletDotProps {
  label?: string;
}

function T69BulletDot({ label }: T69BulletDotProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: TEAL,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".05em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

interface T69ListPanelProps {
  icon: ReactNode;
  title: string;
  items: string[];
}

function T69ListPanel({ icon, title, items }: T69ListPanelProps) {
  if (!items.length) return null;
  return (
    <div style={{ marginBottom: "10px" }}>
      <T69SectionHeader icon={icon} title={title} />
      <div
        style={{ height: "1px", background: "#e5e7eb", marginBottom: "6px" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {items.map((item, i) => (
          <T69BulletDot key={i} label={item} />
        ))}
      </div>
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface Experience {
  position: string;
  dates: string;
  organization: string;
  responsibility: string;
}

interface Education {
  college: string;
  level: string;
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

interface Template69Profile {
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

interface Template69Props {
  profile: Template69Profile;
}

export default function Template69({ profile }: Template69Props) {
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

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
        color: "#333",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        border: `10px solid ${TEAL}`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "38% 62%",
          height: "100%",
        }}
      >
        {/* Left sidebar — teal light */}
        <div
          style={{
            background: "#d5ecea",
            padding: "16px 14px 60px",
            overflow: "hidden",
          }}
        >
          {/* Name + title */}
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            {fullName && (
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "tight",
                  lineHeight: "none",
                  color: "#333",
                  margin: "0 0 4px",
                  wordBreak: "break-word",
                }}
              >
                {fullName}
              </h1>
            )}
            {current_position && (
              <p
                style={{
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: ".2em",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            )}
          </div>
          {/* Circular photo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "5px solid #fff",
                boxShadow: "0 2px 8px rgba(0,0,0,.1)",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/90x90?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/90x90?text=Photo")
                }
              />
            </div>
          </div>

          {/* Contact */}
          {[
            [<IconPhone />, phone],
            [<IconMail />, email],
            [<IconMapPin />, location],
          ].filter(([, v]) => v).length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T69SectionHeader icon={<IconPhone />} title="Contact" />
              <div
                style={{
                  height: "1px",
                  background: "#9ca3af",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {[
                  [<IconPhone />, phone],
                  [<IconMail />, email],
                  [<IconMapPin />, location],
                ]
                  .filter(([, v]) => v)
                  .map(([icon, val], i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "5px",
                      }}
                    >
                      <span style={{ color: TEAL, flexShrink: 0 }}>{icon}</span>
                      <span style={{ wordBreak: "break-all" }}>{val}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T69SectionHeader icon="🎓" title="Education" />
              <div
                style={{
                  height: "1px",
                  background: "#9ca3af",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {educations.map((edu, i) => (
                  <div key={i}>
                    {edu?.college && (
                      <h3
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#333",
                          margin: "0 0 1px",
                        }}
                      >
                        {edu.college}
                      </h3>
                    )}
                    {edu?.level && (
                      <p
                        style={{
                          fontWeight: "500",
                          textTransform: "uppercase",
                          color: "#6b7280",
                          margin: "0 0 1px",
                        }}
                      >
                        {edu.level}
                      </p>
                    )}
                    {edu?.dates && (
                      <p
                        style={{
                          color: "#9ca3af",
                          margin: 0,
                        }}
                      >
                        {edu.dates}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {referees.length > 0 && (
            <div>
              <T69SectionHeader icon="👥" title="References" />
              <div
                style={{
                  height: "1px",
                  background: "#9ca3af",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {referees.map((r, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    {r?.fullName && (
                      <h3
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#333",
                          margin: "0 0 1px",
                        }}
                      >
                        {r.fullName}
                      </h3>
                    )}
                    {r?.position && <p style={{ margin: 0 }}>{r.position}</p>}
                    {r?.company && <p style={{ margin: 0 }}>{r.company}</p>}
                    {r?.phone && <p style={{ margin: 0 }}>Tel: {r.phone}</p>}
                    {r?.email && (
                      <p
                        style={{
                          margin: 0,
                          wordBreak: "break-all",
                        }}
                      >
                        Email: {r.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right main */}
        <div style={{ padding: "16px 16px 60px", overflow: "hidden" }}>
          {summary && (
            <div style={{ marginBottom: "12px" }}>
              <T69SectionHeader icon="👤" title="About Me" />
              <div
                style={{
                  height: "1px",
                  background: "#e5e7eb",
                  marginBottom: "6px",
                }}
              />
              <p
                style={{
                  color: "#6b7280",
                }}
              >
                {summary}
              </p>
            </div>
          )}

          {experiences.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T69SectionHeader icon="💼" title="Job Experience" />
              <div
                style={{
                  height: "1px",
                  background: "#e5e7eb",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "6px",
                      }}
                    >
                      {exp?.position && (
                        <h3
                          style={{
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "#333",
                            margin: "0 0 1px",
                          }}
                        >
                          {exp.position}
                        </h3>
                      )}
                      {exp?.dates && (
                        <span
                          style={{
                            flexShrink: 0,

                            fontWeight: "700",
                            color: "#6b7280",
                          }}
                        >
                          {exp.dates}
                        </span>
                      )}
                    </div>
                    {exp?.organization && (
                      <p
                        style={{
                          fontWeight: "700",
                          fontStyle: "italic",
                          color: TEAL,
                          margin: "0 0 3px",
                        }}
                      >
                        {exp.organization}
                      </p>
                    )}
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
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T69SectionHeader icon="⚙️" title="Skills" />
              <div
                style={{
                  height: "1px",
                  background: "#e5e7eb",
                  marginBottom: "6px",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "4px 20px",
                }}
              >
                {skills.map((s, i) => (
                  <T69BulletDot key={i} label={s} />
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 20px",
            }}
          >
            <T69ListPanel icon="🌐" title="Languages" items={langList} />
            <T69ListPanel icon="💻" title="Software" items={swList} />
            <T69ListPanel icon="❤️" title="Culture Fit" items={cultList} />
            <T69ListPanel icon="✨" title="Personality" items={persList} />
          </div>
        </div>
      </div>
    </div>
  );
}
