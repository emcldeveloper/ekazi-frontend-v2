import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T49SectionPillProps {
  title: string;
}

function T49SectionPill({ title }: T49SectionPillProps) {
  const ORANGE = "#e29a3b";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "999px",
        background: ORANGE,
        padding: "4px 18px",
        marginBottom: "10px",
      }}
    >
      <span
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".12em",
          color: "#fff",
        }}
      >
        {title}
      </span>
    </div>
  );
}

interface T49SidebarSectionProps {
  title: string;
  children: ReactNode;
}

function T49SidebarSection({ title, children }: T49SidebarSectionProps) {
  const ORANGE = "#e29a3b";
  const HEADING = "#46427c";
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            textTransform: "uppercase",
            lineHeight: "none",
            color: HEADING,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <span style={{ height: "1px", background: ORANGE }} />
      </div>
      {children}
    </div>
  );
}

interface T49ExpCardProps {
  item: TimelineEntry;
}

function T49ExpCard({ item }: T49ExpCardProps) {
  const HEADING = "#46427c";
  const TEXT = "#4b4a58";
  const MUTED = "#8c889b";

  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "10px",
        }}
      >
        <h3
          style={{
            fontWeight: "700",
            textTransform: "uppercase",
            color: HEADING,
            margin: 0,
          }}
        >
          {item?.position || "Experience"}
        </h3>
        {item?.dates && (
          <div
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: MUTED,
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            {item.dates}
          </div>
        )}
      </div>
      {item?.organization && (
        <p
          style={{
            fontWeight: "500",
            color: TEXT,
            margin: "1px 0 3px",
          }}
        >
          {item.organization}
        </p>
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: item.responsibility as string,
        }}
        className="job-description"
        style={{ margin: 0, paddingLeft: "14px" }}
      />
    </div>
  );
}

interface T49EduCardProps {
  item: TimelineEntry;
}

function T49EduCard({ item }: T49EduCardProps) {
  const HEADING = "#46427c";
  const TEXT = "#4b4a58";
  const MUTED = "#8c889b";
  return (
    <div style={{ marginBottom: "8px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "10px",
        }}
      >
        <h3
          style={{
            fontWeight: "700",
            textTransform: "uppercase",
            color: HEADING,
            margin: 0,
          }}
        >
          {item?.level || "Education"}
        </h3>
        {item?.dates && (
          <div
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: MUTED,
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            {item.dates}
          </div>
        )}
      </div>
      {item?.college && (
        <p
          style={{
            color: TEXT,
            margin: "1px 0 0",
          }}
        >
          {item.college}
        </p>
      )}
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface TimelineEntry {
  position?: string;
  dates?: string;
  organization?: string;
  responsibility?: string;
  level?: string;
  college?: string;
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
  phone: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template49Profile {
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

interface Template49Props {
  profile: Template49Profile;
}

export default function Template49({ profile }: Template49Props) {
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
  const PURPLE = "#5f5896";
  const ORANGE = "#e29a3b";
  const HEADING = "#46427c";
  const TEXT = "#4b4a58";
  const MUTED = "#8c889b";
  const SIDEBAR_TEXT = "#433f55";

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
      {/* Decorative purple sidebar */}
      <div
        style={{
          position: "absolute",
          left: "16px",
          top: "16px",
          bottom: "16px",
          width: "90px",
          borderRadius: "999px",
          background: PURPLE,
          zIndex: 0,
        }}
      />

      {/* Vertical decorative text */}
      <div
        style={{
          position: "absolute",
          left: "18px",
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          color: "rgba(255,255,255,.08)",
          fontWeight: "700",
          letterSpacing: ".38em",
          zIndex: 1,
        }}
      >
        {"Resume".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>

      {/* Circular photo */}
      <div
        style={{ position: "absolute", left: "32px", top: "30px", zIndex: 20 }}
      >
        <div
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid #fff",
            boxShadow: "0 10px 18px rgba(0,0,0,.14)",
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

      {/* Main content grid */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "145px 1fr",
          gap: "20px",
          height: "100%",
          padding: "14px 16px 60px 14px",
        }}
      >
        {/* Left sidebar content */}
        <div
          style={{
            paddingLeft: "56px",
            paddingTop: "90px",
            overflow: "hidden",
          }}
        >
          {skills.length > 0 && (
            <T49SidebarSection title="Skills">
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "14px",
                  margin: 0,
                  color: SIDEBAR_TEXT,
                }}
              >
                {skills.map((s, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </T49SidebarSection>
          )}
          {swList.length > 0 && (
            <T49SidebarSection title="Software">
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "14px",
                  margin: 0,
                  color: SIDEBAR_TEXT,
                }}
              >
                {swList.map((s, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </T49SidebarSection>
          )}
          {langList.length > 0 && (
            <T49SidebarSection title="Languages">
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "14px",
                  margin: 0,
                  color: SIDEBAR_TEXT,
                }}
              >
                {langList.map((l, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {l}
                  </li>
                ))}
              </ul>
            </T49SidebarSection>
          )}
          {cultList.length > 0 && (
            <T49SidebarSection title="Culture Fit">
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "14px",
                  margin: 0,
                  color: SIDEBAR_TEXT,
                }}
              >
                {cultList.map((c, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {c}
                  </li>
                ))}
              </ul>
            </T49SidebarSection>
          )}
          {persList.length > 0 && (
            <T49SidebarSection title="Personality">
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "14px",
                  margin: 0,
                  color: SIDEBAR_TEXT,
                }}
              >
                {persList.map((p, i) => (
                  <li key={i} style={{ marginBottom: "2px" }}>
                    {p}
                  </li>
                ))}
              </ul>
            </T49SidebarSection>
          )}
          {referees.length > 0 && (
            <T49SidebarSection title="References">
              {referees.map((r, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <h3
                    style={{
                      fontWeight: "700",
                      textTransform: "uppercase",
                      color: HEADING,
                      margin: "0 0 1px",
                    }}
                  >
                    {r?.fullName || "-"}
                  </h3>
                  {[r?.position, r?.company].filter(Boolean).join(" | ") && (
                    <p
                      style={{
                        color: "#746f88",
                        margin: "0 0 1px",
                      }}
                    >
                      {[r?.position, r?.company].filter(Boolean).join(" | ")}
                    </p>
                  )}
                  {r?.phone && (
                    <p
                      style={{
                        color: "#746f88",
                        margin: 0,
                      }}
                    >
                      {r.phone}
                    </p>
                  )}
                </div>
              ))}
            </T49SidebarSection>
          )}
        </div>

        {/* Main right */}
        <div
          style={{
            borderLeft: "1px solid #ded9e5",
            paddingLeft: "16px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "14px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "900",
                textTransform: "uppercase",
                color: HEADING,
                margin: "0 0 3px",
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </h1>
            {current_position && (
              <p
                style={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: ".34em",
                  color: MUTED,
                  margin: "0 0 8px",
                }}
              >
                {current_position}
              </p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
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
                      gap: "4px",
                      fontWeight: "500",
                      color: TEXT,
                    }}
                  >
                    <span style={{ color: ORANGE }}>{icon}</span>
                    <span style={{ wordBreak: "break-all" }}>{val}</span>
                  </div>
                ))}
            </div>
          </div>

          {summary && (
            <div style={{ marginBottom: "12px" }}>
              <T49SectionPill title="About Me" />
              <p style={{ color: TEXT }}>{summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T49SectionPill title="Experience" />
              <div
                style={{
                  borderLeft: `3px solid ${PURPLE}`,
                  paddingLeft: "14px",
                }}
              >
                {experiences.map((exp, i) => (
                  <T49ExpCard key={i} item={exp} />
                ))}
              </div>
            </div>
          )}

          {educations.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T49SectionPill title="Education" />
              <div
                style={{
                  borderLeft: `3px solid ${PURPLE}`,
                  paddingLeft: "14px",
                }}
              >
                {educations.map((edu, i) => (
                  <T49EduCard key={i} item={edu} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
