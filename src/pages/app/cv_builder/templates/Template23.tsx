import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T23ChipProps {
  label?: string | NamedItem;
  bg: string;
  color?: string;
}

function T23Chip({ label, bg, color = "#fff" }: T23ChipProps) {
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

interface T23SectionProps {
  title: string;
  children: ReactNode;
}

function T23Section({ title, children }: T23SectionProps) {
  const BRAND = "#ad5715";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "6px",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "16px",
            background: BRAND,
            borderRadius: "2px",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontWeight: "700",

            color: BRAND,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
      </div>
      {children}
    </div>
  );
}

interface T23TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T23TimelineItem({ item, isExperience }: T23TimelineItemProps) {
  const BRAND = "#ad5715";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,.07)",
        padding: "8px 10px",
        marginBottom: "8px",
      }}
    >
      <div style={{ fontWeight: "600", color: BRAND }}>{title}</div>
      {org ? (
        <div style={{ color: "#6b7280", marginBottom: "2px" }}>{org}</div>
      ) : null}
      <div style={{ color: "#6b7280", marginBottom: "3px" }}>{item?.dates}</div>
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

interface TimelineEntry {
  position?: string;
  organization?: string;
  level?: string;
  degree?: string;
  college?: string;
  institution?: string;
  dates?: string;
  responsibility?: string;
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

interface Template23Profile {
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

interface Template23Props {
  profile: Template23Profile;
}

export default function Template23({ profile }: Template23Props) {
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
  const BRAND = "#ad5715";

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
      {/* Burnt orange top bar + floating photo */}
      <div style={{ height: "120px", background: BRAND, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-60px",
            transform: "translateX(-50%)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "5px solid #fff",
            boxShadow: "0 6px 16px rgba(0,0,0,.25)",
          }}
        >
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/120x120?text=Photo"
            }
            alt="profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/120x120?text=Photo")
            }
          />
        </div>
      </div>

      {/* Name centred below photo */}
      <div
        style={{ marginTop: "70px", textAlign: "center", marginBottom: "12px" }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "22px",
            color: BRAND,
            margin: "0 0 2px",
          }}
        >
          {fullName}
        </h1>
        <div style={{ color: "#6b7280" }}>{current_position}</div>
      </div>

      {/* Body grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          gap: "12px",
          padding: "0 14px",
          height: "calc(100% - 230px)",
        }}
      >
        {/* Left */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              padding: "10px 12px",
              marginBottom: "10px",
            }}
          >
            <T23Section title="Contact">
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
            </T23Section>
          </div>

          {languages.length > 0 && (
            <div
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                padding: "10px 12px",
                marginBottom: "10px",
              }}
            >
              <T23Section title="Languages">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {languages.map((l, i) => (
                    <T23Chip key={i} label={l?.name} bg={BRAND} />
                  ))}
                </div>
              </T23Section>
            </div>
          )}

          {(knowledges.length > 0 || softwares.length > 0) && (
            <div
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                padding: "10px 12px",
                marginBottom: "10px",
              }}
            >
              <T23Section title="Skills">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {knowledges.map((x, i) => (
                    <T23Chip key={i} label={x?.name} bg="#6b7280" />
                  ))}
                  {softwares.map((x, i) => (
                    <T23Chip key={i} label={x?.name} bg="#212529" />
                  ))}
                </div>
              </T23Section>
            </div>
          )}

          {(cultures.length > 0 || personalities.length > 0) && (
            <div
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                padding: "10px 12px",
              }}
            >
              <T23Section title="Culture & Personality">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {cultures.map((x, i) => (
                    <T23Chip
                      key={i}
                      label={x?.name}
                      bg="#0dcaf0"
                      color="#000"
                    />
                  ))}
                  {personalities.map((x, i) => (
                    <T23Chip
                      key={i}
                      label={x?.name}
                      bg="#ffc107"
                      color="#000"
                    />
                  ))}
                </div>
              </T23Section>
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              padding: "10px 12px",
              marginBottom: "10px",
            }}
          >
            <T23Section title="Profile">
              <p
                style={{
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </T23Section>
          </div>

          <div
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              padding: "10px 12px",
              marginBottom: "10px",
            }}
          >
            <T23Section title="Experience">
              {experiences.map((exp, i) => (
                <T23TimelineItem key={i} item={exp} isExperience />
              ))}
            </T23Section>
          </div>

          <div
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              padding: "10px 12px",
              marginBottom: "10px",
            }}
          >
            <T23Section title="Education">
              {educations.map((edu, i) => (
                <T23TimelineItem key={i} item={edu} isExperience={false} />
              ))}
            </T23Section>
          </div>

          {referees.length > 0 && (
            <div
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                padding: "10px 12px",
              }}
            >
              <T23Section title="Referees">
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,.06)",
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
              </T23Section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
