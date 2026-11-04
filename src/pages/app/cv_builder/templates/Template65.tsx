import { IconMail, IconPhone } from "./components/Icon";

interface T65SectionTitleProps {
  title: string;
}

function T65SectionTitle({ title }: T65SectionTitleProps) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
    >
      <div
        style={{
          borderRadius: "0 999px 999px 0",
          background: "#e5e7eb",
          padding: "4px 20px 4px 0",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: ".2em",
            color: "#374151",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
    </div>
  );
}

interface T65ItemSectionProps {
  title: string;
  items: string[];
}

function T65ItemSection({ title, items }: T65ItemSectionProps) {
  if (!items.length) return null;
  return (
    <div>
      <T65SectionTitle title={title} />
      <ul
        style={{
          listStyle: "disc",
          paddingLeft: "20px",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "4px",

          color: "#374151",
        }}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
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
  fullName: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template65Profile {
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

interface Template65Props {
  profile: Template65Profile;
}

export default function Template65({ profile }: Template65Props) {
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
        color: "#111827",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        padding: "20px 24px 60px",
      }}
    >
      {/* Header: name + circular photo + contact */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          {fullName && (
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "700",
                letterSpacing: "tight",
                color: "#111827",
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
                fontWeight: "500",
                color: "#6b7280",
                margin: 0,
              }}
            >
              {current_position}
            </p>
          )}
          {location && (
            <p style={{ color: "#9ca3af", margin: "2px 0 0" }}>{location}</p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {[[email], [phone]].filter(([v]) => v).length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
                textAlign: "right",
              }}
            >
              {[
                [<IconMail />, email],
                [<IconPhone />, phone],
              ]
                .filter(([, v]) => v)
                .map(([icon, val], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-end",
                      gap: "5px",

                      color: "#6b7280",
                    }}
                  >
                    <span style={{ wordBreak: "break-all" }}>{val}</span>
                    <span
                      style={{
                        color: "#9ca3af",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      {icon}
                    </span>
                  </div>
                ))}
            </div>
          )}
          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #d1d5db",
              background: "#e5e7eb",
              flexShrink: 0,
            }}
          >
            {profileInfo?.picture ? (
              <img
                src={`https://api.ekazi.co.tz/${profileInfo.picture}`}
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/55x55?text=Photo")
                }
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9ca3af",
                }}
              >
                👤
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ height: "1px", background: "#e5e7eb", marginBottom: "16px" }}
      />

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {summary && (
          <section>
            <T65SectionTitle title="Summary" />
            <p
              style={{
                color: "#374151",
                paddingLeft: "4px",
              }}
            >
              {summary}
            </p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <T65SectionTitle title="Work Experience" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingLeft: "4px",
              }}
            >
              {experiences.map((exp, i) => (
                <div key={i}>
                  {exp?.position && (
                    <h3
                      style={{
                        fontWeight: "700",
                        color: "#111827",
                        margin: "0 0 1px",
                      }}
                    >
                      {exp.position}
                    </h3>
                  )}
                  {exp?.organization && (
                    <p
                      style={{
                        fontWeight: "500",
                        color: "#374151",
                        margin: "0 0 1px",
                      }}
                    >
                      {exp.organization}
                    </p>
                  )}
                  {exp?.dates && (
                    <p
                      style={{
                        color: "#6b7280",
                        margin: "0 0 4px",
                      }}
                    >
                      {exp.dates}
                    </p>
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
          </section>
        )}

        {educations.length > 0 && (
          <section>
            <T65SectionTitle title="Education" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                paddingLeft: "4px",
              }}
            >
              {educations.map((edu, i) => (
                <div key={i}>
                  {edu?.level && (
                    <h3
                      style={{
                        fontWeight: "700",
                        color: "#111827",
                        margin: "0 0 1px",
                      }}
                    >
                      {edu.level}
                    </h3>
                  )}
                  {edu?.college && (
                    <p
                      style={{
                        fontWeight: "500",
                        color: "#374151",
                        margin: 0,
                      }}
                    >
                      {edu.college}
                    </p>
                  )}
                  {edu?.dates && (
                    <p style={{ color: "#6b7280", margin: 0 }}>{edu.dates}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2-col skill grid */}
        {(skills.length > 0 ||
          swList.length > 0 ||
          langList.length > 0 ||
          cultList.length > 0 ||
          persList.length > 0) && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 30px",
            }}
          >
            <T65ItemSection title="Skills" items={skills} />
            <T65ItemSection title="Software" items={swList} />
            <T65ItemSection title="Languages" items={langList} />
            <T65ItemSection title="Culture Fit" items={cultList} />
            <T65ItemSection title="Personality" items={persList} />
          </div>
        )}

        {referees.length > 0 && (
          <section>
            <T65SectionTitle title="References" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                paddingLeft: "4px",
              }}
            >
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  {r?.fullName && (
                    <h3
                      style={{
                        fontWeight: "700",
                        color: "#111827",
                        margin: 0,
                      }}
                    >
                      {r.fullName}
                    </h3>
                  )}
                  {r?.position && (
                    <p
                      style={{
                        fontWeight: "500",
                        color: "#374151",
                        margin: 0,
                      }}
                    >
                      {r.position}
                    </p>
                  )}
                  {r?.company && (
                    <p style={{ color: "#374151", margin: 0 }}>{r.company}</p>
                  )}
                  {r?.phone && (
                    <p style={{ color: "#6b7280", margin: 0 }}>{r.phone}</p>
                  )}
                  {r?.email && (
                    <p
                      style={{
                        color: "#6b7280",
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
          </section>
        )}
      </div>
    </div>
  );
}
