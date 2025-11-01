export interface CEItemListRequestBodyI {
  id?: number;
  name: string;
  description: string;
}

export interface ItemListI
  extends Required<
    Pick<CEItemListRequestBodyI, "id" | "description" | "name">
  > {
  position: number;
}

export interface GetItemListResponseBodyI {
  data: ItemListI[];
  statusCode: number;
  message: string;
}
