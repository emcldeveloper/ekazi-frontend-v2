interface NamedItem {
  name: string;
}

interface T12BulletListProps {
  items: NamedItem[];
}

function T12BulletList({ items }: T12BulletListProps) {
  if (!items?.length)
    return <span style={{ color: "rgba(255,255,255,.6)" }}>—</span>;
  return (
    <ul
      style={{
        listStyle: "disc",
        paddingLeft: "14px",
        margin: 0,

        color: "rgba(255,255,255,.85)",
      }}
    >
      {items.map((x, i) => (
        <li key={i} style={{ lineHeight: "1.6", textTransform: "capitalize" }}>
          {x?.name}
        </li>
      ))}
    </ul>
  );
}

interface T12ExpCardProps {
  title: string;
  meta?: string;
  period?: string;
  bullets?: string;
}

function T12ExpCard({ title, meta, period, bullets }: T12ExpCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,.08)",
        borderRadius: "4px",
        marginBottom: "10px",
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "600", color: "#059669" }}>{title}</div>
          {meta && <div style={{ color: "#6b7280" }}>{meta}</div>}
        </div>
        {period && (
          <span
            style={{
              flexShrink: 0,
              border: "1px solid #e5e7eb",

              padding: "2px 6px",
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
        <div
          dangerouslySetInnerHTML={{
            __html: bullets,
          }}
          className="job-description"
          style={{ margin: 0, paddingLeft: "14px", color: "#6b7280" }}
        />
      ) : null}
    </div>
  );
}

interface Experience {
  position: string;
  organization: string;
  industry: string;
  location: string;
  dates: string;
  responsibility: string;
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

interface Template12Profile {
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

interface Template12Props {
  profile: Template12Profile;
}

export default function Template12({ profile }: Template12Props) {
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
  const EMERALD = "#10b981";
  const DARK = "#0f172a";

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
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: `4px solid ${EMERALD}`,
          padding: "14px 16px 12px",
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
              border: `5px solid ${EMERALD}`,
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

                color: "#6b7280",
              }}
            >
              {current_position}
            </div>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "24px",
                color: EMERALD,
                margin: "2px 0 4px",
                letterSpacing: ".5px",
              }}
            >
              {fullName}
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",

                color: "#374151",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                📞 {phone}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                ✉ {email}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                📍 {location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "calc(100% - 120px)",
        }}
      >
        {/* Left — dark panel */}
        <div
          style={{
            background: DARK,
            padding: "14px 14px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "6px",
              }}
            >
              <span style={{ fontWeight: "700", color: "#fff" }}>About</span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,.85)",

                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>

          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, rgba(255,255,255,.1), rgba(255,255,255,.05))",
              margin: "10px 0",
            }}
          />

          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontWeight: "700",
                color: "#fff",
                marginBottom: "4px",
              }}
            >
              Languages
            </div>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "14px",
                margin: 0,

                color: "rgba(255,255,255,.85)",
              }}
            >
              {languages.map((l, i) => (
                <li key={i}>{l.name}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, rgba(255,255,255,.1), rgba(255,255,255,.05))",
              margin: "10px 0",
            }}
          />

          {([
            ["Culture Fit", cultures],
            ["Personality", personalities],
            ["Software", softwares],
            ["Skills", knowledges],
            ["Tools", tools],
          ] as [string, NamedItem[]][]).map(([label, items], i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  color: "rgba(255,255,255,.75)",
                  marginBottom: "3px",
                }}
              >
                {label}
              </div>
              <T12BulletList items={items} />
            </div>
          ))}
        </div>

        {/* Right */}
        <div
          style={{
            padding: "14px 16px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Experience */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontWeight: "700" }}>Job Experience</span>
            <div
              style={{
                height: "3px",
                width: "70px",
                background: EMERALD,
                borderRadius: "2px",
              }}
            />
          </div>
          {experiences.map((w, i) => (
            <T12ExpCard
              key={i}
              title={`${w.position} - ${w.organization}`}
              meta={[w.industry, w.location].filter(Boolean).join(" / ")}
              period={w.dates}
              bullets={w.responsibility}
            />
          ))}

          {/* Education */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontWeight: "700" }}>Education</span>
            <div
              style={{
                height: "3px",
                width: "70px",
                background: EMERALD,
                borderRadius: "2px",
              }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {educations.map((ed, i) => (
              <div
                key={i}
                style={{
                  flex: "1 1 calc(50% - 4px)",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,.08)",
                  borderRadius: "4px",
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "6px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "600",

                        color: "#065f46",
                      }}
                    >
                      {ed.course}
                    </div>
                    <div style={{ color: "#6b7280" }}>{ed.college}</div>
                  </div>
                  <span
                    style={{
                      flexShrink: 0,
                      border: "1px solid #e5e7eb",

                      padding: "2px 5px",
                      borderRadius: "4px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ed.dates}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Referees */}
          {referees.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontWeight: "700" }}>Referees</span>
                <div
                  style={{
                    height: "3px",
                    width: "70px",
                    background: EMERALD,
                    borderRadius: "2px",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      flex: "1 1 calc(50% - 4px)",
                      background: "#fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,.08)",
                      borderRadius: "4px",
                      padding: "8px 10px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",

                        color: "#065f46",
                      }}
                    >
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
            </>
          )}

          {/* Bottom accent */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "6px",
                width: "160px",
                background: EMERALD,
                borderRadius: "6px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
