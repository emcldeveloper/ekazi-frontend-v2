import type { ReactNode } from "react";
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
  dates: string;
  college: string;
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

interface Template47Profile {
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

interface Template47Props {
  profile: Template47Profile;
}

export default function Template47({ profile }: Template47Props) {
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
  const ACCENT = "#ef3f35";
  const SIDEBAR = "#252d38";
  const HEADING = "#2a2d31";
  const TEXT = "#4d5056";
  const MUTED = "#7f8288";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

  const skillGroups = [
    { title: "Skills", items: skills },
    { title: "Software", items: swList },
    { title: "Languages", items: langList },
    { title: "Culture Fit", items: cultList },
    { title: "Personality", items: persList },
  ].filter((g) => g.items.length > 0);

  // split name into first part (light) + last word (bold accent)
  const nameParts = fullName.trim().split(" ");
  const nameHead = nameParts.slice(0, -1).join(" ");
  const nameTail = nameParts.at(-1) || fullName;

  const contactLine = [phone && `P: ${phone}`, email && `E: ${email}`, location]
    .filter(Boolean)
    .join("  |  ");

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
        background: "#fcfbf8",
        overflow: "hidden",
      }}
    >
      {/* Dark sidebar strip */}
      <div
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: "90px",
          background: SIDEBAR,
        }}
      />

      {/* Vertical RESUME text */}
      <div
        style={{
          position: "absolute",
          left: "16px",
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          color: "rgba(255,255,255,.12)",
          fontWeight: "700",
          letterSpacing: ".42em",
          zIndex: 2,
        }}
      >
        {"RESUME".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>

      {/* Octagon photo */}
      <div
        style={{ position: "absolute", left: "52px", top: "40px", zIndex: 20 }}
      >
        {/* Red accent tab behind photo */}
        <div
          style={{
            position: "absolute",
            left: "-22px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "20px",
            width: "30px",
            background: ACCENT,
          }}
        />
        <div
          style={{
            width: "80px",
            height: "80px",
            overflow: "hidden",
            border: "3px solid #fff",
            boxShadow: "0 10px 22px rgba(0,0,0,.15)",
            clipPath:
              "polygon(28% 0%,72% 0%,100% 28%,100% 72%,72% 100%,28% 100%,0% 72%,0% 28%)",
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
      </div>

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          paddingLeft: "140px",
          paddingRight: "20px",
          paddingTop: "28px",
          paddingBottom: "0",
        }}
      >
        <div style={{ maxWidth: "480px" }}>
          {nameHead && (
            <div
              style={{
                fontSize: "22px",
                fontWeight: "300",
                textTransform: "uppercase",
                color: HEADING,
              }}
            >
              {nameHead}
            </div>
          )}
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            {nameTail}
          </div>
          {current_position && (
            <p
              style={{
                marginTop: "8px",
                fontWeight: "500",
                textTransform: "uppercase",
                color: HEADING,
              }}
            >
              {current_position}
            </p>
          )}
          {contactLine && (
            <p
              style={{
                marginTop: "6px",
                color: MUTED,
              }}
            >
              {contactLine}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          paddingLeft: "110px",
          paddingRight: "20px",
          paddingTop: "20px",
          paddingBottom: "60px",
          height: "calc(100% - 100px)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {summary && (
            <T47SeamSection title="About Me" accent={ACCENT}>
              <p
                style={{
                  maxWidth: "480px",
                  color: TEXT,
                }}
              >
                {summary}
              </p>
            </T47SeamSection>
          )}

          {educations.length > 0 && (
            <T47SeamSection title="Education" accent={ACCENT}>
              <div style={{ position: "relative", paddingLeft: "30px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "1px",
                    top: "4px",
                    bottom: "4px",
                    width: "1px",
                    background: "rgba(239,63,53,.45)",
                  }}
                />
                {educations.map((edu, i) => (
                  <div
                    key={i}
                    style={{ position: "relative", marginBottom: "10px" }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "-30px",
                        top: "4px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: ACCENT,
                      }}
                    />
                    <h3
                      style={{
                        fontWeight: "600",
                        textTransform: "uppercase",
                        color: HEADING,
                        margin: "0 0 1px",
                      }}
                    >
                      {edu?.level || "Education"}
                    </h3>
                    {edu?.dates && (
                      <p
                        style={{
                          color: ACCENT,
                          margin: "0 0 1px",
                        }}
                      >
                        {edu.dates}
                      </p>
                    )}
                    {edu?.college && (
                      <p
                        style={{
                          color: TEXT,
                          margin: 0,
                        }}
                      >
                        {edu.college}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </T47SeamSection>
          )}

          {experiences.length > 0 && (
            <T47SeamSection title="Experience" accent={ACCENT}>
              <div style={{ position: "relative", paddingLeft: "30px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "1px",
                    top: "4px",
                    bottom: "4px",
                    width: "1px",
                    background: "rgba(239,63,53,.45)",
                  }}
                />
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    style={{ position: "relative", marginBottom: "10px" }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "-30px",
                        top: "4px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: ACCENT,
                      }}
                    />
                    <h3
                      style={{
                        fontWeight: "600",
                        textTransform: "uppercase",
                        color: HEADING,
                        margin: "0 0 1px",
                      }}
                    >
                      {exp?.position || "Experience"}
                    </h3>
                    {(exp?.organization || exp?.dates) && (
                      <p
                        style={{
                          color: ACCENT,
                          margin: "0 0 2px",
                        }}
                      >
                        {[exp?.organization, exp?.dates]
                          .filter(Boolean)
                          .join(" / ")}
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
                ))}
              </div>
            </T47SeamSection>
          )}

          {skillGroups.length > 0 && (
            <T47SeamSection title="Skills" accent={ACCENT}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px 20px",
                }}
              >
                {skillGroups.map((g) => (
                  <div key={g.title}>
                    <h3
                      style={{
                        fontWeight: "600",
                        textTransform: "uppercase",
                        color: HEADING,
                        margin: "0 0 4px",
                      }}
                    >
                      {g.title}
                    </h3>
                    <ul
                      style={{
                        listStyle: "disc",
                        paddingLeft: "14px",
                        margin: 0,
                        color: TEXT,
                      }}
                    >
                      {g.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </T47SeamSection>
          )}

          {referees.length > 0 && (
            <T47SeamSection title="References" accent={ACCENT}>
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
                      border: "1px solid rgba(239,63,53,.24)",
                      borderRadius: "4px",
                      padding: "8px 10px",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "600",
                        textTransform: "uppercase",
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
                    {r?.phone && <p style={{ margin: 0 }}>{r.phone}</p>}
                    {r?.email && (
                      <p
                        style={{
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
            </T47SeamSection>
          )}
        </div>
      </div>
    </div>
  );
}

interface T47SeamSectionProps {
  title: string;
  children: ReactNode;
  accent: string;
}

function T47SeamSection({ title, children, accent }: T47SeamSectionProps) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: "-32px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "28px",
          height: "80px",
          background: accent,
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 14px rgba(0,0,0,.12)",
        }}
      >
        <span
          style={{
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: ".1em",
            color: "#fff",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ marginTop: "6px" }}>{children}</div>
    </div>
  );
}
