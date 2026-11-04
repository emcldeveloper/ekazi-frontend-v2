import { formatDate } from "@/utils/helpers";

type CVDateValue = Parameters<typeof formatDate>[0];

interface NamedItem {
  name?: string | null;
}

interface CVReferee {
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  employer?: string | null;
  position?: string | null;
  email?: string | null;
  phone?: string | null;
}

interface CVTraining {
  name?: string | null;
  institution?: string | null;
  started: CVDateValue;
  ended: CVDateValue;
}

interface CVLanguage {
  language?: NamedItem | null;
}

interface CVCulture {
  culture?: NamedItem | null;
}

interface CVTool {
  tool?: NamedItem | null;
}

interface CVPersonality {
  personality?: NamedItem | null;
}

interface CVKnowledge {
  knowledge?: NamedItem | null;
}

interface CVSoftware {
  software?: NamedItem | null;
}

interface CVProficiency {
  started: CVDateValue;
  ended: CVDateValue;
  award?: string | null;
  organization?: NamedItem | null;
  proficiency?: NamedItem | null;
}

interface CVEducation {
  started: CVDateValue;
  ended: CVDateValue;
  education_level?: NamedItem | null;
  college?: NamedItem | null;
  course?: NamedItem | null;
  major?: NamedItem | null;
}

interface CVExperience {
  employer?: NamedItem | null;
  start_date: CVDateValue;
  end_date?: CVDateValue | null;
  position?: NamedItem | null;
  position_level?: NamedItem | null;
  industry?: NamedItem | null;
  responsibility?: string | null; // HTML string, e.g. "<ul><li><p>...</p></li></ul>"
  sub_location?: string | null;
}

export function useCVNormalized(payload: any) {
  // HELPERS

  function normalizeBulletText(t = "") {
    return t.replace(/^•\s*/, "").trim();
  }

  // Converts the HTML responsibility string into an array of plain-text lines
  function htmlToLines(html = ""): string[] {
    const lines = html
      .replace(/<\/(li|p|div|h[1-6])>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .split("\n")
      .map((t) => normalizeBulletText(t))
      .filter(Boolean);

    return lines.length ? lines : ["-"];
  }

  function joinParts(parts: (string | null | undefined)[], separator = " ") {
    return parts
      .map((p) => (p || "").trim())
      .filter(Boolean)
      .join(separator);
  }

  // CV DATA
  const address = payload?.address || [];

  const phone = payload?.phone?.[0]?.phone_number || "";

  const objective = payload?.objective || "";

  const educations = payload?.education || [];

  const referees = payload?.referees || [];

  const experiences = payload?.experience || [];

  const training = payload?.training || [];

  const language = payload?.language || [];

  const profile = payload?.applicant_profile || {};

  const culture = payload?.culture || [];

  const tools = payload?.tools || [];

  const personalities = payload?.personality || [];

  const knowledges = payload?.knowledge || [];

  const software = payload?.software || [];

  const proficiencies = payload?.proficiency || [];

  const summary = payload?.career_summary || "";

  const marital_status = profile?.marital_status?.name || "";

  const current_position = payload?.current_position || "";

  const email = profile?.email || "";

  const location = address?.[0]
    ? joinParts(
        [
          address[0]?.sub_location,
          address[0]?.region?.name,
          address[0]?.region?.country?.name,
        ],
        ", ",
      )
    : "";

  const fullName =
    `${profile.first_name || ""} ${profile.middle_name || ""} ${
      profile.last_name || ""
    }`
      .replace(/\s+/g, " ")
      .trim() || "—";

  const profileImgUrl = `https://api.ekazi.co.tz/${profile?.picture}`;

  const trainings = training.map((t: CVTraining) => ({
    name: t?.name,
    institution: t?.institution,
    dates: `${formatDate(t?.started)} - ${formatDate(t?.ended)}`,
  }));

  return {
    location,
    phone,
    email,
    current_position,
    marital_status,
    summary,
    profile,
    objective,
    fullName,
    trainings,
    profileImgUrl,

    languages: language.map((l: CVLanguage) => ({
      name: l?.language?.name,
    })),

    cultures: culture.map((c: CVCulture) => ({
      name: c?.culture?.name,
    })),

    tools: tools.map((t: CVTool) => ({
      name: t?.tool?.name,
    })),

    personalities: personalities.map((p: CVPersonality) => ({
      name: p?.personality?.name?.trim(),
    })),

    knowledges: knowledges.map((k: CVKnowledge) => ({
      name: k?.knowledge?.name,
    })),

    softwares: software.map((s: CVSoftware) => ({
      name: s?.software?.name,
    })),

    referees: referees.map((ref: CVReferee) => ({
      fullName: joinParts([ref?.first_name, ref?.middle_name, ref?.last_name]),
      company: ref?.employer,
      position: ref?.position,
      email: ref?.email,
      phone: ref?.phone,
    })),

    proficiencies: proficiencies.map((prof: CVProficiency) => ({
      dates: `${formatDate(prof?.started)} - ${formatDate(prof?.ended)}`,
      award: prof?.award || "-",
      organization: prof?.organization?.name?.trim() || "-",
      proficiency: prof?.proficiency?.name?.trim() || "-",
    })),

    educations: educations.map((edu: CVEducation) => ({
      dates: `${formatDate(edu?.started)} - ${formatDate(edu?.ended)}`,
      level: edu?.education_level?.name || "-",
      college: edu?.college?.name?.trim() || "-",
      course: edu?.course?.name?.trim() || "-",
      major: edu?.major?.name || "-",
    })),

    experiences: experiences.map((exp: CVExperience) => ({
      organization: exp?.employer?.name?.trim() || "-",
      dates: `${formatDate(exp?.start_date)} - ${
        exp?.end_date ? formatDate(exp.end_date) : "Present"
      }`,
      position: exp?.position?.name?.trim() || "-",
      level: exp?.position_level?.name || "-",
      industry: exp?.industry?.name || "-",
      responsibility: htmlToLines(exp?.responsibility || ""),
      location: exp?.sub_location || "",
    })),
  };
}
