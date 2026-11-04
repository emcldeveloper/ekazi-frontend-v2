import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T28ChipProps {
  label?: string;
  bg: string;
  color?: string;
  border?: string;
}

function T28Chip({ label, bg, color, border }: T28ChipProps) {
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

interface T28SectionProps {
  title: string;
  children: ReactNode;
}

function T28Section({ title, children }: T28SectionProps) {
  const BRAND = "#dc2626";
  return (
    <div
      style={{
        marginBottom: "14px",
        background: "#f8fafc",
        borderLeft: `4px solid ${BRAND}`,
        borderRadius: "6px",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".12em",
          color: BRAND,
          borderBottom: "1px solid rgba(0,0,0,.08)",
          paddingBottom: "5px",
          marginBottom: "8px",
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
  responsibility: string[];
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

interface Template28Profile {
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

interface Template28Props {
  profile: Template28Profile;
}

export default function Template28({ profile }: Template28Props) {
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
  const BRAND = "#dc2626";

  return (
    <div
      style={{
        fontFamily: "Georgia, Times New Roman, serif",
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
      {/* Centered name + floating photo header */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          paddingTop: "40px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "80px",
          marginBottom: "60px",
          borderBottom: `6px solid ${BRAND}`,
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: BRAND,
            wordBreak: "break-word",
            marginBottom: "4px",
          }}
        >
          {fullName}
        </div>
        <div style={{ color: "#6b7280", marginBottom: "10px" }}>
          {current_position}
        </div>
        <p
          style={{
            color: "#374151",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {summary}
        </p>
        {/* Floating photo */}
        <img
          src={
            profileInfo?.picture
              ? `https://api.ekazi.co.tz/${profileInfo.picture}`
              : "https://placehold.co/120x120?text=Photo"
          }
          alt="profile"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-60px",
            transform: "translateX(-50%)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "6px solid #fff",
            boxShadow: "0 6px 16px rgba(0,0,0,.22)",
          }}
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/120x120?text=Photo")
          }
        />
      </div>

      {/* Body */}
      <div style={{ padding: "0 16px 14px" }}>
        {/* Contact row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "14px",
            justifyContent: "center",
            color: "#374151",
          }}
        >
          {[
            [<IconPhone />, phone],
            [<IconMail />, email],
            [<IconMapPin />, location],
          ].map(([icon, val], i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}
            >
              {icon}
              <span style={{ wordBreak: "break-all" }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <T28Section title="Skills">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {knowledges.map((k, i) => (
              <T28Chip
                key={i}
                label={k?.name}
                bg={`rgba(220,38,38,.1)`}
                color={BRAND}
                border={`1px solid rgba(220,38,38,.2)`}
              />
            ))}
            {softwares.map((s, i) => (
              <T28Chip
                key={i}
                label={s?.name}
                bg="rgba(17,24,39,.05)"
                color="#1f2937"
                border="1px solid rgba(17,24,39,.15)"
              />
            ))}
          </div>
        </T28Section>

        {languages.length > 0 && (
          <T28Section title="Languages">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {languages.map((l, i) => (
                <T28Chip
                  key={i}
                  label={l?.name}
                  bg={`rgba(220,38,38,.08)`}
                  color={BRAND}
                  border={`1px solid rgba(220,38,38,.18)`}
                />
              ))}
            </div>
          </T28Section>
        )}

        {(cultures.length > 0 || personalities.length > 0) && (
          <T28Section title="Culture & Personality">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {cultures.map((x, i) => (
                <T28Chip
                  key={i}
                  label={x?.name}
                  bg="rgba(186,230,253,.5)"
                  color="#0c4a6e"
                  border="1px solid rgba(186,230,253,.8)"
                />
              ))}
              {personalities.map((x, i) => (
                <T28Chip
                  key={i}
                  label={x?.name}
                  bg="rgba(253,230,138,.5)"
                  color="#78350f"
                  border="1px solid rgba(253,230,138,.8)"
                />
              ))}
            </div>
          </T28Section>
        )}

        <T28Section title="Experience">
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  fontWeight: "600",
                  color: "#1f2937",
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
              {exp.responsibility?.length ? (
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: "4px 0 0",
                    color: "#374151",
                  }}
                >
                  {exp.responsibility.map((t, k) => (
                    <li key={k} style={{ lineHeight: "1.5" }}>
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </T28Section>

        <T28Section title="Education">
          {educations.map((edu, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: "600" }}>{edu.level}</div>
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
        </T28Section>

        {referees.length > 0 && (
          <T28Section title="Referees">
            {referees.map((r, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  marginBottom: "6px",
                  boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                }}
              >
                <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                <div style={{ color: "#6b7280" }}>{r.position}</div>
                <div>{r.company}</div>
                <div>{r.phone}</div>
                <div style={{ wordBreak: "break-all" }}>{r.email}</div>
              </div>
            ))}
          </T28Section>
        )}
      </div>
    </div>
  );
}
