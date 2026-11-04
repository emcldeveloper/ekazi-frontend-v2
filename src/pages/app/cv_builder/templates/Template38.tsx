import type { ReactNode } from "react";

interface T38SectionProps {
  title: string;
  children: ReactNode;
}

function T38Section({ title, children }: T38SectionProps) {
  const RULE = "#4c5ca2";
  const TITLE = "#2d3244";
  return (
    <div style={{ marginTop: "18px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
        }}
      >
        <h2
          style={{
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: ".03em",
            color: TITLE,
            margin: 0,
            whiteSpace: "nowrap",
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

interface T38TimelineRowProps {
  dates: string;
  title: string;
  body: string;
}

function T38TimelineRow({ dates, title, body }: T38TimelineRowProps) {
  const TITLE = "#2d3244";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr",
        gap: "16px",
        marginBottom: "14px",
      }}
    >
      <div
        style={{
          color: TITLE,
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
            color: TITLE,
            margin: "0 0 3px",
          }}
        >
          {title || "-"}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: body,
          }}
          className="job-description"
          style={{ margin: 0, paddingLeft: "14px" }}
        />
      </div>
    </div>
  );
}

interface T38RefereeCardProps {
  r: Referee;
}

function T38RefereeCard({ r }: T38RefereeCardProps) {
  const HERO = "#233376";
  const TITLE = "#2d3244";
  const role = [r?.company, r?.position].filter(Boolean).join(" | ");
  return (
    <div style={{ borderLeft: `3px solid ${HERO}`, paddingLeft: "12px" }}>
      <h3
        style={{
          fontWeight: "700",
          color: TITLE,
          margin: "0 0 2px",
        }}
      >
        {r?.fullName || "-"}
      </h3>
      {role && <p style={{ margin: "0 0 4px" }}>{role}</p>}
      {r?.phone && <p style={{ margin: "0" }}>Phone: {r.phone}</p>}
      {r?.email && <p style={{ margin: "0" }}>Email: {r.email}</p>}
    </div>
  );
}

interface T38ColumnListProps {
  items: string[];
}

function T38ColumnList({ items }: T38ColumnListProps) {
  const cols = [];
  const perCol = Math.ceil(items.length / 3);
  for (let i = 0; i < 3; i++) {
    const chunk = items.slice(i * perCol, (i + 1) * perCol);
    if (chunk.length) cols.push(chunk);
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols.length}, 1fr)`,
        gap: "24px",
      }}
    >
      {cols.map((col, ci) => (
        <ul
          key={ci}
          style={{
            listStyle: "disc",
            paddingLeft: "16px",
            margin: 0,
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

interface NamedItem {
  name: string;
}

interface Experience {
  organization: string;
  position: string;
  responsibility: string[];
  dates: string;
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

interface Template38Profile {
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

interface Template38Props {
  profile: Template38Profile;
}

export default function Template38({ profile }: Template38Props) {
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
  const HERO = "#233376";

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
        color: "#4d5562",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#f6f6f4",
        overflow: "hidden",
      }}
    >
      {/* Navy hero header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "90px 1fr",
          alignItems: "center",
          gap: "24px",
          padding: "18px 24px 16px",
          background: HERO,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "5px solid #cfcfcf",
              flexShrink: 0,
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
        <div style={{ color: "#fff", minWidth: 0 }}>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "900",
              textTransform: "uppercase",
              margin: "0 0 3px",
              wordBreak: "break-word",
            }}
          >
            {fullName}
          </h1>
          {current_position && (
            <p
              style={{
                fontWeight: "400",
                color: "rgba(255,255,255,.95)",
                margin: "0 0 8px",
              }}
            >
              {current_position}
            </p>
          )}
          <div
            style={{
              height: "1px",
              width: "100%",
              background: "rgba(255,255,255,.8)",
              marginBottom: "6px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              color: "rgba(255,255,255,.95)",
            }}
          >
            {[phone, email, location].filter(Boolean).map((val, i, arr) => (
              <span key={i} style={{ wordBreak: "break-all" }}>
                {val}
                {i < arr.length - 1 ? " | " : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "12px 20px",
          height: "calc(100% - 130px)",
          overflow: "hidden",
        }}
      >
        {summary && (
          <T38Section title="About Me">
            <p>{summary}</p>
          </T38Section>
        )}
        {educations.length > 0 && (
          <T38Section title="Education">
            {educations.map((edu, i) => {
              const title = edu?.level || edu?.college || "Education";
              const body = title === edu?.college ? "" : edu?.college;
              return (
                <T38TimelineRow
                  key={i}
                  dates={edu?.dates}
                  title={title}
                  body={body}
                />
              );
            })}
          </T38Section>
        )}
        {experiences.length > 0 && (
          <T38Section title="Work Experience">
            {experiences.map((exp, i) => {
              const title = [exp?.organization, exp?.position]
                .filter(Boolean)
                .join(" | ");
              const body = exp?.responsibility?.join(" ") || "";
              return (
                <T38TimelineRow
                  key={i}
                  dates={exp?.dates}
                  title={title}
                  body={body}
                />
              );
            })}
          </T38Section>
        )}
        {skills.length > 0 && (
          <T38Section title="Skills">
            <T38ColumnList items={skills} />
          </T38Section>
        )}
        {swList.length > 0 && (
          <T38Section title="Software">
            <T38ColumnList items={swList} />
          </T38Section>
        )}
        {langList.length > 0 && (
          <T38Section title="Languages">
            <T38ColumnList items={langList} />
          </T38Section>
        )}
        {cultList.length > 0 && (
          <T38Section title="Culture Fit">
            <T38ColumnList items={cultList} />
          </T38Section>
        )}
        {persList.length > 0 && (
          <T38Section title="Personality">
            <T38ColumnList items={persList} />
          </T38Section>
        )}
        {referees.length > 0 && (
          <T38Section title="References">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {referees.map((r, i) => (
                <T38RefereeCard key={i} r={r} />
              ))}
            </div>
          </T38Section>
        )}
      </div>
    </div>
  );
}
