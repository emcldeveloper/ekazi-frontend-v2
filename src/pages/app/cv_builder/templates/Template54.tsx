import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T54SectionTitleProps {
  title: string;
}

function T54SectionTitle({ title }: T54SectionTitleProps) {
  const NAVY = "#001b3d";
  return (
    <h2
      style={{
        fontWeight: "700",
        letterSpacing: ".2em",
        textTransform: "uppercase",
        color: NAVY,
        margin: "0 0 12px",
      }}
    >
      {title.toUpperCase()}
    </h2>
  );
}

interface T54ListSectionProps {
  items: string[];
}

function T54ListSection({ items }: T54ListSectionProps) {
  if (!items.length) return null;
  return (
    <ul
      style={{
        listStyle: "disc",
        paddingLeft: "14px",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "4px",

        fontWeight: "500",
      }}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
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
  dates: string;
  college: string;
  level: string;
}

interface Referee {
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template54Profile {
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

interface Template54Props {
  profile: Template54Profile;
}

export default function Template54({ profile }: Template54Props) {
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
  const NAVY = "#001b3d";
  const GOLD = "#f5a623";
  const DIVIDER = "#b8d1d9";
  const TEXT = "#001b3d";

  const skills = [...new Set(knowledges.map((x) => x?.name).filter(Boolean))];
  const swList = [...new Set(softwares.map((x) => x?.name).filter(Boolean))];
  const langList = [...new Set(languages.map((x) => x?.name).filter(Boolean))];
  const cultList = [...new Set(cultures.map((x) => x?.name).filter(Boolean))];
  const persList = [
    ...new Set(personalities.map((x) => x?.name).filter(Boolean)),
  ];

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
      }}
    >
      {/* Dark navy header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "16px 20px",
          background: NAVY,
        }}
      >
        <div style={{ zIndex: 10 }}>
          {fullName && (
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                letterSpacing: ".1em",
                color: GOLD,
                margin: "0 0 3px",
                wordBreak: "break-word",
              }}
            >
              {fullName.toUpperCase()}
            </h1>
          )}
          {current_position && (
            <p
              style={{
                fontWeight: "300",
                letterSpacing: ".4em",
                color: "#fff",
                margin: 0,
              }}
            >
              {current_position.toUpperCase()}
            </p>
          )}
        </div>
        <div style={{ zIndex: 10, flexShrink: 0 }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              border: `6px solid ${GOLD}`,
              boxShadow: "0 4px 14px rgba(0,0,0,.28)",
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/80x80?text=Photo"
              }
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/80x80?text=Photo")
              }
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, height: "calc(100% - 115px)" }}>
        {/* Left: 60% — edu + exp */}
        <div
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderRight: `1px solid ${DIVIDER}`,
            padding: "14px 16px 60px",
            overflow: "hidden",
          }}
        >
          {educations.length > 0 && (
            <div>
              <T54SectionTitle title="Education" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {educations.map((edu, i) => (
                  <div key={i}>
                    {edu?.dates && (
                      <p
                        style={{
                          fontWeight: "700",
                          margin: "0 0 1px",
                        }}
                      >
                        {edu.dates}
                      </p>
                    )}
                    {edu?.college && (
                      <h3
                        style={{
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: NAVY,
                          margin: "0 0 1px",
                        }}
                      >
                        {edu.college}
                      </h3>
                    )}
                    {edu?.level && (
                      <p
                        style={{
                          fontWeight: "700",
                          fontStyle: "italic",
                          margin: 0,
                        }}
                      >
                        {edu.level}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {educations.length > 0 && experiences.length > 0 && (
            <div
              style={{ height: "1px", width: "100%", background: DIVIDER }}
            />
          )}
          {experiences.length > 0 && (
            <div>
              <T54SectionTitle title="Experience" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {experiences.map((exp, i) => (
                  <div key={i}>
                    {exp?.position && (
                      <h3
                        style={{
                          fontWeight: "900",
                          textTransform: "uppercase",
                          color: NAVY,
                          margin: "0 0 1px",
                        }}
                      >
                        {exp.position}
                      </h3>
                    )}
                    {exp?.organization && (
                      <p
                        style={{
                          fontWeight: "700",
                          margin: "0 0 1px",
                        }}
                      >
                        {exp.organization}
                      </p>
                    )}
                    {exp?.dates && (
                      <p
                        style={{
                          fontWeight: "700",
                          fontStyle: "italic",
                          margin: "0 0 4px",
                        }}
                      >
                        {exp.dates}
                      </p>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: exp.responsibility,
                      }}
                      className="job-description"
                      style={{ margin: 0, paddingLeft: "14px" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: 40% — contact + summary + skills */}
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {[
            [<IconPhone />, phone],
            [<IconMail />, email],
            [<IconMapPin />, location],
          ].filter(([, v]) => v).length > 0 && (
            <div
              style={{
                borderBottom: `1px solid ${DIVIDER}`,
                padding: "14px 16px",
              }}
            >
              <T54SectionTitle title="Contact" />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {[
                  [<IconPhone />, phone],
                  [<IconMail />, email],
                  [<IconMapPin />, location],
                ]
                  .filter(([, v]) => v)
                  .map(([icon, val], i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "4px",
                          padding: "3px",
                          background: GOLD,
                          flexShrink: 0,
                          color: "#fff",
                        }}
                      >
                        {icon}
                      </div>
                      <span
                        style={{
                          fontWeight: "700",
                          wordBreak: "break-all",
                        }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {summary && (
            <div
              style={{
                borderBottom: `1px solid ${DIVIDER}`,
                padding: "14px 16px",
              }}
            >
              <T54SectionTitle title="Summary" />
              <p
                style={{
                  fontWeight: "500",
                  textAlign: "justify",
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </div>
          )}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "14px 16px 60px",
              overflow: "hidden",
            }}
          >
            {skills.length > 0 && (
              <div>
                <T54SectionTitle title="Skills" />
                <T54ListSection items={skills} />
              </div>
            )}
            {swList.length > 0 && (
              <div>
                <T54SectionTitle title="Software" />
                <T54ListSection items={swList} />
              </div>
            )}
            {langList.length > 0 && (
              <div>
                <T54SectionTitle title="Languages" />
                <T54ListSection items={langList} />
              </div>
            )}
            {cultList.length > 0 && (
              <div>
                <T54SectionTitle title="Culture Fit" />
                <T54ListSection items={cultList} />
              </div>
            )}
            {persList.length > 0 && (
              <div>
                <T54SectionTitle title="Personality" />
                <T54ListSection items={persList} />
              </div>
            )}
            {referees.length > 0 && (
              <div>
                <T54SectionTitle title="References" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {referees.map((r, i) => (
                    <div key={i}>
                      {r?.fullName && (
                        <p
                          style={{
                            fontWeight: "700",
                            color: NAVY,
                            margin: "0 0 1px",
                          }}
                        >
                          {r.fullName}
                        </p>
                      )}
                      {r?.company && (
                        <p
                          style={{
                            fontWeight: "500",
                            margin: 0,
                          }}
                        >
                          {r.company}
                        </p>
                      )}
                      {r?.position && (
                        <p
                          style={{
                            fontWeight: "500",
                            margin: 0,
                          }}
                        >
                          {r.position}
                        </p>
                      )}
                      {r?.phone && (
                        <p
                          style={{
                            fontWeight: "500",
                            margin: "2px 0 0",
                          }}
                        >
                          {r.phone}
                        </p>
                      )}
                      {r?.email && (
                        <p
                          style={{
                            fontWeight: "500",
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
