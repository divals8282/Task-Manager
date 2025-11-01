import { TMServerClient } from "@/server-client";
import type { ItemI, ItemTypeT } from "./types";

export const CEItemServer = (type: ItemTypeT, data: ItemI) =>
  TMServerClient.post(`/ce-item/${type}`, data);
