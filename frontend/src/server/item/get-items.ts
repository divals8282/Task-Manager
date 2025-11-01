import { TMServerClient } from "@/server-client";
import { type GetItemsResponseBodyI, type ItemTypeT } from "./types";

export const getItemsServer = async (type: ItemTypeT) =>
  (await TMServerClient.get<GetItemsResponseBodyI>(`/item/all/${type}`)).data;
