import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T42SectionBarProps {
  title: string;
}

function T42SectionBar({ title }: T42SectionBarProps) {
  const ACCENT = "#00357a";
  return (
    <div
      style={{
        background: ACCENT,
        padding: "5px 24px",
        textAlign: "center",
        marginBottom: "0",
      }}
    >
      <h2
        style={{
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: ".25em",
          color: "#fff",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

interface T42ContactRowProps {
  icon: ReactNode;
  value: string;
}

function T42ContactRow({ icon, value }: T42ContactRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#22252a",
      }}
    >
      {icon}
      <span style={{ wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

interface T42TimelineRowProps {
  dates: string;
  title: string;
  description: string;
}

function T42TimelineRow({ dates, title, description }: T42TimelineRowProps) {
  const HEADING = "#22252a";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70px 1fr",
        gap: "20px",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          color: HEADING,
          paddingTop: "1px",
        }}
      >
        {dates || "-"}
      </div>
      <div>
        <h3
          style={{
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: ".04em",
            color: HEADING,
            margin: "0 0 3px",
          }}
        >
          {title || "-"}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className="job-description"
          style={{ margin: 0, paddingLeft: "14px" }}
        />
      </div>
    </div>
  );
}

interface T42InfoBlockProps {
  items: string[];
  columns?: number;
}

function T42InfoBlock({ items, columns = 3 }: T42InfoBlockProps) {
  const cols = [];
  const perCol = Math.ceil(items.length / columns);
  for (let i = 0; i < columns; i++) {
    const chunk = items.slice(i * perCol, (i + 1) * perCol);
    if (chunk.length) cols.push(chunk);
  }
  const TEXT = "#4f5760";
  return (
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
            paddingLeft: "16px",
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
  );
}

interface T42RefereeCardProps {
  r: Referee;
}

function T42RefereeCard({ r }: T42RefereeCardProps) {
  const ACCENT = "#00357a";
  const HEADING = "#22252a";
  const MUTED = "#727b86";
  const role = [r?.position, r?.company].filter(Boolean).join(" | ");
  return (
    <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: "12px" }}>
      <h3
        style={{
          fontWeight: "600",
          color: HEADING,
          margin: "0 0 2px",
        }}
      >
        {r?.fullName || "-"}
      </h3>
      {role && (
        <p
          style={{
            color: MUTED,
            margin: "0 0 4px",
          }}
        >
          {role}
        </p>
      )}
      {r?.phone && <p style={{ margin: 0 }}>Phone: {r.phone}</p>}
      {r?.email && <p style={{ margin: 0 }}>Email: {r.email}</p>}
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

interface Template42Profile {
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

interface Template42Props {
  profile: Template42Profile;
}

export default function Template42({ profile }: Template42Props) {
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
  const HEADING = "#22252a";
  const TEXT = "#4f5760";

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
        color: TEXT,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fbfbfb",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px 24px 14px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "90px 1fr",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
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
                  (e.currentTarget.src =
                    "https://placehold.co/80x80?text=Photo")
                }
              />
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "900",
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
                height: "2px",
                width: "60px",
                background: HEADING,
                marginBottom: "8px",
              }}
            />
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "10px 20px" }}
            >
              {([
                [<IconPhone />, phone],
                [<IconMail />, email],
                [<IconMapPin />, location],
              ] as [ReactNode, string][])
                .filter(([, v]) => v)
                .map(([icon, val], i) => (
                  <T42ContactRow key={i} icon={icon} value={val} />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sections with navy bars */}
      {summary && (
        <>
          <T42SectionBar title="About Me" />
          <div style={{ padding: "10px 24px" }}>
            <p
              style={{
                color: TEXT,
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
        </>
      )}

      {educations.length > 0 && (
        <>
          <T42SectionBar title="Education" />
          <div style={{ padding: "10px 24px" }}>
            {educations.map((edu, i) => {
              const title = [edu?.level, edu?.college]
                .filter(Boolean)
                .join(" | ");
              return (
                <T42TimelineRow
                  key={i}
                  dates={edu?.dates}
                  title={title}
                  description=""
                />
              );
            })}
          </div>
        </>
      )}

      {experiences.length > 0 && (
        <>
          <T42SectionBar title="Work Experience" />
          <div style={{ padding: "10px 24px" }}>
            {experiences.map((exp, i) => {
              const title = [exp?.organization, exp?.position]
                .filter(Boolean)
                .join(" | ");
              return (
                <T42TimelineRow
                  key={i}
                  dates={exp?.dates}
                  title={title}
                  description={exp?.responsibility}
                />
              );
            })}
          </div>
        </>
      )}

      {skills.length > 0 && (
        <>
          <T42SectionBar title="Skills" />
          <div style={{ padding: "10px 24px" }}>
            <T42InfoBlock items={skills} columns={3} />
          </div>
        </>
      )}
      {swList.length > 0 && (
        <>
          <T42SectionBar title="Software" />
          <div style={{ padding: "10px 24px" }}>
            <T42InfoBlock items={swList} columns={3} />
          </div>
        </>
      )}
      {langList.length > 0 && (
        <>
          <T42SectionBar title="Languages" />
          <div style={{ padding: "10px 24px" }}>
            <T42InfoBlock items={langList} columns={1} />
          </div>
        </>
      )}
      {cultList.length > 0 && (
        <>
          <T42SectionBar title="Culture Fit" />
          <div style={{ padding: "10px 24px" }}>
            <T42InfoBlock items={cultList} columns={1} />
          </div>
        </>
      )}
      {persList.length > 0 && (
        <>
          <T42SectionBar title="Personality" />
          <div style={{ padding: "10px 24px" }}>
            <T42InfoBlock items={persList} columns={1} />
          </div>
        </>
      )}

      {referees.length > 0 && (
        <>
          <T42SectionBar title="References" />
          <div style={{ padding: "10px 24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {referees.map((r, i) => (
                <T42RefereeCard key={i} r={r} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
