import { TMServerClient } from "@/server-client";

export const deleteItemListServer = (itemListId: number) =>
  TMServerClient.delete(`/item-list/delete/${itemListId}`);
