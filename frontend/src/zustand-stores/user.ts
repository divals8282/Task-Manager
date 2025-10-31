import { create } from "zustand";
import { type UserStoreI } from "./user.type";

export const useUserStore = create<UserStoreI>((set) => ({
  email: "",
  name: "",
  lastname: "",
  status: "Not-Authorized",
  changeStatus: (status) => {
    set({ status });
    return true;
  },
  setUserInfo: (userInfo) => {
    set({
      ...userInfo,
    });

    return true;
  },
}));
