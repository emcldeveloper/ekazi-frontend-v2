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
  first_name: string;
  middle_name?: string;
  last_name: string;
  dob: string;
  phone: string;
  country_id: number;
  region_id: number;
  sub_location?: string;
  postal?: string;
  gender_id: number;
  marital_status_id: number;

  // date_of_birth: string;
  // phone2?: string;
  // postal_address?: string;
  // country_id: number;
};
