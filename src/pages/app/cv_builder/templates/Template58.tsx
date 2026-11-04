import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T58ContentGroupProps {
  title: string;
  items: string[];
}

function T58ContentGroup({ title, items }: T58ContentGroupProps) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h3
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".18em",
          color: "rgba(255,255,255,.9)",
          textAlign: "center",
          margin: "0 0 6px",
        }}
      >
        {title}
      </h3>
      <ul
        style={{
          listStyle: "disc",
          paddingLeft: "14px",
          margin: 0,

          color: "#fff",
        }}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
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
  dates: string;
  level: string;
  college: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template58Profile {
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
  profile: ProfileInfo;
}

interface Template58Props {
  profile: Template58Profile;
}

export default function Template58({ profile }: Template58Props) {
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
    profile: profileInfo,
  } = profile;
  const DARK_TEAL = "#0a3d44";
  const TEXT = "#374151";

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
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 7fr",
          height: "100%",
        }}
      >
        {/* Left */}
        <div
          style={{
            background: "#fff",
            padding: "16px 20px 14px",
            overflow: "hidden",
          }}
        >
          <div style={{ marginBottom: "14px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "900",
                letterSpacing: "tight",
                color: "#000",
                margin: "0 0 2px",
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </h1>
            {current_position && (
              <p
                style={{
                  fontWeight: "500",
                  letterSpacing: ".2em",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            )}
          </div>

          {educations.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: DARK_TEAL,
                  borderRadius: "999px",
                  padding: "4px 14px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#fff",
                  }}
                >
                  Education
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {educations.map((edu, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontWeight: "700",
                        color: "#6b7280",
                      }}
                    >
                      {edu?.dates}
                    </div>
                    <div
                      style={{
                        fontWeight: "900",
                        color: "#000",
                      }}
                    >
                      {edu?.level}
                    </div>
                    <div
                      style={{
                        color: "#6b7280",
                      }}
                    >
                      {edu?.college}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {experiences.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: DARK_TEAL,
                  borderRadius: "999px",
                  padding: "4px 14px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#fff",
                  }}
                >
                  Experience
                </span>
              </div>
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
                        fontWeight: "700",
                        color: "#6b7280",
                      }}
                    >
                      {exp?.dates}
                    </div>
                    <div
                      style={{
                        fontWeight: "900",
                        color: "#000",
                      }}
                    >
                      {exp?.position}
                    </div>
                    <div
                      style={{
                        color: "#6b7280",
                        marginBottom: "3px",
                      }}
                    >
                      {exp?.organization}
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

          {langList.length > 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: DARK_TEAL,
                  borderRadius: "999px",
                  padding: "4px 14px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#fff",
                  }}
                >
                  Languages
                </span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                }}
              >
                {langList.map((l, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "6px",

                      color: TEXT,
                    }}
                  >
                    <span
                      style={{
                        marginTop: "6px",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#000",
                        flexShrink: 0,
                      }}
                    />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right — dark teal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#fff",
          }}
        >
          {/* Spacer */}
          <div style={{ height: "120px", background: "#fff" }} />

          {/* Tall pill photo + dark teal body */}
          <div
            style={{
              position: "relative",
              flex: 1,
              borderLeft: "10px solid #fff",
              background: DARK_TEAL,
              paddingTop: "120px",
              paddingLeft: "20px",
              paddingRight: "16px",
              paddingBottom: "60px",
              overflow: "visible",
            }}
          >
            {/* Photo */}
            <div
              style={{
                position: "absolute",
                top: "-120px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "160px",
                  overflow: "hidden",
                  borderRadius: "60px",
                  border: "10px solid #fff",
                  background: "#d1d5db",
                  boxShadow: "0 8px 22px rgba(0,0,0,.2)",
                }}
              >
                <img
                  src={
                    profileInfo?.picture
                      ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                      : "https://placehold.co/100x160?text=Photo"
                  }
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/100x160?text=Photo")
                  }
                />
              </div>
            </div>

            {summary && (
              <div style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <h2
                    style={{
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: ".2em",
                      color: "#fff",
                      margin: "0 0 3px",
                    }}
                  >
                    About Me
                  </h2>
                  <div
                    style={{
                      height: "2px",
                      width: "80px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,.55)",
                    }}
                  />
                </div>
                <p
                  style={{
                    color: "#fff",
                    opacity: 0.85,
                    textAlign: "center",
                  }}
                >
                  {summary}
                </p>
              </div>
            )}

            <div style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <h2
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".2em",
                    color: "#fff",
                    margin: "0 0 3px",
                  }}
                >
                  Contact Me
                </h2>
                <div
                  style={{
                    height: "2px",
                    width: "80px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,.55)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  maxWidth: "220px",
                  margin: "0 auto",
                }}
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
                        alignItems: "center",
                        gap: "8px",
                        color: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,.12)",
                          flexShrink: 0,
                        }}
                      >
                        {icon}
                      </div>
                      <span style={{ wordBreak: "break-all" }}>{val}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <h2
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".2em",
                    color: "#fff",
                    margin: "0 0 3px",
                  }}
                >
                  Skills
                </h2>
                <div
                  style={{
                    height: "2px",
                    width: "80px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,.55)",
                  }}
                />
              </div>
              <div style={{ maxWidth: "220px", margin: "0 auto" }}>
                {skills.length > 0 && (
                  <T58ContentGroup title="Skills" items={skills} />
                )}
                {swList.length > 0 && (
                  <T58ContentGroup title="Software" items={swList} />
                )}
                {cultList.length > 0 && (
                  <T58ContentGroup title="Culture Fit" items={cultList} />
                )}
                {persList.length > 0 && (
                  <T58ContentGroup title="Personality" items={persList} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
