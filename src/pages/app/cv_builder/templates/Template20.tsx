import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T20ChipProps {
  label?: string;
}

function T20Chip({ label }: T20ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#b62424",
        color: "#fff",

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

interface T20BulletListProps {
  items: NamedItem[];
}

function T20BulletList({ items }: T20BulletListProps) {
  if (!items?.length) return null;
  return (
    <ul style={{ paddingLeft: "14px", margin: 0 }}>
      {items.map((x, i) => (
        <li key={i} style={{ marginBottom: "2px", color: "#1f2937" }}>
          {x?.name}
        </li>
      ))}
    </ul>
  );
}

interface T20SkillBlockProps {
  title: string;
  children: ReactNode;
}

function T20SkillBlock({ title, children }: T20SkillBlockProps) {
  const BRAND = "#b62424";
  return (
    <div
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,.08)",
        padding: "10px 12px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontWeight: "700",

          color: BRAND,
          marginBottom: "5px",
        }}
      >
        ◆ {title}
      </div>
      {children}
    </div>
  );
}

interface T20SectionCardProps {
  title: string;
  children: ReactNode;
}

function T20SectionCard({ title, children }: T20SectionCardProps) {
  const BRAND = "#b62424";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          display: "inline-block",
          fontWeight: "700",

          color: BRAND,
          borderBottom: `2px solid ${BRAND}`,
          paddingBottom: "2px",
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

interface Template20Profile {
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

interface Template20Props {
  profile: Template20Profile;
}

export default function Template20({ profile }: Template20Props) {
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
  const BRAND = "#b62424";

  // Merge experiences and educations for the combined grid
  const expEduItems: TimelineEntry[] = [...(experiences || []), ...(educations || [])];

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
      {/* Red gradient header — diagonal clip */}
      <div
        style={{
          background: "linear-gradient(135deg, #b62424, #7d0f0f)",
          color: "#fff",
          padding: "20px 24px 28px",
          clipPath: "polygon(0 0,100% 0,100% 88%,0 100%)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "8fr 4fr",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div>
            <h1
              style={{ fontWeight: "700", fontSize: "22px", margin: "0 0 3px" }}
            >
              {fullName}
            </h1>
            <div
              style={{
                fontWeight: "300",
                marginBottom: "8px",
              }}
            >
              {current_position}
            </div>
            <p style={{ margin: 0 }}>{summary}</p>
          </div>
          {/* Diamond (rotated square) photo */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                width: "110px",
                height: "110px",
                transform: "rotate(45deg)",
                overflow: "hidden",
                border: "5px solid #fff",
                boxShadow: "0 4px 16px rgba(0,0,0,.25)",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/110x110?text=Photo"
                }
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "rotate(-45deg) scale(1.42)",
                  transformOrigin: "center",
                }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/110x110?text=Photo")
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          padding: "8px 16px",
          background: "#f9f9f9",
        }}
      >
        {[
          [<IconPhone />, phone],
          [<IconMail />, email],
          [<IconMapPin />, location],
        ].map(([icon, val], i) => (
          <span
            key={i}
            style={{
              background: "#fff",
              color: "#1f2937",
              borderRadius: "999px",
              padding: "4px 12px",
              boxShadow: "0 1px 3px rgba(0,0,0,.1)",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {icon} {val}
          </span>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "12px 18px" }}>
        {/* Languages */}
        {languages.length > 0 && (
          <T20SectionCard title="Languages">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {languages.map((l, i) => (
                <T20Chip key={i} label={l?.name} />
              ))}
            </div>
          </T20SectionCard>
        )}

        {/* Skills 4-col grid */}
        <T20SectionCard title="Skills & Traits">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "6px",
            }}
          >
            {([
              ["Knowledge", knowledges],
              ["Software", softwares],
              ["Culture", cultures],
              ["Personality", personalities],
            ] as [string, NamedItem[]][]).map(([label, items]) => (
              <T20SkillBlock key={label} title={label}>
                <T20BulletList items={items} />
              </T20SkillBlock>
            ))}
          </div>
        </T20SectionCard>

        {/* Exp + Edu merged grid */}
        <T20SectionCard title="Experience & Education">
          {expEduItems.length ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {expEduItems.map((item, i) => {
                const title =
                  item?.position || item?.level || item?.degree || "";
                const org = item?.organization || item?.college || "";
                return (
                  <div
                    key={i}
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                      padding: "8px 10px",
                      borderTop: `4px solid ${BRAND}`,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",

                        color: BRAND,
                      }}
                    >
                      {title}
                    </div>
                    {org && <div style={{ color: "#6b7280" }}>{org}</div>}
                    <div
                      style={{
                        color: "#6b7280",
                        marginBottom: "3px",
                      }}
                    >
                      {item?.dates}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.responsibility as string,
                      }}
                      className="job-description"
                      style={{ margin: 0, paddingLeft: "14px" }}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
        </T20SectionCard>

        {referees.length > 0 && (
          <T20SectionCard title="Referees">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                    padding: "8px 10px",
                  }}
                >
                  <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                  <div style={{ color: "#6b7280" }}>{r.position}</div>
                  <div>{r.company}</div>
                  <div>{r.phone}</div>
                  <div>{r.email}</div>
                </div>
              ))}
            </div>
          </T20SectionCard>
        )}
      </div>
    </div>
  );
}
