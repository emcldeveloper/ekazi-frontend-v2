import type { ComponentType, ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T11SectionTitleProps {
  icon?: ComponentType;
  children: ReactNode;
}

function T11SectionTitle({ icon: Icon, children }: T11SectionTitleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "10px",
      }}
    >
      {Icon && <Icon />}
      <span style={{ fontWeight: "700", color: "#1f2937" }}>{children}</span>
      <div
        style={{
          height: "3px",
          width: "40px",
          background: "#c2410c",
          borderRadius: "2px",
          marginLeft: "4px",
        }}
      />
    </div>
  );
}

interface T11TimelineItemProps {
  title: string;
  subtitle?: string;
  right?: string;
  children?: ReactNode;
}

function T11TimelineItem({
  title,
  subtitle,
  right,
  children,
}: T11TimelineItemProps) {
  return (
    <div
      style={{
        paddingBottom: "10px",
        marginBottom: "10px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div style={{ flex: 1, paddingRight: "8px" }}>
          <div style={{ fontWeight: "600" }}>{title}</div>
          {subtitle && <div style={{ color: "#6b7280" }}>{subtitle}</div>}
        </div>
        {right && (
          <span
            style={{
              flexShrink: 0,
              border: "1px solid #e5e7eb",
              padding: "1px 6px",

              background: "#f9fafb",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              marginTop: "2px",
            }}
          >
            {right}
          </span>
        )}
      </div>
      {children && (
        <div style={{ marginTop: "5px", color: "#6b7280" }}>{children}</div>
      )}
      <span
        style={{
          position: "absolute",
          left: "-17px",
          top: "5px",
          width: "10px",
          height: "10px",
          background: "#c2410c",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface Experience {
  position: string;
  organization: string;
  industry: string;
  location: string;
  dates: string;
  responsibility: string;
}

interface Education {
  college: string;
  course: string;
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

interface Template11Profile {
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
  tools: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template11Props {
  profile: Template11Profile;
}

export default function Template11({ profile }: Template11Props) {
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
    tools,
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const ORANGE = "#c2410c";

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
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "14px",
            boxShadow: "0 1px 4px rgba(0,0,0,.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/90x90?text=Photo"
              }
              alt="profile"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: `5px solid ${ORANGE}`,
                objectFit: "cover",
                flexShrink: 0,
              }}
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
              }
            />
            <div>
              <div
                style={{
                  textTransform: "uppercase",

                  color: "#6b7280",
                }}
              >
                {current_position}
              </div>
              <h2
                style={{
                  fontWeight: "700",
                  fontSize: "22px",
                  color: ORANGE,
                  margin: "2px 0 4px",
                }}
              >
                {fullName}
              </h2>
              <div
                style={{
                  height: "5px",
                  width: "100px",
                  background: ORANGE,
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          {/* Contact tiles */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {[
              [<IconPhone />, phone],
              [<IconMail />, email],
              [<IconMapPin />, location],
            ].map(([icon, val], i) => (
              <div
                key={i}
                style={{
                  flex: "1 1 160px",
                  borderRadius: "10px",
                  border: `1px solid rgba(194,65,12,.25)`,
                  background: "#fff7ed",
                  padding: "8px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    margin: "0 auto 4px",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    border: `1px solid rgba(194,65,12,.25)`,
                    background: "rgba(194,65,12,.05)",
                    color: ORANGE,
                  }}
                >
                  {icon}
                </div>
                <div
                  style={{
                    color: "#1f2937",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 8fr",
            gap: "10px",
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Left */}
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "14px",
              boxShadow: "0 1px 4px rgba(0,0,0,.08)",
              overflow: "hidden",
            }}
          >
            <T11SectionTitle>About Me</T11SectionTitle>
            <p
              style={{
                color: "#6b7280",

                lineHeight: "1.6",
                textAlign: "justify",
                marginBottom: "10px",
              }}
            >
              {summary}
            </p>
            <hr style={{ opacity: 0.2, margin: "8px 0" }} />

            <T11SectionTitle>Skills & Profile</T11SectionTitle>
            {([
              ["Culture Fit", cultures],
              ["Personality", personalities],
              ["Software", softwares],
              ["Skills", knowledges],
              ["Tools", tools],
            ] as [string, NamedItem[]][]).map(([label, items], i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ fontWeight: "700", marginBottom: "3px" }}>
                  {label}
                </div>
                {items?.length ? (
                  <ul
                    style={{
                      listStyle: "disc",
                      paddingLeft: "14px",
                      margin: 0,
                      color: "#6b7280",
                    }}
                  >
                    {items.map((x, j) => (
                      <li
                        key={j}
                        style={{
                          marginBottom: "2px",
                          textTransform: "capitalize",
                        }}
                      >
                        {x?.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span style={{ color: "#9ca3af" }}>—</span>
                )}
              </div>
            ))}

            <hr style={{ opacity: 0.2, margin: "8px 0" }} />
            <T11SectionTitle>Languages</T11SectionTitle>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "14px",
                margin: 0,
              }}
            >
              {languages.map((l, i) => (
                <li key={i} style={{ textTransform: "capitalize" }}>
                  {l.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "14px",
              boxShadow: "0 1px 4px rgba(0,0,0,.08)",
              overflow: "hidden",
            }}
          >
            <T11SectionTitle>Job Experience</T11SectionTitle>
            <div
              style={{ paddingLeft: "10px", borderLeft: "1px solid #e5e7eb" }}
            >
              {experiences.map((exp, i) => (
                <T11TimelineItem
                  key={i}
                  title={`${exp.position} - ${exp.organization}`}
                  subtitle={[exp.industry, exp.location?.trim()]
                    .filter(Boolean)
                    .join(" / ")}
                  right={exp.dates}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: exp.responsibility,
                    }}
                    className="job-description"
                    style={{ margin: 0, paddingLeft: "14px" }}
                  />
                </T11TimelineItem>
              ))}
            </div>

            {/* Education table */}
            <div style={{ marginTop: "10px" }}>
              <T11SectionTitle>Education</T11SectionTitle>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr style={{ background: ORANGE, color: "#fff" }}>
                      {["Institution", "Course", "Period"].map((h) => (
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
                    {educations.map((ed, i) => (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 === 0 ? "#f8fafc" : "#fff",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <td style={{ padding: "5px 10px" }}>{ed.college}</td>
                        <td style={{ padding: "5px 10px" }}>{ed.course}</td>
                        <td style={{ padding: "5px 10px" }}>{ed.dates}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Referees */}
            {referees.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                <T11SectionTitle>Referees</T11SectionTitle>
                {referees.map((r, i) => (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                    <div style={{ color: "#6b7280" }}>
                      {r.position} • {r.company}
                    </div>
                    <div>{r.email}</div>
                    <div>{r.phone}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
