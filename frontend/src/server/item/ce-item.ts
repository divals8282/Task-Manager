import { TMServerClient } from "@/server-client";
import type { CEItemResponseBodyI, ItemI, ItemTypeT } from "./types";

export const CEItemServer = (type: ItemTypeT, data: ItemI) =>
  TMServerClient.post<CEItemResponseBodyI>(`/item/ce-item/${type}`, data);
