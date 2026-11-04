import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T55SidebarSectionProps {
  title: string;
  children: ReactNode;
}

function T55SidebarSection({ title, children }: T55SidebarSectionProps) {
  const LIGHT_TEXT = "#f7fff9";
  const SIDEBAR_SOFT = "rgba(255,255,255,.28)";
  return (
    <div style={{ marginBottom: "14px" }}>
      <h2
        style={{
          fontWeight: "600",
          lineHeight: "none",
          color: LIGHT_TEXT,
          margin: "0 0 5px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          height: "1px",
          width: "100%",
          background: SIDEBAR_SOFT,
          marginBottom: "8px",
        }}
      />
      {children}
    </div>
  );
}

interface T55MainSectionProps {
  title: string;
  children: ReactNode;
}

function T55MainSection({ title, children }: T55MainSectionProps) {
  const ACCENT = "#32bb78";
  const HEADING = "#1f2730";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          alignItems: "flex-end",
          gap: "10px",
          marginBottom: "8px",
        }}
      >
        <h2
          style={{
            fontWeight: "600",
            lineHeight: "none",
            color: HEADING,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div
          style={{ height: "1px", marginBottom: "1px", background: ACCENT }}
        />
      </div>
      {children}
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface Experience {
  dates: string;
  position: string;
  organization: string;
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

interface Template55Profile {
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

interface Template55Props {
  profile: Template55Profile;
}

export default function Template55({ profile }: Template55Props) {
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
  const ACCENT = "#32bb78";
  const PAGE = "#f5fbf7";
  const HEADING = "#1f2730";
  const TEXT = "#2d3642";
  const MUTED = "#617083";
  const LIGHT_TEXT = "#f7fff9";

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
        color: TEXT,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: PAGE,
        overflow: "hidden",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: "16px",
          height: "100%",
        }}
      >
        {/* Green sidebar */}
        <div
          style={{
            background: ACCENT,
            borderRadius: "6px 16px 16px 6px",
            padding: "16px 14px 60px",
            color: "#fff",
            overflow: "hidden",
          }}
        >
          {/* Circular photo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #fff",
                background: "#fff",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/80x80?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/80x80?text=Photo")
                }
              />
            </div>
          </div>
          {/* Name + title */}
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <h1
              style={{
                fontSize: "14px",
                fontWeight: "600",

                color: "#fff",
                margin: "0 0 3px",
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </h1>
            {current_position && (
              <p
                style={{
                  fontWeight: "500",
                  color: LIGHT_TEXT,
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            )}
          </div>

          {educations.length > 0 && (
            <T55SidebarSection title="Education">
              {educations.map((edu, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <h3
                    style={{
                      fontWeight: "900",
                      color: "#fff",
                      margin: "0 0 1px",
                    }}
                  >
                    {edu?.level || "Education"}
                  </h3>
                  {edu?.college && (
                    <p
                      style={{
                        color: LIGHT_TEXT,
                        margin: "0 0 1px",
                      }}
                    >
                      {edu.college}
                    </p>
                  )}
                  {edu?.dates && (
                    <p
                      style={{
                        color: LIGHT_TEXT,
                        margin: 0,
                      }}
                    >
                      {edu.dates}
                    </p>
                  )}
                </div>
              ))}
            </T55SidebarSection>
          )}

          {[
            [<IconPhone />, phone],
            [<IconMail />, email],
            [<IconMapPin />, location],
          ].filter(([, v]) => v).length > 0 && (
            <T55SidebarSection title="Contact">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
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
                      <span
                        style={{
                          color: LIGHT_TEXT,
                          marginTop: "1px",
                          flexShrink: 0,
                        }}
                      >
                        {icon}
                      </span>
                      <span
                        style={{
                          color: LIGHT_TEXT,
                          wordBreak: "break-all",
                        }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
              </div>
            </T55SidebarSection>
          )}
        </div>

        {/* Main */}
        <div style={{ padding: "14px 4px 60px 4px", overflow: "hidden" }}>
          {summary && (
            <T55MainSection title="About Me">
              <p style={{ color: TEXT }}>{summary}</p>
            </T55MainSection>
          )}

          {experiences.length > 0 && (
            <T55MainSection title="Work Experience">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "50px 1fr",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        color: MUTED,
                        paddingTop: "1px",
                      }}
                    >
                      {exp?.dates || "-"}
                    </div>
                    <div
                      style={{
                        borderLeft: `2px solid ${ACCENT}`,
                        paddingLeft: "10px",
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: "900",
                          color: HEADING,
                          margin: "0 0 1px",
                        }}
                      >
                        {exp?.position || "Experience"}
                      </h3>
                      {exp?.organization && (
                        <p
                          style={{
                            fontWeight: "500",
                            color: TEXT,
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
                        style={{ margin: 0, paddingLeft: "14px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </T55MainSection>
          )}

          {swList.length > 0 && (
            <T55MainSection title="Software">
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "14px",
                  margin: 0,

                  color: TEXT,
                }}
              >
                {swList.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </T55MainSection>
          )}

          {/* 2-col grid for skills etc */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 20px",
            }}
          >
            {skills.length > 0 && (
              <T55MainSection title="Skills">
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: TEXT,
                  }}
                >
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </T55MainSection>
            )}
            {langList.length > 0 && (
              <T55MainSection title="Languages">
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: TEXT,
                  }}
                >
                  {langList.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </T55MainSection>
            )}
            {cultList.length > 0 && (
              <T55MainSection title="Culture Fit">
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: TEXT,
                  }}
                >
                  {cultList.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </T55MainSection>
            )}
            {persList.length > 0 && (
              <T55MainSection title="Personality">
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: TEXT,
                  }}
                >
                  {persList.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </T55MainSection>
            )}
          </div>

          {referees.length > 0 && (
            <T55MainSection title="References">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: "8px",
                      padding: "8px 10px",
                      background: "rgba(255,255,255,.3)",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "900",
                        color: HEADING,
                        margin: "0 0 2px",
                      }}
                    >
                      {r?.fullName || "-"}
                    </h3>
                    {[r?.position, r?.company].filter(Boolean).join(" | ") && (
                      <p
                        style={{
                          color: TEXT,
                          margin: "0 0 3px",
                        }}
                      >
                        {[r?.position, r?.company].filter(Boolean).join(" | ")}
                      </p>
                    )}
                    {r?.phone && (
                      <p
                        style={{
                          color: TEXT,
                          margin: 0,
                        }}
                      >
                        {r.phone}
                      </p>
                    )}
                    {r?.email && (
                      <p
                        style={{
                          color: TEXT,
                          margin: 0,
                          wordBreak: "break-all",
                        }}
                      >
                        {r.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </T55MainSection>
          )}
        </div>
      </div>
    </div>
  );
}
