import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface NamedItem {
  name: string;
}

interface Experience {
  position: string;
  organization: string;
  location: string;
  dates: string;
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

interface Template9Profile {
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

interface Template9Props {
  profile: Template9Profile;
}

export default function Template9({ profile }: Template9Props) {
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
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#dc3545";
  const BRAND_DARK = "#c10d3d";
  const INK = "#1f2937";
  return (
    <div
      style={{
        fontFamily: "Inter, Helvetica Neue, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        color: INK,
      }}
    >
      {/* Banner */}
      <div style={{ background: BRAND, height: "90px", position: "relative" }}>
        <div style={{ position: "absolute", left: "20px", top: "16px" }}>
          <h1
            style={{
              margin: 0,
              fontWeight: "700",
              fontSize: "24px",
              color: "#fff",
              letterSpacing: ".5px",
              lineHeight: 1.2,
            }}
          >
            {fullName}
          </h1>
          <div style={{ color: "rgba(255,255,255,.65)" }}>
            {current_position}
          </div>
        </div>
        <div style={{ position: "absolute", right: "20px", top: "8px" }}>
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/80x80?text=Photo"
            }
            alt="profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "10px",
              objectFit: "cover",
              border: "3px solid #fff",
              boxShadow: "0 2px 8px rgba(0,0,0,.2)",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/80x80?text=Photo")
            }
          />
        </div>
      </div>
      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 4fr",
          height: "calc(100% - 90px)",
        }}
      >
        {/* Left */}
        <div
          style={{
            background: "#fff",
            padding: "12px 16px",
            borderRight: "1px solid #e5e7eb",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <h3
              style={{
                fontWeight: "700",
                margin: "0 0 4px",
                color: BRAND,
              }}
            >
              Summary
            </h3>
            <p
              style={{
                color: "#6b7280",

                margin: 0,
                textAlign: "justify",
              }}
            >
              {summary}
            </p>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <h3
              style={{
                fontWeight: "700",
                margin: "0 0 6px",
                color: BRAND,
              }}
            >
              Experience
            </h3>
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.08)",
                  borderRadius: "4px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "8px",
                    alignItems: "flex-start",
                    marginBottom: "4px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "700",

                        color: BRAND_DARK,
                      }}
                    >
                      {exp.position}
                    </div>
                    <div style={{ color: "#6b7280" }}>{exp.organization}</div>
                    <div style={{ color: "#6b7280" }}>{exp.location}</div>
                  </div>
                  <span
                    style={{
                      border: "1px solid #e5e7eb",
                      background: "#f9fafb",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.dates}
                  </span>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: exp.responsibility,
                  }}
                  className="job-description"
                  style={{ margin: 0, paddingLeft: "14px", color: "#6b7280" }}
                />
              </div>
            ))}
          </div>
          {/* Education table */}
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div style={{ background: BRAND, color: "#fff" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "6fr 4fr 2fr",
                  fontWeight: "600",
                }}
              >
                <div
                  style={{
                    padding: "5px 10px",
                    borderRight: "1px solid rgba(255,255,255,.25)",
                  }}
                >
                  School/College
                </div>
                <div
                  style={{
                    padding: "5px 10px",
                    borderRight: "1px solid rgba(255,255,255,.25)",
                  }}
                >
                  Course/Degree
                </div>
                <div style={{ padding: "5px 10px" }}>Year</div>
              </div>
            </div>
            {educations.map((ed, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "6fr 4fr 2fr",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    padding: "5px 10px",
                    borderRight: "1px solid #e5e7eb",
                  }}
                >
                  {ed.college}
                </div>
                <div
                  style={{
                    padding: "5px 10px",
                    borderRight: "1px solid #e5e7eb",
                  }}
                >
                  {ed.course}
                </div>
                <div style={{ padding: "5px 10px" }}>{ed.dates}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div
          style={{
            background: "#f3f4f6",
            padding: "12px 14px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              margin: "0 0 8px",
              color: BRAND,
            }}
          >
            Contact
          </h3>
          {[
            [<IconMapPin />, location],
            [<IconPhone />, phone],
            [<IconMail />, email],
          ].map(([icon, val], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "16px 1fr",
                gap: "6px",
                alignItems: "flex-start",
                marginBottom: "5px",
              }}
            >
              {icon}
              <span style={{ wordBreak: "break-all" }}>{val}</span>
            </div>
          ))}
          <h3
            style={{
              fontWeight: "700",
              margin: "10px 0 4px",
              color: BRAND,
            }}
          >
            Skills
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {knowledges.map((k, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "10px 1fr",
                  alignItems: "center",

                  marginBottom: "2px",
                  textTransform: "capitalize",
                }}
              >
                <span style={{ color: BRAND }}>•</span>
                {k.name}
              </li>
            ))}
          </ul>
          {softwares.length > 0 && (
            <>
              <div
                style={{
                  fontWeight: "600",

                  marginTop: "6px",
                  color: BRAND_DARK,
                }}
              >
                Software
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {softwares.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "10px 1fr",
                      alignItems: "center",

                      marginBottom: "2px",
                      textTransform: "capitalize",
                    }}
                  >
                    <span style={{ color: BRAND }}>•</span>
                    {s.name}
                  </li>
                ))}
              </ul>
            </>
          )}
          <h3
            style={{
              fontWeight: "700",
              margin: "10px 0 4px",
              color: BRAND,
            }}
          >
            Languages
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {languages.map((l, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "10px 1fr",
                  alignItems: "center",

                  marginBottom: "2px",
                  textTransform: "capitalize",
                }}
              >
                <span style={{ color: BRAND }}>•</span>
                {l.name}
              </li>
            ))}
          </ul>
          <h3
            style={{
              fontWeight: "700",
              margin: "10px 0 4px",
              color: BRAND,
            }}
          >
            Culture Fit
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {cultures.map((c, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "10px 1fr",
                  alignItems: "center",

                  marginBottom: "2px",
                  textTransform: "capitalize",
                }}
              >
                <span style={{ color: BRAND }}>•</span>
                {c.name}
              </li>
            ))}
          </ul>
          {referees.length > 0 && (
            <>
              <h3
                style={{
                  fontWeight: "700",
                  margin: "10px 0 4px",
                  color: BRAND,
                }}
              >
                Referees
              </h3>
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `3px solid ${BRAND}`,
                    paddingLeft: "8px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    background: "#fff",
                    marginBottom: "5px",
                  }}
                >
                  <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                  <div style={{ color: "#6b7280" }}>{r.position}</div>
                  <div>{r.company}</div>
                  <div>Tel: {r.phone}</div>
                  <div>Email: {r.email}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
