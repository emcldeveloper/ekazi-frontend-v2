import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T50PillHeadingProps {
  title: string;
}

function T50PillHeading({ title }: T50PillHeadingProps) {
  const NAVY = "#1A365D";
  return (
    <div
      style={{
        display: "inline-block",
        borderRadius: "999px",
        background: NAVY,
        padding: "4px 18px",
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
        {title}
      </span>
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
  level: string;
  college: string;
  dates: string;
}

interface Referee {
  fullName: string;
  position: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template50Profile {
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

interface Template50Props {
  profile: Template50Profile;
}

export default function Template50({ profile }: Template50Props) {
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
  const NAVY = "#1A365D";
  const TEXT = "#374151";
  const HEADING = "#111827";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];

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
      {/* Navy top header bar */}
      <div
        style={{
          position: "relative",
          padding: "10px 20px 0",
          background: NAVY,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "14px",
            paddingBottom: "10px",
          }}
        >
          {/* Rounded square photo */}
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "3px solid #fff",
              background: "#fff",
              boxShadow: "0 4px 14px rgba(0,0,0,.18)",
              flexShrink: 0,
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
                (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
              }
            />
          </div>
          {/* Navy info card */}
          <div
            style={{
              flex: 1,
              background: NAVY,
              borderRadius: "18px",
              border: "3px solid #fff",
              padding: "10px 14px",
              color: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,.12)",
            }}
          >
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "700",
                letterSpacing: "tight",
                color: "#fff",
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
                  textTransform: "uppercase",
                  letterSpacing: ".3em",
                  opacity: 0.9,
                  margin: "0 0 8px",
                }}
              >
                {current_position}
              </p>
            )}
            <div
              style={{
                height: "3px",
                width: "28px",
                background: "#fff",
                opacity: 0.5,
                marginBottom: "8px",
              }}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
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
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "16px",
                        height: "16px",
                        borderRadius: "4px",
                        background: "rgba(255,255,255,.15)",
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#fff",
                        wordBreak: "break-all",
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "12px 20px",
          flex: 1,
          overflow: "hidden",
          height: "calc(100% - 120px)",
        }}
      >
        {summary && (
          <div style={{ marginBottom: "10px" }}>
            <T50PillHeading title="About Me" />
            <p
              style={{
                fontWeight: "500",
                color: "#4b5563",
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          {/* Left col */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {educations.length > 0 && (
              <div>
                <T50PillHeading title="Education" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {educations.map((edu, i) => (
                    <div key={i}>
                      {edu?.level && (
                        <h3
                          style={{
                            fontWeight: "700",
                            color: HEADING,
                            margin: "0 0 1px",
                          }}
                        >
                          {edu.level}
                        </h3>
                      )}
                      {edu?.college && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: "#6b7280",
                            margin: "0",
                          }}
                        >
                          {edu.college}
                        </p>
                      )}
                      {edu?.dates && (
                        <p
                          style={{
                            fontWeight: "700",
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

            {skills.length > 0 && (
              <div>
                <T50PillHeading title="Skills" />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {skills.map((s, i) => (
                    <li
                      key={i}
                      style={{
                        fontWeight: "700",
                        color: "#374151",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {swList.length > 0 && (
              <div>
                <T50PillHeading title="Software" />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {swList.map((s, i) => (
                    <li
                      key={i}
                      style={{
                        fontWeight: "700",
                        color: "#374151",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cultList.length > 0 && (
              <div>
                <T50PillHeading title="Culture Fit" />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {cultList.map((c, i) => (
                    <li
                      key={i}
                      style={{
                        fontWeight: "700",
                        color: "#374151",
                      }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {persList.length > 0 && (
              <div>
                <T50PillHeading title="Personality" />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {persList.map((p, i) => (
                    <li
                      key={i}
                      style={{
                        fontWeight: "700",
                        color: "#374151",
                      }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {langList.length > 0 && (
              <div>
                <T50PillHeading title="Languages" />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {langList.map((l, i) => (
                    <li
                      key={i}
                      style={{
                        fontWeight: "700",
                        color: "#374151",
                      }}
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right col */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {experiences.length > 0 && (
              <div>
                <T50PillHeading title="Job Experience" />
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
                          gap: "10px",
                          marginBottom: "2px",
                        }}
                      >
                        {exp?.position && (
                          <h3
                            style={{
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: HEADING,
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
                              color: "#9ca3af",
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

            {referees.length > 0 && (
              <div>
                <T50PillHeading title="References" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {referees.map((r, i) => (
                    <div key={i}>
                      {r?.fullName && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: HEADING,
                            margin: "0 0 1px",
                          }}
                        >
                          {r.fullName}
                        </p>
                      )}
                      {r?.position && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: "#6b7280",
                            margin: "0 0 2px",
                          }}
                        >
                          {r.position}
                        </p>
                      )}
                      {r?.phone && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: "#9ca3af",
                            margin: 0,
                          }}
                        >
                          {r.phone}
                        </p>
                      )}
                      {r?.email && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: "#9ca3af",
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
    </div>
  );
}
