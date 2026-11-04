import { capitalizeText } from "@/utils/helpers";

interface Education {
  level: string;
  college: string;
  dates: string;
}

interface Experience {
  position: string;
  organization: string;
  dates: string;
  responsibility?: string;
}

interface NamedItem {
  name: string;
}

interface Referee {
  fullName: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

interface Template7Profile {
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
  profile?: {
    picture?: string;
  };
}

export default function Template7({ profile }: { profile: Template7Profile }) {
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
  const ACCENT = "#0ea5a4";
  const ACCENT_DARK = "#0b7e7d";
  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "20px 24px 10px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: ACCENT,
            flexShrink: 0,
            clipPath:
              "polygon(70.71% 100%, 100% 70.71%, 100% 29.29%, 70.71% 0%, 29.29% 0%, 0% 29.29%, 0% 70.71%, 29.29% 100%)",
          }}
        >
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/90x90?text=Photo"
            }
            alt="profile"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
            }
          />
        </div>
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "600",
              margin: "0 0 3px",
            }}
          >
            {fullName}
          </h1>
          <div style={{ color: "#6b7280" }}>{current_position}</div>
        </div>
      </div>
      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "calc(100% - 120px)",
          boxSizing: "border-box",
        }}
      >
        {/* Left */}
        <div
          style={{ padding: "10px 16px 10px 24px", boxSizing: "border-box" }}
        >
          {[
            ["Address", location],
            ["Phone", phone],
            ["Email", email],
          ].map(([label, val]) => (
            <div key={label} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  fontWeight: "600",

                  marginBottom: "2px",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  color: "#4b5563",

                  wordBreak: "break-all",
                }}
              >
                {val}
              </div>
            </div>
          ))}
          {languages.length > 0 && (
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  fontWeight: "600",

                  marginBottom: "4px",
                }}
              >
                Languages
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {languages.map((l, i) => (
                  <span
                    key={i}
                    style={{
                      border: "1px solid rgba(17,24,39,.12)",
                      background: "rgba(17,24,39,.06)",
                      padding: "1px 6px",

                      borderRadius: "4px",
                      textTransform: "capitalize",
                    }}
                  >
                    {l.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontWeight: "600",

                marginBottom: "4px",
              }}
            >
              Education
            </div>
            {educations.map((edu, i) => (
              <div key={i} style={{ marginBottom: "6px" }}>
                <div style={{ fontWeight: "600" }}>
                  {capitalizeText(edu.level)}
                </div>
                <div>{capitalizeText(edu.college)}</div>
                <div style={{ color: "#6b7280" }}>{edu.dates}</div>
              </div>
            ))}
          </div>
          {referees.length > 0 && (
            <div>
              <div
                style={{
                  fontWeight: "600",

                  marginBottom: "4px",
                }}
              >
                Referees
              </div>
              {referees.map((r, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <div style={{ fontWeight: "600" }}>
                    {capitalizeText(r.fullName)}
                  </div>
                  <div style={{ color: "#6b7280" }}>
                    {capitalizeText(r.position)}
                  </div>
                  <div>{capitalizeText(r.company)}</div>
                  <div>{r.phone}</div>
                  <div>{r.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right — timeline */}
        <div
          style={{ padding: "10px 24px 10px 16px", boxSizing: "border-box" }}
        >
          {/* Introduction */}
          <div
            style={{
              marginBottom: "14px",
              paddingLeft: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "6px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: ACCENT,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "4px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: ACCENT,
                boxShadow: `0 0 0 3px #fff`,
              }}
            />
            <div
              style={{
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              Introduction
            </div>
            <p
              style={{
                margin: 0,
                textAlign: "justify",
                color: "#374151",
              }}
            >
              {summary}
            </p>
          </div>
          {/* Experience */}
          <div
            style={{
              marginBottom: "14px",
              paddingLeft: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "6px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: ACCENT,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "4px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: ACCENT,
                boxShadow: `0 0 0 3px #fff`,
              }}
            />
            <div
              style={{
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Experience
            </div>
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div style={{ fontWeight: "600" }}>
                  {capitalizeText(exp.position)}{" "}
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    {capitalizeText(exp.organization)}
                  </span>
                </div>
                <div
                  style={{
                    color: "#6b7280",

                    marginBottom: "4px",
                  }}
                >
                  {exp.dates}
                </div>
                {exp.responsibility && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: exp.responsibility,
                    }}
                    className="job-description"
                    style={{ margin: 0, paddingLeft: "14px", color: "#374151" }}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Skills */}
          <div style={{ paddingLeft: "20px", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "6px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: ACCENT,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "4px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: ACCENT,
                boxShadow: `0 0 0 3px #fff`,
              }}
            />
            <div
              style={{
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Skills
            </div>
            {knowledges.length > 0 && (
              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    fontWeight: "600",

                    marginBottom: "4px",
                  }}
                >
                  Skills
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {knowledges.map((k, i) => (
                    <span
                      key={i}
                      style={{
                        border: `1px solid rgba(14,165,164,.35)`,
                        background: `rgba(14,165,164,.12)`,
                        padding: "1px 6px",

                        borderRadius: "4px",
                        textTransform: "capitalize",
                        color: ACCENT_DARK,
                      }}
                    >
                      {capitalizeText(k.name)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {softwares.length > 0 && (
              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    fontWeight: "600",

                    marginBottom: "4px",
                  }}
                >
                  Software
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {softwares.map((s, i) => (
                    <span
                      key={i}
                      style={{
                        border: "1px solid rgba(17,24,39,.12)",
                        background: "rgba(17,24,39,.06)",
                        padding: "1px 6px",

                        borderRadius: "4px",
                        textTransform: "capitalize",
                      }}
                    >
                      {capitalizeText(s.name)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {cultures.length > 0 && (
              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    fontWeight: "600",

                    marginBottom: "4px",
                  }}
                >
                  Culture Fit
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {cultures.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        border: `1px solid rgba(14,165,164,.35)`,
                        background: `rgba(14,165,164,.12)`,
                        padding: "1px 6px",

                        borderRadius: "4px",
                        textTransform: "capitalize",
                        color: ACCENT_DARK,
                      }}
                    >
                      {capitalizeText(c.name)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {personalities.length > 0 && (
              <div>
                <div
                  style={{
                    fontWeight: "600",

                    marginBottom: "4px",
                  }}
                >
                  Personality
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                  {personalities.map((p, i) => (
                    <span
                      key={i}
                      style={{
                        border: "1px solid rgba(17,24,39,.12)",
                        background: "rgba(17,24,39,.06)",
                        padding: "1px 6px",

                        borderRadius: "4px",
                        textTransform: "capitalize",
                      }}
                    >
                      {capitalizeText(p.name)}
                    </span>
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
