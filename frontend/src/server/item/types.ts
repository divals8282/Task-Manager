import type { UserInfoI } from "../types";

export type ItemTypeT = "Task" | "Story" | "Epic";
export interface ItemI {
  id?: number;
  name: string;
  description: string;
}

export interface GetItemsResponseBodyI {
  total: number;
  data: ItemI[];
  statusCode: number;
  message: string;
}

export interface GetOneItemResponseBodyI {
  data: ItemI;
  statusCode: number;
  message: string;
}

export interface GetOneItemNotFoundResponseBodyI {
  statusCode: number;
  message: string;
}

export interface CEItemResponseBodyI extends ItemI {
  user: UserInfoI;
}
