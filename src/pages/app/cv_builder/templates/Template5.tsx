import { capitalizeText } from "@/utils/helpers";
import { TechSection } from "./components/SectionHelpers";

interface Experience {
  position: string;
  dates: string;
  organization: string;
  location?: string;
  responsibility: string;
}

interface Education {
  course: string;
  college: string;
  level: string;
  dates: string;
}

interface NamedItem {
  name: string;
}

interface Referee {
  fullName: string;
  position: string;
  company?: string;
  email: string;
}

interface Profile {
  fullName: string;
  current_position: string;
  email: string;
  phone: string;
  location: string;
  objective?: string;
  experiences: Experience[];
  educations: Education[];
  tools: NamedItem[];
  softwares: NamedItem[];
  knowledges: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
}

export default function Template5({ profile }: { profile: Profile }) {
  const {
    fullName,
    current_position,
    email,
    phone,
    location,
    objective,
    experiences,
    educations,
    tools,
    softwares,
    knowledges,
    languages,
    referees,
  } = profile;
  const allSkills = [...tools, ...softwares, ...knowledges];
  return (
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#1a1a2e",
        position: "relative",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#0f172a",
          color: "#e2e8f0",
          padding: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              margin: "0 0 4px",
              color: "#38bdf8",
              letterSpacing: "1px",
            }}
          >
            {fullName}
          </h1>
          <p
            style={{
              color: "#fff",
              margin: "0",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {current_position}
          </p>
        </div>
        <div
          style={{
            textAlign: "right",
            color: "#fff",
          }}
        >
          <div>{email}</div>
          <div>{phone}</div>
          <div>{location}</div>
        </div>
      </div>

      <div style={{ padding: "20px 28px" }}>
        {objective ? (
          <div
            style={{
              borderLeft: "3px solid #38bdf8",
              paddingLeft: "12px",
              marginBottom: "18px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#334155",
              }}
            >
              {objective}
            </p>
          </div>
        ) : null}

        <TechSection title="// EXPERIENCE">
          {experiences.map((job, i) => (
            <div
              key={i}
              style={{
                marginBottom: "14px",
                paddingLeft: "12px",
                borderLeft: "2px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ color: "#0f172a" }}>
                  {capitalizeText(job.position)}
                </strong>
                <span style={{ color: "#64748b" }}>{job.dates}</span>
              </div>
              <div
                style={{
                  color: "#38bdf8",
                  fontWeight: "700",
                  marginBottom: "4px",
                }}
              >
                {capitalizeText(job.organization)}
                {job.location ? ` @ ${job.location}` : ""}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: job.responsibility,
                }}
                className="job-description"
                style={{ margin: 0, paddingLeft: "14px", color: "#334155" }}
              />
            </div>
          ))}
        </TechSection>

        <div style={{ display: "flex", gap: "28px" }}>
          <div style={{ flex: 1 }}>
            <TechSection title="// EDUCATION">
              {educations.map((edu, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <strong>{capitalizeText(edu.course)}</strong>
                  <div style={{ color: "#38bdf8", fontWeight: "600" }}>
                    {capitalizeText(edu.college)}
                  </div>
                  <div style={{ color: "#64748b" }}>
                    {capitalizeText(edu.level)} · {edu.dates}
                  </div>
                </div>
              ))}
            </TechSection>

            {languages.length > 0 && (
              <TechSection title="// LANGUAGES">
                {languages.map((l, i) => (
                  <div key={i} style={{ marginBottom: "3px" }}>
                    <span style={{ color: "#38bdf8" }}>
                      {capitalizeText(l.name)}
                    </span>
                  </div>
                ))}
              </TechSection>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {allSkills.length > 0 && (
              <TechSection title="// SKILLS">
                {allSkills.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      color: "#334155",
                      marginBottom: "3px",
                    }}
                  >
                    · {capitalizeText(item.name)}
                  </div>
                ))}
              </TechSection>
            )}
          </div>
        </div>

        {referees.length > 0 && (
          <TechSection title="// REFEREES">
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {referees.map((r, i) => (
                <div key={i}>
                  <strong style={{ color: "#0f172a" }}>
                    {capitalizeText(r.fullName)}
                  </strong>
                  <div style={{ color: "#38bdf8" }}>
                    {capitalizeText(r.position)}
                    {r.company ? `, ${capitalizeText(r.company)}` : ""}
                  </div>
                  <div style={{ color: "#64748b" }}>{r.email}</div>
                </div>
              ))}
            </div>
          </TechSection>
        )}
      </div>
    </div>
  );
}
