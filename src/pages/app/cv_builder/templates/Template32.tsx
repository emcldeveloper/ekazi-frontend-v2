import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T32ChipProps {
  label?: string;
}

function T32Chip({ label }: T32ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: "#224559",
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

interface T32ContactItemProps {
  icon: ReactNode;
  value: string;
}

function T32ContactItem({ icon, value }: T32ContactItemProps) {
  const BRAND = "#224559";
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
          borderRadius: "6px",
          border: `1px solid rgba(34,69,89,.25)`,
          background: `rgba(34,69,89,.08)`,
          color: BRAND,
        }}
      >
        {icon}
      </span>
      <div
        style={{
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

interface T32TimelineItemProps {
  item: TimelineEntry;
  isExperience: boolean;
}

function T32TimelineItem({ item, isExperience }: T32TimelineItemProps) {
  const BRAND = "#224559";
  const title = isExperience ? item?.position : item?.level || item?.degree;
  const org = isExperience
    ? item?.organization
    : item?.college || item?.institution || "";
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "16px",
        paddingLeft: "24px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-6px",
          top: "6px",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          border: "2px solid #fff",
          background: BRAND,
        }}
      />
      <div
        style={{
          fontWeight: "500",
          color: BRAND,
          marginBottom: "2px",
        }}
      >
        {item?.dates}
      </div>
      <div style={{ fontWeight: "600", color: BRAND }}>{title}</div>
      <div
        style={{
          fontStyle: "italic",
          color: "#666",
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

interface T32CardBlockProps {
  title: string;
  children: ReactNode;
}

function T32CardBlock({ title, children }: T32CardBlockProps) {
  return (
    <div
      style={{
        marginBottom: "12px",
        background: "#fff",
        borderRadius: "6px",
        padding: "12px 14px",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          fontWeight: "700",
          color: "#224559",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      {children}
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

interface Template32Profile {
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

interface Template32Props {
  profile: Template32Profile;
}

export default function Template32({ profile }: Template32Props) {
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
  const BRAND = "#224559";

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#222",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#f5f7fa",
        overflow: "hidden",
        borderRadius: "4px",
      }}
    >
      {/* Dark teal centered header + floating photo */}
      <div
        style={{
          position: "relative",
          marginBottom: "70px",
          background: `linear-gradient(135deg, ${BRAND}, #1b3340)`,
          padding: "24px 24px 60px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div
          style={{ fontSize: "22px", fontWeight: "700", marginBottom: "3px" }}
        >
          {fullName}
        </div>
        <div style={{ opacity: 0.9, marginBottom: "8px" }}>
          {current_position}
        </div>
        <p
          style={{
            opacity: 0.95,
            margin: "0 auto",
            maxWidth: "500px",
          }}
        >
          {summary}
        </p>
        <img
          src={
            profileInfo?.picture
              ? `https://api.ekazi.co.tz/${profileInfo.picture}`
              : "https://placehold.co/100x100?text=Photo"
          }
          alt="profile"
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "5px solid #fff",
            boxShadow: "0 4px 20px rgba(0,0,0,.35)",
          }}
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/100x100?text=Photo")
          }
        />
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          gap: "12px",
          padding: "0 14px 14px",
          height: "calc(100% - 195px)",
        }}
      >
        {/* Left — card blocks */}
        <div style={{ overflow: "hidden" }}>
          <T32CardBlock title="Contact">
            <T32ContactItem icon={<IconPhone />} value={phone} />
            <T32ContactItem icon={<IconMail />} value={email} />
            <T32ContactItem icon={<IconMapPin />} value={location} />
          </T32CardBlock>

          <T32CardBlock title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[...knowledges, ...softwares].map((x, i) => (
                <T32Chip key={i} label={x?.name} />
              ))}
            </div>
          </T32CardBlock>

          {languages.length > 0 && (
            <T32CardBlock title="Languages">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {languages.map((l, i) => (
                  <T32Chip key={i} label={l?.name} />
                ))}
              </div>
            </T32CardBlock>
          )}

          {(cultures.length > 0 ||
            personalities.length > 0 ||
            tools.length > 0) && (
            <T32CardBlock title="Culture & Personality">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {[...cultures, ...personalities, ...tools].map((x, i) => (
                  <T32Chip key={i} label={x?.name} />
                ))}
              </div>
            </T32CardBlock>
          )}
        </div>

        {/* Right — timelines */}
        <div style={{ overflow: "hidden" }}>
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: "700",
                color: BRAND,
                borderBottom: `2px solid ${BRAND}`,
                paddingBottom: "3px",
                marginBottom: "10px",
              }}
            >
              Experience
            </div>
            <div
              style={{
                position: "relative",
                marginLeft: "6px",
                paddingLeft: "16px",
                borderLeft: `2px solid ${BRAND}`,
              }}
            >
              {experiences.map((exp, i) => (
                <T32TimelineItem key={i} item={exp} isExperience />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: "700",
                color: BRAND,
                borderBottom: `2px solid ${BRAND}`,
                paddingBottom: "3px",
                marginBottom: "10px",
              }}
            >
              Education
            </div>
            <div
              style={{
                position: "relative",
                marginLeft: "6px",
                paddingLeft: "16px",
                borderLeft: `2px solid ${BRAND}`,
              }}
            >
              {educations.map((edu, i) => (
                <T32TimelineItem key={i} item={edu} isExperience={false} />
              ))}
            </div>
          </div>

          {referees.length > 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontWeight: "700",
                  color: BRAND,
                  borderBottom: `2px solid ${BRAND}`,
                  paddingBottom: "3px",
                  marginBottom: "10px",
                }}
              >
                Referees
              </div>
              <div
                style={{
                  position: "relative",
                  marginLeft: "6px",
                  paddingLeft: "16px",
                  borderLeft: `2px solid ${BRAND}`,
                }}
              >
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      marginBottom: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "-22px",
                        top: "6px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        border: "2px solid #fff",
                        background: BRAND,
                      }}
                    />
                    <div
                      style={{
                        fontWeight: "600",
                        color: BRAND,
                      }}
                    >
                      {r.fullName}
                    </div>
                    <div style={{ color: "#6b7280" }}>{r.position}</div>
                    <div>{r.company}</div>
                    <div>{r.phone}</div>
                    <div style={{ wordBreak: "break-all" }}>{r.email}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
