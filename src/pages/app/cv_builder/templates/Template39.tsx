import type { ReactNode } from "react";

// Inline SVG icons to replace react-icons/fa
function FaPhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 512 512" fill="currentColor">
      <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
    </svg>
  );
}
function FaAtIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.995 184 160 0 38.786-21.093 79.742-58.17 83.01-17.919-.483-19.312-8.43-15.484-31.26l23.682-129.846c2.482-13.648-7.776-26.399-21.346-26.399H340a21.329 21.329 0 00-21.285 19.066c-18.641-23.279-47.983-37.066-79.715-37.066-79.962 0-143 67.249-143 145 0 77.557 63.038 144 143 144 31.785 0 59.209-11.655 78.163-31.255C329.065 382.026 349.317 390 376 390c68.687 0 112-60.968 112-138C488 143.649 388.323 8 256 8zm-23 296c-37.002 0-64-28.089-64-66 0-38.024 27.082-66 64-66 36.965 0 64 27.914 64 66 0 37.998-27.035 66-64 66z" />
    </svg>
  );
}
function FaMapMarkerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 384 512" fill="currentColor">
      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
    </svg>
  );
}

interface T39LeftSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  accent: string;
  titleColor: string;
}

function T39LeftSection({
  icon,
  title,
  children,
  accent,
  titleColor,
}: T39LeftSectionProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "6px",
        }}
      >
        <span style={{ color: titleColor }}>{icon}</span>
        <h2
          style={{
            fontWeight: "600",
            color: titleColor,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
      </div>
      <span
        style={{
          display: "block",
          height: "1.5px",
          width: "100%",
          background: `${accent}80`,
          marginBottom: "10px",
        }}
      />
      {children}
    </div>
  );
}

interface T39RightSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  accent: string;
  titleColor: string;
}

function T39RightSection({
  icon,
  title,
  children,
  accent,
  titleColor,
}: T39RightSectionProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "6px",
        }}
      >
        <span style={{ color: titleColor }}>{icon}</span>
        <h2
          style={{
            fontWeight: "600",
            color: titleColor,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
      </div>
      <span
        style={{
          display: "block",
          height: "1.5px",
          width: "100%",
          background: `${accent}80`,
          marginBottom: "14px",
        }}
      />
      {children}
    </div>
  );
}

interface T39TimelineItemProps {
  item: TimelineEntry;
  isEducation: boolean;
  accent: string;
}

function T39TimelineItem({ item, isEducation, accent }: T39TimelineItemProps) {
  const title = isEducation ? item?.level || item?.college : item?.position;
  const sub = isEducation ? item?.college : item?.organization;

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "16px",
        paddingLeft: "24px",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "-19px",
          top: "5px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: accent,
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "6px",
          marginBottom: "2px",
        }}
      >
        <h3
          style={{
            fontWeight: "500",
            color: "#4e5661",
            margin: 0,
          }}
        >
          {title || "—"}
        </h3>
        <span style={{ color: "#6d7682" }}>{item?.dates || "-"}</span>
      </div>
      {sub && (
        <p
          style={{
            fontStyle: "italic",
            color: "#596271",
            margin: "0 0 3px",
          }}
        >
          {sub}
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

interface NamedItem {
  name: string;
}

interface TimelineEntry {
  level?: string;
  college?: string;
  position?: string;
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
  fullName: string;
  company: string;
  position: string;
  phone: string;
  email: string;
}

interface ProfileInfo {
  picture?: string | null;
}

interface Template39Profile {
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

interface Template39Props {
  profile: Template39Profile;
}

export default function Template39({ profile }: Template39Props) {
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
  const ACCENT = "#047b7d";
  const SIDEBAR_BG = "#eceef0";
  const TITLE_DARK = "#49515c";
  const BODY_TEXT = "#5f6672";

  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const secondLine = nameParts.slice(1).join(" ");

  const skills = knowledges.map((x) => x?.name).filter(Boolean);
  const swList = softwares.map((x) => x?.name).filter(Boolean);
  const langList = languages.map((x) => x?.name).filter(Boolean);
  const cultList = cultures.map((x) => x?.name).filter(Boolean);
  const persList = personalities.map((x) => x?.name).filter(Boolean);

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: BODY_TEXT,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#f7f8f9",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          height: "100%",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            background: SIDEBAR_BG,
            position: "relative",
            padding: "16px 20px 60px",
            overflow: "hidden",
          }}
        >
          {/* Clip-path triangle accent */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "200px",
              width: "100%",
              background: `${ACCENT}B8`,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative" }}>
            {/* Circular photo */}
            <div
              style={{
                margin: "0 auto 16px",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "8px solid #fff",
                boxShadow: "0 12px 28px rgba(0,0,0,.14)",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/110x110?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/110x110?text=Photo")
                }
              />
            </div>
            {/* Name */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: "300",
                  lineHeight: 1,
                  color: ACCENT,
                  margin: "0 0 3px",
                }}
              >
                <span style={{ display: "block" }}>{firstName}</span>
                <span style={{ display: "block" }}>{secondLine}</span>
              </h1>
              <p
                style={{
                  fontWeight: "500",
                  color: TITLE_DARK,
                  margin: 0,
                }}
              >
                {current_position}
              </p>
            </div>

            <T39LeftSection
              icon={<FaPhoneIcon />}
              title="Contact"
              accent={ACCENT}
              titleColor={TITLE_DARK}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {[
                  [<FaPhoneIcon />, phone],
                  [<FaAtIcon />, email],
                  [<FaMapMarkerIcon />, location],
                ]
                  .filter(([, v]) => v)
                  .map(([icon, val], i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          color: ACCENT,
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      >
                        {icon}
                      </span>
                      <span style={{ wordBreak: "break-all" }}>{val}</span>
                    </div>
                  ))}
              </div>
            </T39LeftSection>

            {summary && (
              <T39LeftSection
                icon="👤"
                title="About Me"
                accent={ACCENT}
                titleColor={TITLE_DARK}
              >
                <p
                  style={{
                    color: "#626a76",
                    margin: 0,
                  }}
                >
                  {summary}
                </p>
              </T39LeftSection>
            )}
            {skills.length > 0 && (
              <T39LeftSection
                icon="◆"
                title="Skills"
                accent={ACCENT}
                titleColor={TITLE_DARK}
              >
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,
                    color: "#5b6370",
                  }}
                >
                  {skills.map((s, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </T39LeftSection>
            )}
            {swList.length > 0 && (
              <T39LeftSection
                icon="◆"
                title="Software"
                accent={ACCENT}
                titleColor={TITLE_DARK}
              >
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,
                    color: "#5b6370",
                  }}
                >
                  {swList.map((s, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </T39LeftSection>
            )}
            {langList.length > 0 && (
              <T39LeftSection
                icon="🌐"
                title="Languages"
                accent={ACCENT}
                titleColor={TITLE_DARK}
              >
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,
                    color: "#5b6370",
                  }}
                >
                  {langList.map((l, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {l}
                    </li>
                  ))}
                </ul>
              </T39LeftSection>
            )}
            {cultList.length > 0 && (
              <T39LeftSection
                icon="◆"
                title="Culture Fit"
                accent={ACCENT}
                titleColor={TITLE_DARK}
              >
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,
                    color: "#5b6370",
                  }}
                >
                  {cultList.map((c, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {c}
                    </li>
                  ))}
                </ul>
              </T39LeftSection>
            )}
            {persList.length > 0 && (
              <T39LeftSection
                icon="👤"
                title="Personality"
                accent={ACCENT}
                titleColor={TITLE_DARK}
              >
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "14px",
                    margin: 0,
                    color: "#5b6370",
                  }}
                >
                  {persList.map((p, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </T39LeftSection>
            )}
          </div>
        </div>

        {/* Right main */}
        <div
          style={{
            background: "#f7f8f9",
            padding: "16px 18px 60px",
            overflow: "hidden",
          }}
        >
          {educations.length > 0 && (
            <T39RightSection
              icon="🎓"
              title="Education"
              accent={ACCENT}
              titleColor={TITLE_DARK}
            >
              <div
                style={{
                  position: "relative",
                  paddingLeft: "20px",
                  borderLeft: `2px solid ${ACCENT}66`,
                }}
              >
                {educations.map((edu, i) => (
                  <T39TimelineItem
                    key={i}
                    item={edu}
                    isEducation
                    accent={ACCENT}
                  />
                ))}
              </div>
            </T39RightSection>
          )}
          {experiences.length > 0 && (
            <T39RightSection
              icon="💼"
              title="Experience"
              accent={ACCENT}
              titleColor={TITLE_DARK}
            >
              <div
                style={{
                  position: "relative",
                  paddingLeft: "20px",
                  borderLeft: `2px solid ${ACCENT}66`,
                }}
              >
                {experiences.map((exp, i) => (
                  <T39TimelineItem
                    key={i}
                    item={exp}
                    isEducation={false}
                    accent={ACCENT}
                  />
                ))}
              </div>
            </T39RightSection>
          )}
          {referees.length > 0 && (
            <T39RightSection
              icon="📖"
              title="References"
              accent={ACCENT}
              titleColor={TITLE_DARK}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                }}
              >
                {referees.map((r, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontWeight: "700",
                        color: "#4d5561",
                        margin: "0 0 2px",
                      }}
                    >
                      {r?.fullName || "-"}
                    </p>
                    <p
                      style={{
                        color: "#59616d",
                        margin: "0 0 4px",
                      }}
                    >
                      {r?.company || "-"} / {r?.position || "-"}
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#5f6672",
                        margin: "0",
                      }}
                    >
                      Phone: {r?.phone || "-"}
                    </p>
                    <p
                      style={{ color: "#5f6672", margin: 0 }}
                    >
                      Email: {r?.email || "-"}
                    </p>
                  </div>
                ))}
              </div>
            </T39RightSection>
          )}
        </div>
      </div>
    </div>
  );
}
