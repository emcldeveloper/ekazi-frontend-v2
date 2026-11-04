interface T66SimpleSectionTitleProps {
  title: string;
}

function T66SimpleSectionTitle({ title }: T66SimpleSectionTitleProps) {
  return (
    <div
      style={{
        borderTop: "1px solid #e5e7eb",
        paddingTop: "12px",
        marginBottom: "10px",
      }}
    >
      <h2
        style={{
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: "#374151",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

interface T66TimelineBlockProps {
  item: TimelineEntry;
  showLine: boolean;
}

function T66TimelineBlock({ item, showLine }: T66TimelineBlockProps) {
  return (
    <div
      style={{
        position: "relative",
        paddingLeft: "24px",
        paddingBottom: showLine ? "16px" : 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "5px",
          zIndex: 10,
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "#60a5fa",
          flexShrink: 0,
        }}
      />
      {showLine && (
        <div
          style={{
            position: "absolute",
            left: "6px",
            top: "18px",
            bottom: 0,
            width: 0,
            borderLeft: "2px dotted #d1d5db",
          }}
        />
      )}
      <div>
        {item?.title && (
          <h3
            style={{
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 1px",
            }}
          >
            {item.title}
          </h3>
        )}
        {(item?.company || item?.dates) && (
          <p
            style={{
              fontWeight: "700",
              color: "#374151",
              margin: "0 0 4px",
            }}
          >
            {item.company}
            {item.company && item.dates ? ", " : ""}
            {item.dates && (
              <span style={{ fontWeight: "400", color: "#6b7280" }}>
                {item.dates}
              </span>
            )}
          </p>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: item.responsibilities as unknown as string,
          }}
          className="job-description"
          style={{ margin: 0, paddingLeft: "14px", color: "#374151" }}
        />
      </div>
    </div>
  );
}

interface T66ListSectionProps {
  title: string;
  items: string[];
}

function T66ListSection({ title, items }: T66ListSectionProps) {
  if (!items.length) return null;
  return (
    <div>
      <T66SimpleSectionTitle title={title} />
      <ul
        style={{
          listStyle: "disc",
          paddingLeft: "52px",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "6px",

          color: "#374151",
        }}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface TimelineEntry {
  title?: string;
  company?: string;
  dates?: string;
  responsibilities: string[];
}

interface Experience {
  position: string;
  organization: string;
  dates: string;
  responsibility: string[];
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

interface Template66Profile {
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
}

interface Template66Props {
  profile: Template66Profile;
}

export default function Template66({ profile }: Template66Props) {
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
  } = profile;
  const TEXT = "#374151";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

  const expItems = experiences.map((exp) => ({
    title: exp?.position,
    company: exp?.organization,
    dates: exp?.dates,
    responsibilities: Array.isArray(exp?.responsibility)
      ? exp.responsibility
      : [],
  }));

  const eduItems = educations.map((edu) => ({
    title: edu?.level,
    company: edu?.college,
    dates: edu?.dates,
    responsibilities: [],
  }));

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: 1.5,
        color: TEXT,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        padding: "20px 28px 60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          {fullName && (
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "500",
                letterSpacing: "tight",
                color: "#111827",
                margin: "0 0 4px",
                wordBreak: "break-word",
                textTransform: "capitalize",
              }}
            >
              {fullName}
            </h1>
          )}
          {current_position && (
            <p
              style={{
                fontWeight: "500",
                color: "#6b7280",
                margin: "0 0 2px",
              }}
            >
              {current_position}
            </p>
          )}
          {location && (
            <p style={{ color: "#9ca3af", margin: 0 }}>{location}</p>
          )}
        </div>
        {[email, phone].filter(Boolean).length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              textAlign: "right",

              color: "#6b7280",
              paddingTop: "4px",
            }}
          >
            {[email, phone].filter(Boolean).map((val, i) => (
              <p key={i} style={{ margin: 0, wordBreak: "break-all" }}>
                {val}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {summary && (
          <section>
            <T66SimpleSectionTitle title="Summary" />
            <p
              style={{
                color: "#374151",
                paddingLeft: "28px",
              }}
            >
              {summary}
            </p>
          </section>
        )}

        {expItems.length > 0 && (
          <section>
            <T66SimpleSectionTitle title="Work Experience" />
            <div style={{ paddingLeft: "4px" }}>
              {expItems.map((item, i) => (
                <T66TimelineBlock
                  key={i}
                  item={item}
                  showLine={i < expItems.length - 1}
                />
              ))}
            </div>
          </section>
        )}

        {eduItems.length > 0 && (
          <section>
            <T66SimpleSectionTitle title="Education" />
            <div style={{ paddingLeft: "4px" }}>
              {eduItems.map((item, i) => (
                <T66TimelineBlock
                  key={i}
                  item={item}
                  showLine={i < eduItems.length - 1}
                />
              ))}
            </div>
          </section>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px 24px",
          }}
        >
          <T66ListSection title="Skills" items={skills} />
          <T66ListSection title="Software" items={swList} />
          <T66ListSection title="Languages" items={langList} />
          <T66ListSection title="Culture Fit" items={cultList} />
          <T66ListSection title="Personality" items={persList} />
        </div>

        {referees.length > 0 && (
          <section>
            <T66SimpleSectionTitle title="References" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                paddingLeft: "28px",
              }}
            >
              {referees.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  {r?.fullName && (
                    <h3
                      style={{
                        fontWeight: "700",
                        color: "#111827",
                        margin: 0,
                      }}
                    >
                      {r.fullName}
                    </h3>
                  )}
                  {r?.position && (
                    <p
                      style={{
                        color: "#374151",
                        margin: 0,
                      }}
                    >
                      {r.position}
                    </p>
                  )}
                  {r?.company && (
                    <p
                      style={{
                        color: "#374151",
                        margin: 0,
                      }}
                    >
                      {r.company}
                    </p>
                  )}
                  {r?.phone && (
                    <p style={{ color: "#6b7280", margin: 0 }}>{r.phone}</p>
                  )}
                  {r?.email && (
                    <p
                      style={{
                        color: "#6b7280",
                        margin: 0,
                        wordBreak: "break-all",
                      }}
                    >
                      {r.email}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
