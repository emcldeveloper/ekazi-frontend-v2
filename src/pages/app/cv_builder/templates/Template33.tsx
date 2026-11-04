import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T33ChipProps {
  label?: string;
}

function T33Chip({ label }: T33ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#146990",
        color: "#fff",
        padding: "3px 8px",
        margin: "2px",
        borderRadius: "6px",
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

interface T33ContactItemProps {
  icon: ReactNode;
  value: string;
}

function T33ContactItem({ icon, value }: T33ContactItemProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        marginBottom: "10px",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          borderRadius: "8px",
          border: "1px solid rgba(20,105,144,.25)",
          background: "rgba(20,105,144,.08)",
          color: "#146990",
        }}
      >
        {icon}
      </span>
      <div style={{ wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

interface T33ExpCardProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T33ExpCard({ item, isExperience }: T33ExpCardProps) {
  const BRAND = "#146990";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div
      style={{
        marginBottom: "8px",
        borderRadius: "18px",
        borderLeft: `5px solid ${BRAND}`,
        background: "#fff",
        padding: "8px 12px",
        boxShadow: "0 4px 14px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          fontWeight: "600",
          color: BRAND,
          marginBottom: "2px",
        }}
      >
        {item?.dates}
      </div>
      <div style={{ fontWeight: "700", color: BRAND }}>{title}</div>
      <div
        style={{
          fontStyle: "italic",
          color: "#6c7a84",
          marginBottom: "3px",
        }}
      >
        {org}
      </div>
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

interface Template33Profile {
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
  tools: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template33Props {
  profile: Template33Profile;
}

export default function Template33({ profile }: Template33Props) {
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
    tools,
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const BRAND = "#146990";
  const GOLD = "#d4af37";

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#1f2a33",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#f6f8f9",
        overflow: "hidden",
        borderRadius: "4px",
      }}
    >
      {/* Deep teal curved header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(135deg, ${BRAND}, #0f4d5d)`,
          color: "#fff",
          padding: "20px 24px 40px",
          borderRadius: "0 0 60px 60px",
          textAlign: "center",
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
            border: `5px solid ${GOLD}`,
            objectFit: "cover",
            boxShadow: "0 5px 18px rgba(0,0,0,.28)",
            marginBottom: "10px",
          }}
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/100x100?text=Photo")
          }
        />
        <div style={{ fontSize: "22px", fontWeight: "700" }}>{fullName}</div>
        <div style={{ opacity: 0.9, marginBottom: "6px" }}>
          {current_position}
        </div>
        <p
          style={{
            opacity: 0.95,
            margin: 0,
            maxWidth: "500px",
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
          gap: "12px",
          padding: "14px 14px",
          height: "calc(100% - 200px)",
        }}
      >
        {/* Left */}
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "14px",
            boxShadow: "0 8px 20px rgba(0,0,0,.05)",
            overflow: "hidden",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontWeight: "700",

                color: BRAND,
                borderBottom: `2px solid ${GOLD}`,
                paddingBottom: "3px",
                marginBottom: "8px",
              }}
            >
              Contact
            </div>
            <T33ContactItem icon={<IconPhone />} value={phone} />
            <T33ContactItem icon={<IconMail />} value={email} />
            <T33ContactItem icon={<IconMapPin />} value={location} />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontWeight: "700",

                color: BRAND,
                borderBottom: `2px solid ${GOLD}`,
                paddingBottom: "3px",
                marginBottom: "6px",
              }}
            >
              Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[...knowledges, ...softwares].map((x, i) => (
                <T33Chip key={i} label={x?.name} />
              ))}
            </div>
          </div>

          {languages.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontWeight: "700",

                  color: BRAND,
                  borderBottom: `2px solid ${GOLD}`,
                  paddingBottom: "3px",
                  marginBottom: "6px",
                }}
              >
                Languages
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {languages.map((l, i) => (
                  <T33Chip key={i} label={l?.name} />
                ))}
              </div>
            </div>
          )}

          {(cultures.length > 0 ||
            personalities.length > 0 ||
            tools.length > 0) && (
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontWeight: "700",
                  color: BRAND,
                  borderBottom: `2px solid ${GOLD}`,
                  paddingBottom: "3px",
                  marginBottom: "6px",
                }}
              >
                Culture & Personality
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {[...cultures, ...personalities, ...tools].map((x, i) => (
                  <T33Chip key={i} label={x?.name} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: "700",

              color: BRAND,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: "3px",
              marginBottom: "10px",
            }}
          >
            Experience
          </div>
          {experiences.map((exp, i) => (
            <T33ExpCard key={i} item={exp} isExperience />
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: "700",
              color: BRAND,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: "3px",
              margin: "10px 0",
            }}
          >
            Education
          </div>
          {educations.map((edu, i) => (
            <T33ExpCard key={i} item={edu} isExperience={false} />
          ))}

          {referees.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontWeight: "700",

                  color: BRAND,
                  borderBottom: `2px solid ${GOLD}`,
                  paddingBottom: "3px",
                  margin: "10px 0",
                }}
              >
                Referees
              </div>
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    borderRadius: "18px",
                    borderLeft: `5px solid ${BRAND}`,
                    background: "#fff",
                    padding: "8px 12px",
                    boxShadow: "0 4px 14px rgba(0,0,0,.05)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "700",

                      color: BRAND,
                    }}
                  >
                    {r.fullName}
                  </div>
                  <div
                    style={{
                      fontStyle: "italic",
                      color: "#6c7a84",
                    }}
                  >
                    {r.position}
                  </div>
                  <div>{r.company}</div>
                  <div>{r.phone}</div>
                  <div style={{ wordBreak: "break-all" }}>{r.email}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
