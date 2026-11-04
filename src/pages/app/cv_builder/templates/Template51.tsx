import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T51OutlineHeadingProps {
  title: string;
}

function T51OutlineHeading({ title }: T51OutlineHeadingProps) {
  const DUCK_BLUE = "#1e3653";
  return (
    <div
      style={{
        display: "inline-block",
        borderRadius: "999px",
        border: `2px solid rgba(30,54,83,.33)`,
        padding: "3px 18px",
        marginBottom: "12px",
      }}
    >
      <h2
        style={{
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: ".2em",
          color: DUCK_BLUE,
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

interface T51SidebarTitleProps {
  title: string;
}

function T51SidebarTitle({ title }: T51SidebarTitleProps) {
  return (
    <h2
      style={{
        fontWeight: "700",
        color: "#fff",
        marginBottom: "10px",
      }}
    >
      {title}
    </h2>
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

interface Template51Profile {
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

interface Template51Props {
  profile: Template51Profile;
}

export default function Template51({ profile }: Template51Props) {
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
  const DUCK_BLUE = "#1e3653";
  const TEXT = "#374151";

  const nameParts = fullName.trim().split(" ");
  const lastName = nameParts.pop() || "";
  const firstNames = nameParts.join(" ");

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);

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
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header: name left, tall pill photo in duck blue right */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "20px 24px 0",
          }}
        >
          <div style={{ zIndex: 10, paddingTop: "6px" }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "700",
                letterSpacing: "tight",
                color: "#2d3e50",
                margin: "0 0 4px",
                wordBreak: "break-word",
              }}
            >
              {firstNames && (
                <span style={{ fontWeight: "700", color: "#2d3e50" }}>
                  {firstNames}
                </span>
              )}
              {firstNames && <br />}
              <span style={{ fontWeight: "700", color: DUCK_BLUE }}>
                {lastName || fullName}
              </span>
            </h1>
            {current_position && (
              <p
                style={{
                  fontWeight: "700",
                  letterSpacing: ".1em",
                  color: DUCK_BLUE,
                  margin: "4px 0 0",
                }}
              >
                {current_position}
              </p>
            )}
          </div>
          {/* Pill-shaped photo in dark blue rounded box */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              display: "flex",
              height: "200px",
              width: "42%",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
              borderRadius: "0 0 70px 70px",
              background: DUCK_BLUE,
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "72px",
                zIndex: 20,
                transform: "translateX(-50%)",
                width: "90px",
                height: "130px",
                overflow: "hidden",
                borderRadius: "50px",
                border: "5px solid #fff",
                background: "#d1d5db",
                boxShadow: "0 10px 24px rgba(0,0,0,.22)",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/90x130?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/90x130?text=Photo")
                }
              />
            </div>
          </div>
        </div>

        {/* Body: dark sidebar left + main right */}
        <div style={{ display: "flex", flex: 1, marginTop: "12px" }}>
          {/* Dark teal sidebar */}
          <div
            style={{
              width: "38%",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: DUCK_BLUE,
              borderRadius: "0 36px 0 0",
              padding: "20px 24px 60px",
              color: "#fff",
              overflow: "hidden",
            }}
          >
            {summary && (
              <div>
                <T51SidebarTitle title="About Me" />
                <p
                  style={{
                    opacity: 0.8,
                    textAlign: "justify",
                  }}
                >
                  {summary}
                </p>
              </div>
            )}
            <div>
              <T51SidebarTitle title="Contact" />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
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
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "18px",
                          height: "18px",
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
            {skills.length > 0 && (
              <div>
                <T51SidebarTitle title="Skills" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    opacity: 0.8,
                  }}
                >
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {swList.length > 0 && (
              <div>
                <T51SidebarTitle title="Software" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    opacity: 0.8,
                  }}
                >
                  {swList.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {cultList.length > 0 && (
              <div>
                <T51SidebarTitle title="Culture Fit" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    opacity: 0.8,
                  }}
                >
                  {cultList.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            {persList.length > 0 && (
              <div>
                <T51SidebarTitle title="Personality" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    opacity: 0.8,
                  }}
                >
                  {persList.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {langList.length > 0 && (
              <div>
                <T51SidebarTitle title="Languages" />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    opacity: 0.8,
                  }}
                >
                  {langList.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main content */}
          <div
            style={{
              flex: 1,
              padding: "14px 20px 60px 18px",
              overflow: "hidden",
            }}
          >
            {experiences.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <T51OutlineHeading title="Experience" />
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
                          gap: "8px",
                          marginBottom: "2px",
                        }}
                      >
                        <div>
                          {exp?.position && (
                            <p
                              style={{
                                fontWeight: "900",
                                textTransform: "uppercase",
                                color: DUCK_BLUE,
                                margin: 0,
                              }}
                            >
                              {exp.position}
                            </p>
                          )}
                          {exp?.organization && (
                            <h3
                              style={{
                                fontWeight: "900",
                                color: DUCK_BLUE,
                                margin: "1px 0 0",
                              }}
                            >
                              {exp.organization}
                            </h3>
                          )}
                        </div>
                        {exp?.dates && (
                          <p
                            style={{
                              fontWeight: "900",
                              color: DUCK_BLUE,
                              flexShrink: 0,
                              margin: 0,
                            }}
                          >
                            {exp.dates}
                          </p>
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
                          color: "#4b5563",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <T51OutlineHeading title="Education" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {educations.map((edu, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <div>
                        {edu?.college && (
                          <h3
                            style={{
                              fontWeight: "900",
                              color: DUCK_BLUE,
                              margin: 0,
                            }}
                          >
                            {edu.college}
                          </h3>
                        )}
                        {edu?.level && (
                          <p
                            style={{
                              color: "#6b7280",
                              margin: "1px 0 0",
                            }}
                          >
                            {edu.level}
                          </p>
                        )}
                      </div>
                      {edu?.dates && (
                        <p
                          style={{
                            fontWeight: "900",
                            color: DUCK_BLUE,
                            flexShrink: 0,
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
                <T51OutlineHeading title="References" />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px 20px",
                  }}
                >
                  {referees.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      {r?.fullName && (
                        <h3
                          style={{
                            fontWeight: "900",
                            color: DUCK_BLUE,
                            margin: 0,
                          }}
                        >
                          {r.fullName}
                        </h3>
                      )}
                      {r?.company && (
                        <p
                          style={{
                            color: "#6b7280",
                            margin: 0,
                          }}
                        >
                          {r.company}
                        </p>
                      )}
                      {[r?.position].filter(Boolean).join(" / ") && (
                        <p
                          style={{
                            color: "#6b7280",
                            margin: 0,
                          }}
                        >
                          {r.position}
                        </p>
                      )}
                      {r?.phone && (
                        <p
                          style={{
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
