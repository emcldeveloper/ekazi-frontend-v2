export type PersonalInfo = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  nationality_id: string;
  picture: string;
  background_picture: string;
  email: string;
  marital_status: string;
  gender: string;
};

export type PersonalInfoPayload = {
  applicant_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  phone2?: string;
  sub_location?: string;
  postal_address?: string;
  gender_id: number;
  marital_status_id: number;
  country_id: number;
  region_id: number;
};
