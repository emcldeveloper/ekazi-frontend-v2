import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T53PillGridProps {
  items: string[];
  light?: boolean;
}

function T53PillGrid({ items, light }: T53PillGridProps) {
  if (!items.length) return null;
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            borderRadius: "999px",
            border: light
              ? "1px solid rgba(255,255,255,.5)"
              : "1px solid rgba(139,46,22,.5)",
            padding: "4px 12px",
            textAlign: "center",

            fontWeight: "500",
            color: light ? "#fff" : "#8b2e16",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

interface T53SimpleGridProps {
  items: string[];
}

function T53SimpleGrid({ items }: T53SimpleGridProps) {
  if (!items.length) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "6px 10px",
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ fontWeight: "500", color: "#374151" }}>
          {item}
        </div>
      ))}
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

interface Template53Profile {
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

interface Template53Props {
  profile: Template53Profile;
}

export default function Template53({ profile }: Template53Props) {
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
  const RUST = "#8b2e16";
  const RUST_BORDER = "#a1452d";
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
      {/* Rust header — split: left photo+contact+summary, right edu+skills */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          background: RUST,
          color: "#fff",
          padding: "16px 20px 14px",
        }}
      >
        {/* Left */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              overflow: "hidden",
              borderRadius: "12px",
              border: `3px solid ${RUST_BORDER}`,
              flexShrink: 0,
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
                (e.currentTarget.src = "https://placehold.co/80x80?text=Photo")
              }
            />
          </div>
          <div>
            {fullName && (
              <h1
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "tight",
                  letterSpacing: "tight",
                  color: "#fff",
                  margin: "0 0 2px",
                  wordBreak: "break-word",
                }}
              >
                {fullName}
              </h1>
            )}
            {current_position && (
              <p
                style={{
                  fontWeight: "700",
                  letterSpacing: "tight",
                  color: "#fff",
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            )}
          </div>
          {[
            [<IconPhone />, phone],
            [<IconMail />, email],
            [<IconMapPin />, location],
          ].filter(([, v]) => v).length > 0 && (
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
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: "6px",
                        background: "rgba(255,255,255,.12)",
                        padding: "4px",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <span style={{ wordBreak: "break-all", fontWeight: "500" }}>
                      {val}
                    </span>
                  </div>
                ))}
            </div>
          )}
          {summary && (
            <p
              style={{
                opacity: 0.9,
                textAlign: "justify",
                margin: 0,
              }}
            >
              {summary}
            </p>
          )}
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {educations.length > 0 && (
            <div>
              <h2
                style={{
                  fontWeight: "700",
                  color: "#fff",
                  marginBottom: "10px",
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
                            fontWeight: "700",
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
                            fontStyle: "italic",
                            opacity: 0.9,
                            margin: 0,
                          }}
                        >
                          {edu.level}
                        </p>
                      )}
                    </div>
                    {edu?.dates && (
                      <span
                        style={{
                          border: "1px solid rgba(255,255,255,.5)",
                          borderRadius: "999px",
                          padding: "1px 10px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {edu.dates}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2
                style={{
                  fontWeight: "700",
                  color: "#fff",
                  marginBottom: "8px",
                }}
              >
                Skills
              </h2>
              <T53PillGrid items={skills} light />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "20px",
          background: "#fff",
          padding: "14px 20px 60px",
          height: "calc(100% - 220px)",
          overflow: "hidden",
        }}
      >
        {/* Left */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflow: "hidden",
          }}
        >
          {swList.length > 0 && (
            <div>
              <h2
                style={{
                  fontWeight: "700",
                  color: RUST,
                  marginBottom: "8px",
                }}
              >
                Software
              </h2>
              <T53PillGrid items={swList} />
            </div>
          )}
          {langList.length > 0 && (
            <div>
              <h2
                style={{
                  fontWeight: "700",
                  color: RUST,
                  marginBottom: "6px",
                }}
              >
                Languages
              </h2>
              <T53SimpleGrid items={langList} />
            </div>
          )}
          {cultList.length > 0 && (
            <div>
              <h2
                style={{
                  fontWeight: "700",
                  color: RUST,
                  marginBottom: "6px",
                }}
              >
                Culture Fit
              </h2>
              <T53SimpleGrid items={cultList} />
            </div>
          )}
          {persList.length > 0 && (
            <div>
              <h2
                style={{
                  fontWeight: "700",
                  color: RUST,
                  marginBottom: "6px",
                }}
              >
                Personality
              </h2>
              <T53SimpleGrid items={persList} />
            </div>
          )}
        </div>

        {/* Right */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflow: "hidden",
          }}
        >
          {experiences.length > 0 && (
            <div>
              <h2
                style={{
                  fontWeight: "700",
                  color: RUST,
                  marginBottom: "8px",
                }}
              >
                Work Experience
              </h2>
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
                      }}
                    >
                      <div>
                        {exp?.organization && (
                          <h3
                            style={{
                              fontWeight: "700",
                              color: "#1f2937",
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
                              opacity: 0.9,
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
                            border: "1px solid rgba(139,46,22,.5)",
                            borderRadius: "999px",
                            padding: "1px 10px",
                            whiteSpace: "nowrap",
                            color: RUST,
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
            </div>
          )}
          {referees.length > 0 && (
            <div>
              <h2
                style={{
                  fontWeight: "700",
                  color: RUST,
                  marginBottom: "8px",
                }}
              >
                References
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    {r?.fullName && (
                      <p
                        style={{
                          fontWeight: "700",
                          color: "#1f2937",
                          margin: 0,
                        }}
                      >
                        {r.fullName}
                      </p>
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
                    {r?.position && (
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
  );
}
