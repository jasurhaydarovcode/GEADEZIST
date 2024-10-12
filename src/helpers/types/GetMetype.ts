export interface GetMeResponse {
  fullName?: string;
  email?: string;
  fileId?: null;
}

export interface GetMetype {
  fullName?: string;
  email?: string;
  fileId?: null;

  firstName?: string;
  lastName? : string;
  region? : string;
  district? : string;
  address? : string;
  phoneNumber? : string;
  dateOfBirth? : string;
  profileImage? : string;
}
