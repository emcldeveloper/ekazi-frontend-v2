import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T25ChipProps {
  label?: string | NamedItem;
  bg: string;
  color?: string;
}

function T25Chip({ label, bg, color = "#fff" }: T25ChipProps) {
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
        textTransform: "capitalize",
      }}
    >
      {typeof label === "string" ? label : label?.name}
    </span>
  );
}

interface T25ContactItemProps {
  icon: ReactNode;
  value: string;
  brand: string;
}

function T25ContactItem({ icon, value, brand }: T25ContactItemProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        marginBottom: "10px",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          width: "24px",
          height: "24px",
          border: `1px solid rgba(255,81,26,.25)`,
          background: `rgba(255,81,26,.08)`,
          color: brand,
        }}
      >
        {icon}
      </span>
      <div
        style={{
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

interface T25CardBlockProps {
  children: ReactNode;
}

function T25CardBlock({ children }: T25CardBlockProps) {
  return (
    <div
      style={{
        boxShadow: "0 1px 4px rgba(0,0,0,.07)",
        borderRadius: "14px",
        padding: "12px 14px",
        marginBottom: "10px",
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}

interface T25SectionProps {
  title: string;
  children: ReactNode;
  brand: string;
}

function T25Section({ title, children, brand }: T25SectionProps) {
  return (
    <div style={{ marginBottom: "6px" }}>
      <div
        style={{
          fontWeight: "700",
          color: brand,
          textTransform: "uppercase",
          borderBottom: `2px solid ${brand}`,
          paddingBottom: "3px",
          marginBottom: "6px",
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
  degree: string;
  college: string;
  institution: string;
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

interface Template25Profile {
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

interface Template25Props {
  profile: Template25Profile;
}

export default function Template25({ profile }: Template25Props) {
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
  const BRAND = "#ff511a";

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
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      {/* Bright orange centered header */}
      <div
        style={{
          background: BRAND,
          color: "#fff",
          textAlign: "center",
          padding: "18px 20px 14px",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "110px",
            borderRadius: "10px",
            overflow: "hidden",
            border: "4px solid #fff",
            margin: "0 auto 10px",
            boxShadow: "0 4px 14px rgba(0,0,0,.22)",
          }}
        >
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/100x110?text=Photo"
            }
            alt="profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/100x110?text=Photo")
            }
          />
        </div>
        <div
          style={{ fontSize: "22px", fontWeight: "700", marginBottom: "2px" }}
        >
          {fullName}
        </div>
        <div style={{ opacity: 0.9, marginBottom: "6px" }}>
          {current_position}
        </div>
        <p
          style={{
            opacity: 0.95,
            margin: "0 auto",
            maxWidth: "480px",
          }}
        >
          {summary}
        </p>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          gap: "12px",
          padding: "12px 14px",
          height: "calc(100% - 200px)",
        }}
      >
        {/* Left */}
        <div style={{ overflow: "hidden" }}>
          <T25CardBlock>
            <T25Section title="Contact" brand={BRAND}>
              <T25ContactItem
                icon={<IconPhone />}
                value={phone}
                brand={BRAND}
              />
              <T25ContactItem icon={<IconMail />} value={email} brand={BRAND} />
              <T25ContactItem
                icon={<IconMapPin />}
                value={location}
                brand={BRAND}
              />
            </T25Section>
          </T25CardBlock>

          <T25CardBlock>
            <T25Section title="Skills" brand={BRAND}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {knowledges.map((x, i) => (
                  <T25Chip key={i} label={x?.name} bg={BRAND} />
                ))}
                {softwares.map((x, i) => (
                  <T25Chip key={i} label={x?.name} bg="#333" />
                ))}
              </div>
            </T25Section>
          </T25CardBlock>

          {languages.length > 0 && (
            <T25CardBlock>
              <T25Section title="Languages" brand={BRAND}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {languages.map((l, i) => (
                    <T25Chip key={i} label={l?.name} bg={BRAND} />
                  ))}
                </div>
              </T25Section>
            </T25CardBlock>
          )}

          {(cultures.length > 0 || personalities.length > 0) && (
            <T25CardBlock>
              <T25Section title="Culture & Personality" brand={BRAND}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {cultures.map((x, i) => (
                    <T25Chip
                      key={i}
                      label={x?.name}
                      bg="#0dcaf0"
                      color="#000"
                    />
                  ))}
                  {personalities.map((x, i) => (
                    <T25Chip
                      key={i}
                      label={x?.name}
                      bg="#ffc107"
                      color="#000"
                    />
                  ))}
                </div>
              </T25Section>
            </T25CardBlock>
          )}
        </div>

        {/* Right */}
        <div style={{ overflow: "hidden" }}>
          <T25CardBlock>
            <T25Section title="Experience" brand={BRAND}>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `4px solid ${BRAND}`,
                    paddingLeft: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",

                      color: BRAND,
                    }}
                  >
                    {exp.position}
                  </div>
                  <div style={{ color: "#6b7280" }}>{exp.organization}</div>
                  <div
                    style={{
                      color: "#6b7280",
                      marginBottom: "3px",
                    }}
                  >
                    {exp.dates}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: exp.responsibility,
                    }}
                    className="job-description"
                    style={{ margin: 0, paddingLeft: "14px" }}
                  />
                </div>
              ))}
            </T25Section>
          </T25CardBlock>

          <T25CardBlock>
            <T25Section title="Education" brand={BRAND}>
              {educations.map((edu, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `4px solid ${BRAND}`,
                    paddingLeft: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      color: BRAND,
                    }}
                  >
                    {edu.level || edu.degree}
                  </div>
                  <div>{edu.college || edu.institution}</div>
                  <div style={{ color: "#6b7280" }}>{edu.dates}</div>
                </div>
              ))}
            </T25Section>
          </T25CardBlock>

          {referees.length > 0 && (
            <T25CardBlock>
              <T25Section title="Referees" brand={BRAND}>
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                      borderRadius: "10px",
                      padding: "8px 10px",
                      marginBottom: "6px",
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
              </T25Section>
            </T25CardBlock>
          )}
        </div>
      </div>
    </div>
  );
}
