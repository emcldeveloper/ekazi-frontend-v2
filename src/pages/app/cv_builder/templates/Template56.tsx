import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

// Inline SVG checkmark circle to replace IoMdCheckmarkCircle
function CheckCircle() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 512 512"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm-40 325L116 273l38-38 62 62 138-138 38 38L216 373z" />
    </svg>
  );
}

interface T56SidebarSectionProps {
  title: string;
  children: ReactNode;
  ribbonColor: string;
}

function T56SidebarSection({
  title,
  children,
  ribbonColor,
}: T56SidebarSectionProps) {
  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <div style={{ position: "relative", margin: "0 -14px 12px", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            background: ribbonColor,
            boxShadow: "0 2px 6px rgba(0,0,0,.15)",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: ".2em",
              color: "#fff",
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            width: 0,
            height: 0,
            borderLeft: `12px solid ${ribbonColor}`,
            borderBottom: "12px solid transparent",
            filter: "brightness(.7)",
          }}
        />
      </div>
      <div style={{ paddingLeft: "4px" }}>{children}</div>
    </div>
  );
}

interface T56MainSectionProps {
  title: string;
  children: ReactNode;
  color?: string;
}

function T56MainSection({ title, children, color }: T56MainSectionProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
        }}
      >
        <h3
          style={{
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: ".2em",
            color: "#374151",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h3>
        <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
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
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template56Profile {
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

interface Template56Props {
  profile: Template56Profile;
}

export default function Template56({ profile }: Template56Props) {
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
  const TEAL = "#46a1c0";
  const DARK = "#4b4e5d";
  const RIBBON = "#3a3d4a";
  const TEXT = "#374151";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const restName = nameParts.slice(1).join(" ");

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
        color: TEXT,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Dark header */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            background: DARK,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                position: "relative",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid rgba(255,255,255,.2)",
                boxShadow: "0 4px 14px rgba(0,0,0,.3)",
                flexShrink: 0,
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/70x70?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/70x70?text=Photo")
                }
              />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                {firstName}{" "}
                <span style={{ fontWeight: "300" }}>{restName}</span>
              </h1>
              <p
                style={{
                  fontWeight: "300",
                  letterSpacing: ".2em",
                  color: "#d1d5db",
                  margin: "2px 0 0",
                }}
              >
                {current_position}
              </p>
            </div>
          </div>
          {/* Contact right-aligned */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              textAlign: "right",
            }}
          >
            {[[phone], [email], [location]]
              .filter(([v]) => v)
              .map(([val], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "6px",

                    color: "#d1d5db",
                  }}
                >
                  <span>{val}</span>
                  <div
                    style={{
                      borderRadius: "2px",
                      background: TEAL,
                      padding: "3px 4px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {i === 0 ? (
                      <IconPhone />
                    ) : i === 1 ? (
                      <IconMail />
                    ) : (
                      <IconMapPin />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Wave SVG */}
        <svg
          viewBox="0 0 500 40"
          preserveAspectRatio="none"
          style={{ height: "40px", width: "100%", display: "block" }}
        >
          <path
            d="M0.00,12 C150,40 350,-12 500,12 L500,40 L0,40 Z"
            style={{ stroke: "none", fill: TEAL }}
          />
        </svg>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "calc(100% - 110px)",
        }}
      >
        {/* Teal sidebar */}
        <div
          style={{
            background: TEAL,
            padding: "14px 14px 60px",
            color: "#fff",
            overflow: "hidden",
          }}
        >
          {summary && (
            <T56SidebarSection title="Profile" ribbonColor={RIBBON}>
              <p
                style={{
                  color: "#f0fdff",
                  opacity: 0.9,
                }}
              >
                {summary}
              </p>
            </T56SidebarSection>
          )}
          {skills.length > 0 && (
            <T56SidebarSection title="Skills" ribbonColor={RIBBON}>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {skills.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "5px",

                      color: "#f0fdff",
                    }}
                  >
                    <span style={{ color: "#fff", marginTop: "1px" }}>
                      <CheckCircle />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </T56SidebarSection>
          )}
          {langList.length > 0 && (
            <T56SidebarSection title="Languages" ribbonColor={RIBBON}>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {langList.map((l, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "5px",

                      color: "#f0fdff",
                    }}
                  >
                    <CheckCircle />
                    {l}
                  </li>
                ))}
              </ul>
            </T56SidebarSection>
          )}
          {swList.length > 0 && (
            <T56SidebarSection title="Software" ribbonColor={RIBBON}>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {swList.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "5px",

                      color: "#f0fdff",
                    }}
                  >
                    <CheckCircle />
                    {s}
                  </li>
                ))}
              </ul>
            </T56SidebarSection>
          )}
          {cultList.length > 0 && (
            <T56SidebarSection title="Culture Fit" ribbonColor={RIBBON}>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {cultList.map((c, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "5px",

                      color: "#f0fdff",
                    }}
                  >
                    <CheckCircle />
                    {c}
                  </li>
                ))}
              </ul>
            </T56SidebarSection>
          )}
          {persList.length > 0 && (
            <T56SidebarSection title="Personality" ribbonColor={RIBBON}>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {persList.map((p, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "5px",

                      color: "#f0fdff",
                    }}
                  >
                    <CheckCircle />
                    {p}
                  </li>
                ))}
              </ul>
            </T56SidebarSection>
          )}
        </div>

        {/* Main */}
        <div
          style={{
            background: "#fff",
            padding: "14px 18px 60px",
            overflow: "hidden",
          }}
        >
          {experiences.length > 0 && (
            <T56MainSection title="Job Experiences" color={TEAL}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <h4
                      style={{
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                        color: "#374151",
                        margin: "0 0 2px",
                      }}
                    >
                      {exp?.position}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",

                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      {exp?.organization && (
                        <span style={{ fontWeight: "500", color: "#374151" }}>
                          {exp.organization}
                        </span>
                      )}
                      {exp?.organization && exp?.dates && <span>/</span>}
                      {exp?.dates && <span>{exp.dates}</span>}
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
              </div>
            </T56MainSection>
          )}

          {educations.length > 0 && (
            <T56MainSection title="Education" color={TEAL}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {educations.map((edu, i) => (
                  <div key={i}>
                    <h4
                      style={{
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                        color: "#374151",
                        margin: "0 0 1px",
                      }}
                    >
                      {edu?.level}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",

                        color: "#6b7280",
                      }}
                    >
                      {edu?.college && (
                        <span style={{ fontWeight: "500", color: "#374151" }}>
                          {edu.college}
                        </span>
                      )}
                      {edu?.college && edu?.dates && <span>/</span>}
                      {edu?.dates && <span>{edu.dates}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </T56MainSection>
          )}

          {referees.length > 0 && (
            <T56MainSection title="References" color={TEAL}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {referees.map((r, i) => (
                  <div key={i}>
                    <h4
                      style={{
                        fontWeight: "700",
                        textTransform: "uppercase",
                        color: "#374151",
                        margin: "0 0 2px",
                      }}
                    >
                      {r?.fullName}
                    </h4>
                    {r?.company && (
                      <p
                        style={{
                          fontStyle: "italic",
                          color: "#6b7280",
                          margin: "0 0 1px",
                        }}
                      >
                        {r.company}
                      </p>
                    )}
                    {r?.position && (
                      <p style={{ color: "#6b7280", margin: "0 0 4px" }}>
                        {r.position}
                      </p>
                    )}
                    {r?.phone && (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginBottom: "1px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "700",
                            textTransform: "uppercase",

                            width: "36px",
                          }}
                        >
                          Phone
                        </span>
                        <span>: {r.phone}</span>
                      </div>
                    )}
                    {r?.email && (
                      <div style={{ display: "flex", gap: "5px" }}>
                        <span
                          style={{
                            fontWeight: "700",
                            textTransform: "uppercase",

                            width: "36px",
                          }}
                        >
                          Email
                        </span>
                        <span style={{ wordBreak: "break-all" }}>
                          : {r.email}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </T56MainSection>
          )}
        </div>
      </div>
    </div>
  );
}
