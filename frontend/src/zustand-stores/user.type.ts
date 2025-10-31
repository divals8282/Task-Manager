export type UserStatusT = "Authorized" | "Not-Authorized";

interface UserInfoI {
  name: string;
  lastname: string;
  email: string;
}

export interface UserStoreI extends UserInfoI {
  status: UserStatusT;
  changeStatus: (status: UserStatusT) => boolean;
  setUserInfo: (userInfo: UserInfoI) => boolean;
}
