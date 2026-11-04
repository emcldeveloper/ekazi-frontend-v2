import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

const ORANGE = "#e68a5c";

interface T71LineTitleProps {
  title: string;
}

function T71LineTitle({ title }: T71LineTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <h2
        style={{
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: ".2em",
          color: ORANGE,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: ORANGE }} />
    </div>
  );
}

interface RefItem {
  fullName: string;
  roleCompany: string;
  phone: string;
  email: string;
}

type T71SideSectionProps = {
  icon: ReactNode;
  title: string;
} & (
  | { type: "list"; items: string[] }
  | { type: "education"; items: Education[] }
  | { type: "references"; items: RefItem[] }
);

function T71SideSection({ icon, title, items, type }: T71SideSectionProps) {
  if (!items.length) return null;
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "5px",
        }}
      >
        <span style={{ color: ORANGE }}>{icon}</span>
        <h2
          style={{
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: ".2em",
            color: ORANGE,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      {type === "education" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {items.map((edu, i) => (
            <div key={i}>
              {edu?.level && (
                <h3
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    color: "#000",
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
                    textTransform: "uppercase",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {edu.college}
                </p>
              )}
              {edu?.dates && (
                <p
                  style={{
                    fontWeight: "700",
                    color: ORANGE,
                    margin: 0,
                  }}
                >
                  {edu.dates}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : type === "references" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {items.map((r, i) => (
            <div key={i}>
              {r?.fullName && (
                <h3
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    color: "#000",
                    margin: "0 0 1px",
                  }}
                >
                  {r.fullName}
                </h3>
              )}
              {r?.roleCompany && (
                <p
                  style={{
                    fontWeight: "700",
                    textTransform: "uppercase",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {r.roleCompany}
                </p>
              )}
              {r?.phone && (
                <p
                  style={{
                    fontWeight: "700",
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
                    fontWeight: "700",
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
      ) : (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                fontWeight: "700",
                textTransform: "uppercase",
                color: "#374151",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
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
  level: string;
  college: string;
  dates: string;
}

interface Referee {
  fullName: string;
  roleCompany: string;
  phone: string;
  email: string;
  position: string;
  company: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template71Profile {
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

interface Template71Props {
  profile: Template71Profile;
}

export default function Template71({ profile }: Template71Props) {
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

  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

  const refItems = referees.map((r) => ({
    fullName: r?.fullName,
    roleCompany: [r?.position, r?.company].filter(Boolean).join(" / "),
    phone: r?.phone,
    email: r?.email,
  }));

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
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          padding: "16px 20px 12px",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: ".2em",
                color: "#000",
                lineHeight: "tight",
                margin: "0 0 1px",
              }}
            >
              {`${firstName} ${lastName}`}
            </h1>

            {current_position && (
              <p
                style={{
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: ".3em",
                  color: "#000",
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            )}
          </div>
          {summary && (
            <div>
              <h2
                style={{
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: ".2em",
                  color: ORANGE,
                  margin: "0 0 3px",
                }}
              >
                About Me
              </h2>
              <p
                style={{
                  color: "#6b7280",
                  maxWidth: "320px",
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </div>
          )}
        </div>
        <div
          style={{
            width: "90px",
            height: "110px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/90x110?text=Photo"
            }
            alt="profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/90x110?text=Photo")
            }
          />
        </div>
      </div>

      {/* Orange contact bar */}
      {[[phone], [location], [email]].filter(([v]) => v).length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4px",
            background: ORANGE,
            padding: "6px 16px",
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
                  alignItems: "center",
                  gap: "5px",

                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    background: "#fff",
                    padding: "2px",
                    color: ORANGE,
                    display: "flex",
                  }}
                >
                  {icon}
                </div>
                <span style={{ wordBreak: "break-all" }}>{val}</span>
              </div>
            ))}
        </div>
      )}

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "16px 16px",
          padding: "12px 16px 60px",
          height: "calc(100% - 160px)",
          overflow: "hidden",
        }}
      >
        {/* Left — experience */}
        <div style={{ overflow: "hidden" }}>
          {experiences.length > 0 && (
            <div>
              <T71LineTitle title="Job Experience" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {experiences.map((exp, i) => (
                  <div key={i}>
                    {exp?.position && (
                      <h3
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#000",
                          margin: "0 0 1px",
                        }}
                      >
                        {exp.position}
                      </h3>
                    )}
                    {(exp?.organization || exp?.dates) && (
                      <p
                        style={{
                          fontWeight: "700",
                          textTransform: "uppercase",
                          color: "#6b7280",
                          margin: "0 0 3px",
                        }}
                      >
                        {exp?.organization}
                        {exp?.organization && exp?.dates ? (
                          <span style={{ color: ORANGE, marginLeft: "8px" }}>
                            {exp.dates}
                          </span>
                        ) : exp?.dates ? (
                          <span style={{ color: ORANGE }}>{exp.dates}</span>
                        ) : null}
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
                        color: "#6b7280",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — side sections */}
        <div
          style={{
            borderLeft: `1px solid ${ORANGE}`,
            paddingLeft: "12px",
            overflow: "hidden",
          }}
        >
          <T71SideSection
            icon="🎓"
            title="Education"
            items={educations}
            type="education"
          />
          <T71SideSection icon="⚙️" title="Skills" items={skills} type="list" />
          <T71SideSection
            icon="🌐"
            title="Languages"
            items={langList}
            type="list"
          />
          <T71SideSection
            icon="💻"
            title="Software"
            items={swList}
            type="list"
          />
          <T71SideSection
            icon="❤️"
            title="Culture Fit"
            items={cultList}
            type="list"
          />
          <T71SideSection
            icon="✨"
            title="Personality"
            items={persList}
            type="list"
          />
          <T71SideSection
            icon="👥"
            title="References"
            items={refItems}
            type="references"
          />
        </div>
      </div>
    </div>
  );
}
