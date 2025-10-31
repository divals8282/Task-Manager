import { TMServerClient } from "@/server-client";
import { type RegisterFormT } from "./form.schema";

export interface RegisterSuccessResponseI {
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

export interface RegisterErrorResponseI {
  message: string;
  statusCode: number;
  success: boolean;
}

export const registerServer = async (data: RegisterFormT) =>
  TMServerClient.post<RegisterSuccessResponseI>("/auth/register", data);
