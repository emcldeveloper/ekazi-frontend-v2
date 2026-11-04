import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T29ChipProps {
  label?: string;
  bg: string;
  color?: string;
  border?: string;
}

function T29Chip({ label, bg, color, border }: T29ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        border,
        padding: "2px 8px",
        margin: "2px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        textTransform: "capitalize",
        fontWeight: "600",
      }}
    >
      {label}
    </span>
  );
}

interface T29SectionProps {
  title: string;
  children: ReactNode;
}

function T29Section({ title, children }: T29SectionProps) {
  const BRAND = "#0284c7";
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: BRAND,
          marginBottom: "8px",
        }}
      >
        ◆ {title}
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

interface Template29Profile {
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

interface Template29Props {
  profile: Template29Profile;
}

export default function Template29({ profile }: Template29Props) {
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
    personalities,
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#0284c7";

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
        borderRadius: "12px",
      }}
    >
      {/* Sky blue header, absolute circular photo bottom-right */}
      <div
        style={{
          position: "relative",
          background: BRAND,
          color: "#fff",
          padding: "20px 24px 18px",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "700",
            margin: "0 0 3px",
            wordBreak: "break-word",
          }}
        >
          {fullName}
        </h1>
        <div style={{ opacity: 0.9, marginBottom: "8px" }}>
          {current_position}
        </div>
        <p
          style={{
            margin: "0 0 10px",
            maxWidth: "65%",
            opacity: 0.95,
          }}
        >
          {summary}
        </p>
        <img
          src={
            profileInfo?.picture
              ? `https://api.ekazi.co.tz/${profileInfo.picture}`
              : "https://placehold.co/100x100?text=Photo"
          }
          alt="profile"
          style={{
            position: "absolute",
            right: "20px",
            bottom: "16px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "5px solid #fff",
            boxShadow: "0 6px 18px rgba(0,0,0,.28)",
          }}
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/100x100?text=Photo")
          }
        />
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          gap: "14px",
          padding: "14px 16px",
          height: "calc(100% - 160px)",
        }}
      >
        {/* Left */}
        <div style={{ overflow: "hidden" }}>
          <T29Section title="Contact">
            {[
              [<IconPhone />, phone],
              [<IconMail />, email],
              [<IconMapPin />, location],
            ].map(([icon, val], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "5px",
                  marginBottom: "5px",
                  color: "#374157",
                }}
              >
                <span style={{ color: BRAND, marginTop: "1px", flexShrink: 0 }}>
                  {icon}
                </span>
                <span style={{ wordBreak: "break-all" }}>{val}</span>
              </div>
            ))}
          </T29Section>

          <T29Section title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {knowledges.map((k, i) => (
                <T29Chip
                  key={i}
                  label={k?.name}
                  bg={`rgba(2,132,199,.1)`}
                  color={BRAND}
                  border={`1px solid rgba(2,132,199,.2)`}
                />
              ))}
              {softwares.map((s, i) => (
                <T29Chip
                  key={i}
                  label={s?.name}
                  bg="rgba(17,24,39,.05)"
                  color="#1f2937"
                  border="1px solid rgba(17,24,39,.15)"
                />
              ))}
            </div>
          </T29Section>

          {languages.length > 0 && (
            <T29Section title="Languages">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {languages.map((l, i) => (
                  <T29Chip
                    key={i}
                    label={l?.name}
                    bg={`rgba(2,132,199,.08)`}
                    color={BRAND}
                    border={`1px solid rgba(2,132,199,.18)`}
                  />
                ))}
              </div>
            </T29Section>
          )}

          {(cultures.length > 0 || personalities.length > 0) && (
            <T29Section title="Culture & Personality">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {cultures.map((x, i) => (
                  <T29Chip
                    key={i}
                    label={x?.name}
                    bg="rgba(186,230,253,.5)"
                    color="#0c4a6e"
                    border="1px solid rgba(186,230,253,.8)"
                  />
                ))}
                {personalities.map((x, i) => (
                  <T29Chip
                    key={i}
                    label={x?.name}
                    bg="rgba(253,230,138,.5)"
                    color="#78350f"
                    border="1px solid rgba(253,230,138,.8)"
                  />
                ))}
              </div>
            </T29Section>
          )}
        </div>

        {/* Right */}
        <div style={{ overflow: "hidden" }}>
          <T29Section title="Experience">
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
                <div
                  style={{
                    fontStyle: "italic",
                    color: "#6b7280",
                  }}
                >
                  {exp.organization} | {exp.dates}
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
          </T29Section>

          <T29Section title="Education">
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
                  {edu.level}
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    color: "#6b7280",
                  }}
                >
                  {edu.college} | {edu.dates}
                </div>
              </div>
            ))}
          </T29Section>

          {referees.length > 0 && (
            <T29Section title="Referees">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      flex: "1 1 calc(50% - 4px)",
                      border: `1px solid rgba(2,132,199,.2)`,
                      borderLeft: `4px solid ${BRAND}`,
                      background: "#f0f9ff",
                      padding: "8px 10px",
                    }}
                  >
                    <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                    <div style={{ color: "#6b7280" }}>{r.position}</div>
                    <div>{r.company}</div>
                    <div>{r.phone}</div>
                    <div style={{ wordBreak: "break-all" }}>{r.email}</div>
                  </div>
                ))}
              </div>
            </T29Section>
          )}
        </div>
      </div>
    </div>
  );
}
