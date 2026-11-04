import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T60SectionHeadingProps {
  title: string;
  accent: string;
}

function T60SectionHeading({ title, accent }: T60SectionHeadingProps) {
  const HEADING = "#232733";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content 1fr",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <h2
        style={{
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: ".18em",
          color: HEADING,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <span style={{ height: "1.5px", background: accent }} />
    </div>
  );
}

interface T60ContactItemProps {
  icon: ReactNode;
  value: string;
  accent: string;
}

function T60ContactItem({ icon, value, accent }: T60ContactItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: "28px",
          height: "28px",
          background: accent,
          flexShrink: 0,
          color: "#fff",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          paddingTop: "2px",

          color: "#5b6168",
        }}
      >
        {value}
      </span>
    </div>
  );
}

interface T60EducationItemProps {
  item: TimelineEntry;
}

function T60EducationItem({ item }: T60EducationItemProps) {
  const HEADING = "#232733";
  const TEXT = "#5b6168";
  const MUTED = "#7b8087";
  return (
    <div style={{ marginBottom: "10px" }}>
      <h3
        style={{
          fontWeight: "700",
          color: HEADING,
          margin: "0 0 1px",
        }}
      >
        {item?.level || "Education"}
      </h3>
      {item?.college && (
        <p
          style={{
            color: TEXT,
            margin: "0 0 1px",
          }}
        >
          {item.college}
        </p>
      )}
      {item?.dates && <p style={{ color: MUTED, margin: 0 }}>{item.dates}</p>}
    </div>
  );
}

interface T60ExpTimelineProps {
  items: Experience[];
  accent: string;
  paper: string;
}

function T60ExpTimeline({ items, accent, paper }: T60ExpTimelineProps) {
  const HEADING = "#232733";
  const TEXT = "#5b6168";
  return (
    <div style={{ position: "relative", paddingLeft: "22px" }}>
      <span
        style={{
          position: "absolute",
          left: "3px",
          top: "3px",
          bottom: "3px",
          width: "1px",
          background: accent,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.map((exp, i) => (
          <div key={i} style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "-22px",
                top: "3px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                border: `2px solid ${accent}`,
                background: paper,
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "10px",
                marginBottom: "2px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: HEADING,
                    margin: 0,
                  }}
                >
                  {exp?.position || "Experience"}
                </h3>
                {exp?.organization && (
                  <p
                    style={{
                      color: TEXT,
                      margin: "1px 0 0",
                    }}
                  >
                    {exp.organization}
                  </p>
                )}
              </div>
              {exp?.dates && (
                <div
                  style={{
                    fontStyle: "italic",
                    color: HEADING,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    paddingTop: "1px",
                  }}
                >
                  {exp.dates}
                </div>
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
  );
}

interface T60RefereeCardProps {
  r: Referee;
  accent: string;
}

function T60RefereeCard({ r }: T60RefereeCardProps) {
  const HEADING = "#232733";
  const TEXT = "#5b6168";
  const role = [r?.company, r?.position].filter(Boolean).join(" / ");
  return (
    <div style={{ marginBottom: "8px" }}>
      <h3
        style={{
          fontWeight: "700",
          color: HEADING,
          margin: "0 0 1px",
        }}
      >
        {r?.fullName || "-"}
      </h3>
      {role && (
        <p
          style={{
            color: TEXT,
            margin: "0 0 3px",
          }}
        >
          {role}
        </p>
      )}
      {r?.phone && (
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: "600", color: HEADING }}>Phone:</span>{" "}
          {r.phone}
        </p>
      )}
      {r?.email && (
        <p style={{ margin: 0, wordBreak: "break-all" }}>
          <span style={{ fontWeight: "600", color: HEADING }}>Email:</span>{" "}
          {r.email}
        </p>
      )}
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface TimelineEntry {
  level?: string;
  college?: string;
  dates?: string;
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
  company: string;
  position: string;
  fullName: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template60Profile {
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

interface Template60Props {
  profile: Template60Profile;
}

export default function Template60({ profile }: Template60Props) {
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
  const ACCENT = "#ff7a1f";
  const PAPER = "#f7f5f2";
  const SIDEBAR = "#e4e2de";
  const HEADING = "#232733";
  const TEXT = "#5b6168";

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
        background: PAPER,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "145px 1fr",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            background: SIDEBAR,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Photo — offset into main column */}
          <div style={{ padding: "20px 16px 0" }}>
            <div
              style={{
                position: "relative",
                width: "90px",
                height: "90px",
                transform: "translateX(8px)",
                borderRadius: "50%",
                overflow: "hidden",
                border: "7px solid #fff",
                boxShadow: "0 14px 30px rgba(0,0,0,.07)",
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
                  (e.currentTarget.src =
                    "https://placehold.co/90x90?text=Photo")
                }
              />
            </div>
          </div>

          <div
            style={{ flex: 1, padding: "16px 14px 60px", overflow: "hidden" }}
          >
            {summary && (
              <div style={{ marginBottom: "12px" }}>
                <T60SectionHeading title="About Me" accent={ACCENT} />
                <p style={{ color: HEADING }}>{summary}</p>
              </div>
            )}

            {educations.length > 0 && (
              <div style={{ marginBottom: "12px" }}>
                <T60SectionHeading title="Education" accent={ACCENT} />
                {educations.map((edu, i) => (
                  <T60EducationItem key={i} item={edu} />
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T60SectionHeading title="Skills" accent={ACCENT} />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: HEADING,
                  }}
                >
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {swList.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T60SectionHeading title="Software" accent={ACCENT} />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: HEADING,
                  }}
                >
                  {swList.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {langList.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T60SectionHeading title="Languages" accent={ACCENT} />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: HEADING,
                  }}
                >
                  {langList.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
            {cultList.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T60SectionHeading title="Culture Fit" accent={ACCENT} />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: HEADING,
                  }}
                >
                  {cultList.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            {persList.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <T60SectionHeading title="Personality" accent={ACCENT} />
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: HEADING,
                  }}
                >
                  {persList.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main */}
        <div style={{ padding: "0 16px 60px", overflow: "hidden" }}>
          {/* Header banner */}
          <div
            style={{
              position: "relative",
              marginLeft: "-16px",
              display: "flex",
              minHeight: "80px",
              alignItems: "center",
              padding: "14px 20px 14px 70px",
              background: ACCENT,
              marginBottom: "16px",
            }}
          >
            <div style={{ maxWidth: "300px" }}>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  color: "#fff",
                  margin: "0 0 3px",
                  wordBreak: "break-word",
                }}
              >
                {fullName}
              </h1>
              {current_position && (
                <p
                  style={{
                    fontWeight: "300",
                    letterSpacing: ".22em",
                    color: "rgba(255,255,255,.95)",
                    margin: 0,
                  }}
                >
                  {current_position}
                </p>
              )}
            </div>
          </div>

          {/* Contact */}
          {[
            [<IconPhone />, phone],
            [<IconMail />, email],
            [<IconMapPin />, location],
          ].filter(([, v]) => v).length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px 16px",
                marginBottom: "14px",
              }}
            >
              {([
                [<IconPhone />, phone],
                [<IconMail />, email],
                [<IconMapPin />, location],
              ] as [ReactNode, string][])
                .filter(([, v]) => v)
                .map(([icon, val], i) => (
                  <T60ContactItem
                    key={i}
                    icon={icon}
                    value={val}
                    accent={ACCENT}
                  />
                ))}
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <T60SectionHeading title="Experience" accent={ACCENT} />
              <T60ExpTimeline
                items={experiences}
                accent={ACCENT}
                paper={PAPER}
              />
            </div>
          )}

          {/* Referees */}
          {referees.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <T60SectionHeading title="References" accent={ACCENT} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {referees.map((r, i) => (
                  <T60RefereeCard key={i} r={r} accent={ACCENT} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
