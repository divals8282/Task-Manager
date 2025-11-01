import { TMServerClient } from "@/server-client";
import { type GetOneItemResponseBodyI, type ItemTypeT } from "./types";

export const getOneItemServer = (type: ItemTypeT, itemId: number) =>
  TMServerClient.get<GetOneItemResponseBodyI>(`/item/one/${type}/${itemId}`);
