export interface AuthInfoI {
  id: number;
  accessToken: string;
  refreshToken: string;
  password: string;
}

export interface UserInfoI {
  id: 1;
  name: string;
  lastname: string;
  email: string;
  auth: AuthInfoI;
}
