import type { PersonalInfo } from "./personal-info";

export type Applicant = {
  applicant_id: number;
  profile: Profile;
  profile_completion: ProfileCompletion;
};

export type Profile = {
  applicant_profile: PersonalInfo;
  phone: Phone[];
  address: Address[];
  objective: string;
  career_summary: string;
  current_position: string;
  experience: Experience[];
  education: Education[];
  training: Training[];
  skills: Skills;
  language: Language[];
  culture: NamedItem[];
  applicant_personality: Personality[];
  proficiency: Proficiency[];
  referees: Referee[];
};

export type Phone = {
  id: number;
  phone_number: string;
};

export type Address = {
  id: number;
  region: string;
  sub_location: string;
  postal: string;
};

export type Experience = {
  id: number;
  [key: string]: unknown;
};

export type Personality = {
  id: number;
  [key: string]: unknown;
};

export type Proficiency = {
  id: number;
  [key: string]: unknown;
};

export type NamedItem = {
  id: number;
  name: string;
};

export type College = {
  town: string | null;
  registration: string | null;
};

export type Education = {
  id: number;
  college_id: number;
  college: College;
  course_id: number;
  course: NamedItem;
  major_id: number;
  major: NamedItem;
  education_level_id: number;
  education_level: NamedItem;
  attachment: string;

  started: string;

  ended: string;
};

export type Training = {
  id: number;
  name: string;
  institution: string;
  description: string | null;
  started: string;
  ended: string;
  attachment: string;
};

export type Skills = {
  tools: NamedItem[];
  knowledge: NamedItem[];
  software: NamedItem[];
};

export type LanguageLevel = string; // e.g. "Excellent" (casing is inconsistent in the API)

export type Language = {
  id: number;
  language: string;
  read: LanguageLevel;
  write: LanguageLevel;
  speak: LanguageLevel;
  understand: LanguageLevel;
};

export type Referee = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  employer: string;
  position: string;
  email: string;
  phone: string;
  type: string | null;
};

/**
 *
 * PAYLOADS
 */

export type CareerPayload = {
  id: number;
  career: string;
};

export type ObjectivePayload = {
  id: number;
  objective: string;
};

export type ExperiencePayload = {
  id?: number;
  applicant_id: number;
  experience_type_id: number;
  applicant_employer_id: number;
  employer_name: string;
  region_id: number;
  country_id: number;
  sub_location: string;
  position_id: number;
  position_name: string;
  position_level_id: number;
  industry_id: number;
  start_date: string;
  end_date: string;
  start_salary_id: number;
  end_salary_id: number;
  responsibility: string;
  remark: string;
};

export type EducationPayload = {
  id?: number;
  education_level_id: number;
  college_id: number;
  course_id: number;
  major_id: number;
  started: Date;
  ended: Date;
  attachment: File;
};

export type LanguagePayload = {
  id?: number;
  language_id: number;
  read_id: number;
  write_id: number;
  speak_id: number;
  understand_id: number;
};

export type SkillsPayload = {
  id?: number;
  knowledge: (number | string)[];
};

export type SoftwarePayload = {
  id?: number;
  software: (number | string)[];
};

export type ToolsPayload = {
  id?: number;
  tools: (number | string)[];
};

export type PersonalitiesPayload = {
  id?: number;
  personalities: (number | string)[];
};

export type CulturesPayload = {
  id?: number;
  cultures: (number | string)[];
};

export type ProficiencyPayload = {
  organization_id: number | string;
  proficiency_id: number | string;
  started: string;
  ended: string;
  award: string;
  attachment: File;
};

export type TrainingPayload = {
  name: number | string;
  institution: number | string;
  started: string;
  ended: string;
  attachment: File;
};

export type RefereePayload = {
  first_name: string;
  middle_name: string;
  last_name: string;
  referee_position: string;
  employer: string;
  email: string;
  phone: string;
};

export interface ProfileCompletion {
  total_percentage: number;
  sections: CompletionSections;
}

export interface CompletionSections {
  basic_information: number;
  contact_information: number;
  career_summary: number;
  objective: number;
  education: number;
  experience: number;
  tools: number;
  software: number;
  knowledge: number;
  languages: number;
  culture: number;
  proficiency: number;
  training: number;
  referees: number;
}
