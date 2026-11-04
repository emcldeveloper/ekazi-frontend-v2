import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T37LeftBlockProps {
  title: string;
  children: ReactNode;
}

function T37LeftBlock({ title, children }: T37LeftBlockProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h2
        style={{
          fontWeight: "700",
          letterSpacing: ".12em",
          color: "#fff",
          marginBottom: "6px",
        }}
      >
        {title}
      </h2>
      <span
        style={{
          display: "block",
          height: "2px",
          width: "100%",
          background: "rgba(255,255,255,.7)",
          marginBottom: "8px",
        }}
      />
      {children}
    </div>
  );
}

interface T37RightBlockProps {
  title: string;
  children: ReactNode;
}

function T37RightBlock({ title, children }: T37RightBlockProps) {
  const ACCENT = "#247d6f";
  const TEXT_DARK = "#2f3a50";
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        style={{
          fontWeight: "700",
          letterSpacing: ".12em",
          color: TEXT_DARK,
          marginBottom: "6px",
        }}
      >
        {title}
      </h2>
      <span
        style={{
          display: "block",
          height: "2px",
          width: "100%",
          background: ACCENT,
          marginBottom: "10px",
        }}
      />
      {children}
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
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template37Profile {
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
  languages: NamedItem[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template37Props {
  profile: Template37Profile;
}

export default function Template37({ profile }: Template37Props) {
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
    languages,
    cultures,
    personalities,
    referees,
    profile: profileInfo,
  } = profile;
  const ACCENT = "#247d6f";
  const TEXT_DARK = "#2f3a50";
  const PAGE_BG = "#eef0f2";

  const [firstName, ...restName] = fullName.trim().split(" ");
  const restNames = restName.join(" ");

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#1f2937",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: PAGE_BG,
        overflow: "hidden",
      }}
    >
      {/* Top area: teal circle photo + header */}
      <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr" }}>
        <div
          style={{
            height: "140px",
            background: ACCENT,
            borderRadius: "0 0 40px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #6f7a8f",
              boxShadow: "0 8px 18px rgba(0,0,0,.2)",
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/100x100?text=Photo"
              }
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/100x100?text=Photo")
              }
            />
          </div>
        </div>
        <div style={{ padding: "16px 20px 10px 20px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              textTransform: "uppercase",

              color: TEXT_DARK,
              margin: "0 0 8px",
            }}
          >
            {firstName}
            <br />
            {restNames}
          </h1>
          {current_position && (
            <p
              style={{
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: ".16em",
                color: TEXT_DARK,
                margin: 0,
              }}
            >
              {current_position}
            </p>
          )}
        </div>
      </div>

      {/* Contact pill */}
      <div style={{ margin: "6px 14px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            alignItems: "center",
            gap: "6px",
            background: ACCENT,
            borderRadius: "999px",
            padding: "6px 16px",
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
                  gap: "6px",
                  color: "#fff",
                  fontWeight: "400",
                  overflow: "hidden",
                }}
              >
                <span style={{ flexShrink: 0 }}>{icon}</span>
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {val}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "calc(100% - 185px)",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            background: ACCENT,
            borderRadius: "0 40px 0 0",
            padding: "14px 16px",
            color: "#fff",
            overflow: "hidden",
          }}
        >
          {summary && (
            <T37LeftBlock title="About Me">
              <p
                style={{
                  color: "rgba(255,255,255,.92)",
                }}
              >
                {summary}
              </p>
            </T37LeftBlock>
          )}
          {educations.length > 0 && (
            <T37LeftBlock title="Education">
              {educations.map((edu, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <p
                    style={{

                      fontWeight: "700",

                      color: "#fff",
                    }}
                  >
                    {edu?.level}
                  </p>
                  <p
                    style={{

                      color: "rgba(255,255,255,.85)",
                    }}
                  >
                    {edu?.college}
                  </p>
                  <p style={{  color: "rgba(255,255,255,.7)" }}>
                    {edu?.dates}
                  </p>
                </div>
              ))}
            </T37LeftBlock>
          )}
          {skills.length > 0 && (
            <T37LeftBlock title="Skills">
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  color: "rgba(255,255,255,.92)",
                }}
              >
                {skills.map((s, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </T37LeftBlock>
          )}
          {swList.length > 0 && (
            <T37LeftBlock title="Software">
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  color: "rgba(255,255,255,.92)",
                }}
              >
                {swList.map((s, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </T37LeftBlock>
          )}
          {langList.length > 0 && (
            <T37LeftBlock title="Languages">
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  color: "rgba(255,255,255,.92)",
                }}
              >
                {langList.map((l, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {l}
                  </li>
                ))}
              </ul>
            </T37LeftBlock>
          )}
          {cultList.length > 0 && (
            <T37LeftBlock title="Culture Fit">
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  color: "rgba(255,255,255,.92)",
                }}
              >
                {cultList.map((c, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {c}
                  </li>
                ))}
              </ul>
            </T37LeftBlock>
          )}
          {persList.length > 0 && (
            <T37LeftBlock title="Personality">
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  color: "rgba(255,255,255,.92)",
                }}
              >
                {persList.map((p, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {p}
                  </li>
                ))}
              </ul>
            </T37LeftBlock>
          )}
        </div>

        {/* Right main */}
        <div style={{ padding: "14px 18px 14px 16px", overflow: "hidden" }}>
          {experiences.length > 0 && (
            <T37RightBlock title="Experience">
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "700",
                        color: TEXT_DARK,
                        margin: 0,
                      }}
                    >
                      {exp?.position}
                    </h3>
                    <span
                      style={{
                        flexShrink: 0,
                        color: "#4b5563",
                      }}
                    >
                      {exp?.dates}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#555",
                      margin: "1px 0 3px",
                    }}
                  >
                    {exp?.organization}
                  </p>
                  <div
                  dangerouslySetInnerHTML={{
                    __html: exp.responsibility,
                  }}
                  className="job-description"
                  style={{ margin: 0, paddingLeft: "14px" }}
                />
                </div>
              ))}
            </T37RightBlock>
          )}

          {referees.length > 0 && (
            <T37RightBlock title="References">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {referees.map((r, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontWeight: "700",
                        color: TEXT_DARK,
                        margin: "0 0 1px",
                      }}
                    >
                      {r?.fullName || "-"}
                    </p>
                    <p
                      style={{
                        color: "#555",
                        margin: "0 0 2px",
                      }}
                    >
                      {r?.company || "-"}
                    </p>
                    <p style={{  color: "#555", margin: 0 }}>
                      {r?.position || "-"}
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#374151",
                        margin: "4px 0 0",
                      }}
                    >
                      {r?.phone || "-"}
                    </p>
                    <p
                      style={{ color: "#374151", margin: 0 }}
                    >
                      {r?.email || "-"}
                    </p>
                  </div>
                ))}
              </div>
            </T37RightBlock>
          )}
        </div>
      </div>
    </div>
  );
}
