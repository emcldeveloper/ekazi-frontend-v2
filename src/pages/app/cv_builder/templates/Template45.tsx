import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T45ContactItemProps {
  icon: ReactNode;
  label?: string;
  value: string;
}

function T45ContactItem({ icon, label, value }: T45ContactItemProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(255,255,255,.15)",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: ".2em",
            color: "rgba(255,255,255,.7)",
          }}
        >
          {label}
        </div>
        <div style={{ fontWeight: "500", color: "#fff" }}>{value}</div>
      </div>
    </div>
  );
}

interface T45SidebarSectionProps {
  title: string;
  children: ReactNode;
  color?: string;
  icon: ReactNode;
}

function T45SidebarSection({
  title,
  children,
  color,
  icon,
}: T45SidebarSectionProps) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: color,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontWeight: "600",
            color: "#1f2937",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      <div style={{ color: "#4b5563" }}>{children}</div>
    </div>
  );
}

interface T45MainSectionProps {
  title: string;
  children: ReactNode;
  color?: string;
  icon: ReactNode;
}

function T45MainSection({ title, children, color, icon }: T45MainSectionProps) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: color,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            flex: 1,
            background: "#f3f4f6",
            borderRadius: "999px",
            padding: "4px 12px",
          }}
        >
          <h3
            style={{
              fontWeight: "600",
              lineHeight: "tight",
              color: "#1f2937",
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>
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

interface Template45Profile {
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
  languages: NamedItem[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template45Props {
  profile: Template45Profile;
}

export default function Template45({ profile }: Template45Props) {
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
    languages,
    cultures,
    personalities,
    referees,
    profile: profileInfo,
  } = profile;
  const PRIMARY = "#ff8a00";
  const DARK = "#1f2937";
  const DARKER = "#111827";

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#374151",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Dark gradient header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${DARKER} 0%, ${DARK} 100%)`,
          padding: "16px 20px 0",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "16px",
            paddingBottom: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                overflow: "hidden",
                border: `6px solid ${PRIMARY}`,
                boxShadow: "0 10px 24px rgba(0,0,0,.26)",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/100x100?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/100x100?text=Photo")
                }
              />
            </div>
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div
              style={{
                textTransform: "uppercase",
                letterSpacing: ".2em",
                color: "rgba(255,255,255,.7)",
                marginBottom: "3px",
              }}
            >
              About Me
            </div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#fff",
                margin: "0 0 3px",
              }}
            >
              {fullName}
            </h1>
            <div
              style={{
                fontWeight: "400",
                color: PRIMARY,
                marginBottom: "8px",
              }}
            >
              {current_position}
            </div>
            <div
              style={{
                height: "2px",
                width: "100%",
                background: "rgba(255,255,255,.2)",
                marginBottom: "8px",
              }}
            >
              <div
                style={{ height: "100%", width: "100px", background: PRIMARY }}
              />
            </div>
            <p
              style={{
                color: "rgba(255,255,255,.8)",
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
        </div>

        {/* Contact bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            background: "rgba(255,255,255,.1)",
            borderTop: "1px solid rgba(255,255,255,.1)",
            padding: "8px 0",
          }}
        >
          {([
            [<IconPhone />, "Phone", phone],
            [<IconMail />, "Email", email],
            [<IconMapPin />, "Address", location],
          ] as [ReactNode, string, string][])
            .filter(([, , v]) => v)
            .map(([icon, label, val], i) => (
              <T45ContactItem key={i} icon={icon} label={label} value={val} />
            ))}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "calc(100% - 185px)",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            background: "#f5f5f5",
            padding: "14px 16px",
            overflow: "hidden",
          }}
        >
          {langList.length > 0 && (
            <T45SidebarSection title="Languages" color={PRIMARY} icon="🌐">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {langList.map((l, i) => (
                  <span
                    key={i}
                    style={{
                      border: "1px solid rgba(17,24,39,.12)",
                      background: "rgba(17,24,39,.06)",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      color: "#1f2937",
                      textTransform: "capitalize",
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </T45SidebarSection>
          )}

          {educations.length > 0 && (
            <T45SidebarSection title="Education" color={PRIMARY} icon="🎓">
              {educations.map((edu, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {edu?.level}
                  </div>
                  <div style={{ color: "#6b7280" }}>{edu?.college}</div>
                  <div style={{ color: "#9ca3af" }}>{edu?.dates}</div>
                </div>
              ))}
            </T45SidebarSection>
          )}

          {referees.length > 0 && (
            <T45SidebarSection title="References" color={PRIMARY} icon="👤">
              {referees.map((r, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {r?.fullName}
                  </div>
                  <div style={{ color: "#6b7280" }}>{r?.position}</div>
                  <div style={{ color: "#6b7280" }}>{r?.company}</div>
                  <div>{r?.phone}</div>
                  <div>{r?.email}</div>
                </div>
              ))}
            </T45SidebarSection>
          )}
        </div>

        {/* Right main */}
        <div
          style={{
            background: "#fff",
            padding: "14px 16px",
            overflow: "hidden",
          }}
        >
          {experiences.length > 0 && (
            <T45MainSection title="Experience" color={PRIMARY} icon="💼">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    marginBottom: "10px",
                    paddingLeft: "20px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "5px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: PRIMARY,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "4px",
                      top: "15px",
                      height: "calc(100% - 10px)",
                      width: "2px",
                      background: "rgba(229,231,235,.8)",
                    }}
                  />
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {exp?.position}
                    <span style={{ color: "#6b7280" }}>
                      {" "}
                      {exp?.organization}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#9ca3af",
                      marginBottom: "4px",
                    }}
                  >
                    {exp?.dates}
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
            </T45MainSection>
          )}

          {(skills.length > 0 ||
            swList.length > 0 ||
            cultList.length > 0 ||
            persList.length > 0) && (
            <T45MainSection title="Skills" color={PRIMARY} icon="🔧">
              {skills.length > 0 && (
                <div style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "4px",
                    }}
                  >
                    Skills
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "4px 10px",
                    }}
                  >
                    {skills.map((k, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          color: "#1f2937",
                        }}
                      >
                        <span style={{ color: PRIMARY }}>✓</span>
                        {k}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {swList.length > 0 && (
                <div style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "4px",
                    }}
                  >
                    Software
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                  >
                    {swList.map((s, i) => (
                      <span
                        key={i}
                        style={{
                          border: "1px solid rgba(17,24,39,.12)",
                          background: "rgba(17,24,39,.06)",
                          padding: "1px 6px",
                          borderRadius: "4px",
                          color: "#1f2937",
                          textTransform: "capitalize",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {cultList.length > 0 && (
                <div style={{ marginBottom: "8px" }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "4px",
                    }}
                  >
                    Culture Fit
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                  >
                    {cultList.map((c, i) => (
                      <span
                        key={i}
                        style={{
                          border: `1px solid ${PRIMARY}59`,
                          background: `${PRIMARY}1F`,
                          padding: "1px 6px",
                          borderRadius: "4px",
                          color: PRIMARY,
                          textTransform: "capitalize",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {persList.length > 0 && (
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "4px",
                    }}
                  >
                    Personality
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                  >
                    {persList.map((p, i) => (
                      <span
                        key={i}
                        style={{
                          border: "1px solid rgba(17,24,39,.12)",
                          background: "rgba(17,24,39,.06)",
                          padding: "1px 6px",
                          borderRadius: "4px",
                          color: "#1f2937",
                          textTransform: "capitalize",
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </T45MainSection>
          )}
        </div>
      </div>
    </div>
  );
}
