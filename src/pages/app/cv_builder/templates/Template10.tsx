import {
  OrangeSectionTitle,
  OrangeSideSection,
} from "./components/SectionHelpers";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface NamedItem {
  name?: string | null;
}

interface Experience {
  position?: string | null;
  organization?: string | null;
  industry?: string | null;
  location?: string | null;
  dates?: string | null;
  responsibility?: string | null;
}

interface Education {
  course?: string | null;
  college?: string | null;
  dates?: string | null;
}

interface Referee {
  fullName?: string | null;
  position?: string | null;
  company?: string | null;
  phone?: string | null;
  email?: string | null;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template10Profile {
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  summary?: string | null;
  objective?: string | null;
  experiences: Experience[];
  educations: Education[];
  knowledges: NamedItem[];
  softwares: NamedItem[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  tools: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile?: ProfileInfo | null;
}

interface Template10Props {
  profile: Template10Profile;
}

export default function Template10({ profile }: Template10Props) {
  const {
    fullName,

    email,
    phone,
    location,
    summary,
    objective,
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
  const BRAND = "#D36314";
  const BRAND_DARK = "#8B3A0F";
  const INK = "#1f2937";
  const PANEL = "#f8fafc";
  const DIVIDER = "rgba(0,0,0,.08)";
  return (
    <div
      style={{
        fontFamily: "Nunito, Helvetica Neue, sans-serif",
        lineHeight: "1.5",
        fontSize: "12px",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        color: INK,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          padding: "14px 20px 10px",
          borderBottom: `1px solid ${DIVIDER}`,
        }}
      >
        <div
          style={{
            height: "16px",
            borderRadius: "2px",
            background: BRAND,
            width: "120px",
          }}
        />
        <h1
          style={{
            margin: 0,
            fontWeight: "800",
            fontSize: "20px",
            color: INK,
            textAlign: "center",
            letterSpacing: ".2px",
          }}
        >
          {fullName}
        </h1>
        <div
          style={{
            height: "16px",
            borderRadius: "2px",
            background: BRAND,
            width: "130px",
          }}
        />
      </div>
      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 4fr",
          height: "calc(100% - 52px)",
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: "12px 18px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <OrangeSectionTitle title="Profile" brand={BRAND} divider={DIVIDER} />
          <p
            style={{
              color: "#6b7280",

              margin: "0 0 8px",
            }}
          >
            {summary}
          </p>
          {objective ? (
            <>
              <OrangeSectionTitle
                title="Career Objective"
                brand={BRAND}
                divider={DIVIDER}
              />
              <p
                style={{
                  color: "#6b7280",

                  margin: "0 0 8px",
                }}
              >
                {objective}
              </p>
            </>
          ) : null}
          <OrangeSectionTitle
            title="Job Experience"
            brand={BRAND}
            divider={DIVIDER}
          />
          {experiences.map((exp: Experience, i: number) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: "700",
                      textTransform: "capitalize",

                      color: BRAND_DARK,
                    }}
                  >
                    {exp.position}
                  </div>
                  <div style={{ color: "#6b7280" }}>
                    {exp.organization} / {exp.industry}
                  </div>
                  <div>{exp.location}</div>
                </div>
                <span
                  style={{
                    border: "1px solid #e5e7eb",

                    background: "#fff",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                >
                  {exp.dates}
                </span>
              </div>
              {exp.responsibility && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: exp.responsibility,
                  }}
                  className="job-description"
                  style={{ margin: 0, paddingLeft: "14px", color: "#6b7280" }}
                />
              )}
            </div>
          ))}
          <OrangeSectionTitle
            title="Skills & Endorsements"
            brand={BRAND}
            divider={DIVIDER}
          />
          {([
            ["Culture Fit", cultures],
            ["Personality", personalities],
            ["Software", softwares],
            ["Skills & Knowledge", knowledges],
          ] as [string, NamedItem[]][]).map(([label, items], i) => (
            <div key={i} style={{ marginBottom: "5px" }}>
              <div style={{ fontWeight: "600" }}>{label}</div>
              <div
                style={{
                  color: "#6b7280",
                  textTransform: "capitalize",
                }}
              >
                {items
                  ?.map((x: NamedItem) => x?.name)
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
          ))}
          <OrangeSectionTitle title="Tools" brand={BRAND} divider={DIVIDER} />
          <div
            style={{
              color: "#6b7280",
              textTransform: "capitalize",
              marginBottom: "10px",
            }}
          >
            {tools
              .map((t: NamedItem) => t.name)
              .filter(Boolean)
              .join(", ")}
          </div>
          {/* Referees box */}
          <div
            style={{
              background: PANEL,
              border: `1px solid ${DIVIDER}`,
              borderRadius: "10px",
              padding: "12px 14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: BRAND,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontWeight: "700",

                  color: BRAND_DARK,
                }}
              >
                Referees
              </span>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {referees.map((r: Referee, i: number) => (
                <div key={i}>
                  <div style={{ fontWeight: "600" }}>{r.fullName}</div>
                  <div style={{ color: "#6b7280" }}>{r.position}</div>
                  <div>{r.company}</div>
                  <div>{r.phone}</div>
                  <div>{r.email}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right */}
        <div
          style={{
            padding: "12px 16px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Photo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              marginBottom: "8px",
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/120x140?text=Photo"
              }
              alt="profile"
              style={{
                width: "110px",
                height: "130px",
                objectFit: "cover",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/120x140?text=Photo")
              }
            />
          </div>
          <OrangeSideSection
            title="Contact Details"
            brand={BRAND}
            divider={DIVIDER}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <IconMapPin />
                <span style={{ wordBreak: "break-all" }}>{location}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <IconPhone />
                <span>{phone}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <IconMail />
                <span style={{ wordBreak: "break-word" }}>{email}</span>
              </div>
            </div>
          </OrangeSideSection>
          <OrangeSideSection title="Languages" brand={BRAND} divider={DIVIDER}>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {languages.map((l: NamedItem, i: number) => (
                <li
                  key={i}
                  style={{ marginBottom: "3px", textTransform: "capitalize" }}
                >
                  {l.name}
                </li>
              ))}
            </ul>
          </OrangeSideSection>
          <OrangeSideSection title="Education" brand={BRAND} divider={DIVIDER}>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {educations.map((edu: Education, i: number) => (
                <li key={i} style={{ marginBottom: "6px" }}>
                  <div
                    style={{ fontWeight: "600", textTransform: "capitalize" }}
                  >
                    {edu.course}
                  </div>
                  <div
                    style={{ color: "#6b7280", textTransform: "capitalize" }}
                  >
                    {edu.college}
                  </div>
                  <div style={{ color: "#6b7280" }}>({edu.dates})</div>
                </li>
              ))}
            </ul>
          </OrangeSideSection>
        </div>
      </div>
    </div>
  );
}
