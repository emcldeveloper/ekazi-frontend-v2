import { capitalizeText } from "@/utils/helpers";

interface NamedItem {
  name: string;
}

interface Experience {
  position: string;
  organization: string;
  industry: string;
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

interface Template6Profile {
  fullName: string;
  current_position: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  objective: string;
  experiences: Experience[];
  educations: Education[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  softwares: NamedItem[];
  knowledges: NamedItem[];
  tools: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template6Props {
  profile: Template6Profile;
}

export default function Template6({ profile }: Template6Props) {
  const {
    fullName,
    current_position,
    email,
    phone,
    location,
    summary,
    objective,
    experiences,
    educations,
    cultures,
    personalities,
    softwares,
    knowledges,
    tools,
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#1756a5";
  const BRAND_DARK = "#0e3668";
  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        fontSize: "12px",
        lineHeight: "1.5",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 4fr",
          textAlign: "left",
          height: "100%",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            background: "#fff",
            padding: "20px 24px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "10px" }}>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "22px",
                textTransform: "uppercase",
                margin: "0 0 2px",
                color: BRAND_DARK,
              }}
            >
              {fullName}
            </h1>
            <div style={{ color: "#6b7280" }}>{current_position}</div>
          </div>
          {/* About */}
          <div style={{ marginBottom: "10px" }}>
            <h2
              style={{
                fontWeight: "600",
                textTransform: "uppercase",
                margin: "0 0 4px",
                color: BRAND,
              }}
            >
              About
            </h2>
            <p style={{ margin: 0 }}>{summary}</p>
          </div>
          {/* Objective */}
          {objective ? (
            <div style={{ marginBottom: "10px" }}>
              <h2
                style={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                  color: BRAND,
                }}
              >
                Career Objective
              </h2>
              <p style={{ margin: 0 }}>{objective}</p>
            </div>
          ) : null}
          {/* Experience */}
          <div style={{ marginBottom: "10px" }}>
            <h2
              style={{
                fontWeight: "600",
                textTransform: "uppercase",
                margin: "0 0 4px",
                color: BRAND,
              }}
            >
              Job Experience
            </h2>
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "700",

                      color: BRAND_DARK,
                      textTransform: "capitalize",
                    }}
                  >
                    {capitalizeText(exp.position)}
                  </div>
                  <span
                    style={{
                      border: "1px solid #e5e7eb",
                      padding: "1px 6px",

                      borderRadius: "4px",
                      background: "#f3f4f6",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {exp.dates}
                  </span>
                </div>
                <div style={{ color: "#6b7280" }}>
                  {capitalizeText(exp.organization)} /{" "}
                  {capitalizeText(exp.industry)}
                </div>
                <div style={{ color: "#9ca3af" }}>
                  {capitalizeText(exp.location)}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: exp.responsibility,
                  }}
                  className="job-description"
                  style={{ margin: 0, paddingLeft: "14px", color: "#334155" }}
                />
              </div>
            ))}
          </div>
          {/* Skills */}
          <div style={{ marginBottom: "8px" }}>
            <h2
              style={{
                fontWeight: "600",
                textTransform: "uppercase",
                margin: "0 0 4px",
                color: BRAND,
              }}
            >
              Skills & Endorsements
            </h2>
            {([
              ["Culture Fit", cultures],
              ["Personality", personalities],
              ["Software", softwares],
              ["Skills & Knowledge", knowledges],
              ["Tools", tools],
            ] as [string, NamedItem[]][]).map(([label, items], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "3px",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    minWidth: "110px",
                    flexShrink: 0,
                  }}
                >
                  {label}:
                </span>
                <span style={{ textTransform: "capitalize", color: "#374151" }}>
                  {items
                    ?.map((i) => capitalizeText(i?.name))
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT */}
        <div
          style={{
            background: "#111827",
            color: "#f3f4f6",
            padding: "20px 16px",
            boxSizing: "border-box",
          }}
        >
          {/* Photo */}
          <div style={{ marginBottom: "14px" }}>
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/100x100?text=Photo"
              }
              alt="profile"
              style={{
                width: "80px",
                height: "80px",
                border: "3px solid #fff",
                borderRadius: "4px",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/100x100?text=Photo")
              }
            />
          </div>
          {/* Language */}
          <div style={{ marginBottom: "12px" }}>
            <h2
              style={{
                textTransform: "uppercase",

                fontWeight: "700",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: "3px",
                marginBottom: "5px",
              }}
            >
              Language
            </h2>
            <ul style={{ listStyle: "disc", paddingLeft: "14px", margin: 0 }}>
              {languages.map((l, i) => (
                <li
                  key={i}
                  style={{ textTransform: "capitalize", marginBottom: "2px" }}
                >
                  {l.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div style={{ marginBottom: "12px" }}>
            <h2
              style={{
                textTransform: "uppercase",

                fontWeight: "700",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: "3px",
                marginBottom: "5px",
              }}
            >
              Contact Me
            </h2>
            <div style={{ marginBottom: "2px" }}>{phone}</div>
            <div style={{ marginBottom: "2px", wordBreak: "break-all" }}>
              {email}
            </div>
            <div>{location}</div>
          </div>
          {/* Education */}
          <div style={{ marginBottom: "12px" }}>
            <h2
              style={{
                textTransform: "uppercase",

                fontWeight: "700",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: "3px",
                marginBottom: "5px",
              }}
            >
              Education
            </h2>
            <ul style={{ listStyle: "disc", paddingLeft: "14px", margin: 0 }}>
              {educations.map((edu, i) => (
                <li key={i} style={{ marginBottom: "5px" }}>
                  <strong>{capitalizeText(edu.course)}</strong>
                  <br />
                  {capitalizeText(edu.college)}
                  <br />
                  <span style={{ color: "#9ca3af", fontSize: "9.5px" }}>
                    ({edu.dates})
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Referees */}
          <div>
            <h2
              style={{
                textTransform: "uppercase",

                fontWeight: "700",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: "3px",
                marginBottom: "5px",
              }}
            >
              Referees
            </h2>
            {referees.map((r, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: "600" }}>
                  {capitalizeText(r.fullName)}
                </div>
                <div style={{ fontStyle: "italic" }}>
                  {capitalizeText(r.position)}
                </div>
                <div>{capitalizeText(r.company)}</div>
                <div>{r.email}</div>
                <div>{r.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
