import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T16ChipProps {
  label?: string | NamedItem;
  bg?: string;
  color?: string;
}

function T16Chip({ label, bg = "#009485", color = "#fff" }: T16ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
      
        padding: "3px 8px",
        margin: "2px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        textAlign: "left",
        lineHeight: 1.2,
        textTransform: "capitalize",
      }}
    >
      {typeof label === "string" ? label : label?.name}
    </span>
  );
}

interface T16SidebarSectionProps {
  title: string;
  children: ReactNode;
  brand: string;
}

function T16SidebarSection({ title, children, brand }: T16SidebarSectionProps) {
  return (
    <div style={{ marginBottom: "12px", width: "100%" }}>
      <div
        style={{
          fontWeight: "600",
         
          color: brand,
          letterSpacing: ".5px",
          marginBottom: "5px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

interface T16SectionProps {
  title: string;
  children: ReactNode;
  brand: string;
}

function T16Section({ title, children, brand }: T16SectionProps) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "inline-block",
          fontWeight: "600",
        
          color: brand,
          borderBottom: `2px solid ${brand}`,
          letterSpacing: ".5px",
          marginBottom: "8px",
          paddingBottom: "2px",
        }}
      >
        {title}
      </div>
      {children}
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

interface Template16Profile {
  fullName: string;
  current_position: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  softwares: NamedItem[];
  knowledges: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template16Props {
  profile: Template16Profile;
}

export default function Template16({ profile }: Template16Props) {
  const {
    fullName,
    current_position,
    email,
    phone,
    location,
    summary,
    experiences,
    educations,
    cultures,
    personalities,
    softwares,
    knowledges,
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#009485";

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#1f2937",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Teal center header */}
      <div
        style={{
          background: BRAND,
          color: "#fff",
          textAlign: "center",
          padding: "18px 20px 14px",
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "22px",
            letterSpacing: ".5px",
            margin: "0 0 3px",
          }}
        >
          {fullName}
        </h1>
        <div
          style={{
            fontWeight: "300",
           
            letterSpacing: ".5px",
            marginBottom: "10px",
          }}
        >
          {current_position}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
          
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
            }}
          >
            <IconPhone /> {phone}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
            }}
          >
            <IconMail /> {email}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
            }}
          >
            <IconMapPin /> {location}
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "calc(100% - 100px)",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            background: "#f8f9fa",
            padding: "16px 14px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            overflow: "hidden",
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
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              objectFit: "cover",
              border: `4px solid ${BRAND}`,
              marginBottom: "14px",
              boxShadow: "0 1px 4px rgba(0,0,0,.12)",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/120x120?text=Photo")
            }
          />

          {([
            ["Languages", languages, BRAND],
            ["Skills", knowledges, "#0b5ed7"],
            ["Software", softwares, BRAND],
          ] as [string, NamedItem[], string][]).map(([label, items, bg]) => (
            <T16SidebarSection key={label} title={label} brand={BRAND}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {items?.map((it, i) => (
                  <T16Chip key={i} label={it?.name} bg={bg} />
                ))}
              </div>
            </T16SidebarSection>
          ))}

          <T16SidebarSection title="Culture & Personality" brand={BRAND}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[...(cultures || []), ...(personalities || [])].map((it, i) => (
                <T16Chip key={i} label={it?.name} bg={BRAND} />
              ))}
            </div>
          </T16SidebarSection>
        </div>

        {/* Right */}
        <div
          style={{
            padding: "16px 18px",
            boxSizing: "border-box",
            background: "#fff",
            overflow: "hidden",
          }}
        >
          <T16Section title="About Me" brand={BRAND}>
            <p
              style={{
              
                color: "#6b7280",
              
                margin: 0,
                textAlign: "justify",
              }}
            >
              {summary}
            </p>
          </T16Section>

          <T16Section title="Experience" brand={BRAND}>
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                  
                    color: BRAND,
                  }}
                >
                  {exp.position}
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    {" "}
                    — {exp.organization}
                  </span>
                </div>
                <div
                  style={{
              
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  {exp.dates}
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
          </T16Section>

          <T16Section title="Education" brand={BRAND}>
            {educations.map((edu, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                  borderRadius: "6px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",

                    color: BRAND,
                  }}
                >
                  {edu.level}
                </div>
                <div style={{ color: "#374151" }}>{edu.college}</div>
                <div style={{ color: "#6b7280" }}>{edu.dates}</div>
              </div>
            ))}
          </T16Section>

          {referees.length > 0 && (
            <T16Section title="Referees" brand={BRAND}>
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                    borderRadius: "6px",
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",

                      color: BRAND,
                    }}
                  >
                    {r.fullName}
                  </div>
                  <div style={{ color: "#6b7280" }}>{r.position}</div>
                  <div>{r.company}</div>
                  <div>{r.phone}</div>
                  <div>{r.email}</div>
                </div>
              ))}
            </T16Section>
          )}
        </div>
      </div>
    </div>
  );
}
