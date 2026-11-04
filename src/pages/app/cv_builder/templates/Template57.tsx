import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

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
  email: string;
  phone: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template57Profile {
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

interface Template57Props {
  profile: Template57Profile;
}

export default function Template57({ profile }: Template57Props) {
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
  const SIDEBAR_BG = "#d9e6f2";
  const ACCENT_BLUE = "#005696";
  const TEXT_BLUE = "#005696";
  const TEXT = "#4b4b4b";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
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
        background: "#f7f7f7",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "100%",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            position: "relative",
            background: SIDEBAR_BG,
            overflow: "hidden",
          }}
        >
          {/* Circular photo with split clip */}
          <div
            style={{
              position: "relative",
              height: "200px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 10,
                marginTop: "36px",
                width: "120px",
                height: "120px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: ACCENT_BLUE,
                    clipPath: "polygon(0 0,100% 0,100% 50%,0 50%)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: "5px",
                  borderRadius: "50%",
                  background: "#fff",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "10px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,.07)",
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
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "106px",
                height: "1px",
                background: "#bfcdd8",
                zIndex: 1,
              }}
            />
          </div>

          <div style={{ padding: "0 20px 60px" }}>
            {[
              [<IconPhone />, phone],
              [<IconMail />, email],
              [<IconMapPin />, location],
            ].filter(([, v]) => v).length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <h2
                  style={{
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: ".22em",
                    color: "#000",
                    margin: "0 0 10px",
                  }}
                >
                  Contact
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
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
                          alignItems: "flex-start",
                          gap: "8px",

                          color: "#000",
                        }}
                      >
                        <span
                          style={{
                            color: TEXT_BLUE,
                            marginTop: "1px",
                            flexShrink: 0,
                          }}
                        >
                          {icon}
                        </span>
                        <span style={{ wordBreak: "break-all" }}>{val}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <h2
                  style={{
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: ".22em",
                    color: "#000",
                    margin: "0 0 10px",
                  }}
                >
                  Education
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {educations.map((edu, i) => (
                    <div key={i}>
                      <div
                        style={{
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: TEXT_BLUE,
                          marginBottom: "2px",
                        }}
                      >
                        {edu?.level || "Education"}
                      </div>
                      <div
                        style={{
                          color: TEXT,
                        }}
                      >
                        {edu?.college}
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#000",
                        }}
                      >
                        {edu?.dates}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {([
              ["Skills", skills],
              ["Software", swList],
              ["Languages", langList],
              ["Culture Fit", cultList],
              ["Personality", persList],
            ] as [string, string[]][])
              .filter(([, items]) => items.length > 0)
              .map(([title, items]) => (
                <div key={title} style={{ marginBottom: "14px" }}>
                  <h2
                    style={{
                      fontWeight: "900",
                      textTransform: "uppercase",
                      letterSpacing: ".22em",
                      color: "#000",
                      margin: "0 0 8px",
                    }}
                  >
                    {title}
                  </h2>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {items.map((item, i) => (
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
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {/* Right main */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#f7f7f7",
          }}
        >
          {/* Name block */}
          <div style={{ padding: "16px 20px 10px" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "900",
                textTransform: "uppercase",

                letterSpacing: ".01em",
                color: "#000",
                margin: "0 0 6px",
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </h1>
            <p
              style={{
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: ".34em",
                color: "#000",
                margin: 0,
              }}
            >
              {current_position}
            </p>
          </div>

          {summary && (
            <div style={{ background: ACCENT_BLUE, padding: "14px 20px" }}>
              <h2
                style={{
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: ".18em",
                  color: "#fff",
                  margin: "0 0 6px",
                }}
              >
                Summary
              </h2>
              <p
                style={{
                  color: "#fff",
                  maxWidth: "92%",
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </div>
          )}

          <div
            style={{ flex: 1, padding: "14px 20px 60px", overflow: "hidden" }}
          >
            {experiences.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <h2
                  style={{
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: ".18em",
                    color: "#000",
                    margin: "0 0 12px",
                  }}
                >
                  Experience
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {experiences.map((exp, i) => (
                    <div key={i}>
                      <h3
                        style={{
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: TEXT_BLUE,
                          margin: "0 0 1px",
                        }}
                      >
                        {exp?.position}
                      </h3>
                      <div
                        style={{
                          color: "#555",
                          marginBottom: "1px",
                        }}
                      >
                        {exp?.organization}
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#000",
                          marginBottom: "4px",
                        }}
                      >
                        {exp?.dates}
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
              </div>
            )}

            {referees.length > 0 && (
              <div>
                <h2
                  style={{
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: ".18em",
                    color: "#000",
                    margin: "0 0 10px",
                  }}
                >
                  References
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {referees.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        border: "1px solid #d0d7df",
                        background: "#fff",
                        padding: "8px 12px",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#000",
                          marginBottom: "1px",
                        }}
                      >
                        {r?.fullName}
                      </div>
                      <div
                        style={{
                          color: "#555",
                          marginBottom: "1px",
                        }}
                      >
                        {r?.position} @ {r?.company}
                      </div>
                      {r?.email && (
                        <div
                          style={{
                            color: "#444",
                            wordBreak: "break-all",
                          }}
                        >
                          {r.email}
                        </div>
                      )}
                      {r?.phone && (
                        <div style={{ color: "#444" }}>{r.phone}</div>
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
