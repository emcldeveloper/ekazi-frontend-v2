import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T48HeroContactProps {
  icon: ReactNode;
  value: string;
}

function T48HeroContact({ icon, value }: T48HeroContactProps) {
  const HEADING = "#1d1b20";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "5px",
        breakInside: "avoid",
      }}
    >
      <span
        style={{
          color: HEADING,
          marginTop: "1px",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span
        style={{
          color: HEADING,
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
}

interface T48SidebarSectionProps {
  title: string;
  children: ReactNode;
  accentDark: string;
}

function T48SidebarSection({
  title,
  children,
  accentDark,
}: T48SidebarSectionProps) {
  const HEADING = "#1d1b20";
  return (
    <div style={{ marginBottom: "14px" }}>
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
            lineHeight: "none",
            color: HEADING,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <span style={{ height: "1px", background: accentDark }} />
      </div>
      {children}
    </div>
  );
}

interface T48MainSectionProps {
  title: string;
  children: ReactNode;
  accentDark: string;
}

function T48MainSection({ title, children, accentDark }: T48MainSectionProps) {
  const HEADING = "#1d1b20";
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          alignItems: "flex-end",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <h2
          style={{
            fontWeight: "900",
            lineHeight: "none",
            color: HEADING,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div
          style={{ height: "1px", marginBottom: "1px", background: accentDark }}
        />
      </div>
      {children}
    </div>
  );
}

interface T48SkillGroupProps {
  title: string;
  items: string[];
}

function T48SkillGroup({ title, items }: T48SkillGroupProps) {
  const HEADING = "#1d1b20";
  const TEXT = "#4b4650";
  return (
    <div>
      <h3
        style={{
          fontWeight: "600",
          textTransform: "uppercase",
          color: HEADING,
          margin: "0 0 4px",
        }}
      >
        {title}
      </h3>
      <ul
        style={{
          listStyle: "disc",
          paddingLeft: "14px",
          margin: 0,
          color: TEXT,
        }}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

interface T48ExpItemProps {
  item: TimelineEntry;
}

function T48ExpItem({ item }: T48ExpItemProps) {
  const HEADING = "#1d1b20";
  const MUTED = "#7d7680";

  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "10px",
        }}
      >
        <div>
          <h3
            style={{
              fontWeight: "700",
              textTransform: "uppercase",
              color: HEADING,
              margin: "0 0 1px",
            }}
          >
            {item?.position || "Experience"}
          </h3>
          {item?.organization && (
            <p
              style={{
                fontWeight: "500",
                color: MUTED,
                margin: 0,
              }}
            >
              {item.organization}
            </p>
          )}
        </div>
        {item?.dates && (
          <div
            style={{
              color: MUTED,
              textAlign: "right",
              paddingTop: "1px",
              whiteSpace: "nowrap",
            }}
          >
            {item.dates}
          </div>
        )}
      </div>
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

interface T48EduItemProps {
  item: TimelineEntry;
}

function T48EduItem({ item }: T48EduItemProps) {
  const HEADING = "#1d1b20";
  const TEXT = "#4b4650";
  const MUTED = "#7d7680";
  return (
    <div style={{ marginBottom: "8px" }}>
      <h3
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
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

interface T48RefereeCardProps {
  r: Referee;
}

function T48RefereeCard({ r }: T48RefereeCardProps) {
  const HEADING = "#1d1b20";
  const TEXT = "#4b4650";
  const role = [r?.position, r?.company].filter(Boolean).join(" | ");
  return (
    <div
      style={{
        borderRadius: "8px",
        padding: "8px 10px",
        background: "#e9e6ea",
      }}
    >
      <h3
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          color: HEADING,
          margin: "0 0 2px",
        }}
      >
        {r?.fullName || "-"}
      </h3>
      {role && (
        <p
          style={{
            color: TEXT,
            margin: "0 0 4px",
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
  position?: string;
  organization?: string;
  dates?: string;
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
  position: string;
  company: string;
  fullName: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template48Profile {
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

interface Template48Props {
  profile: Template48Profile;
}

export default function Template48({ profile }: Template48Props) {
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
  const ACCENT = "#f3b184";
  const ACCENT_DARK = "#e28647";
  const PANEL = "#e9e6ea";
  const HEADING = "#1d1b20";
  const TEXT = "#4b4650";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];

  const skillGroups = [
    { title: "Skills", items: skills },
    { title: "Software", items: swList },
    { title: "Culture Fit", items: cultList },
    { title: "Personality", items: persList },
  ].filter((g) => g.items.length > 0);

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
        padding: "16px 18px 60px",
      }}
    >
      {/* Header: peach rounded bar with offset circular photo */}
      <div style={{ position: "relative", marginBottom: "18px" }}>
        <div
          style={{
            marginLeft: "60px",
            borderRadius: "18px",
            background: ACCENT,
            padding: "14px 18px 12px 70px",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "900",
              textTransform: "uppercase",
              color: HEADING,
              margin: "0 0 2px",
              wordBreak: "break-word",
            }}
          >
            {fullName}
          </h1>
          {current_position && (
            <p
              style={{
                fontWeight: "500",
                color: HEADING,
                margin: "0 0 8px",
              }}
            >
              {current_position}
            </p>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4px 16px",
            }}
          >
            {([
              [<IconPhone />, phone],
              [<IconMail />, email],
              [<IconMapPin />, location],
            ] as [ReactNode, string][])
              .filter(([, v]) => v)
              .map(([icon, val], i) => (
                <T48HeroContact key={i} icon={icon} value={val} />
              ))}
          </div>
        </div>
        {/* Offset circular photo */}
        <div
          style={{
            position: "absolute",
            left: "8px",
            top: "8px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "5px solid #fff",
            boxShadow: "0 10px 22px rgba(0,0,0,.14)",
            zIndex: 10,
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

      {/* Body grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "150px 1fr",
          gap: "18px",
          height: "calc(100% - 140px)",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            background: PANEL,
            borderRadius: "4px 18px 18px 4px",
            padding: "14px 14px 14px 14px",
            overflow: "hidden",
          }}
        >
          {summary && (
            <T48SidebarSection title="About Me" accentDark={ACCENT_DARK}>
              <p style={{ color: TEXT }}>{summary}</p>
            </T48SidebarSection>
          )}
          {langList.length > 0 && (
            <T48SidebarSection title="Languages" accentDark={ACCENT_DARK}>
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "14px",
                  margin: 0,
                  color: TEXT,
                }}
              >
                {langList.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </T48SidebarSection>
          )}
          {referees.length > 0 && (
            <T48SidebarSection title="References" accentDark={ACCENT_DARK}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {referees.map((r, i) => (
                  <T48RefereeCard key={i} r={r} />
                ))}
              </div>
            </T48SidebarSection>
          )}
        </div>

        {/* Main */}
        <div style={{ overflow: "hidden" }}>
          {skillGroups.length > 0 && (
            <T48MainSection title="Skills" accentDark={ACCENT_DARK}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px 20px",
                }}
              >
                {skillGroups.map((g) => (
                  <T48SkillGroup
                    key={g.title}
                    title={g.title}
                    items={g.items}
                  />
                ))}
              </div>
            </T48MainSection>
          )}
          {experiences.length > 0 && (
            <T48MainSection title="Experience" accentDark={ACCENT_DARK}>
              {experiences.map((exp, i) => (
                <T48ExpItem key={i} item={exp} />
              ))}
            </T48MainSection>
          )}
          {educations.length > 0 && (
            <T48MainSection title="Education" accentDark={ACCENT_DARK}>
              {educations.map((edu, i) => (
                <T48EduItem key={i} item={edu} />
              ))}
            </T48MainSection>
          )}
        </div>
      </div>
    </div>
  );
}
