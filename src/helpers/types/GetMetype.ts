export interface GetMeResponse {
  
  fullName?: string;
  email?: string;
  fileId?: null;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  region?: string;
  district?: string;
  address?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  // categoryImage?: HTMLImageElement;
}

export interface GetMetype {
  fullName?: string;
  email?: string;
  fileId?: null;

  firstName?: string;
  lastName?: string;
  region?: string;
  district?: string;
  address?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  profileImage?: string;
  categoryImage?: string | undefined;
}
