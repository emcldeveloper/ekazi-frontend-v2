import { capitalizeText } from "@/utils/helpers";
import { SideSection, Section } from "./components/SectionHelpers";

interface NamedItem {
  name: string;
}

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

interface Referee {
  fullName: string;
  position: string;
  company?: string;
  email: string;
}

interface Template2Profile {
  fullName: string;
  current_position: string;
  email: string;
  phone: string;
  location: string;
  objective: string;
  experiences: Experience[];
  educations: Education[];
  tools: NamedItem[];
  softwares: NamedItem[];
  knowledges: NamedItem[];
  personalities: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile?: { picture?: string };
}

interface Template2Props {
  profile: Template2Profile;
}

export default function Template2({ profile }: Template2Props) {
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
    profile: profileInfo,
  } = profile;

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        display: "flex",
        height: "100%",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          minWidth: "200px",
          background: "#1e293b",
          color: "#e2e8f0",
          padding: "28px 18px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/90x90?text=Photo"
            }
            alt="profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "100%",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
            }
          />
        </div>
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "700",
            margin: "0 0 2px",
            color: "#fff",
          }}
        >
          {fullName}
        </h1>
        <p style={{ color: "#93c5fd", margin: "0 0 20px" }}>
          {current_position}
        </p>

        <SideSection title="CONTACT">
          <div>
            <div>{email}</div>
            <div>{phone}</div>
            <div>{location}</div>
          </div>
        </SideSection>

        {(tools.length > 0 ||
          softwares.length > 0 ||
          knowledges.length > 0) && (
          <SideSection title="SKILLS">
            {[...tools, ...softwares, ...knowledges].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "3px",
                  padding: "1px 6px",
                  marginBottom: "2px",
                  display: "inline-block",
                  marginRight: "3px",
                }}
              >
                {capitalizeText(item.name)}
              </div>
            ))}
          </SideSection>
        )}

        {personalities.length > 0 && (
          <SideSection title="PERSONALITY">
            {personalities.map((p, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "2px",
                  color: "#e2e8f0",
                }}
              >
                {p.name}
              </div>
            ))}
          </SideSection>
        )}

        {languages.length > 0 && (
          <SideSection title="LANGUAGES">
            {languages.map((l, i) => (
              <div key={i} style={{ marginBottom: "3px" }}>
                <span style={{ color: "#fff" }}>{l.name}</span>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "28px 24px", boxSizing: "border-box" }}>
        {objective ? (
          <Section title="ABOUT ME" accent="#3b82f6">
            <p style={{ margin: 0 }}>{objective}</p>
          </Section>
        ) : null}

        <Section title="EXPERIENCE" accent="#3b82f6">
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
                <span style={{ color: "#64748b" }}>{job.dates}</span>
              </div>
              <div
                style={{
                  color: "#3b82f6",
                  marginBottom: "4px",
                  fontWeight: "600",
                }}
              >
                {capitalizeText(job.organization)}
                {job.location ? ` · ${job.location}` : ""}
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

        <Section title="EDUCATION" accent="#3b82f6">
          {educations.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <strong>{capitalizeText(edu.course)}</strong>
              <div
                style={{
                  color: "#3b82f6",
                  fontWeight: "600",
                }}
              >
                {capitalizeText(edu.college)}
              </div>
              <div style={{ color: "#64748b" }}>
                {edu.level} · {edu.dates}
              </div>
            </div>
          ))}
        </Section>

        {referees.length > 0 && (
          <Section title="REFEREES" accent="#3b82f6">
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {referees.map((r, i) => (
                <div key={i}>
                  <strong>{r.fullName}</strong>
                  <div style={{ color: "#64748b" }}>
                    {r.position}
                    {r.company ? `, ${r.company}` : ""}
                  </div>
                  <div>{r.email}</div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
