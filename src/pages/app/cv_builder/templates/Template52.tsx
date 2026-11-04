import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T52SectionHeadingProps {
  title: string;
}

function T52SectionHeading({ title }: T52SectionHeadingProps) {
  return (
    <>
      <h2
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".2em",
          color: "#1f2937",
          margin: "0 0 6px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          height: "1px",
          width: "100%",
          background: "#d1d5db",
          marginBottom: "12px",
        }}
      />
    </>
  );
}

interface T52BulletGridProps {
  items: string[];
  columns?: number;
}

function T52BulletGrid({ items, columns = 3 }: T52BulletGridProps) {
  if (!items.length) return null;
  const cols = [];
  const perCol = Math.ceil(items.length / columns);
  for (let c = 0; c < columns; c++) {
    const chunk = items.slice(c * perCol, (c + 1) * perCol);
    if (chunk.length) cols.push(chunk);
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols.length}, 1fr)`,
        gap: "8px 14px",
      }}
    >
      {cols.map((col, ci) => (
        <div key={ci}>
          {col.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",

                marginBottom: "3px",
                color: "#374151",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#1f2937",
                  flexShrink: 0,
                }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface Experience {
  organization: string;
  dates: string;
  position: string;
  responsibility: string;
}

interface Education {
  college: string;
  dates: string;
  level: string;
}

interface Referee {
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template52Profile {
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

interface Template52Props {
  profile: Template52Profile;
}

export default function Template52({ profile }: Template52Props) {
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
  const HEADER_BG = "#536779";
  const PHOTO_BG = "#efeded";
  const TEXT = "#374151";
  const HEADING = "#1f2937";

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
      {/* Two-tone header */}
      <div style={{ display: "flex", width: "100%", alignItems: "flex-start" }}>
        {/* Left thin accent strip */}
        <div
          style={{
            height: "160px",
            width: "16px",
            background: HEADER_BG,
            flexShrink: 0,
          }}
        />
        {/* Photo section */}
        <div
          style={{
            display: "flex",
            height: "160px",
            flex: "0 0 40%",
            alignItems: "center",
            justifyContent: "center",
            background: PHOTO_BG,
            padding: "12px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              border: `6px solid ${HEADER_BG}`,
              boxShadow: "0 4px 14px rgba(0,0,0,.2)",
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
        {/* Text section */}
        <div
          style={{
            display: "flex",
            flex: "1 1 0%",
            flexDirection: "column",
            justifyContent: "center",
            height: "160px",
            background: HEADER_BG,
            color: "#fff",
            padding: "14px 20px",
          }}
        >
          {fullName && (
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "700",
                letterSpacing: "tight",
                color: "#fff",
                margin: "0 0 3px",
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </h1>
          )}
          {current_position && (
            <p
              style={{
                fontWeight: "300",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                margin: "0 0 8px",
              }}
            >
              {current_position}
            </p>
          )}
          {summary && (
            <p
              style={{
                opacity: 0.9,
                margin: 0,
              }}
            >
              {summary}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "14px 20px 60px",
          overflow: "hidden",
          height: "calc(100% - 165px)",
        }}
      >
        {summary && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="About Me" />
            <p
              style={{
                color: "#374151",
                textAlign: "justify",
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {[
          [<IconPhone />, phone],
          [<IconMail />, email],
          [<IconMapPin />, location],
        ].filter(([, v]) => v).length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="Contact" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px 20px",
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
                      gap: "5px",

                      color: "#374151",
                    }}
                  >
                    <span
                      style={{
                        color: HEADER_BG,
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
          </div>
        )}

        {educations.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="Education" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {educations.map((edu, i) => (
                <div key={i}>
                  {[edu?.college, edu?.dates].filter(Boolean).join(" | ") && (
                    <p
                      style={{
                        color: "#6b7280",
                        margin: "0 0 1px",
                      }}
                    >
                      {[edu?.college, edu?.dates].filter(Boolean).join(" | ")}
                    </p>
                  )}
                  {edu?.level && (
                    <h3
                      style={{
                        fontWeight: "700",
                        color: HEADING,
                        margin: 0,
                      }}
                    >
                      {edu.level}
                    </h3>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {experiences.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="Work Experience" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {experiences.map((exp, i) => (
                <div key={i}>
                  {[exp?.organization, exp?.dates]
                    .filter(Boolean)
                    .join(" | ") && (
                    <p
                      style={{
                        color: "#6b7280",
                        margin: "0 0 1px",
                      }}
                    >
                      {[exp?.organization, exp?.dates]
                        .filter(Boolean)
                        .join(" | ")}
                    </p>
                  )}
                  {exp?.position && (
                    <h3
                      style={{
                        fontWeight: "700",
                        color: HEADING,
                        margin: "0 0 4px",
                      }}
                    >
                      {exp.position}
                    </h3>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: exp.responsibility,
                    }}
                    className="job-description"
                    style={{ margin: 0, paddingLeft: "14px", color: "#374151" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="Skills" />
            <T52BulletGrid items={skills} columns={3} />
          </div>
        )}
        {swList.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="Software" />
            <T52BulletGrid items={swList} columns={3} />
          </div>
        )}
        {langList.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="Languages" />
            <T52BulletGrid items={langList} columns={3} />
          </div>
        )}
        {cultList.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="Culture Fit" />
            <T52BulletGrid items={cultList} columns={3} />
          </div>
        )}
        {persList.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="Personality" />
            <T52BulletGrid items={persList} columns={3} />
          </div>
        )}

        {referees.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T52SectionHeading title="References" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {referees.map((r, i) => (
                <div key={i}>
                  {r?.fullName && (
                    <p
                      style={{
                        fontWeight: "700",
                        color: HEADING,
                        margin: "0 0 1px",
                      }}
                    >
                      {r.fullName}
                    </p>
                  )}
                  {r?.company && (
                    <p style={{ color: "#6b7280", margin: 0 }}>{r.company}</p>
                  )}
                  {r?.position && (
                    <p style={{ color: "#6b7280", margin: 0 }}>{r.position}</p>
                  )}
                  {r?.phone && (
                    <p
                      style={{
                        color: "#9ca3af",
                        margin: "3px 0 0",
                      }}
                    >
                      {r.phone}
                    </p>
                  )}
                  {r?.email && (
                    <p
                      style={{
                        color: "#9ca3af",
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
          </div>
        )}
      </div>
    </div>
  );
}
