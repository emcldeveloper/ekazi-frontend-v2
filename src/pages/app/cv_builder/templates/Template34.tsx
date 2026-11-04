import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T34ChipProps {
  label?: string;
}

function T34Chip({ label }: T34ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#13a4a6",
        color: "#fff",
        padding: "3px 10px",
        margin: "2px",
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

interface T34ExpCardProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T34ExpCard({ item, isExperience }: T34ExpCardProps) {
  const BRAND = "#13a4a6";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div
      style={{
        marginBottom: "8px",
        background: "#fff",
        borderRadius: "5px",
        padding: "8px 12px",
        boxShadow: "0 2px 6px rgba(0,0,0,.06)",
      }}
    >
      <div style={{ fontWeight: "600", color: BRAND }}>{item?.dates}</div>
      <div style={{ fontWeight: "600" }}>{title}</div>
      <div style={{ color: "#555", marginBottom: "3px" }}>{org}</div>
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

interface Template34Profile {
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

interface Template34Props {
  profile: Template34Profile;
}

export default function Template34({ profile }: Template34Props) {
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
  const BRAND = "#13a4a6";

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
        color: "#222",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#f7f9fa",
        overflow: "hidden",
      }}
    >
      {/* Teal left-border header panel */}
      <div
        style={{
          borderLeft: `8px solid ${BRAND}`,
          background: "#fff",
          padding: "18px 20px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
              border: `5px solid ${BRAND}`,
              objectFit: "cover",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,.14)",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
            }
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: BRAND,
                marginBottom: "2px",
              }}
            >
              {fullName}
            </div>
            <div
              style={{
                fontWeight: "500",
                color: "#555",
                marginBottom: "6px",
              }}
            >
              {current_position}
            </div>
            <p
              style={{
                color: "#222",
                margin: 0,
              }}
            >
              {summary}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "8px",
                color: "#555",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <IconPhone /> {phone}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <IconMail /> {email}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <IconMapPin /> {location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 4fr",
          gap: "14px",
          padding: "14px 16px",
          height: "calc(100% - 130px)",
        }}
      >
        {/* Left — experience + education */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontWeight: "700",

              color: BRAND,
              borderBottom: `2px solid ${BRAND}`,
              paddingBottom: "3px",
              marginBottom: "10px",
            }}
          >
            Experience
          </div>
          {experiences.map((exp, i) => (
            <T34ExpCard key={i} item={exp} isExperience />
          ))}

          <div
            style={{
              fontWeight: "700",

              color: BRAND,
              borderBottom: `2px solid ${BRAND}`,
              paddingBottom: "3px",
              margin: "10px 0",
            }}
          >
            Education
          </div>
          {educations.map((edu, i) => (
            <T34ExpCard key={i} item={edu} isExperience={false} />
          ))}
        </div>

        {/* Right — skills, languages, culture, referees */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontWeight: "700",

              color: BRAND,
              borderBottom: `2px solid ${BRAND}`,
              paddingBottom: "3px",
              marginBottom: "6px",
            }}
          >
            Skills
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}
          >
            {[...knowledges, ...softwares].map((x, i) => (
              <T34Chip key={i} label={x?.name} />
            ))}
          </div>

          {languages.length > 0 && (
            <>
              <div
                style={{
                  fontWeight: "700",

                  color: BRAND,
                  borderBottom: `2px solid ${BRAND}`,
                  paddingBottom: "3px",
                  marginBottom: "6px",
                }}
              >
                Languages
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                {languages.map((l, i) => (
                  <T34Chip key={i} label={l?.name} />
                ))}
              </div>
            </>
          )}

          {(cultures.length > 0 ||
            personalities.length > 0 ||
            tools.length > 0) && (
            <>
              <div
                style={{
                  fontWeight: "700",

                  color: BRAND,
                  borderBottom: `2px solid ${BRAND}`,
                  paddingBottom: "3px",
                  marginBottom: "6px",
                }}
              >
                Culture & Personality
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                {[...cultures, ...personalities, ...tools].map((x, i) => (
                  <T34Chip key={i} label={x?.name} />
                ))}
              </div>
            </>
          )}

          {referees.length > 0 && (
            <>
              <div
                style={{
                  fontWeight: "700",
                  color: BRAND,
                  borderBottom: `2px solid ${BRAND}`,
                  paddingBottom: "3px",
                  marginBottom: "6px",
                }}
              >
                Referees
              </div>
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    background: "#fff",
                    borderRadius: "5px",
                    padding: "8px 10px",
                    boxShadow: "0 2px 5px rgba(0,0,0,.05)",
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
                  <div style={{ color: "#555" }}>{r.position}</div>
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
