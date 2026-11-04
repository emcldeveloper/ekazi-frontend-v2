import { AsideLabel, SectionHeading } from "./components/SectionHelpers";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

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
  course: string;
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

interface Template8Profile {
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
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template8Props {
  profile: Template8Profile;
}

export default function Template8({ profile }: Template8Props) {
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
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#1756a5";
  return (
    <div
      style={{
        fontFamily: "Outfit, Helvetica Neue, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "100%",
        }}
      >
        {/* Left */}
        <div
          style={{
            background: "#f8fafc",
            borderRight: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Photo */}
          <div
            style={{
              background: "#e6eef8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              minHeight: "140px",
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/120x120?text=Photo"
              }
              alt="profile"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 10px 20px rgba(0,0,0,.15)",
                background: "#fff",
              }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/120x120?text=Photo")
              }
            />
          </div>
          <div style={{ padding: "12px 14px", flex: 1, overflow: "hidden" }}>
            {/* Contact icons */}
            {[
              ["Email", email, "mail"],
              ["Phone", phone, "phone"],
              ["Location", location, "map"],
            ].map(([label, val, type]) => (
              <div key={label} style={{ marginBottom: "8px" }}>
                <AsideLabel title={label} brand={BRAND} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "22px 1fr",
                    alignItems: "flex-start",
                    gap: "6px",

                    color: "#4b5563",
                  }}
                >
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "50%",
                      background: BRAND,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {type === "mail" ? (
                      <IconMail />
                    ) : type === "phone" ? (
                      <IconPhone />
                    ) : (
                      <IconMapPin />
                    )}
                  </span>
                  <span style={{ wordBreak: "break-all" }}>{val}</span>
                </div>
              </div>
            ))}
            {languages.length > 0 && (
              <div style={{ marginBottom: "8px" }}>
                <AsideLabel title="Languages" brand={BRAND} />
                <ul
                  style={{ listStyle: "disc", paddingLeft: "14px", margin: 0 }}
                >
                  {languages.map((l, i) => (
                    <li
                      key={i}
                      style={{
                        marginBottom: "2px",
                        textTransform: "capitalize",
                      }}
                    >
                      {l.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {knowledges.length > 0 && (
              <div style={{ marginBottom: "8px" }}>
                <AsideLabel title="Skills" brand={BRAND} />
                <ul
                  style={{ listStyle: "disc", paddingLeft: "14px", margin: 0 }}
                >
                  {knowledges.map((k, i) => (
                    <li
                      key={i}
                      style={{
                        marginBottom: "2px",
                        textTransform: "capitalize",
                      }}
                    >
                      {k.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {softwares.length > 0 && (
              <div style={{ marginBottom: "8px" }}>
                <AsideLabel title="Software" brand={BRAND} />
                <ul
                  style={{ listStyle: "disc", paddingLeft: "14px", margin: 0 }}
                >
                  {softwares.map((s, i) => (
                    <li
                      key={i}
                      style={{
                        marginBottom: "2px",
                        textTransform: "capitalize",
                      }}
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {referees.length > 0 && (
              <div style={{ marginBottom: "8px" }}>
                <AsideLabel title="Referees" brand={BRAND} />
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: `3px solid ${BRAND}`,
                      paddingLeft: "8px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      marginBottom: "6px",
                      background: "#fff",
                    }}
                  >
                    <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                    <div style={{ color: "#6b7280" }}>{r.position}</div>
                    <div>{r.company}</div>
                    <div>Tel: {r.phone}</div>
                    <div>Email: {r.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Right */}
        <div
          style={{
            padding: "16px 20px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <h1
              style={{
                fontWeight: "700",
                fontSize: "24px",
                color: "#1f2937",
                margin: "0 0 2px",
              }}
            >
              {fullName}
            </h1>
            <div
              style={{
                color: "#6b7280",

                marginBottom: "6px",
              }}
            >
              {current_position}
            </div>
            <div
              style={{
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: ".02em",
                color: BRAND,

                marginBottom: "4px",
              }}
            >
              Introduction
            </div>
            <p
              style={{
                margin: 0,

                textAlign: "justify",
              }}
            >
              {summary}
            </p>
          </div>
          {/* Experience */}
          <SectionHeading title="Work Experience" brand={BRAND} />
          {experiences.map((w, i) => (
            <div
              key={i}
              style={{
                marginBottom: "10px",
                background: "#fff",
                paddingBottom: "6px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "8px",
                  marginBottom: "2px",
                }}
              >
                <div style={{ fontWeight: "600" }}>{w.organization}</div>
                <div style={{ color: "#6b7280" }}>{w.dates}</div>
              </div>
              <div
                style={{
                  color: "#6b7280",

                  marginBottom: "4px",
                }}
              >
                {w.position}
              </div>
              {w.responsibility && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: w.responsibility,
                  }}
                  className="job-description"
                  style={{ margin: 0, paddingLeft: "14px" }}
                />
              )}
            </div>
          ))}
          {/* Education table */}
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              overflow: "hidden",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                background: BRAND,
                color: "#fff",
                fontWeight: "600",
                padding: "6px 12px",

                letterSpacing: ".02em",
              }}
            >
              Education
            </div>
            <table
              style={{
                width: "100%",

                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: `2px solid ${BRAND}`,
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "4px 10px", width: "40%" }}>
                    Institution
                  </th>
                  <th style={{ padding: "4px 10px", width: "35%" }}>Course</th>
                  <th
                    style={{
                      padding: "4px 10px",
                      width: "25%",
                      textAlign: "center",
                    }}
                  >
                    Period
                  </th>
                </tr>
              </thead>
              <tbody>
                {educations.map((ed, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      background: i % 2 === 0 ? "#f5f6f7" : "#fff",
                    }}
                  >
                    <td style={{ padding: "4px 10px" }}>{ed.college}</td>
                    <td style={{ padding: "4px 10px" }}>{ed.course}</td>
                    <td style={{ padding: "4px 10px", textAlign: "center" }}>
                      {ed.dates}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
