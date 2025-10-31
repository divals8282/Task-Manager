import { TMServerClient } from "@/server-client";
import { type UserInfoSuccessResponseI } from "./types";

export const getUserInfo = async () =>
  (await TMServerClient.get<UserInfoSuccessResponseI>("/auth/user-info")).data;
