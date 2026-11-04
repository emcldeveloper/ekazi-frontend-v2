import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

const DARK = "#2d2d2d";

interface T64DiamondProps {
  label?: string;
}

function T64Diamond({ label }: T64DiamondProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          width: "6px",
          height: "6px",
          transform: "rotate(45deg)",
          background: DARK,
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

interface T64SectionHeaderProps {
  icon: ReactNode;
  title: string;
  dark?: boolean;
}

function T64SectionHeader({ icon, title, dark }: T64SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        paddingLeft: "6px",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: dark ? "#fff" : DARK,
          flexShrink: 0,
        }}
      >
        <span style={{ color: dark ? DARK : "#fff" }}>{icon}</span>
      </div>
      <h2
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: dark ? "#fff" : "#374151",
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
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template64Profile {
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

interface Template64Props {
  profile: Template64Profile;
}

export default function Template64({ profile }: Template64Props) {
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
        color: "#374151",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        {/* Left column */}
        <div
          style={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            background: "#eaeaea",
          }}
        >
          {/* Dark top section */}
          <div
            style={{
              position: "relative",
              background: DARK,
              padding: "20px 16px 70px",
              textAlign: "center",
            }}
          >
            {fullName && (
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  letterSpacing: "tight",
                  color: "#fff",
                  margin: "0 0 3px",
                  wordBreak: "break-word",
                }}
              >
                {fullName}
              </h1>
            )}
            {current_position && (
              <p
                style={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: ".25em",
                  color: "rgba(255,255,255,.8)",
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            )}
            {/* Floating circular photo */}
            <div
              style={{
                position: "absolute",
                bottom: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "10px solid #fff",
                background: "#fff",
                boxShadow: "0 4px 14px rgba(0,0,0,.15)",
                zIndex: 10,
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/120x120?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/120x120?text=Photo")
                }
              />
            </div>
          </div>

          {/* Contact */}
          <div style={{ padding: "72px 16px 10px" }}>
            <T64SectionHeader
              icon={<IconPhone />}
              title="Contact Me"
              dark={false}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                paddingLeft: "10px",
              }}
            >
              {[
                [<IconPhone />, phone],
                [<IconMapPin />, location],
                [<IconMail />, email],
              ]
                .filter(([, v]) => v)
                .map(([icon, val], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "5px",

                      fontWeight: "700",
                      color: "#374151",
                    }}
                  >
                    <span
                      style={{ color: DARK, flexShrink: 0, marginTop: "1px" }}
                    >
                      {icon}
                    </span>
                    <span style={{ wordBreak: "break-all" }}>{val}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Dark rounded bottom */}
          <div
            style={{
              flex: 1,
              borderRadius: "36px 36px 0 0",
              background: DARK,
              padding: "16px 16px 60px",
              overflow: "hidden",
            }}
          >
            {educations.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <T64SectionHeader icon="🎓" title="Education" dark />
                <div
                  style={{
                    paddingLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {educations.map((edu, i) => (
                    <div key={i}>
                      {edu?.college && (
                        <h3
                          style={{
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "#fff",
                            margin: "0 0 1px",
                          }}
                        >
                          {edu.college}
                        </h3>
                      )}
                      {edu?.level && (
                        <p
                          style={{
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,.6)",
                            margin: "0 0 1px",
                          }}
                        >
                          {edu.level}
                        </p>
                      )}
                      {edu?.dates && (
                        <p
                          style={{
                            color: "rgba(255,255,255,.6)",
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
                <T64SectionHeader icon="👤" title="References" dark />
                <div
                  style={{
                    paddingLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {referees.map((r, i) => (
                    <div key={i}>
                      {r?.fullName && (
                        <h3
                          style={{
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "#fff",
                            margin: "0 0 1px",
                          }}
                        >
                          {r.fullName}
                        </h3>
                      )}
                      {r?.company && (
                        <p
                          style={{
                            color: "rgba(255,255,255,.6)",
                            margin: 0,
                          }}
                        >
                          {r.company}
                        </p>
                      )}
                      {r?.position && (
                        <p
                          style={{
                            color: "rgba(255,255,255,.6)",
                            margin: 0,
                          }}
                        >
                          {r.position}
                        </p>
                      )}
                      {r?.phone && (
                        <p
                          style={{
                            color: "rgba(255,255,255,.6)",
                            margin: 0,
                          }}
                        >
                          Tel: {r.phone}
                        </p>
                      )}
                      {r?.email && (
                        <p
                          style={{
                            color: "rgba(255,255,255,.6)",
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
        </div>

        {/* Right main */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "16px 18px 60px",
            overflow: "hidden",
          }}
        >
          {summary && (
            <div style={{ marginBottom: "14px" }}>
              <T64SectionHeader icon="👤" title="About Me" />
              <p
                style={{
                  fontWeight: "500",

                  color: "#4b5563",
                  paddingLeft: "6px",
                }}
              >
                {summary}
              </p>
            </div>
          )}

          {experiences.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <T64SectionHeader icon="💼" title="Job Experience" />
              <div
                style={{
                  paddingLeft: "6px",
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
                      {exp?.position && (
                        <h3
                          style={{
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "#111827",
                            margin: 0,
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
                          textTransform: "uppercase",
                          color: "#6b7280",
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
                        color: "#4b5563",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(skills.length > 0 || swList.length > 0) && (
            <div style={{ marginBottom: "14px" }}>
              <T64SectionHeader icon="⚙️" title="Skills" />
              <div
                style={{
                  paddingLeft: "6px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px 20px",
                }}
              >
                {skills.length > 0 && (
                  <div>
                    <h3
                      style={{
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: ".15em",
                        color: "#6b7280",
                        margin: "0 0 6px",
                      }}
                    >
                      Skills
                    </h3>
                    {skills.map((s, i) => (
                      <T64Diamond key={i} label={s} />
                    ))}
                  </div>
                )}
                {swList.length > 0 && (
                  <div>
                    <h3
                      style={{
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: ".15em",
                        color: "#6b7280",
                        margin: "0 0 6px",
                      }}
                    >
                      Software
                    </h3>
                    {swList.map((s, i) => (
                      <T64Diamond key={i} label={s} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {(langList.length > 0 ||
            cultList.length > 0 ||
            persList.length > 0) && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 20px",
                paddingLeft: "6px",
              }}
            >
              {langList.length > 0 && (
                <div>
                  <T64SectionHeader icon="🌐" title="Languages" />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "4px 8px",
                    }}
                  >
                    {langList.map((l, i) => (
                      <T64Diamond key={i} label={l} />
                    ))}
                  </div>
                </div>
              )}
              {(cultList.length > 0 || persList.length > 0) && (
                <div>
                  <T64SectionHeader icon="❤️" title="Culture Fit" />
                  {cultList.map((c, i) => (
                    <T64Diamond key={i} label={c} />
                  ))}
                  {persList.length > 0 && (
                    <>
                      <h3
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: ".15em",
                          color: "#6b7280",
                          margin: "8px 0 4px",
                        }}
                      >
                        Personality
                      </h3>
                      {persList.map((p, i) => (
                        <T64Diamond key={i} label={p} />
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
