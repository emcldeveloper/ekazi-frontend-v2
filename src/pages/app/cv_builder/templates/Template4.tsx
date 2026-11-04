import { capitalizeText } from "@/utils/helpers";
import { BoldSection } from "./components/SectionHelpers";

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
  personalities: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
}

interface Template4Props {
  profile: Profile;
}

export default function Template4({ profile }: Template4Props) {
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
    personalities,
    languages,
    referees,
  } = profile;
  const allSkills = [...tools, ...softwares, ...knowledges];
  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        position: "relative",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#f59e0b",
          padding: "24px 28px",
          marginBottom: "0",
        }}
      >
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "900",
            margin: "0 0 2px",
            color: "#1c1917",
            letterSpacing: "-1px",
          }}
        >
          {fullName}
        </h1>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "#78350f",
            margin: "0 0 12px",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          {current_position}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#1c1917",
            flexWrap: "wrap",
          }}
        >
          <span>{email}</span>
          <span>|</span>
          <span>{phone}</span>
          <span>|</span>
          <span>{location}</span>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Left */}
        <div style={{ flex: 2, padding: "20px 20px 20px 28px" }}>
          {objective ? (
            <BoldSection title="SUMMARY" color="#f59e0b">
              <p style={{ margin: 0 }}>{objective}</p>
            </BoldSection>
          ) : null}

          <BoldSection title="EXPERIENCE" color="#f59e0b">
            {experiences.map((job, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>{capitalizeText(job.position)}</strong>
                  <span
                    style={{
                      color: "#78350f",
                      fontWeight: "700",
                    }}
                  >
                    {job.dates}
                  </span>
                </div>
                <div
                  style={{
                    color: "#92400e",
                    fontWeight: "700",
                    marginBottom: "4px",
                  }}
                >
                  {capitalizeText(job.organization)}
                  {job.location ? ` | ${job.location}` : ""}
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
          </BoldSection>

          <BoldSection title="EDUCATION" color="#f59e0b">
            {educations.map((edu, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <strong>{capitalizeText(edu.course)}</strong>
                <div
                  style={{
                    color: "#92400e",
                    fontWeight: "700",
                  }}
                >
                  {capitalizeText(edu.college)}
                </div>
                <div>
                  {capitalizeText(edu.level)} · {edu.dates}
                </div>
              </div>
            ))}
          </BoldSection>
        </div>

        {/* Right */}
        <div
          style={{
            flex: 1,
            background: "#fef3c7",
            padding: "20px 20px 20px 16px",
          }}
        >
          {allSkills.length > 0 && (
            <BoldSection title="SKILLS" color="#d97706">
              {allSkills.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "#f59e0b",
                    display: "inline-block",
                    padding: "1px 7px",
                    borderRadius: "2px",
                    marginRight: "3px",
                    marginBottom: "3px",
                    fontWeight: "600",
                  }}
                >
                  {capitalizeText(item.name)}
                </div>
              ))}
            </BoldSection>
          )}

          {personalities.length > 0 && (
            <BoldSection title="PERSONALITY" color="#d97706">
              {personalities.map((p, i) => (
                <div key={i} style={{ marginBottom: "3px" }}>
                  {capitalizeText(p.name)}
                </div>
              ))}
            </BoldSection>
          )}

          {languages.length > 0 && (
            <BoldSection title="LANGUAGES" color="#d97706">
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: "4px" }}>
                  {capitalizeText(l.name)}
                </div>
              ))}
            </BoldSection>
          )}

          {referees.length > 0 && (
            <BoldSection title="REFEREES" color="#d97706">
              {referees.map((r, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <strong>{capitalizeText(r.fullName)}</strong>
                  <div style={{ color: "#78350f" }}>
                    {capitalizeText(r.position)}
                    {r.company ? `, ${r.company}` : ""}
                  </div>
                  <div>{r.email}</div>
                </div>
              ))}
            </BoldSection>
          )}
        </div>
      </div>
    </div>
  );
}
