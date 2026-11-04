import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T26ContactTileProps {
  icon: ReactNode;
  value: string;
}

function T26ContactTile({ icon, value }: T26ContactTileProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        background: "rgba(255,255,255,.12)",
        border: "1px solid rgba(255,255,255,.22)",
        borderRadius: "10px",
        padding: "5px 8px",
      }}
    >
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <div
        style={{
          wordBreak: "break-word",
          overflow: "hidden",
        }}
      >
        {value}
      </div>
    </div>
  );
}

interface T26PanelProps {
  title: string;
  children: ReactNode;
}

function T26Panel({ title, children }: T26PanelProps) {
  const BRAND = "#312e81";
  return (
    <div
      style={{
        marginBottom: "10px",
        boxShadow: "0 1px 4px rgba(0,0,0,.07)",
        borderRadius: "12px",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 14px",
          background: "linear-gradient(90deg, rgba(49,46,129,.1), transparent)",
          borderBottom: "1px solid rgba(17,24,39,.05)",
          fontWeight: "700",
          color: BRAND,
        }}
      >
        {title}
      </div>
      <div style={{ padding: "10px 14px" }}>{children}</div>
    </div>
  );
}

interface T26TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T26TimelineItem({ item, isExperience }: T26TimelineItemProps) {
  const BRAND = "#312e81";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div style={{ position: "relative", marginBottom: "12px" }}>
      <div
        style={{
          position: "absolute",
          left: "-19px",
          top: "5px",
          width: "10px",
          height: "10px",
          background: "#fff",
          border: `4px solid ${BRAND}`,
          borderRadius: "50%",
          boxShadow: "0 6px 14px rgba(0,0,0,.1)",
        }}
      />
      <div
        style={{
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,.06)",
          borderRadius: "10px",
          padding: "8px 10px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontWeight: "600",
            background: BRAND,
            color: "#fff",
            padding: "1px 8px",
            borderRadius: "999px",
            marginBottom: "5px",
          }}
        >
          {item?.dates}
        </div>
        <div style={{ fontWeight: "700", color: BRAND }}>{title}</div>
        <div
          style={{
            color: "rgba(0,0,0,.55)",
            marginBottom: "4px",
          }}
        >
          {org}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: item.responsibility as string,
          }}
          className="job-description"
          style={{ margin: 0, paddingLeft: "14px", color: "rgba(0,0,0,.65)" }}
        />
      </div>
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface TimelineEntry {
  position?: string;
  level?: string;
  degree?: string;
  organization?: string;
  college?: string;
  institution?: string;
  dates?: string;
  responsibility?: string;
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

interface Template26Profile {
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
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template26Props {
  profile: Template26Profile;
}

export default function Template26({ profile }: Template26Props) {
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
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#312e81";

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
      {/* Indigo header with decorative circle + padded photo */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: BRAND,
          color: "#fff",
          padding: "16px 20px 14px",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-100px",
            width: "220px",
            height: "220px",
            background: "rgba(255,255,255,.08)",
            borderRadius: "50%",
            transform: "rotate(12deg)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              padding: "6px",
              width: "90px",
              height: "90px",
              borderRadius: "14px",
              background: "rgba(255,255,255,.12)",
              boxShadow: "0 10px 24px rgba(0,0,0,.16)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                border: "3px solid rgba(255,255,255,.8)",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/90x90?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/90x90?text=Photo")
                }
              />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "700",
                margin: "0 0 2px",
                lineHeight: 1.2,
              }}
            >
              {fullName}
            </h1>
            <div style={{ opacity: 0.88, marginBottom: "8px" }}>
              {current_position}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              <T26ContactTile icon={<IconPhone />} value={phone} />
              <T26ContactTile icon={<IconMail />} value={email} />
              <T26ContactTile icon={<IconMapPin />} value={location} />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 8fr",
            gap: "12px",
          }}
        >
          {/* Left */}
          <div>
            <T26Panel title="Biography">
              <p
                style={{
                  margin: 0,
                  color: "#374151",
                }}
              >
                {summary}
              </p>
            </T26Panel>

            {languages.length > 0 && (
              <T26Panel title="Languages">
                <ul
                  style={{ listStyle: "disc", paddingLeft: "14px", margin: 0 }}
                >
                  {languages.map((l, i) => (
                    <li key={i} style={{ marginBottom: "2px" }}>
                      {l?.name}
                    </li>
                  ))}
                </ul>
              </T26Panel>
            )}

            {(knowledges.length > 0 || softwares.length > 0) && (
              <T26Panel title="Skills">
                <ul
                  style={{ listStyle: "disc", paddingLeft: "14px", margin: 0 }}
                >
                  {[...knowledges, ...softwares].map((x, i) => (
                    <li key={i} style={{ marginBottom: "2px" }}>
                      {x?.name}
                    </li>
                  ))}
                </ul>
              </T26Panel>
            )}

            {cultures.length > 0 && (
              <T26Panel title="Culture">
                <ul
                  style={{ listStyle: "disc", paddingLeft: "14px", margin: 0 }}
                >
                  {cultures.map((x, i) => (
                    <li key={i} style={{ marginBottom: "2px" }}>
                      {x?.name}
                    </li>
                  ))}
                </ul>
              </T26Panel>
            )}
          </div>

          {/* Right */}
          <div>
            <T26Panel title="Experience">
              <div style={{ position: "relative", paddingLeft: "20px" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "4px",
                    top: "4px",
                    bottom: "4px",
                    width: "3px",
                    background: BRAND,
                    borderRadius: "999px",
                  }}
                />
                {experiences.map((exp, i) => (
                  <T26TimelineItem key={i} item={exp} isExperience />
                ))}
              </div>
            </T26Panel>

            <T26Panel title="Education">
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
                      {["Level / Degree", "Institution", "Period"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "5px 8px",
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
                        <td style={{ padding: "5px 8px" }}>
                          {edu.level || edu.degree}
                        </td>
                        <td style={{ padding: "5px 8px" }}>
                          {edu.college || edu.institution}
                        </td>
                        <td style={{ padding: "5px 8px" }}>{edu.dates}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </T26Panel>

            {referees.length > 0 && (
              <T26Panel title="Referees">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {referees.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        flex: "1 1 calc(33% - 4px)",
                        background: "#fff",
                        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                        borderRadius: "10px",
                        padding: "8px 10px",
                      }}
                    >
                      <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                      <div style={{ color: "#6b7280" }}>
                        {r.position} - {r.company}
                      </div>
                      <div>{r.phone}</div>
                      <div style={{ wordBreak: "break-all" }}>{r.email}</div>
                    </div>
                  ))}
                </div>
              </T26Panel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
