export interface UserInfo {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  profilePictureUrl: string | null;
  dateOfBirth: Date;
  role: string;
}
