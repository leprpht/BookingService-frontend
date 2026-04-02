export interface UserInfo {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  dateOfBirth: Date;
  role: string;
}
