import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

const ACCENT = "#102429";
const ACCENT_SOFT = "rgba(16,36,41,.08)";
const ACCENT_MID = "rgba(16,36,41,.14)";
const ACCENT_RULE = "rgba(16,36,41,.35)";
const PAPER = "#f7f5f1";
const HEADING = "#102429";
const TEXT = "#2f3c40";
const MUTED = "#526166";

interface T61SectionHeadingProps {
  title: string;
}

function T61SectionHeading({ title }: T61SectionHeadingProps) {
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
          letterSpacing: ".04em",
          color: ACCENT,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <span style={{ height: "1px", background: ACCENT_RULE }} />
    </div>
  );
}

interface T61ContactRowProps {
  icon: ReactNode;
  value: string;
}

function T61ContactRow({ icon, value }: T61ContactRowProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: ACCENT,
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span
        style={{
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
}

interface T61EducationCardProps {
  item: TimelineEntry;
  withDivider: boolean;
}

function T61EducationCard({ item, withDivider }: T61EducationCardProps) {
  const title = item?.college || "Education";
  const sub = item?.level;
  return (
    <div
      style={
        withDivider
          ? { borderLeft: `1px solid ${ACCENT_RULE}`, paddingLeft: "14px" }
          : {}
      }
    >
      <h3
        style={{
          fontWeight: "900",
          textTransform: "uppercase",
          color: HEADING,
          margin: "0 0 1px",
        }}
      >
        {title}
      </h3>
      {sub && (
        <p
          style={{
            color: TEXT,
            margin: "0 0 1px",
          }}
        >
          {sub}
        </p>
      )}
      {item?.dates && <p style={{ color: MUTED, margin: 0 }}>{item.dates}</p>}
    </div>
  );
}

interface T61ExperienceRowProps {
  item: TimelineEntry;
}

function T61ExperienceRow({ item }: T61ExperienceRowProps) {
  const heading = [item?.organization, item?.position]
    .filter(Boolean)
    .join(" - ");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "55px 1fr",
        gap: "12px",
        padding: "10px 12px",
        background: ACCENT_SOFT,
      }}
    >
      <div
        style={{
          borderRadius: "2px",
          padding: "6px 4px",
          background: ACCENT_MID,
        }}
      >
        <p
          style={{
            fontWeight: "900",
            color: ACCENT,
            textAlign: "center",
          }}
        >
          {item?.dates || "-"}
        </p>
      </div>
      <div>
        <h3
          style={{
            fontWeight: "900",
            textTransform: "uppercase",
            color: HEADING,
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
    </div>
  );
}

interface T61ExtraPanelProps {
  items: string[];
}

function T61ExtraPanel({ items }: T61ExtraPanelProps) {
  return (
    <div style={{ background: ACCENT_SOFT, padding: "8px 10px" }}>
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

interface T61RefereeCardProps {
  r: Referee;
}

function T61RefereeCard({ r }: T61RefereeCardProps) {
  const role = [r?.company, r?.position].filter(Boolean).join(" / ");
  return (
    <div style={{ background: ACCENT_SOFT, padding: "10px 12px" }}>
      <h3
        style={{
          fontWeight: "900",
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
            margin: "0 0 4px",
          }}
        >
          {role}
        </p>
      )}
      {r?.phone && (
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: "700", color: HEADING }}>Phone:</span>{" "}
          {r.phone}
        </p>
      )}
      {r?.email && (
        <p style={{ margin: 0, wordBreak: "break-all" }}>
          <span style={{ fontWeight: "700", color: HEADING }}>Email:</span>{" "}
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
  college?: string;
  level?: string;
  dates?: string;
  organization?: string;
  position?: string;
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
  company: string;
  position: string;
  fullName: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template61Profile {
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

interface Template61Props {
  profile: Template61Profile;
}

export default function Template61({ profile }: Template61Props) {
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
  const skillCols =
    skills.length > 4
      ? [
          skills.slice(0, Math.ceil(skills.length / 2)),
          skills.slice(Math.ceil(skills.length / 2)),
        ]
      : [skills];
  const extraPanels = ([
    ["Software", swList],
    ["Culture Fit", cultList],
    ["Personality", persList],
  ] as [string, string[]][]).filter(([, items]) => items.length > 0);

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
      {/* 3-col header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr 130px",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#d3d7d8",
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
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: ".02em",
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
                color: ACCENT,
                margin: 0,
              }}
            >
              {current_position}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",

            color: ACCENT,
          }}
        >
          {([
            [<IconPhone />, phone],
            [<IconMapPin />, location],
            [<IconMail />, email],
          ] as [ReactNode, string][])
            .filter(([, v]) => v)
            .map(([icon, val], i) => (
              <T61ContactRow key={i} icon={icon} value={val} />
            ))}
        </div>
      </div>

      {/* Panel: summary + education */}
      <div
        style={{
          background: ACCENT_SOFT,
          padding: "12px 14px",
          marginBottom: "12px",
        }}
      >
        {summary && (
          <div style={{ marginBottom: "12px" }}>
            <T61SectionHeading title="About Me" />
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
          <>
            <T61SectionHeading title="Education" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(educations.length, 3)}, 1fr)`,
                gap: "12px",
              }}
            >
              {educations.map((edu, i) => (
                <T61EducationCard key={i} item={edu} withDivider={i > 0} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <T61SectionHeading title="Work Experience" />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {experiences.map((exp, i) => (
              <T61ExperienceRow key={i} item={exp} />
            ))}
          </div>
        </div>
      )}

      {/* Skills + languages */}
      {(skills.length > 0 || langList.length > 0) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.75fr 1fr",
            gap: "20px",
            marginBottom: "12px",
          }}
        >
          {skills.length > 0 && (
            <div>
              <T61SectionHeading title="Skills" />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${skillCols.length}, 1fr)`,
                  gap: "20px",
                }}
              >
                {skillCols.map((col, ci) => (
                  <ul
                    key={ci}
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    {col.map((s, i) => (
                      <li
                        key={i}
                        style={{
                          color: HEADING,
                        }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          )}
          {langList.length > 0 && (
            <div>
              <T61SectionHeading title="Languages" />
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
            </div>
          )}
        </div>
      )}

      {/* Extra panels */}
      {extraPanels.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          {extraPanels.map(([title, items]) => (
            <div key={title}>
              <T61SectionHeading title={title} />
              <T61ExtraPanel items={items} />
            </div>
          ))}
        </div>
      )}

      {/* Referees */}
      {referees.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <T61SectionHeading title="References" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {referees.map((r, i) => (
              <T61RefereeCard key={i} r={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
