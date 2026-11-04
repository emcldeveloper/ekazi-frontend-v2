import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

const SLATE = "#3d5a6c";

interface T63SectionPillProps {
  title: string;
}

function T63SectionPill({ title }: T63SectionPillProps) {
  return (
    <div
      style={{
        display: "inline-block",
        borderRadius: "0 999px 999px 0",
        background: SLATE,
        padding: "4px 28px 4px 16px",
        marginBottom: "10px",
      }}
    >
      <h2
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".2em",
          color: "#fff",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface Experience {
  organization: string;
  position: string;
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

interface Template63Profile {
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

interface Template63Props {
  profile: Template63Profile;
}

export default function Template63({ profile }: Template63Props) {
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
      }}
    >
      {/* Slate header — name right-aligned */}
      <div
        style={{
          position: "relative",
          display: "flex",
          height: "90px",
          alignItems: "center",
          justifyContent: "flex-end",
          background: SLATE,
          paddingRight: "20px",
        }}
      >
        <div style={{ textAlign: "right", color: "#fff" }}>
          {fullName && (
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: ".12em",
                margin: "0 0 4px",
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </h1>
          )}
          {current_position && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <div
                style={{
                  height: "1px",
                  width: "50px",
                  background: "rgba(255,255,255,.5)",
                }}
              />
              <p
                style={{
                  fontWeight: "300",
                  textTransform: "uppercase",
                  letterSpacing: ".3em",
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", height: "calc(100% - 90px)" }}>
        {/* Left */}
        <div
          style={{
            width: "38%",
            position: "relative",
            paddingTop: "16px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: "80px",
              bottom: "12px",
              width: "1px",
              background: "#e5e7eb",
              zIndex: 0,
            }}
          />

          {/* Floating circular pill card */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 8px",
              borderRadius: "999px",
              border: "1px solid #e5e7eb",
              background: "#fff",
              padding: "16px 14px 20px",
              boxShadow: "0 1px 4px rgba(0,0,0,.06)",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #fff",
                boxShadow: "0 2px 8px rgba(0,0,0,.1)",
                marginBottom: "12px",
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
            {[
              [<IconMail />, email],
              [<IconPhone />, phone],
              [<IconMapPin />, location],
            ]
              .filter(([, v]) => v)
              .map(([icon, val], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: SLATE }}>{icon}</span>
                  <span
                    style={{
                      color: "#6b7280",
                      textAlign: "center",
                      wordBreak: "break-all",
                      maxWidth: "120px",
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              paddingLeft: "12px",
              paddingTop: "14px",
              paddingRight: "8px",
              overflow: "hidden",
            }}
          >
            {educations.length > 0 && (
              <div style={{ marginBottom: "12px" }}>
                <T63SectionPill title="Education" />
                {educations.map((edu, i) => (
                  <div
                    key={i}
                    style={{ marginBottom: "8px", paddingLeft: "4px" }}
                  >
                    {edu?.level && (
                      <p
                        style={{
                          fontWeight: "700",
                          color: "#374151",
                          margin: "0 0 1px",
                        }}
                      >
                        {edu.level}
                      </p>
                    )}
                    {edu?.college && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "6px",

                          fontStyle: "italic",
                          color: "#6b7280",
                        }}
                      >
                        <span style={{ wordBreak: "break-word" }}>
                          {edu.college}
                        </span>
                        <span style={{ flexShrink: 0 }}>{edu?.dates}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T63SectionPill title="Skills" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "16px",
                    margin: 0,

                    color: "#6b7280",
                  }}
                >
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {langList.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T63SectionPill title="Languages" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "16px",
                    margin: 0,

                    color: "#6b7280",
                  }}
                >
                  {langList.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
            {swList.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T63SectionPill title="Software" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "16px",
                    margin: 0,

                    color: "#6b7280",
                  }}
                >
                  {swList.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {cultList.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T63SectionPill title="Culture Fit" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "16px",
                    margin: 0,

                    color: "#6b7280",
                  }}
                >
                  {cultList.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            {persList.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T63SectionPill title="Personality" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "16px",
                    margin: 0,

                    color: "#6b7280",
                  }}
                >
                  {persList.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", background: "#e5e7eb", flexShrink: 0 }} />

        {/* Right */}
        <div
          style={{
            flex: 1,
            position: "relative",
            paddingTop: "14px",
            paddingLeft: "16px",
            paddingRight: "14px",
            paddingBottom: "60px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: "18px",
              bottom: "16px",
              width: "1px",
              background: "#e5e7eb",
              zIndex: 0,
            }}
          />

          {summary && (
            <div
              style={{ position: "relative", zIndex: 10, marginBottom: "14px" }}
            >
              <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                <T63SectionPill title="About Me" />
              </div>
              <p
                style={{
                  color: "#6b7280",
                  paddingLeft: "14px",
                }}
              >
                {summary}
              </p>
            </div>
          )}

          {experiences.length > 0 && (
            <div
              style={{ position: "relative", zIndex: 10, marginBottom: "14px" }}
            >
              <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                <T63SectionPill title="Experience" />
              </div>
              <div
                style={{
                  paddingLeft: "14px",
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
                        marginBottom: "2px",
                      }}
                    >
                      <div>
                        {exp?.organization && (
                          <h3
                            style={{
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "#374151",
                              margin: "0 0 1px",
                            }}
                          >
                            {exp.organization}
                          </h3>
                        )}
                        {exp?.position && (
                          <p
                            style={{
                              fontStyle: "italic",
                              color: "#6b7280",
                              margin: 0,
                            }}
                          >
                            {exp.position}
                          </p>
                        )}
                      </div>
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

          {referees.length > 0 && (
            <div style={{ position: "relative", zIndex: 10 }}>
              <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
                <T63SectionPill title="References" />
              </div>
              <div
                style={{
                  paddingLeft: "14px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {referees.map((r, i) => (
                  <div key={i}>
                    {r?.fullName && (
                      <h3
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#374151",
                          margin: "0 0 1px",
                        }}
                      >
                        {r.fullName}
                      </h3>
                    )}
                    {[r?.position, r?.company].filter(Boolean).join(" | ") && (
                      <p
                        style={{
                          fontStyle: "italic",
                          color: "#6b7280",
                          margin: "0 0 2px",
                        }}
                      >
                        {[r?.position, r?.company].filter(Boolean).join(" | ")}
                      </p>
                    )}
                    {r?.phone && (
                      <p
                        style={{
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        {r.phone}
                      </p>
                    )}
                    {r?.email && (
                      <p
                        style={{
                          color: "#6b7280",
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
