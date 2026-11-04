import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T22ChipProps {
  label?: string;
  bg: string;
  color?: string;
}

function T22Chip({ label, bg, color = "#fff" }: T22ChipProps) {
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
        lineHeight: 1.2,
        textTransform: "capitalize",
      }}
    >
      {label}
    </span>
  );
}

interface T22SkillGroupProps {
  title: string;
  items: NamedItem[];
  bg: string;
  altBg?: string;
}

function T22SkillGroup({ title, items, bg, altBg }: T22SkillGroupProps) {
  const BRAND = "#223a83";
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontWeight: "600",

          color: BRAND,
          marginBottom: "5px",
        }}
      >
        ◆ {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((x, i) => (
          <T22Chip
            key={i}
            label={x?.name}
            bg={altBg && i % 2 === 1 ? altBg : bg}
          />
        ))}
      </div>
    </div>
  );
}

interface T22SidebarSectionProps {
  title: string;
  children: ReactNode;
}

function T22SidebarSection({ title, children }: T22SidebarSectionProps) {
  const BRAND = "#223a83";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          fontWeight: "700",

          color: BRAND,
          marginBottom: "5px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

interface T22MainSectionProps {
  title: string;
  children: ReactNode;
}

function T22MainSection({ title, children }: T22MainSectionProps) {
  const BRAND = "#223a83";
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "inline-block",
          fontWeight: "700",

          color: BRAND,
          borderBottom: `2px solid ${BRAND}`,
          paddingBottom: "2px",
          marginBottom: "10px",
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

interface Template22Profile {
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

interface Template22Props {
  profile: Template22Profile;
}

export default function Template22({ profile }: Template22Props) {
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
  const BRAND = "#223a83";

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
      }}
    >
      {/* Dark blue center header with circular photo */}
      <div
        style={{
          background: BRAND,
          color: "#fff",
          textAlign: "center",
          padding: "18px 20px 14px",
        }}
      >
        <img
          src={
            profileInfo?.picture
              ? `https://api.ekazi.co.tz/${profileInfo.picture}`
              : "https://placehold.co/100x100?text=Photo"
          }
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "5px solid #fff",
            boxShadow: "0 4px 14px rgba(0,0,0,.25)",
            marginBottom: "10px",
          }}
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/100x100?text=Photo")
          }
        />
        <h1 style={{ fontWeight: "700", fontSize: "22px", margin: "0 0 3px" }}>
          {fullName}
        </h1>
        <div style={{ fontWeight: "300", marginBottom: "8px" }}>
          {current_position}
        </div>
        <p
          style={{
            opacity: 0.9,
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
          height: "calc(100% - 190px)",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            background: "#f8f9fa",
            padding: "14px 14px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <T22SidebarSection title="Contact">
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

                  marginBottom: "4px",
                }}
              >
                {icon}
                <span style={{ wordBreak: "break-all" }}>{val}</span>
              </div>
            ))}
          </T22SidebarSection>

          {languages.length > 0 && (
            <T22SidebarSection title="Languages">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {languages.map((l, i) => (
                  <T22Chip key={i} label={l?.name} bg={BRAND} />
                ))}
              </div>
            </T22SidebarSection>
          )}

          <T22SidebarSection title="Skills">
            <T22SkillGroup
              title="Knowledge"
              items={knowledges}
              bg={BRAND}
              altBg="#6b7280"
            />
            <T22SkillGroup
              title="Software"
              items={softwares}
              bg={BRAND}
              altBg="#6b7280"
            />
          </T22SidebarSection>

          {(cultures.length > 0 || personalities.length > 0) && (
            <T22SidebarSection title="Culture & Personality">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {cultures.map((x, i) => (
                  <T22Chip key={i} label={x?.name} bg="#0dcaf0" color="#000" />
                ))}
                {personalities.map((x, i) => (
                  <T22Chip key={i} label={x?.name} bg="#ffc107" color="#000" />
                ))}
              </div>
            </T22SidebarSection>
          )}
        </div>

        {/* Right */}
        <div
          style={{
            padding: "14px 16px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <T22MainSection title="Experience">
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  boxShadow: "0 1px 2px rgba(0,0,0,.06)",
                  borderLeft: `4px solid ${BRAND}`,
                  padding: "6px 10px",
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
                    color: "#6b7280",
                    marginBottom: "2px",
                  }}
                >
                  {exp.organization}
                </div>
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
          </T22MainSection>

          {/* Education table */}
          <T22MainSection title="Education">
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",

                  borderCollapse: "collapse",
                  border: "1px solid #e5e7eb",
                }}
              >
                <thead style={{ background: BRAND, color: "#fff" }}>
                  <tr>
                    {["Level", "Institution", "Duration"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "5px 10px",
                          textAlign: "left",
                          fontWeight: "600",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {educations.map((edu, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "5px 10px" }}>
                        {edu.level || edu.degree}
                      </td>
                      <td style={{ padding: "5px 10px" }}>
                        {edu.college || edu.institution}
                      </td>
                      <td style={{ padding: "5px 10px" }}>{edu.dates}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </T22MainSection>

          {referees.length > 0 && (
            <T22MainSection title="Referees">
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,.07)",
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
            </T22MainSection>
          )}
        </div>
      </div>
    </div>
  );
}
