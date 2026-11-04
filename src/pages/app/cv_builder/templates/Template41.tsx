import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T41ContactItemProps {
  icon: ReactNode;
  value: string;
}

function T41ContactItem({ icon, value }: T41ContactItemProps) {
  const ACCENT = "#8e604c";
  const MUTED = "#7a8086";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "24px 1fr",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: ACCENT,
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ wordBreak: "break-word", color: MUTED }}>{value}</span>
    </div>
  );
}

interface T41SectionTitleProps {
  title: string;
}

function T41SectionTitle({ title }: T41SectionTitleProps) {
  const ACCENT = "#8e604c";
  const ACCENT_SOFT = "#c9b9b0";
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
          fontWeight: "600",
          color: ACCENT,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <span style={{ height: "1px", background: ACCENT_SOFT }} />
    </div>
  );
}

interface T41ResumeRowProps {
  leftTitle: string;
  leftSubtitle: string;
  leftMeta: string;
  rightText: string;
}

function T41ResumeRow({
  leftTitle,
  leftSubtitle,
  leftMeta,
  rightText,
}: T41ResumeRowProps) {
  const HEADING = "#24292f";
  const MUTED = "#7a8086";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: "20px",
        marginBottom: "12px",
      }}
    >
      <div>
        <h3
          style={{
            fontWeight: "600",
            color: HEADING,
            margin: "0 0 2px",
          }}
        >
          {leftTitle || "-"}
        </h3>
        {leftSubtitle && (
          <p
            style={{
              color: MUTED,
              margin: "0 0 1px",
            }}
          >
            {leftSubtitle}
          </p>
        )}
        {leftMeta && (
          <p
            style={{
              color: MUTED,
              margin: 0,
            }}
          >
            {leftMeta}
          </p>
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: rightText,
        }}
        className="job-description"
        style={{ margin: 0, paddingLeft: "14px" }}
      />
    </div>
  );
}

interface T41InfoPanelProps {
  title: string;
  items: string[];
}

function T41InfoPanel({ title, items }: T41InfoPanelProps) {
  const TEXT = "#5d6369";
  const cols =
    items.length > 7
      ? [
          items.slice(0, Math.ceil(items.length / 2)),
          items.slice(Math.ceil(items.length / 2)),
        ]
      : [items];
  return (
    <div>
      <T41SectionTitle title={title} />
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

interface T41RefereeCardProps {
  r: Referee;
}

function T41RefereeCard({ r }: T41RefereeCardProps) {
  const ACCENT = "#8e604c";
  const HEADING = "#24292f";
  const MUTED = "#7a8086";
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
            margin: "0 0 4px",
            color: MUTED,
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

interface Template41Profile {
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
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template41Props {
  profile: Template41Profile;
}

export default function Template41({ profile }: Template41Props) {
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
    referees,
    profile: profileInfo,
  } = profile;
  const ACCENT = "#8e604c";
  const HEADING = "#24292f";
  const TEXT = "#5d6369";

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);

  const detailPanels = [
    { title: "Skills", items: skills },
    { title: "Software", items: swList },
    { title: "Languages", items: langList },
    { title: "Culture Fit", items: cultList },
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
        background: "#fbf8f6",
        overflow: "hidden",
        padding: "20px 24px 60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px 1fr",
          alignItems: "center",
          gap: "20px",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #c9b9b0",
              background: "#fff",
              boxShadow: "0 8px 20px rgba(142,96,76,.08)",
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
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "300",
              color: ACCENT,
              margin: "0 0 4px",
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
                margin: "0 0 10px",
              }}
            >
              {current_position}
            </p>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5px 24px",
            }}
          >
            {([
              [<IconPhone />, phone],
              [<IconMail />, email],
              [<IconMapPin />, location],
            ] as [ReactNode, string][])
              .filter(([, v]) => v)
              .map(([icon, val], i) => (
                <T41ContactItem key={i} icon={icon} value={val} />
              ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: "14px" }}>
          <T41SectionTitle title="Professional Summary" />
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

      {/* Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <T41SectionTitle title="Professional Experience" />
          {experiences.map((exp, i) => (
            <T41ResumeRow
              key={i}
              leftTitle={exp?.position}
              leftSubtitle={exp?.organization}
              leftMeta={exp?.dates}
              rightText={exp?.responsibility}
            />
          ))}
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <T41SectionTitle title="Education" />
          {educations.map((edu, i) => (
            <T41ResumeRow
              key={i}
              leftTitle={edu?.level || edu?.college}
              leftSubtitle={edu?.level ? edu?.college : ""}
              leftMeta={edu?.dates}
              rightText=""
            />
          ))}
        </div>
      )}

      {/* Detail panels */}
      {detailPanels.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px 30px",
            marginBottom: "14px",
          }}
        >
          {detailPanels.map((p) => (
            <T41InfoPanel key={p.title} title={p.title} items={p.items} />
          ))}
        </div>
      )}

      {/* Referees */}
      {referees.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <T41SectionTitle title="References" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}
          >
            {referees.map((r, i) => (
              <T41RefereeCard key={i} r={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
