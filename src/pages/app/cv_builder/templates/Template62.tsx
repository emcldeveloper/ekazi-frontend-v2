import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

const ACCENT = "#163854";
const PAPER = "#f5f3ef";
const HEADING = "#1b1f27";
const TEXT = "#363c45";
const MUTED = "#6d737c";
const LIGHT_TEXT = "#f7f7f3";
const LIGHT_MUTED = "rgba(247,247,243,.82)";
const RULE = "#b39d7c";
const PANEL = ACCENT;
const PANEL_SOFT = "rgba(22,56,84,.08)";

interface T62SidebarSectionProps {
  title: string;
  children: ReactNode;
}

function T62SidebarSection({ title, children }: T62SidebarSectionProps) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
        }}
      >
        <h2
          style={{
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: ".32em",
            color: HEADING,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <span style={{ height: "1px", background: RULE }} />
      </div>
      {children}
    </div>
  );
}

interface T62DarkSectionProps {
  title: string;
  children: ReactNode;
  extraMargin?: boolean;
}

function T62DarkSection({ title, children, extraMargin }: T62DarkSectionProps) {
  return (
    <div style={extraMargin ? { marginTop: "16px" } : {}}>
      <h2
        style={{
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: ".32em",
          color: LIGHT_TEXT,
          margin: "0 0 5px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          height: "1px",
          width: "100%",
          background: RULE,
          marginBottom: "10px",
        }}
      />
      {children}
    </div>
  );
}

interface T62ExpItemProps {
  item: TimelineEntry;
}

function T62ExpItem({ item }: T62ExpItemProps) {
  const title = item?.position || "Experience";
  const org = item?.organization;
  const dates = item?.dates || "";
  const [start, end] = dates.includes(" - ") ? dates.split(" - ") : [dates, ""];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: "10px",
        marginBottom: "12px",
      }}
    >
      <div style={{ paddingTop: "2px", textAlign: "center" }}>
        <div
          style={{
            fontWeight: "600",
            color: LIGHT_TEXT,
          }}
        >
          {start}
        </div>
        {end && (
          <>
            <div
              style={{
                lineHeight: "none",
                color: LIGHT_MUTED,
              }}
            >
              -
            </div>
            <div
              style={{
                fontWeight: "600",
                color: LIGHT_TEXT,
              }}
            >
              {end}
            </div>
          </>
        )}
      </div>
      <div style={{ borderLeft: `1px solid ${RULE}`, paddingLeft: "10px" }}>
        <h3
          style={{
            fontWeight: "900",
            color: LIGHT_TEXT,
            margin: "0 0 3px",
          }}
        >
          {title}
        </h3>
        {org && (
          <p
            style={{
              color: LIGHT_TEXT,
              margin: "0 0 3px",
            }}
          >
            {org}
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
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface TimelineEntry {
  position?: string;
  organization?: string;
  dates?: string;
  responsibility?: string;
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
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template62Profile {
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

interface Template62Props {
  profile: Template62Profile;
}

export default function Template62({ profile }: Template62Props) {
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
        padding: "18px 20px 60px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          gap: "16px",
          height: "100%",
        }}
      >
        {/* Header with dark corner + photo */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-20px",
              top: "-18px",
              width: "calc(100% + 20px)",
              height: "120px",
              background: ACCENT,
              borderRadius: "0 0 24px 0",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              height: "120px",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                marginTop: "16px",
                background: ACCENT,
                padding: "6px",
                borderRadius: "50%",
                boxShadow: "0 10px 24px rgba(0,0,0,.1)",
                transform: "translateX(-6px)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid #fff",
                  background: "#fff",
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
          </div>

          <div style={{ paddingTop: "8px" }}>
            {[
              [<IconPhone />, phone],
              [<IconMail />, email],
              [<IconMapPin />, location],
            ].filter(([, v]) => v).length > 0 && (
              <T62SidebarSection title="Contact">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
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
                          gap: "6px",

                          color: HEADING,
                        }}
                      >
                        <span
                          style={{
                            color: RULE,
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
              </T62SidebarSection>
            )}
            {educations.length > 0 && (
              <T62SidebarSection title="Education">
                {educations.map((edu, i) => (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    <h3
                      style={{
                        fontWeight: "900",
                        color: HEADING,
                        margin: "0 0 1px",
                      }}
                    >
                      {edu?.level || "Education"}
                    </h3>
                    {edu?.college && (
                      <p
                        style={{
                          color: TEXT,
                          margin: "0 0 1px",
                        }}
                      >
                        {edu.college}
                      </p>
                    )}
                    {edu?.dates && (
                      <p
                        style={{
                          color: MUTED,
                          margin: 0,
                        }}
                      >
                        {edu.dates}
                      </p>
                    )}
                  </div>
                ))}
              </T62SidebarSection>
            )}
            {skills.length > 0 && (
              <T62SidebarSection title="Skills">
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
              </T62SidebarSection>
            )}
            {langList.length > 0 && (
              <T62SidebarSection title="Languages">
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
              </T62SidebarSection>
            )}
            {swList.length > 0 && (
              <T62SidebarSection title="Software">
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: TEXT,
                  }}
                >
                  {swList.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </T62SidebarSection>
            )}
            {cultList.length > 0 && (
              <T62SidebarSection title="Culture Fit">
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: TEXT,
                  }}
                >
                  {cultList.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </T62SidebarSection>
            )}
            {persList.length > 0 && (
              <T62SidebarSection title="Personality">
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,

                    color: TEXT,
                  }}
                >
                  {persList.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </T62SidebarSection>
            )}
          </div>
        </div>

        {/* Main — dark rounded panel */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Name in header area */}
          <div style={{ paddingBottom: "16px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: ".03em",

                color: ACCENT,
                margin: "0 0 3px",
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </h1>
            {current_position && (
              <p
                style={{
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: ".24em",
                  color: HEADING,
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            )}
          </div>

          {/* Dark panel */}
          <div
            style={{
              flex: 1,
              background: PANEL,
              borderRadius: "18px 18px 18px 0",
              padding: "16px 18px 60px",
              overflow: "hidden",
            }}
          >
            {summary && (
              <T62DarkSection title="About Me">
                <p
                  style={{
                    color: LIGHT_TEXT,
                  }}
                >
                  {summary}
                </p>
              </T62DarkSection>
            )}
            {experiences.length > 0 && (
              <T62DarkSection title="Experience" extraMargin={!!summary}>
                {experiences.map((exp, i) => (
                  <T62ExpItem key={i} item={exp} />
                ))}
              </T62DarkSection>
            )}
            {referees.length > 0 && (
              <T62DarkSection title="References" extraMargin>
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
                        borderRadius: "10px",
                        padding: "8px 10px",
                        background: PANEL_SOFT,
                      }}
                    >
                      <h3
                        style={{
                          fontWeight: "900",
                          textTransform: "uppercase",

                          color: LIGHT_TEXT,
                          margin: "0 0 2px",
                        }}
                      >
                        {r?.fullName || "-"}
                      </h3>
                      {[r?.position, r?.company].filter(Boolean).join(" ") && (
                        <p
                          style={{
                            color: LIGHT_TEXT,
                            margin: "0 0 4px",
                          }}
                        >
                          {[r?.position, r?.company].filter(Boolean).join(" ")}
                        </p>
                      )}
                      {r?.phone && (
                        <p
                          style={{
                            color: LIGHT_MUTED,
                            margin: 0,
                          }}
                        >
                          {r.phone}
                        </p>
                      )}
                      {r?.email && (
                        <p
                          style={{
                            color: LIGHT_MUTED,
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
              </T62DarkSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
