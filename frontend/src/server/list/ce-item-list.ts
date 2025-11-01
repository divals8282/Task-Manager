import { TMServerClient } from "@/server-client";
import type { CEItemListRequestBodyI, ItemListI } from "./types";

export const CEItemListServer = (data: CEItemListRequestBodyI) =>
  TMServerClient.post<ItemListI>("/item-list/ce-item-list", data);
