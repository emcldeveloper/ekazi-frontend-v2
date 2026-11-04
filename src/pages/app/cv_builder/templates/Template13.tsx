import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T13TimelineItemProps {
  title: string;
  meta?: string;
  period?: string;
  bullets?: string[];
}

function T13TimelineItem({ title, meta, period, bullets }: T13TimelineItemProps) {
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "14px",
        paddingLeft: "24px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "4px",
          top: 0,
          bottom: "-14px",
          width: "2px",
          background:
            "linear-gradient(to bottom, #dc2626, rgba(220,38,38,.15))",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "0",
          top: "6px",
          width: "10px",
          height: "10px",
          background: "#dc2626",
          border: "2px solid #fff",
          borderRadius: "50%",
          boxShadow: "0 0 0 3px rgba(220,38,38,.2)",
        }}
      />
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(220,38,38,.2)",
          borderRadius: "6px",
          padding: "8px 10px",
          boxShadow: "0 1px 3px rgba(0,0,0,.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: "700",
                fontSize: "10.5px",
                color: "#dc2626",
              }}
            >
              {title}
            </div>
            {meta && (
              <div style={{ fontSize: "10px", color: "#6b7280" }}>{meta}</div>
            )}
          </div>
          {period && (
            <span
              style={{
                flexShrink: 0,
                border: "1px solid #e5e7eb",
                fontSize: "9px",
                padding: "2px 5px",
                borderRadius: "4px",
                background: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              {period}
            </span>
          )}
        </div>
        {bullets?.length ? (
          <ul
            style={{
              listStyle: "disc",
              paddingLeft: "14px",
              margin: 0,
              fontSize: "10px",
              color: "#6b7280",
            }}
          >
            {bullets.map((b, i) => (
              <li key={i} style={{ lineHeight: "1.5" }}>
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface T13ChipsProps {
  items: NamedItem[];
  color?: string;
}

function T13Chips({ items, color = "#dc2626" }: T13ChipsProps) {
  if (!items?.length)
    return <span style={{ color: "#9ca3af", fontSize: "10px" }}>—</span>;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        marginTop: "3px",
      }}
    >
      {items.map((x, i) => (
        <span
          key={i}
          style={{
            padding: "2px 8px",
            fontSize: "9.5px",
            textTransform: "capitalize",
            borderRadius: "20px",
            border: `1px solid ${color}40`,
            background: `${color}18`,
            color,
          }}
        >
          {x?.name}
        </span>
      ))}
    </div>
  );
}

interface Experience {
  position: string;
  organization: string;
  industry: string;
  location: string;
  dates: string;
  responsibility: string[];
}

interface Education {
  college: string;
  course: string;
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

interface Template13Profile {
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
  tools: NamedItem[];
  languages: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template13Props {
  profile: Template13Profile;
}

export default function Template13({ profile }: Template13Props) {
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
    tools,
    languages,
    referees,
    profile: profileInfo,
  } = profile;
  const RED = "#dc2626";

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        color: "#1f2937",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: `4px solid ${RED}`,
          padding: "14px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
              border: `5px solid ${RED}`,
              objectFit: "cover",
              flexShrink: 0,
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/90x90?text=Photo")
            }
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                textTransform: "uppercase",
                fontSize: "10px",
                color: "#6b7280",
              }}
            >
              {current_position}
            </div>
            <h2
              style={{
                fontWeight: "700",
                fontSize: "22px",
                color: RED,
                margin: "2px 0 5px",
              }}
            >
              {fullName}
            </h2>
            <div
              style={{
                height: "4px",
                width: "130px",
                background: RED,
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                fontSize: "10px",
                color: "#6b7280",
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
              <span style={{ color: "#d1d5db" }}>|</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                <IconMail /> {email}
              </span>
              <span style={{ color: "#d1d5db" }}>|</span>
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
          height: "calc(100% - 118px)",
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: "12px 14px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* About */}
          <div
            style={{
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              borderRadius: "4px",
              padding: "10px 12px",
              marginBottom: "12px",
            }}
          >
            <T13SectionHeader title="About" color={RED} />
            <p
              style={{
                fontSize: "10.5px",
                color: "#6b7280",
                margin: 0,
                lineHeight: "1.6",
              }}
            >
              {summary}
            </p>
          </div>

          {/* Experience */}
          <div
            style={{
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              borderRadius: "4px",
              padding: "10px 12px",
              marginBottom: "12px",
            }}
          >
            <T13SectionHeader title="Job Experience" color={RED} />
            {experiences.map((w, i) => (
              <T13TimelineItem
                key={i}
                title={`${w.position} - ${w.organization}`}
                meta={[w.industry, w.location].filter(Boolean).join(" / ")}
                period={w.dates}
                bullets={w.responsibility}
              />
            ))}
          </div>

          {/* Education */}
          <div
            style={{
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              borderRadius: "4px",
              padding: "10px 12px",
            }}
          >
            <T13SectionHeader title="Education" color={RED} />
            {educations.map((ed, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div
                  style={{ fontWeight: "600", fontSize: "10.5px", color: RED }}
                >
                  {ed.course}
                </div>
                <div style={{ fontSize: "10px", color: "#6b7280" }}>
                  {ed.college}
                </div>
                <div style={{ fontSize: "10px" }}>{ed.dates}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            padding: "12px 14px 12px 0",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              borderRadius: "4px",
              padding: "10px 12px",
              marginBottom: "10px",
            }}
          >
            <T13SectionHeader title="Contact" color={RED} />
            {[
              [<IconMapPin />, location],
              [<IconPhone />, phone],
              [<IconMail />, email],
            ].map(([icon, val], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                  fontSize: "10px",
                  marginBottom: "5px",
                }}
              >
                {icon}
                <span style={{ wordBreak: "break-all" }}>{val}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              borderRadius: "4px",
              padding: "10px 12px",
              marginBottom: "10px",
            }}
          >
            <T13SectionHeader title="Languages" color={RED} />
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "14px",
                margin: 0,
                fontSize: "10px",
              }}
            >
              {languages.map((l, i) => (
                <li key={i} style={{ textTransform: "capitalize" }}>
                  {l.name}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.07)",
              borderRadius: "4px",
              padding: "10px 12px",
              marginBottom: "10px",
            }}
          >
            <T13SectionHeader title="Skills & Culture" color={RED} />
            {([
              ["Culture Fit", cultures, RED],
              ["Personality", personalities, "#6b7280"],
              ["Software", softwares, "#374151"],
              ["Skills", knowledges, RED],
              ["Tools", tools, "#374151"],
            ] as [string, NamedItem[], string][]).map(([label, items, color], i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#6b7280",
                    marginBottom: "2px",
                  }}
                >
                  {label}
                </div>
                <T13Chips items={items} color={color} />
              </div>
            ))}
          </div>

          {referees.length > 0 && (
            <div
              style={{
                background: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,.07)",
                borderRadius: "4px",
                padding: "10px 12px",
              }}
            >
              <T13SectionHeader title="Referees" color={RED} />
              {referees.map((r, i) => (
                <div key={i} style={{ marginBottom: "8px", fontSize: "10px" }}>
                  <div style={{ fontWeight: "600", color: RED }}>
                    {r.fullName}
                  </div>
                  <div style={{ color: "#6b7280" }}>
                    {r.position} - {r.company}
                  </div>
                  <div>{r.email}</div>
                  <div>{r.phone}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          paddingBottom: "14px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "6px",
            width: "150px",
            background: RED,
            borderRadius: "6px",
          }}
        />
      </div>
    </div>
  );
}

interface T13SectionHeaderProps {
  title: string;
  color: string;
}

function T13SectionHeader({ title, color }: T13SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "8px",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: color,
          color: "#fff",
          fontSize: "9px",
          flexShrink: 0,
        }}
      >
        ✦
      </span>
      <span style={{ fontWeight: "600", fontSize: "11px", color }}>
        {title}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: color,
          borderRadius: "2px",
        }}
      />
    </div>
  );
}
