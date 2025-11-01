import { TMServerClient } from "@/server-client";
import { type GetItemListResponseBodyI } from "./types";

export const getItemListServer = async () =>
  (await TMServerClient.get<GetItemListResponseBodyI>("/item-list/all")).data;
