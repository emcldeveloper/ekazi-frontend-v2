import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T21ChipProps {
  label?: string | NamedItem;
  bg?: string;
  color?: string;
}

function T21Chip({ label, bg = "#007d84", color = "#fff" }: T21ChipProps) {
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

interface T21SectionProps {
  title: string;
  children: ReactNode;
}

function T21Section({ title, children }: T21SectionProps) {
  const BRAND = "#007d84";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          fontWeight: "700",
          color: BRAND,
          marginBottom: "6px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

interface T21TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T21TimelineItem({ item, isExperience }: T21TimelineItemProps) {
  const BRAND = "#007d84";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div
      style={{
        marginBottom: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,.07)",
        padding: "8px 10px",
      }}
    >
      <div style={{ fontWeight: "600", color: BRAND }}>{title}</div>
      {org ? (
        <div style={{ color: "#6b7280", marginBottom: "2px" }}>{org}</div>
      ) : null}
      <div style={{ color: "#6b7280" }}>{item?.dates}</div>
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

interface Template21Profile {
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

interface Template21Props {
  profile: Template21Profile;
}

export default function Template21({ profile }: Template21Props) {
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
  const BRAND = "#007d84";

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
      {/* Split header: photo left, name right */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "33%",
            background: BRAND,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px",
          }}
        >
          <img
            src={
              profileInfo?.picture
                ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                : "https://placehold.co/120x150?text=Photo"
            }
            alt="profile"
            style={{
              width: "120px",
              height: "150px",
              borderRadius: "12px",
              objectFit: "cover",
              border: "4px solid #fff",
              boxShadow: "0 4px 14px rgba(0,0,0,.25)",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/120x150?text=Photo")
            }
          />
        </div>
        <div
          style={{
            flex: 1,
            background: "#f8f9fa",
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "700",
              fontSize: "22px",
              color: BRAND,
              margin: "0 0 3px",
            }}
          >
            {fullName}
          </h1>
          <div style={{ fontWeight: "300", marginBottom: "8px" }}>
            {current_position}
          </div>
          <p
            style={{
              color: "#6b7280",
              margin: 0,
            }}
          >
            {summary}
          </p>
        </div>
      </div>

      {/* Body with thin teal left accent strip */}
      <div style={{ display: "flex" }}>
        <div style={{ width: "8px", background: BRAND, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: "12px 14px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 8fr",
              gap: "14px",
            }}
          >
            {/* Left */}
            <div>
              <T21Section title="Contact">
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
              </T21Section>

              {languages.length > 0 && (
                <T21Section title="Languages">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {languages.map((l, i) => (
                      <T21Chip key={i} label={l?.name} bg={BRAND} />
                    ))}
                  </div>
                </T21Section>
              )}

              <T21Section title="Skills">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {knowledges.map((x, i) => (
                    <T21Chip key={i} label={x?.name} bg="#6b7280" />
                  ))}
                  {softwares.map((x, i) => (
                    <T21Chip key={i} label={x?.name} bg="#212529" />
                  ))}
                </div>
              </T21Section>

              {(cultures.length > 0 || personalities.length > 0) && (
                <T21Section title="Culture & Personality">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {cultures.map((x, i) => (
                      <T21Chip
                        key={i}
                        label={x?.name}
                        bg="#0dcaf0"
                        color="#000"
                      />
                    ))}
                    {personalities.map((x, i) => (
                      <T21Chip
                        key={i}
                        label={x?.name}
                        bg="#ffc107"
                        color="#000"
                      />
                    ))}
                  </div>
                </T21Section>
              )}
            </div>

            {/* Right */}
            <div>
              <T21Section title="Experience">
                {experiences.map((exp, i) => (
                  <T21TimelineItem key={i} item={exp} isExperience />
                ))}
              </T21Section>

              <T21Section title="Education">
                {educations.map((edu, i) => (
                  <T21TimelineItem key={i} item={edu} isExperience={false} />
                ))}
              </T21Section>

              {referees.length > 0 && (
                <T21Section title="Referees">
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
                </T21Section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
