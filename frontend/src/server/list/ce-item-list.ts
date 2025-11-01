import { TMServerClient } from "@/server-client";
import type { CEItemListRequestBodyI } from "./types";

export const CEItemListServer = (data: CEItemListRequestBodyI) =>
  TMServerClient.post("/item-list/ce-item-list", data);
