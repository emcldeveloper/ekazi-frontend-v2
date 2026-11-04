import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface NamedItem {
  name: string;
}

interface Experience {
  organization: string;
  dates: string;
  position: string;
  responsibility: string;
}

interface Education {
  college: string;
  dates: string;
  level: string;
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

interface Template59Profile {
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

interface Template59Props {
  profile: Template59Profile;
}

export default function Template59({ profile }: Template59Props) {
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
  const BLUE = "#1d78b7";
  const DARK = "#3d3d3d";
  const TEXT = "#333";

  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const restName = nameParts.slice(1).join(" ");

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

  const tagSections = [
    { title: "Skills", items: skills },
    { title: "Languages", items: langList },
    { title: "Software", items: swList },
    { title: "Culture Fit", items: cultList },
    { title: "Personality", items: persList },
  ].filter((s) => s.items.length > 0);

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
      {/* Two-tone header */}
      <div style={{ display: "flex", height: "110px" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "35%",
            alignItems: "center",
            justifyContent: "center",
            background: DARK,
          }}
        >
          <div
            style={{
              width: "75px",
              height: "75px",
              overflow: "hidden",
              border: `3px solid ${BLUE}`,
              background: "#9ca3af",
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/75x75?text=Photo"
              }
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/75x75?text=Photo")
              }
            />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: BLUE,
            padding: "10px 16px",
            color: "#fff",
          }}
        >
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "700",
              letterSpacing: "tight",
              textTransform: "uppercase",
              margin: "0 0 3px",
              wordBreak: "break-word",
            }}
          >
            {firstName} <span style={{ fontWeight: "300" }}>{restName}</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p
              style={{
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: ".2em",
                margin: 0,
              }}
            >
              {current_position}
            </p>
            <div
              style={{
                flex: 1,
                height: "1.5px",
                background: "rgba(255,255,255,.5)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "calc(100% - 145px)",
          overflow: "hidden",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            width: "35%",
            borderRight: "1px solid #f3f4f6",
            padding: "14px 16px",
            overflow: "hidden",
          }}
        >
          {summary && (
            <div style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  borderBottom: "2px solid #e5e7eb",
                  paddingBottom: "3px",
                  marginBottom: "8px",
                }}
              >
                <h2
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  About Me
                </h2>
              </div>
              <p style={{ color: "#4b5563" }}>{summary}</p>
            </div>
          )}

          {tagSections.map((s) => (
            <div key={s.title} style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  borderBottom: "2px solid #e5e7eb",
                  paddingBottom: "3px",
                  marginBottom: "6px",
                }}
              >
                <h2
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  {s.title}
                </h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {s.items.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: "999px",
                      border: `1px solid rgba(29,120,183,.2)`,
                      background: `rgba(29,120,183,.08)`,
                      padding: "2px 8px",
                      fontWeight: "700",
                      color: BLUE,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right main */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {educations.length > 0 && (
            <div style={{ padding: "14px 16px 10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  borderBottom: "2px solid #e5e7eb",
                  paddingBottom: "3px",
                  marginBottom: "10px",
                }}
              >
                <h2
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  Education
                </h2>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {educations.map((edu, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px" }}>
                    <div
                      style={{
                        width: "80px",
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {edu?.college && (
                        <p
                          style={{
                            fontWeight: "700",
                            margin: "0 0 1px",
                          }}
                        >
                          {edu.college}
                        </p>
                      )}
                      {edu?.dates && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: BLUE,
                            margin: 0,
                          }}
                        >
                          {edu.dates}
                        </p>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      {edu?.level && (
                        <h3
                          style={{
                            fontWeight: "700",
                            textTransform: "uppercase",
                            margin: 0,
                          }}
                        >
                          {edu.level}
                        </h3>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {experiences.length > 0 && (
            <div
              style={{
                background: DARK,
                padding: "14px 16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  borderBottom: "2px solid rgba(255,255,255,.2)",
                  paddingBottom: "3px",
                  marginBottom: "10px",
                }}
              >
                <h2
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  Job Experience
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {experiences.map((exp, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px" }}>
                    <div
                      style={{
                        width: "80px",
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {exp?.organization && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: "#fff",
                            margin: "0 0 1px",
                          }}
                        >
                          {exp.organization}
                        </p>
                      )}
                      {exp?.dates && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: BLUE,
                            margin: 0,
                          }}
                        >
                          {exp.dates}
                        </p>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      {exp?.position && (
                        <h3
                          style={{
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "#fff",
                            margin: "0 0 3px",
                          }}
                        >
                          {exp.position}
                        </h3>
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
            </div>
          )}

          {referees.length > 0 && (
            <div style={{ flex: 1, padding: "14px 16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  borderBottom: "2px solid #e5e7eb",
                  paddingBottom: "3px",
                  marginBottom: "10px",
                }}
              >
                <h2
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  References
                </h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {referees.map((r, i) => (
                  <div key={i}>
                    {r?.fullName && (
                      <p
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#111827",
                          margin: "0 0 1px",
                        }}
                      >
                        {r.fullName}
                      </p>
                    )}
                    {r?.company && (
                      <p
                        style={{
                          fontWeight: "600",
                          color: BLUE,
                          margin: 0,
                        }}
                      >
                        {r.company}
                      </p>
                    )}
                    {r?.position && (
                      <p
                        style={{
                          color: "#6b7280",
                          margin: "0 0 3px",
                        }}
                      >
                        {r.position}
                      </p>
                    )}
                    {r?.phone && (
                      <p
                        style={{
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        Tel: {r.phone}
                      </p>
                    )}
                    {r?.email && (
                      <p
                        style={{
                          color: "#6b7280",
                          margin: 0,
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

      {/* Blue contact footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
          background: "#fff",
          padding: "8px 16px 4px",
        }}
      >
        {[[phone], [email], [location]]
          .filter(([v]) => v)
          .map(([val], i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: BLUE,
                padding: "6px 10px",
                color: "#fff",
              }}
            >
              <span style={{ flexShrink: 0 }}>
                {i === 0 ? (
                  <IconPhone />
                ) : i === 1 ? (
                  <IconMail />
                ) : (
                  <IconMapPin />
                )}
              </span>
              <span
                style={{
                  fontWeight: "700",
                  wordBreak: "break-all",
                }}
              >
                {val}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
