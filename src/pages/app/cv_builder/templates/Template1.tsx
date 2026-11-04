import { capitalizeText } from "@/utils/helpers";
import { Section } from "./components/SectionHelpers";

interface Experience {
  position: string;
  dates: string;
  organization: string;
  location?: string;
  responsibility: string;
}

interface Education {
  course: string;
  dates: string;
  college: string;
  level: string;
  major: string;
}

interface NamedItem {
  name: string;
}

interface Referee {
  fullName: string;
  position: string;
  company?: string;
  email: string;
  phone: string;
}

interface Template1Profile {
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

export default function Template1({ profile }: { profile: Template1Profile }) {
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
  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#1a1a1a",
        position: "relative",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* {watermark && <Watermark />} */}
      {/* Header */}
      <div
        style={{
          borderBottom: "3px solid #1a1a1a",
          paddingBottom: "16px",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          {fullName}
        </h1>
        <p
          style={{
            color: "#555",
            margin: "4px 0 10px",
            fontStyle: "italic",
          }}
        >
          {current_position}
        </p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <span>{email}</span>
          <span>{phone}</span>
          <span>{location}</span>
        </div>
      </div>

      {/* Objective */}
      {objective ? (
        <Section title="PROFESSIONAL SUMMARY">
          <p style={{ margin: 0 }}>{objective}</p>
        </Section>
      ) : null}

      {/* Experience */}
      <Section title="WORK EXPERIENCE">
        {experiences.map((job, i) => (
          <div key={i} style={{ marginBottom: "14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <strong>{capitalizeText(job.position)}</strong>
              <span style={{ color: "#666" }}>{job.dates}</span>
            </div>
            <div style={{ color: "#444", marginBottom: "4px" }}>
              {capitalizeText(job.organization)}{" "}
              {job.location ? `· ${job.location}` : ""}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: job.responsibility,
              }}
              className="job-description"
              style={{ margin: 0, paddingLeft: "14px" }}
            />
          </div>
        ))}
      </Section>

      {/* Education */}
      <Section title="EDUCATION">
        {educations.map((edu, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{capitalizeText(edu.course)}</strong>
              <span style={{ color: "#666" }}>{edu.dates}</span>
            </div>
            <div style={{ color: "#444" }}>{capitalizeText(edu.college)}</div>
            <div style={{ color: "#666", fontStyle: "italic" }}>
              {edu.level}
              {edu.major !== "-" ? ` · ${capitalizeText(edu.major)}` : ""}
            </div>
          </div>
        ))}
      </Section>

      {/* Skills */}
      {(tools.length > 0 || softwares.length > 0 || knowledges.length > 0) && (
        <Section title="SKILLS">
          {tools.length > 0 && (
            <div style={{ marginBottom: "5px" }}>
              <strong>Tools:</strong>{" "}
              {tools.map((t) => capitalizeText(t.name)).join(", ")}
            </div>
          )}
          {softwares.length > 0 && (
            <div style={{ marginBottom: "5px" }}>
              <strong>Software:</strong>{" "}
              {softwares.map((s) => capitalizeText(s.name)).join(", ")}
            </div>
          )}
          {knowledges.length > 0 && (
            <div style={{ marginBottom: "5px" }}>
              <strong>Knowledge:</strong>{" "}
              {knowledges.map((k) => capitalizeText(k.name)).join(", ")}
            </div>
          )}
        </Section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <Section title="LANGUAGES">
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {languages.map((l, i) => (
              <span key={i}>{l.name}</span>
            ))}
          </div>
        </Section>
      )}

      {/* Referees */}
      {referees.length > 0 && (
        <Section title="REFEREES">
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            {referees.map((r, i) => (
              <div key={i}>
                <strong>{r.fullName}</strong>
                <div style={{ color: "#555" }}>
                  {r.position}
                  {r.company ? `, ${r.company}` : ""}
                </div>
                <div>{r.email}</div>
                <div>{r.phone}</div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
