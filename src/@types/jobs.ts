export type Job = {};

export interface JobMatch {
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
}
