export interface SocialUserModel {
  id: number | undefined;
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
  fullName: string | undefined;
  score: number | undefined;
  rank: number | undefined;
  profilePicture: string | undefined;
  country: string | undefined;
}
