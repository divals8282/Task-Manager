import type { ItemTaskI } from "@/server/item/types";
import type { ItemListI } from "@/server/list/types";

interface PropsI {
  isOpen: boolean;
  data: ItemTaskI;
  itemLists: ItemListI[];
  onChange: (data: ItemTaskI) => void;
  onDialogRequestToClose: () => void;
}

export type ComponentT = (props: PropsI) => React.ReactNode;
