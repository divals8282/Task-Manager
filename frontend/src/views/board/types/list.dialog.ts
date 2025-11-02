import type { ItemListI } from "@/server/list/types";

interface PropsI {
  isOpen: boolean;
  data: ItemListI;
  onChange: (data: ItemListI, openChange: boolean) => void;
}

export type ComponentT = (props: PropsI) => React.ReactNode;
