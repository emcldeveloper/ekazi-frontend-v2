import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T40SectionHeaderProps {
  title: string;
  icon?: ReactNode;
}

function T40SectionHeader({ title, icon }: T40SectionHeaderProps) {
  const ACCENT = "#e5481d";
  const ACCENT_SOFT = "#efab98";
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
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {icon && <span style={{ color: ACCENT }}>{icon}</span>}
        <h2
          style={{
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: ".02em",
            color: ACCENT,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <span style={{ height: "1px", background: ACCENT_SOFT }} />
    </div>
  );
}

interface T40EducationItemProps {
  item: TimelineEntry;
}

function T40EducationItem({ item }: T40EducationItemProps) {
  const ACCENT = "#e5481d";
  const TITLE = "#27303d";
  const META = "#6c7682";
  const level = item?.level || item?.college || "Education";
  const sub = level === item?.college ? "" : item?.college;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "10px",
        marginBottom: "8px",
      }}
    >
      <div>
        <h3
          style={{
            fontWeight: "700",
            color: TITLE,
            margin: "0 0 1px",
          }}
        >
          {level}
        </h3>
        {sub && (
          <p
            style={{
              color: META,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {sub}
          </p>
        )}
      </div>
      {item?.dates && (
        <div
          style={{
            fontWeight: "700",
            fontStyle: "italic",
            color: ACCENT,
            textAlign: "right",
            paddingTop: "1px",
            whiteSpace: "nowrap",
          }}
        >
          {item.dates}
        </div>
      )}
    </div>
  );
}

interface T40ExperienceItemProps {
  item: TimelineEntry;
}

function T40ExperienceItem({ item }: T40ExperienceItemProps) {
  const ACCENT = "#e5481d";
  const TITLE = "#27303d";
  const heading = [item?.position, item?.organization]
    .filter(Boolean)
    .join(" | ");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <div>
        <h3
          style={{
            fontWeight: "700",
            color: TITLE,
            margin: "0 0 3px",
          }}
        >
          {heading || "Experience"}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: item.responsibility as string,
          }}
          className="job-description"
          style={{ margin: 0, paddingLeft: "14px" }}
        />
      </div>
      {item?.dates && (
        <div
          style={{
            fontWeight: "700",
            fontStyle: "italic",
            color: ACCENT,
            textAlign: "right",
            paddingTop: "1px",
            whiteSpace: "nowrap",
          }}
        >
          {item.dates}
        </div>
      )}
    </div>
  );
}

interface T40DetailPanelProps {
  title: string;
  items: string[];
}

function T40DetailPanel({ title, items }: T40DetailPanelProps) {
  const TEXT = "#4f5967";
  const cols =
    items.length > 6
      ? [
          items.slice(0, Math.ceil(items.length / 2)),
          items.slice(Math.ceil(items.length / 2)),
        ]
      : [items];
  return (
    <div style={{ marginBottom: "10px" }}>
      <T40SectionHeader title={title} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols.length}, 1fr)`,
          gap: "20px",
        }}
      >
        {cols.map((col, ci) => (
          <ul
            key={ci}
            style={{
              listStyle: "disc",
              paddingLeft: "14px",
              margin: 0,
              color: TEXT,
            }}
          >
            {col.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
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
  position?: string;
  organization?: string;
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

interface Template40Profile {
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

interface Template40Props {
  profile: Template40Profile;
}

export default function Template40({ profile }: Template40Props) {
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
  const ACCENT = "#e5481d";
  const ACCENT_SOFT = "#efab98";
  const TITLE = "#27303d";
  const TEXT = "#4f5967";
  const META = "#6c7682";

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);

  const detailPanels = [
    { title: "Skills", items: skills },
    { title: "Languages", items: langList },
    { title: "Software", items: swList },
    { title: "Culture Fit", items: cultList },
    { title: "Personality", items: persList },
  ].filter((p) => p.items.length > 0);

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: TEXT,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fbfbfa",
        overflow: "hidden",
      }}
    >
      {/* Orange accent top bar */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ height: "6px", width: "45%", background: ACCENT }} />
      </div>

      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr",
          alignItems: "center",
          gap: "16px",
          padding: "12px 18px 10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              border: `5px solid ${ACCENT}`,
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
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: ".03em",
              color: ACCENT,
              margin: "0 0 2px",
              lineHeight: 1.02,
              wordBreak: "break-word",
            }}
          >
            {fullName}
          </h1>
          {current_position && (
            <p
              style={{
                fontWeight: "500",
                color: TITLE,
                margin: "0 0 6px",
              }}
            >
              {current_position}
            </p>
          )}
          <div
            style={{
              height: "1px",
              width: "100%",
              background: ACCENT_SOFT,
              marginBottom: "5px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              color: META,
            }}
          >
            {[
              [<IconMail />, email],
              [<IconPhone />, phone],
              [<IconMapPin />, location],
            ]
              .filter(([, v]) => v)
              .map(([icon, val], i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    wordBreak: "break-all",
                  }}
                >
                  <span style={{ color: ACCENT }}>{icon}</span>
                  {val}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "6px 18px",
          height: "calc(100% - 118px)",
          overflow: "hidden",
        }}
      >
        {summary && (
          <div style={{ marginBottom: "10px" }}>
            <T40SectionHeader title="About Me" />
            <p
              style={{
                color: TEXT,
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
        )}
        {educations.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <T40SectionHeader title="Education" />
            {educations.map((edu, i) => (
              <T40EducationItem key={i} item={edu} />
            ))}
          </div>
        )}
        {experiences.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <T40SectionHeader title="Work Experience" />
            {experiences.map((exp, i) => (
              <T40ExperienceItem key={i} item={exp} />
            ))}
          </div>
        )}
        {detailPanels.map((p) => (
          <T40DetailPanel key={p.title} title={p.title} items={p.items} />
        ))}
        {referees.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <T40SectionHeader title="References" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `3px solid ${ACCENT}`,
                    paddingLeft: "10px",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: "700",
                      color: TITLE,
                      margin: "0 0 2px",
                    }}
                  >
                    {r?.fullName || "-"}
                  </h3>
                  {[r?.position, r?.company].filter(Boolean).join(" | ") && (
                    <p
                      style={{
                        margin: "0 0 3px",
                      }}
                    >
                      {[r?.position, r?.company].filter(Boolean).join(" | ")}
                    </p>
                  )}
                  {r?.phone && <p style={{ margin: 0 }}>Phone: {r.phone}</p>}
                  {r?.email && <p style={{ margin: 0 }}>Email: {r.email}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
