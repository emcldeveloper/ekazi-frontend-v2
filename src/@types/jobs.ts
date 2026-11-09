export type Job = {
  id: number;
  title: string | null;
  show_client_name: boolean;
  applicant_min_age: number;
  applicant_max_age: number;
  hide: boolean;
  quantity: number;
  years_experience: string;
  published: string;
  status: string;
  dead_line: string;
  created_at: string;
  updated_at: string;
  total_applicants: number;

  client: {
    id: number;
    name: string;
    logo: string;
  };

  industry: IdName | null;
  category: IdName | null;
  position: IdName | null;
  position_level: IdName | null;
  country: IdName | null;
  region: IdName | null;
  currency: IdName | null;

  addresses: Address[];
  statistics: JobStatistics[];

  job_type: IdName | null;
  job_email: string | null;
  job_externalUrl: string | null;
  gender: IdName | null;

  meta_keywords: MetaKeyword[];
  cultures: Culture[];
  personalities: Personality[];
  softwares: Software[];
  tools: Tool[];
  proficiencies: Proficiency[];
  knowledge: Knowledge[];

  salaries: Salary[];
  education: Education[];
  languages: Language[];

  report_to: ReportTo[];
  requirements: Requirement[];
  other_requirements: OtherRequirement[];
};

export type IdName = {
  id: number;
  name: string;
};

export type Address = {
  id: number;
  sub_location: string;
  region: string;
};

export type JobStatistics = {
  id: number;
  job_id: number;
  job_likes: number;
  job_views: number;
  apply_condition: boolean;
  external_url: string | null;
  created_at: string;
  updated_at: string;
};

export type MetaKeyword = {
  id: number;
  keyword: IdName;
};

export type Culture = {
  id: number;
  culture: IdName;
};

export type Personality = {
  id: number;
  personality: IdName;
};

export type Software = {
  id: number;
  software: IdName;
};

export type Tool = {
  id: number;
  tool: IdName;
};

export type Proficiency = {
  id: number;
  proficiency: IdName;
};

export type Knowledge = {
  id: number;
  knowledge: IdName;
};

export type Salary = {
  id: number;
  from_salary: SalaryRange;
  to_salary: SalaryRange;
};

export type SalaryRange = {
  id: number;
  low: number;
  high: number;
};

export type Education = {
  id: number;
  education_level: IdName;
  course: IdName;
  major: IdName;
};

export type Language = {
  id: number;
  language: IdName;
  read: IdName;
  write: IdName;
  speak: IdName;
  understand: IdName;
};

export type ReportTo = {
  id: number;
  job_id: number;
  supervises: string;
  interacts_with: string;
  report_to: string;
  created_at: string;
  updated_at: string;
};

export type Requirement = {
  id: number;
  job_id: number;
  main_duties: string;
  created_at: string;
  updated_at: string;
};

export type OtherRequirement = {
  id: number;
  job_id: number;
  other_requirement: string;
  created_at: string;
  updated_at: string;
};

/**
 * Matched Jobs
 */
export type JobMatch = {
  job_id: number;
  title: string | null;
  position: string;
  industry: string;
  position_level: string | null;
  company: string;
  company_logo: string;
  posted_on: string;
  deadline: string;
  years_experience_required: number;
  applicant_experience_years: number;
  matched_criteria: number;
  total_criteria: number;
  match_percentage: number;
  recommendation: string;
};
