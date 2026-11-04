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

interface Template68Profile {
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

interface Template68Props {
  profile: Template68Profile;
}

export default function Template68({ profile }: Template68Props) {
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
  const DARK = "#444444";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

  const personalRows = [
    ["Profession", current_position],
    ["Phone Number", phone],
    ["Email Address", email],
    ["Address", location],
    ["Languages Known", langList.join(", ")],
  ].filter(([, v]) => v);

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
        color: "#000",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Dark header */}
      <div
        style={{ background: DARK, padding: "14px 20px", textAlign: "center" }}
      >
        {fullName && (
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "700",
              letterSpacing: ".05em",
              color: "#fff",
              margin: 0,
              wordBreak: "break-word",
            }}
          >
            {fullName}
          </h1>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          padding: "16px 22px 60px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          height: "calc(100% - 56px)",
          overflow: "hidden",
        }}
      >
        {/* Personal details + photo */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 14px 1fr",
                gap: "4px",
              }}
            >
              <span style={{ fontWeight: "700" }}>Name</span>
              <span>:</span>
              <span>{fullName}</span>
            </div>
            {personalRows.map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 14px 1fr",
                  gap: "4px",
                }}
              >
                <span style={{ fontWeight: "700" }}>{label}</span>
                <span>:</span>
                <span style={{ wordBreak: "break-word" }}>{val}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              width: "90px",
              height: "120px",
              overflow: "hidden",
              border: "1px solid #000",
              flexShrink: 0,
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/90x120?text=Photo"
              }
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/90x120?text=Photo")
              }
            />
          </div>
        </div>

        {/* Introduction */}
        {summary && (
          <div>
            <h2 style={{ fontWeight: "700", margin: "0 0 5px" }}>
              Introduction
            </h2>
            <p
              style={{
                color: "#374151",
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Education table */}
        {educations.length > 0 && (
          <div>
            <h2 style={{ fontWeight: "700", margin: "0 0 6px" }}>
              Educational Qualifications
            </h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#555", color: "#fff" }}>
                  {["Degree", "Institution", "Year of Pass"].map((h) => (
                    <th
                      key={h}
                      style={{
                        border: "1px solid #9ca3af",
                        padding: "5px 8px",
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {educations.map((edu, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        border: "1px solid #9ca3af",
                        padding: "5px 8px",
                        textAlign: "center",
                      }}
                    >
                      {edu?.level}
                    </td>
                    <td
                      style={{
                        border: "1px solid #9ca3af",
                        padding: "5px 8px",
                        textAlign: "center",
                      }}
                    >
                      {edu?.college}
                    </td>
                    <td
                      style={{
                        border: "1px solid #9ca3af",
                        padding: "5px 8px",
                        textAlign: "center",
                      }}
                    >
                      {edu?.dates}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 style={{ fontWeight: "700", margin: "0 0 8px" }}>
              Work Experience
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <div>
                      {exp?.position && (
                        <h3
                          style={{
                            fontWeight: "700",
                            color: "#000",
                            margin: 0,
                          }}
                        >
                          {exp.position}
                        </h3>
                      )}
                      {exp?.organization && (
                        <p
                          style={{
                            fontWeight: "500",
                            margin: "1px 0 0",
                          }}
                        >
                          {exp.organization}
                        </p>
                      )}
                    </div>
                    {exp?.dates && (
                      <span
                        style={{
                          fontWeight: "500",
                          color: "#374151",
                          flexShrink: 0,
                        }}
                      >
                        {exp.dates}
                      </span>
                    )}
                  </div>
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

        {/* 2-col skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px 24px",
          }}
        >
          {([
            ["Skills", skills],
            ["Software", swList],
            ["Culture Fit", cultList],
            ["Personality", persList],
          ] as [string, string[]][])
            .filter(([, items]) => items.length > 0)
            .map(([title, items]) => (
              <div key={title}>
                <h2
                  style={{
                    fontWeight: "700",
                    margin: "0 0 4px",
                  }}
                >
                  {title}
                </h2>
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "16px",
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",

                    color: "#374151",
                  }}
                >
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* References */}
        {referees.length > 0 && (
          <div>
            <h2 style={{ fontWeight: "700", margin: "0 0 6px" }}>References</h2>
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
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                  }}
                >
                  {r?.fullName && (
                    <p style={{ fontWeight: "700", margin: 0 }}>{r.fullName}</p>
                  )}
                  {r?.position && <p style={{ margin: 0 }}>{r.position}</p>}
                  {r?.company && <p style={{ margin: 0 }}>{r.company}</p>}
                  {r?.phone && <p style={{ margin: 0 }}>{r.phone}</p>}
                  {r?.email && (
                    <p style={{ margin: 0, wordBreak: "break-all" }}>
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
