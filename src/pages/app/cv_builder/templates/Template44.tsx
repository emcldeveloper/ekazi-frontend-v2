import { IconMail, IconPhone } from "./components/Icon";

interface T44DiamondMarkerProps {
  color?: string;
}

function T44DiamondMarker({ color }: T44DiamondMarkerProps) {
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "10px",
        height: "10px",
        transform: "rotate(45deg)",
        borderRadius: "2px",
        border: `1px solid ${color}`,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: color,
          transform: "translate(-50%,-50%) rotate(-45deg)",
        }}
      />
    </span>
  );
}

interface T44SectionHeadingProps {
  title: string;
  color?: string;
  rule: string;
}

function T44SectionHeading({ title, color, rule }: T44SectionHeadingProps) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <T44DiamondMarker color={color} />
        <h2 style={{ fontWeight: "600", color, margin: 0 }}>{title}</h2>
      </div>
      <div
        style={{
          height: "1px",
          width: "100%",
          background: rule,
          marginTop: "6px",
        }}
      />
    </div>
  );
}

interface T44TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
  color?: string;
}

function T44TimelineItem({ item, isExperience, color }: T44TimelineItemProps) {
  const title = isExperience ? item?.position : item?.college || item?.level;
  const sub = isExperience
    ? item?.organization
    : title === item?.college
      ? ""
      : item?.college;

  return (
    <div
      style={{
        position: "relative",
        paddingLeft: "20px",
        marginBottom: "12px",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "-19px",
          top: "4px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: color,
        }}
      />
      <h3
        style={{
          fontWeight: "700",
          color: "#2d2f34",
          margin: "0 0 1px",
        }}
      >
        {title || "-"}
      </h3>
      {sub && (
        <p
          style={{
            color: "#2d2f34",
            margin: "0 0 1px",
          }}
        >
          {sub}
        </p>
      )}
      {item?.dates && (
        <p
          style={{
            fontStyle: "italic",
            color: "#2d2f34",
            margin: "0 0 3px",
          }}
        >
          {item.dates}
        </p>
      )}
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

interface T44BulletListProps {
  items: string[];
}

function T44BulletList({ items }: T44BulletListProps) {
  return (
    <ul
      style={{
        listStyle: "disc",
        paddingLeft: "14px",
        margin: 0,
        color: "#50555d",
      }}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

interface T44RefereeCardProps {
  r: Referee;
}

function T44RefereeCard({ r }: T44RefereeCardProps) {
  const HEADING = "#2d2f34";
  const MUTED = "#6b727d";
  const role = [r?.company, r?.position].filter(Boolean).join(" / ");
  return (
    <div>
      <h3
        style={{
          fontWeight: "600",
          color: HEADING,
          margin: "0 0 4px",
        }}
      >
        {r?.fullName || "-"}
      </h3>
      {role && (
        <p
          style={{
            color: MUTED,
            margin: "0 0 6px",
          }}
        >
          {role}
        </p>
      )}
      {r?.phone && (
        <p style={{ margin: "0" }}>
          <span style={{ fontWeight: "600", color: HEADING }}>Phone:</span>{" "}
          {r.phone}
        </p>
      )}
      {r?.email && (
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: "600", color: HEADING }}>Email:</span>{" "}
          {r.email}
        </p>
      )}
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface TimelineEntry {
  position?: string;
  college?: string;
  level?: string;
  organization?: string;
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
  company: string;
  position: string;
  fullName: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template44Profile {
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
  languages: NamedItem[];
  cultures: NamedItem[];
  personalities: NamedItem[];
  referees: Referee[];
  profile: ProfileInfo;
}

interface Template44Props {
  profile: Template44Profile;
}

export default function Template44({ profile }: Template44Props) {
  const {
    fullName,
    current_position,
    email,
    phone,
    summary,
    experiences,
    educations,
    knowledges,
    softwares,
    languages,
    cultures,
    personalities,
    referees,
    profile: profileInfo,
  } = profile;
  const ACCENT = "#ff0000";
  const HEADING = "#2d2f34";
  const MUTED = "#6b727d";

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);

  const tagSections = [
    { title: "Skills", items: skills },
    { title: "Software", items: swList },
    { title: "Languages", items: langList },
    { title: "Culture Fit", items: cultList },
    { title: "Personality", items: persList },
  ].filter((s) => s.items.length > 0);

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#50555d",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#f8f8f8",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px 24px 14px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <div
            style={{
              height: "100px",
              width: "80px",
              overflow: "hidden",
              background: "#dadada",
              flexShrink: 0,
            }}
          >
            <img
              src={
                profileInfo?.picture
                  ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                  : "https://placehold.co/80x100?text=Photo"
              }
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src = "https://placehold.co/80x100?text=Photo")
              }
            />
          </div>
          <div style={{ paddingRight: "60px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "300",
                color: HEADING,
                margin: "0 0 3px",
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </h1>
            {current_position && (
              <p
                style={{
                  fontWeight: "400",
                  color: ACCENT,
                  margin: "0 0 10px",
                }}
              >
                {current_position}
              </p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
              {[
                [<IconPhone />, phone],
                [<IconMail />, email],
              ]
                .filter(([, v]) => v)
                .map(([icon, val], i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: MUTED,
                    }}
                  >
                    <span style={{ color: ACCENT }}>{icon}</span>
                    <span style={{ wordBreak: "break-all" }}>{val}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body 2-col */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 1fr",
          gap: "16px",
          padding: "10px 24px",
          height: "calc(100% - 138px)",
          overflow: "hidden",
        }}
      >
        {/* Left — summary + experience + referees */}
        <div style={{ overflow: "hidden" }}>
          {summary && (
            <div style={{ marginBottom: "12px" }}>
              <T44SectionHeading title="Summary" color={ACCENT} rule={ACCENT} />
              <p
                style={{
                  color: "#50555d",
                  margin: 0,
                }}
              >
                {summary}
              </p>
            </div>
          )}

          {experiences.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T44SectionHeading
                title="Work Experience"
                color={ACCENT}
                rule={ACCENT}
              />
              <div
                style={{
                  position: "relative",
                  paddingLeft: "20px",
                  borderLeft: `1px solid ${ACCENT}`,
                }}
              >
                {experiences.map((exp, i) => (
                  <T44TimelineItem
                    key={i}
                    item={exp}
                    isExperience
                    color={ACCENT}
                  />
                ))}
              </div>
            </div>
          )}

          {referees.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T44SectionHeading
                title="References"
                color={ACCENT}
                rule={ACCENT}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {referees.map((r, i) => (
                  <T44RefereeCard key={i} r={r} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — edu + skills */}
        <div style={{ overflow: "hidden" }}>
          {educations.length > 0 && (
            <div style={{ marginBottom: "12px" }}>
              <T44SectionHeading
                title="Education"
                color={ACCENT}
                rule={ACCENT}
              />
              {educations.map((edu, i) => (
                <T44TimelineItem
                  key={i}
                  item={edu}
                  isExperience={false}
                  color={ACCENT}
                />
              ))}
            </div>
          )}
          {tagSections.map((s) => (
            <div key={s.title} style={{ marginBottom: "12px" }}>
              <T44SectionHeading title={s.title} color={ACCENT} rule={ACCENT} />
              <T44BulletList items={s.items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
