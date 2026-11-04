import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T31ChipProps {
  label?: string;
}

function T31Chip({ label }: T31ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#cf470c",
        color: "#fff",
        padding: "3px 10px",
        margin: "3px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        fontWeight: "500",
      }}
    >
      {label}
    </span>
  );
}

interface T31SectionProps {
  title: string;
  children: ReactNode;
}

function T31Section({ title, children }: T31SectionProps) {
  const BRAND = "#cf470c";
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderLeft: `5px solid ${BRAND}`,
          paddingLeft: "8px",
          marginBottom: "8px",
        }}
      >
        <span style={{ fontWeight: "600", color: BRAND }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

interface T31TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T31TimelineItem({ item, isExperience }: T31TimelineItemProps) {
  const BRAND = "#cf470c";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div style={{ position: "relative", marginBottom: "14px" }}>
      <span
        style={{
          position: "absolute",
          left: "-17px",
          top: "5px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: BRAND,
        }}
      />
      <div
        style={{
          fontWeight: "500",
          color: BRAND,
          marginBottom: "2px",
        }}
      >
        {item?.dates}
      </div>
      <div style={{ fontWeight: "600" }}>{title}</div>
      <div style={{ fontStyle: "italic", color: "#555" }}>{org}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: item.responsibility as string,
        }}
        className="job-description"
        style={{ margin: 0, paddingLeft: "14px" }}
      />
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

interface Template31Profile {
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

interface Template31Props {
  profile: Template31Profile;
}

export default function Template31({ profile }: Template31Props) {
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
  const BRAND = "#cf470c";

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#222",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Gradient banner header with rectangular photo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          borderBottom: `4px solid ${BRAND}`,
          background: "linear-gradient(90deg, rgba(207,71,12,.08), #fdfdfd)",
          padding: "16px 24px 14px",
        }}
      >
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
            borderRadius: "10px",
            border: `3px solid ${BRAND}`,
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0,0,0,.18)",
            flexShrink: 0,
          }}
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
          }
        />
        <div>
          <div
            style={{ fontSize: "22px", fontWeight: "700", marginBottom: "2px" }}
          >
            {fullName}
          </div>
          <div
            style={{
              fontWeight: "500",
              color: BRAND,
              marginBottom: "5px",
            }}
          >
            {current_position}
          </div>
          <p
            style={{
              color: "#444",
              margin: 0,
              maxWidth: "520px",
            }}
          >
            {summary}
          </p>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 4fr",
          gap: "14px",
          padding: "14px 16px",
          height: "calc(100% - 120px)",
        }}
      >
        {/* Left — experience, education, referees */}
        <div style={{ overflow: "hidden" }}>
          <T31Section title="Experience">
            <div
              style={{
                position: "relative",
                borderLeft: `2px solid rgba(207,71,12,.2)`,
                paddingLeft: "16px",
              }}
            >
              {experiences.map((exp, i) => (
                <T31TimelineItem key={i} item={exp} isExperience />
              ))}
            </div>
          </T31Section>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eee",
              margin: "10px 0",
            }}
          />

          <T31Section title="Education">
            <div
              style={{
                position: "relative",
                borderLeft: `2px solid rgba(207,71,12,.2)`,
                paddingLeft: "16px",
              }}
            >
              {educations.map((edu, i) => (
                <T31TimelineItem key={i} item={edu} isExperience={false} />
              ))}
            </div>
          </T31Section>

          {referees.length > 0 && (
            <>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #eee",
                  margin: "10px 0",
                }}
              />
              <T31Section title="Referees">
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "8px",
                      borderLeft: `3px solid ${BRAND}`,
                      paddingLeft: "8px",
                    }}
                  >
                    <div style={{ fontWeight: "600" }}>
                      {r.fullName}
                    </div>
                    <div style={{  color: "#6b7280" }}>
                      {r.position}
                    </div>
                    <div >{r.company}</div>
                    <div >{r.phone}</div>
                    <div style={{  wordBreak: "break-all" }}>
                      {r.email}
                    </div>
                  </div>
                ))}
              </T31Section>
            </>
          )}
        </div>

        {/* Right — contact, skills, languages, culture */}
        <div style={{ overflow: "hidden" }}>
          <T31Section title="Contact">
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
                }}
              >
                {icon}
                <span style={{ wordBreak: "break-all" }}>{val}</span>
              </div>
            ))}
          </T31Section>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eee",
              margin: "8px 0",
            }}
          />

          <T31Section title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[...knowledges, ...softwares].map((x, i) => (
                <T31Chip key={i} label={x?.name} />
              ))}
            </div>
          </T31Section>

          {languages.length > 0 && (
            <>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #eee",
                  margin: "8px 0",
                }}
              />
              <T31Section title="Languages">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {languages.map((l, i) => (
                    <T31Chip key={i} label={l?.name} />
                  ))}
                </div>
              </T31Section>
            </>
          )}

          {(cultures.length > 0 || personalities.length > 0) && (
            <>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #eee",
                  margin: "8px 0",
                }}
              />
              <T31Section title="Culture & Personality">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {[...cultures, ...personalities].map((x, i) => (
                    <T31Chip key={i} label={x?.name} />
                  ))}
                </div>
              </T31Section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
