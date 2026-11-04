import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T43SectionHeadingProps {
  title: string;
}

function T43SectionHeading({ title }: T43SectionHeadingProps) {
  const HEADING = "#23252b";
  return (
    <h2
      style={{
        fontWeight: "900",
        textTransform: "uppercase",
        letterSpacing: ".08em",
        color: HEADING,
        margin: "0 0 8px",
      }}
    >
      {title}
    </h2>
  );
}

interface T43DataRowProps {
  metaTop: string;
  metaBottom: string;
  title: string;
  body: string;
}

function T43DataRow({ metaTop, metaBottom, title, body }: T43DataRowProps) {
  const HEADING = "#23252b";
  const MUTED = "#6f7781";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        gap: "20px",
        marginBottom: "12px",
      }}
    >
      <div style={{ color: MUTED }}>
        <p style={{ margin: "0 0 1px" }}>{metaTop || "-"}</p>
        {metaBottom && <p style={{ margin: 0 }}>{metaBottom}</p>}
      </div>
      <div>
        <h3
          style={{
            fontWeight: "700",
            color: HEADING,
            margin: "0 0 3px",
          }}
        >
          {title || "-"}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: body,
          }}
          className="job-description"
          style={{ margin: 0, paddingLeft: "14px" }}
        />
      </div>
    </div>
  );
}

interface T43InfoPanelProps {
  title: string;
  items: string[];
}

function T43InfoPanel({ title, items }: T43InfoPanelProps) {
  const TEXT = "#525b66";
  return (
    <div>
      <h2
        style={{
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: ".08em",
          color: "#23252b",
          margin: "0 0 6px",
        }}
      >
        {title}
      </h2>
      <ul
        style={{
          listStyle: "disc",
          paddingLeft: "14px",
          margin: 0,
          color: TEXT,
        }}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

interface T43RefereeCardProps {
  r: Referee;
}

function T43RefereeCard({ r }: T43RefereeCardProps) {
  const ACCENT = "#156939";
  const HEADING = "#23252b";
  const role = [r?.position, r?.company].filter(Boolean).join(" | ");
  return (
    <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: "12px" }}>
      <h3
        style={{
          fontWeight: "700",
          color: HEADING,
          margin: "0 0 2px",
        }}
      >
        {r?.fullName || "-"}
      </h3>
      {role && <p style={{ margin: "0 0 4px" }}>{role}</p>}
      {r?.phone && <p style={{ margin: 0 }}>Phone: {r.phone}</p>}
      {r?.email && <p style={{ margin: 0 }}>Email: {r.email}</p>}
    </div>
  );
}

interface NamedItem {
  name: string;
}

interface Experience {
  organization: string;
  dates: string;
  position: string;
  responsibility: string;
}

interface Education {
  college: string;
  dates: string;
  level: string;
}

interface Referee {
  position: string;
  company: string;
  fullName: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template43Profile {
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

interface Template43Props {
  profile: Template43Profile;
}

export default function Template43({ profile }: Template43Props) {
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
    languages,
    cultures,
    personalities,
    referees,
    profile: profileInfo,
  } = profile;
  const ACCENT = "#156939";
  const HEADING = "#23252b";
  const MUTED = "#6f7781";

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);

  const detailPanels = [
    { title: "Skills", items: skills },
    { title: "Software", items: swList },
    { title: "Languages", items: langList },
    { title: "Culture Fit", items: cultList },
    { title: "Personality", items: persList },
  ].filter((p) => p.items.length > 0);

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#525b66",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#f8f8f7",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar + header */}
      <div style={{ display: "grid", gridTemplateColumns: "14px 1fr" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "130px",
              width: "14px",
              background: ACCENT,
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px",
            alignItems: "flex-start",
            gap: "16px",
            padding: "16px 20px 14px 16px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: ".02em",
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
                  fontWeight: "500",
                  color: MUTED,
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                overflow: "hidden",
                transform: "translateX(-5px)",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/75x75?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/75x75?text=Photo")
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Green divider */}
      <div style={{ height: "2px", width: "100%", background: ACCENT }} />

      {/* Body */}
      <div style={{ padding: "12px 20px 60px", overflow: "hidden" }}>
        {/* Contact footer-style row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 24px",
            marginBottom: "12px",
          }}
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
                  alignItems: "center",
                  gap: "5px",
                  color: "#525b66",
                }}
              >
                <span style={{ color: ACCENT }}>{icon}</span>
                <span style={{ wordBreak: "break-all" }}>{val}</span>
              </div>
            ))}
        </div>

        {summary && (
          <div style={{ marginBottom: "12px" }}>
            <T43SectionHeading title="About" />
            <p
              style={{
                color: HEADING,
                maxWidth: "480px",
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {educations.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T43SectionHeading title="Education" />
            {educations.map((edu, i) => (
              <T43DataRow
                key={i}
                metaTop={edu?.college}
                metaBottom={edu?.dates}
                title={edu?.level}
                body=""
              />
            ))}
          </div>
        )}

        {experiences.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T43SectionHeading title="Work Experience" />
            {experiences.map((exp, i) => (
              <T43DataRow
                key={i}
                metaTop={exp?.organization}
                metaBottom={exp?.dates}
                title={exp?.position}
                body={exp?.responsibility}
              />
            ))}
          </div>
        )}

        {detailPanels.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 30px",
              marginBottom: "12px",
            }}
          >
            {detailPanels.map((p) => (
              <T43InfoPanel key={p.title} title={p.title} items={p.items} />
            ))}
          </div>
        )}

        {referees.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <T43SectionHeading title="References" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {referees.map((r, i) => (
                <T43RefereeCard key={i} r={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
