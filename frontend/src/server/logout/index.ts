import { TMServerClient } from "@/server-client";

export const logoutServer = () => TMServerClient.delete("/auth/logout");
