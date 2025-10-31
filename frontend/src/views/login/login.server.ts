import { TMServerClient } from "@/server-client";
import { type LoginFormT } from "./form.schema";

export interface LoginSuccessResponseI {
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

export interface LoginErrorResponseI {
  message: string;
  statusCode: number;
  success: boolean;
}

export const loginServer = async (data: LoginFormT) =>
  TMServerClient.post<LoginSuccessResponseI>("/auth/login", data);
