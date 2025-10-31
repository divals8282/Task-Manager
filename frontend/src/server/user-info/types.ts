export interface UserInfoSuccessResponseI {
  id: number;
  name: string;
  lastname: string;
  email: string;
  auth: {
    id: number;
    accessToken: string;
    refreshToken: string;
    password: string;
  };
}
