import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

const BLUE = "#4a90a4";

interface T70BulletDotProps {
  label?: string;
}

function T70BulletDot({ label }: T70BulletDotProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: BLUE,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".05em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

interface T70BubbleCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

function T70BubbleCard({ icon, title, children }: T70BubbleCardProps) {
  return (
    <div
      style={{ position: "relative", paddingTop: "16px", marginBottom: "12px" }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          borderRadius: "999px",
          background: BLUE,
          padding: "4px 16px",
          color: "#fff",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 6px rgba(0,0,0,.12)",
        }}
      >
        <span>{icon}</span>
        <h2
          style={{
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: ".1em",
            margin: 0,
          }}
        >
          {title}:
        </h2>
      </div>
      <div
        style={{
          background: "#e9edf0",
          borderRadius: "16px",
          padding: "20px 14px 12px",
        }}
      >
        {children}
      </div>
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
  college: string;
  level: string;
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

interface Template70Profile {
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

interface Template70Props {
  profile: Template70Profile;
}

export default function Template70({ profile }: Template70Props) {
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

  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
        color: "#333",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "#f0f2f5",
          padding: "16px 18px",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "6px solid #fff",
              boxShadow: "0 4px 12px rgba(0,0,0,.12)",
              zIndex: 10,
              position: "relative",
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
        <div style={{ flex: 1 }}>
          {firstName && (
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "900",
                textTransform: "uppercase",
                lineHeight: "none",
                letterSpacing: "tight",
                color: "#333",
                margin: "0 0 1px",
              }}
            >
              {firstName}
            </h1>
          )}
          {lastName && (
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "300",
                textTransform: "uppercase",
                lineHeight: "none",
                letterSpacing: "tight",
                color: BLUE,
                margin: "0 0 3px",
              }}
            >
              {lastName}
            </h2>
          )}
          {current_position && (
            <p
              style={{
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: ".2em",
                color: "#9ca3af",
                margin: "0 0 8px",
              }}
            >
              {current_position}
            </p>
          )}
          <div
            style={{
              height: "3px",
              width: "80px",
              background: BLUE,
              marginBottom: "8px",
            }}
          />
          {/* Contact tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px",
            }}
          >
            {[
              [<IconPhone />, "Phone", phone],
              [<IconMapPin />, "Address", location],
              [<IconMail />, "Email", email],
            ]
              .filter(([, , v]) => v)
              .map(([icon, label, val], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: BLUE,
                    borderRadius: "8px",
                    padding: "5px 8px",
                    color: "#fff",
                  }}
                >
                  {icon}
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: "700",
                        textTransform: "uppercase",
                        opacity: 0.8,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontWeight: "500",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {val}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Body — 2-col bubble cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 16px",
          padding: "8px 16px 60px",
          overflow: "hidden",
        }}
      >
        {/* Left */}
        <div>
          {summary && (
            <T70BubbleCard icon="👤" title="About Me">
              <p
                style={{
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                {summary}
              </p>
            </T70BubbleCard>
          )}
          {skills.length > 0 && (
            <T70BubbleCard icon="⚙️" title="Skills">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {skills.map((s, i) => (
                  <T70BulletDot key={i} label={s} />
                ))}
              </div>
            </T70BubbleCard>
          )}
          {langList.length > 0 && (
            <T70BubbleCard icon="🌐" title="Languages">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {langList.map((l, i) => (
                  <T70BulletDot key={i} label={l} />
                ))}
              </div>
            </T70BubbleCard>
          )}
          {cultList.length > 0 && (
            <T70BubbleCard icon="❤️" title="Culture Fit">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {cultList.map((c, i) => (
                  <T70BulletDot key={i} label={c} />
                ))}
              </div>
            </T70BubbleCard>
          )}
          {referees.length > 0 && (
            <T70BubbleCard icon="👥" title="References">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {referees.map((r, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    {r?.fullName && (
                      <h3
                        style={{
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: "#333",
                          margin: "0 0 1px",
                        }}
                      >
                        {r.fullName}
                      </h3>
                    )}
                    {[r?.position, r?.company].filter(Boolean).join(" / ") && (
                      <p
                        style={{
                          fontWeight: "700",
                          fontStyle: "italic",
                          color: "#6b7280",
                          margin: "0 0 2px",
                        }}
                      >
                        {[r?.position, r?.company].filter(Boolean).join(" / ")}
                      </p>
                    )}
                    {r?.phone && (
                      <p
                        style={{
                          fontWeight: "700",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        Tel: {r.phone}
                      </p>
                    )}
                    {r?.email && (
                      <p
                        style={{
                          fontWeight: "700",
                          color: "#6b7280",
                          margin: 0,
                          wordBreak: "break-all",
                        }}
                      >
                        Email: {r.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </T70BubbleCard>
          )}
        </div>

        {/* Right */}
        <div>
          {educations.length > 0 && (
            <T70BubbleCard icon="🎓" title="Education">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {educations.map((edu, i) => (
                  <div key={i} style={{ textAlign: "left" }}>
                    {edu?.college && (
                      <h3
                        style={{
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: "#333",
                          margin: "0 0 1px",
                        }}
                      >
                        {edu.college}
                      </h3>
                    )}
                    {(edu?.level || edu?.dates) && (
                      <p
                        style={{
                          fontWeight: "700",
                          fontStyle: "italic",
                          color: "#6b7280",
                          margin: 0,
                        }}
                      >
                        {edu?.level}
                        {edu?.level && edu?.dates ? (
                          <span style={{ color: BLUE, marginLeft: "6px" }}>
                            {edu.dates}
                          </span>
                        ) : edu?.dates ? (
                          <span style={{ color: BLUE }}>{edu.dates}</span>
                        ) : null}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </T70BubbleCard>
          )}
          {experiences.length > 0 && (
            <T70BubbleCard icon="💼" title="Job Experience">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {experiences.map((exp, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    {exp?.position && (
                      <h3
                        style={{
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: "#333",
                          margin: "0 0 1px",
                        }}
                      >
                        {exp.position}
                      </h3>
                    )}
                    {(exp?.organization || exp?.dates) && (
                      <p
                        style={{
                          fontWeight: "700",
                          fontStyle: "italic",
                          color: "#6b7280",
                          margin: "0 0 3px",
                        }}
                      >
                        {exp?.organization}
                        {exp?.organization && exp?.dates ? (
                          <span style={{ color: BLUE, marginLeft: "6px" }}>
                            {exp.dates}
                          </span>
                        ) : exp?.dates ? (
                          <span style={{ color: BLUE }}>{exp.dates}</span>
                        ) : null}
                      </p>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: exp.responsibility,
                      }}
                      className="job-description"
                      style={{
                        margin: 0,
                        paddingLeft: "14px",
                        color: "#374151",
                      }}
                    />
                  </div>
                ))}
              </div>
            </T70BubbleCard>
          )}
          {swList.length > 0 && (
            <T70BubbleCard icon="💻" title="Software">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {swList.map((s, i) => (
                  <T70BulletDot key={i} label={s} />
                ))}
              </div>
            </T70BubbleCard>
          )}
          {persList.length > 0 && (
            <T70BubbleCard icon="✨" title="Personality">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {persList.map((p, i) => (
                  <T70BulletDot key={i} label={p} />
                ))}
              </div>
            </T70BubbleCard>
          )}
        </div>
      </div>
    </div>
  );
}
