import type { ReactNode } from "react";
import { IconMail, IconPhone, IconMapPin } from "./components/Icon";

interface T30ContactTileProps {
  icon: ReactNode;
  label?: string;
  value: string;
}

function T30ContactTile({ icon, label, value }: T30ContactTileProps) {
  return (
    <div
      style={{
        flex: "1 1 180px",
        minWidth: "150px",
        borderRadius: "12px",
        border: "1px solid rgba(17,24,39,.08)",
        background: "#fff",
        padding: "8px 12px",
        boxShadow: "0 8px 18px rgba(17,24,39,.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontWeight: "800",
          textTransform: "uppercase",
          letterSpacing: ".04em",
          color: "#111827",
          marginBottom: "4px",
        }}
      >
        <span style={{ color: "#0B7285" }}>{icon}</span> {label}
      </div>
      <div
        style={{
          color: "#111827",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}

interface T30CardProps {
  title: string;
  children: ReactNode;
}

function T30Card({ title, children }: T30CardProps) {
  return (
    <div
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(17,24,39,.08)",
        background: "#fff",
        boxShadow: "0 10px 22px rgba(17,24,39,.06)",
        overflow: "hidden",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(17,24,39,.06)",
          background:
            "linear-gradient(90deg,rgba(11,114,133,.1),rgba(132,94,247,.08))",
          padding: "7px 14px",
        }}
      >
        <div
          style={{
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: ".12em",
            color: "#111827",
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ padding: "10px 14px" }}>{children}</div>
    </div>
  );
}

interface T30ExpCardProps {
  item: TimelineEntry;
}

function T30ExpCard({ item }: T30ExpCardProps) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "12px",
        border: "1px solid rgba(17,24,39,.08)",
        background: "#fff",
        padding: "10px 12px 10px 18px",
        boxShadow: "0 8px 18px rgba(17,24,39,.05)",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "5px",
          borderRadius: "12px 0 0 12px",
          background: "linear-gradient(to bottom, #0B7285, #845EF7)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "6px",
          marginBottom: "4px",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: "900", color: "#111827" }}>
            {item?.position || item?.level || item?.degree}
          </div>
          <div style={{ fontStyle: "italic", color: "#6B7280" }}>
            {item?.organization || item?.college || item?.institution}
          </div>
        </div>
        <div
          style={{
            flexShrink: 0,
            borderRadius: "999px",
            background: "linear-gradient(to right, #0B7285, #845EF7)",
            padding: "2px 8px",
            fontWeight: "900",
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          {item?.dates}
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: item.responsibility as string,
        }}
        className="job-description"
        style={{ margin: 0, paddingLeft: "14px", color: "#111827" }}
      />
    </div>
  );
}

interface T30ChipProps {
  label?: string;
  teal?: boolean;
}

function T30Chip({ label, teal }: T30ChipProps) {
  if (!label) return null;
  return (
    <span
      style={{
        display: "inline-block",
        background: teal ? "rgba(11,114,133,.1)" : "rgba(132,94,247,.1)",
        color: teal ? "#0B7285" : "#845EF7",
        border: teal
          ? "1px solid rgba(11,114,133,.22)"
          : "1px solid rgba(132,94,247,.22)",
        padding: "2px 8px",
        margin: "2px",
        borderRadius: "999px",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        fontWeight: "800",
        textTransform: "capitalize",
      }}
    >
      {label}
    </span>
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

interface Template30Profile {
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

interface Template30Props {
  profile: Template30Profile;
}

export default function Template30({ profile }: Template30Props) {
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

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#111827",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        background: "#F7FAFC",
        overflow: "hidden",
        borderRadius: "4px",
      }}
    >
      {/* Radial gradient header */}
      <div
        style={{
          position: "relative",
          borderBottom: "1px solid rgba(17,24,39,.08)",
          padding: "16px 20px 14px",
          background:
            "radial-gradient(900px 260px at 10% 0%, rgba(11,114,133,.2), transparent 55%), radial-gradient(850px 260px at 95% 10%, rgba(132,94,247,.16), transparent 60%), linear-gradient(135deg,rgba(255,255,255,1),rgba(255,255,255,1))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                margin: "0 0 3px",
                fontSize: "22px",
                fontWeight: "900",
                lineHeight: 1.05,
                letterSpacing: ".2px",
                color: "#111827",
              }}
            >
              {fullName}
            </h1>
            <div
              style={{
                marginTop: "3px",
                fontWeight: "700",
                color: "#6B7280",
              }}
            >
              {current_position}
            </div>
            <div
              style={{
                marginTop: "8px",
                height: "5px",
                width: "130px",
                borderRadius: "999px",
                background: "linear-gradient(to right, #0B7285, #845EF7)",
              }}
            />
          </div>
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                height: "110px",
                width: "110px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0B7285, #845EF7)",
                padding: "4px",
                boxShadow: "0 14px 28px rgba(17,24,39,.12)",
              }}
            >
              <img
                src={
                  profileInfo?.picture
                    ? `https://api.ekazi.co.tz/${profileInfo.picture}`
                    : "https://placehold.co/110x110?text=Photo"
                }
                alt="profile"
                style={{
                  display: "block",
                  height: "100%",
                  width: "100%",
                  borderRadius: "50%",
                  border: "5px solid #fff",
                  background: "#fff",
                  objectFit: "cover",
                }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/110x110?text=Photo")
                }
              />
            </div>
          </div>
        </div>

        {/* Contact tiles */}
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <T30ContactTile icon={<IconPhone />} label="Phone" value={phone} />
          <T30ContactTile icon={<IconMail />} label="Email" value={email} />
          <T30ContactTile
            icon={<IconMapPin />}
            label="Location"
            value={location}
          />
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          gap: "12px",
          padding: "12px 14px",
          height: "calc(100% - 175px)",
        }}
      >
        {/* Left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            overflow: "hidden",
          }}
        >
          <T30Card title="Profile">
            <p
              style={{
                margin: 0,
                color: "#111827",
                textAlign: "justify",
              }}
            >
              {summary}
            </p>
          </T30Card>

          <T30Card title="Skills">
            <div>
              {knowledges.map((k, i) => (
                <T30Chip key={i} label={k?.name} teal />
              ))}
              {softwares.map((s, i) => (
                <T30Chip key={i} label={s?.name} />
              ))}
            </div>
          </T30Card>

          {languages.length > 0 && (
            <T30Card title="Languages">
              <div>
                {languages.map((l, i) => (
                  <T30Chip key={i} label={l?.name} />
                ))}
              </div>
            </T30Card>
          )}

          {(cultures.length > 0 || personalities.length > 0) && (
            <T30Card title="Culture & Personality">
              <div>
                {cultures.map((x, i) => (
                  <T30Chip key={i} label={x?.name} teal />
                ))}
                {personalities.map((x, i) => (
                  <T30Chip key={i} label={x?.name} />
                ))}
              </div>
            </T30Card>
          )}
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            overflow: "hidden",
          }}
        >
          <T30Card title="Experience">
            {experiences.map((exp, i) => (
              <T30ExpCard key={i} item={exp} />
            ))}
          </T30Card>

          <T30Card title="Education">
            {educations.map((edu, i) => (
              <T30ExpCard key={i} item={edu} />
            ))}
          </T30Card>

          {referees.length > 0 && (
            <T30Card title="Referees">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {referees.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      flex: "1 1 calc(50% - 4px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(17,24,39,.08)",
                      background: "#fff",
                      padding: "8px 10px",
                      boxShadow: "0 6px 16px rgba(17,24,39,.05)",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "900",
                        color: "#111827",
                      }}
                    >
                      {r.fullName}
                    </div>
                    <div style={{ color: "#6B7280" }}>{r.position}</div>
                    <div>{r.company}</div>
                    <div style={{ marginTop: "4px" }}>{r.phone}</div>
                    <div>{r.email}</div>
                  </div>
                ))}
              </div>
            </T30Card>
          )}
        </div>
      </div>
    </div>
  );
}
