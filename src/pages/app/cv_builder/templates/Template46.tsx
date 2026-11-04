import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T46SectionBlockProps {
  title: string;
  children: ReactNode;
}

function T46SectionBlock({ title, children }: T46SectionBlockProps) {
  const ACCENT = "#8b0039";
  return (
    <div>
      <div
        style={{
          display: "flex",
          minHeight: "22px",
          alignItems: "center",
          padding: "3px 10px",
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: ".22em",
          background: ACCENT,
          color: "#fff",
        }}
      >
        {title}
      </div>
      <div style={{ paddingTop: "10px" }}>{children}</div>
    </div>
  );
}

interface T46ExperienceListProps {
  items: Experience[];
}

function T46ExperienceList({ items }: T46ExperienceListProps) {
  const ACCENT_LINE = "rgba(139,0,57,.22)";
  const HEADING = "#1f2329";
  const TEXT = "#343842";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {items.map((exp, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontWeight: "500",
              color: "#6b6f78",
              paddingTop: "1px",
            }}
          >
            {exp?.dates || "-"}
          </div>
          <div
            style={{
              borderLeft: `1px solid ${ACCENT_LINE}`,
              paddingLeft: "10px",
            }}
          >
            <h3
              style={{
                fontWeight: "900",
                color: HEADING,
                margin: "0 0 2px",
              }}
            >
              {exp?.position || "Experience"}
            </h3>
            {exp?.organization && (
              <p
                style={{
                  fontWeight: "500",
                  color: TEXT,
                  margin: "0 0 3px",
                }}
              >
                {exp.organization}
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
        </div>
      ))}
    </div>
  );
}

interface T46MiniListProps {
  title: string;
  items: string[];
}

function T46MiniList({ title, items }: T46MiniListProps) {
  const HEADING = "#1f2329";
  const TEXT = "#343842";
  return (
    <div style={{ marginBottom: "8px" }}>
      <h3
        style={{
          fontWeight: "900",
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

interface T46RefereeCardProps {
  r: Referee;
}

function T46RefereeCard({ r }: T46RefereeCardProps) {
  const ACCENT_LINE = "rgba(139,0,57,.22)";
  const HEADING = "#1f2329";
  const TEXT = "#343842";
  const role = [r?.position, r?.company].filter(Boolean).join(" | ");
  return (
    <div
      style={{
        border: `1px solid ${ACCENT_LINE}`,
        borderRadius: "4px",
        padding: "8px 10px",
      }}
    >
      <h3
        style={{
          fontWeight: "900",
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
            margin: "0 0 2px",
          }}
        >
          {role}
        </p>
      )}
      {r?.phone && <p style={{ margin: "0" }}>{r.phone}</p>}
      {r?.email && (
        <p style={{ margin: 0, wordBreak: "break-all" }}>{r.email}</p>
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
  college: string;
  level: string;
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

interface Template46Profile {
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

interface Template46Props {
  profile: Template46Profile;
}

export default function Template46({ profile }: Template46Props) {
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
  const ACCENT = "#8b0039";
  const HEADING = "#1f2329";
  const TEXT = "#343842";

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);

  const sections = [
    {
      title: "Experience",
      content: <T46ExperienceList items={experiences} />,
      visible: experiences.length > 0,
    },
    {
      title: "Skills",
      content: (
        <div>
          {skills.length > 0 && <T46MiniList title="Skills" items={skills} />}
          {swList.length > 0 && <T46MiniList title="Software" items={swList} />}
          {cultList.length > 0 && (
            <T46MiniList title="Culture Fit" items={cultList} />
          )}
          {persList.length > 0 && (
            <T46MiniList title="Personality" items={persList} />
          )}
        </div>
      ),
      visible:
        skills.length > 0 ||
        swList.length > 0 ||
        cultList.length > 0 ||
        persList.length > 0,
    },
    {
      title: "Education",
      content: (
        <div>
          {educations.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <h3
                style={{
                  fontWeight: "900",
                  color: HEADING,
                  margin: "0 0 1px",
                }}
              >
                {edu?.college || "Education"}
              </h3>
              {edu?.level && (
                <p
                  style={{
                    fontStyle: "italic",
                    color: TEXT,
                    margin: "0 0 1px",
                  }}
                >
                  {edu.level}
                </p>
              )}
              {edu?.dates && (
                <p
                  style={{
                    fontWeight: "500",
                    color: "#6b6f78",
                    margin: 0,
                  }}
                >
                  {edu.dates}
                </p>
              )}
            </div>
          ))}
        </div>
      ),
      visible: educations.length > 0,
    },
    {
      title: "Languages",
      content: (
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
      ),
      visible: langList.length > 0,
    },
    {
      title: "References",
      content: (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "6px",
          }}
        >
          {referees.map((r, i) => (
            <T46RefereeCard key={i} r={r} />
          ))}
        </div>
      ),
      visible: referees.length > 0,
    },
  ].filter((s) => s.visible);

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
        background: "#fff9f8",
        overflow: "hidden",
        padding: "18px 20px 60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "90px 1fr",
          gap: "18px",
          paddingBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "4px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              border: `5px solid ${ACCENT}`,
              background: "#fff",
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
        <div style={{ paddingTop: "4px" }}>
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
                fontWeight: "500",
                color: HEADING,
                margin: "0 0 8px",
              }}
            >
              {current_position}
            </p>
          )}
          {summary && (
            <p
              style={{
                maxWidth: "400px",
                color: TEXT,
                margin: "0 0 8px",
              }}
            >
              {summary}
            </p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
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
                    gap: "5px",
                    color: TEXT,
                  }}
                >
                  <span style={{ color: ACCENT, marginTop: "1px" }}>
                    {icon}
                  </span>
                  <span style={{ wordBreak: "break-all" }}>{val}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 2-col section grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px 18px",
        }}
      >
        {sections.map((s) => (
          <T46SectionBlock key={s.title} title={s.title}>
            {s.content}
          </T46SectionBlock>
        ))}
      </div>
    </div>
  );
}
