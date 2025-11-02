export interface CEItemListRequestBodyI {
  id?: number;
  name: string;
  description: string;
  position: number;
}

export interface ItemListI
  extends Required<
    Pick<CEItemListRequestBodyI, "id" | "description" | "name" | "position">
  > {
  position: number;
}

export interface GetItemListResponseBodyI {
  data: ItemListI[];
  statusCode: number;
  message: string;
}
