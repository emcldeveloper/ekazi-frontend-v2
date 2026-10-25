export type OptionType = {
  value: number;
  label: string;
};

export type Company = {
  id: number;
  name: string;
};

export type CompanySize = {
  id: number;
  name: string;
};

export type CompanyType = {
  id: number;
  type_name: string;
};

export type ExperienceType = {
  id: number;
  name: string;
};

export interface Gender {
  id: number;
  name: string;
}

export interface MaritalStatus {
  id: number;
  name: string;
}

export interface Knowledge {
  id: number;
  name: string;
}

export interface Tool {
  id: number;
  tool_name: string;
}

export interface Software {
  id: number;
  software_name: string;
}

export interface Culture {
  id: number;
  culture_name: string;
}

export interface Personality {
  id: number;
  name: string;
}

export interface Industry {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  name: string;
  position_name: string;
}
export interface PositionLevel {
  id: number;
  name: string;
}
export interface Country {
  id: number;
  name: string;
}
export interface Region {
  id: number;
  name: string;
  country: Country;
}
export interface JobType {
  id: number;
  type_name: string;
}
export interface Keyword {
  id: number;
  name: string;
}
export interface College {
  id: number;
  college_name: string;
}

export interface EducationLevel {
  id: number;
  education_level: string;
}
export interface Course {
  id: number;
  name: string;
}
export interface Major {
  id: number;
  name: string;
}
export interface Proficiency {
  id: number;
  name: string;
}
export interface SalaryRange {
  id: number;
  low: number;
  high: number;
}
export interface Language {
  id: number;
  language_name: string;
}
export interface SkillLevel {
  id: number;
  name: string;
}

export interface MetaKeywordData {
  id: number;
  entity_type: string;
  name: string;
}

export interface ApplicationStage {
  id: number;
  stage_number: number;
  stage_code: string;
  stage_name: string;
  hide: boolean;
}
