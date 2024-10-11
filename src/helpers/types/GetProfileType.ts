export interface GetProfileType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  genderType: string | null;
  dateOfBirth: string | null;
  street: string | null;
  districtId: string | null;
  districtName: string | null;
  regionId: string | null;
  regionName: string | null;
  fileId: string | null;
}
