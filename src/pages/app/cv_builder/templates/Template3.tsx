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

export default function Template3({ profile }: { profile: Profile }) {
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
        fontFamily: "'Times New Roman', serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#111",
        position: "relative",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header – centered, elegant */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
          paddingBottom: "16px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "400",
            letterSpacing: "4px",
            margin: "0 0 4px",
            textTransform: "uppercase",
          }}
        >
          {fullName}
        </h1>
        <p
          style={{
            letterSpacing: "2px",
            color: "#666",
            textTransform: "uppercase",
            margin: "0 0 10px",
          }}
        >
          {current_position}
        </p>
        <div
          style={{
            color: "#555",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <span>{email}</span>
          <span>·</span>
          <span>{phone}</span>
          <span>·</span>
          <span>{location}</span>
        </div>
      </div>

      {objective ? (
        <Section title="Profile" elegant>
          <p
            style={{
              margin: 0,
              textAlign: "justify",
            }}
          >
            {objective}
          </p>
        </Section>
      ) : null}

      <Section title="Career History" elegant>
        {experiences.map((job, i) => (
          <div key={i} style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontWeight: "700" }}>
                {capitalizeText(job.position)}
              </span>
              <span style={{ color: "#777", fontStyle: "italic" }}>
                {job.dates}
              </span>
            </div>
            <div
              style={{
                color: "#555",
                fontStyle: "italic",
                marginBottom: "5px",
              }}
            >
              {capitalizeText(job.organization)}
              {job.location ? `, ${job.location}` : ""}
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

      <Section title="Education" elegant>
        {educations.map((edu, i) => (
          <div key={i} style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "700" }}>
                {capitalizeText(edu.course)}
              </span>
              <span style={{ color: "#777", fontStyle: "italic" }}>
                {edu.dates}
              </span>
            </div>
            <div style={{ fontStyle: "italic", color: "#555" }}>
              {capitalizeText(edu.college)}
              {edu.level !== "-" ? `, ${edu.level}` : ""}
            </div>
          </div>
        ))}
      </Section>

      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 1 }}>
          <Section title="Skills" elegant>
            {tools.length > 0 && (
              <div style={{ marginBottom: "4px" }}>
                <strong>Tools:</strong>{" "}
                {tools.map((t) => capitalizeText(t.name)).join(", ")}
              </div>
            )}
            {softwares.length > 0 && (
              <div style={{ marginBottom: "4px" }}>
                <strong>Software:</strong>{" "}
                {softwares.map((s) => capitalizeText(s.name)).join(", ")}
              </div>
            )}
            {knowledges.length > 0 && (
              <div style={{ marginBottom: "4px" }}>
                <strong>Knowledge:</strong>{" "}
                {knowledges.map((k) => capitalizeText(k.name)).join(", ")}
              </div>
            )}
          </Section>
        </div>
        <div style={{ flex: 1 }}>
          {languages.length > 0 && (
            <Section title="Languages" elegant>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: "3px" }}>
                  {capitalizeText(l.name)}
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>

      {referees.length > 0 && (
        <Section title="References" elegant>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            {referees.map((r, i) => (
              <div key={i}>
                <div style={{ fontWeight: "700" }}>{r.fullName}</div>
                <div style={{ fontStyle: "italic", color: "#555" }}>
                  {r.position}
                  {r.company ? `, ${r.company}` : ""}
                </div>
                <div>
                  {r.email} · {r.phone}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
