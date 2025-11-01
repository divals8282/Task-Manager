import type { ItemI } from "@/server/item/types";

interface PropsI {
  isOpen: boolean;
  data: ItemI;
  onChange: (data: ItemI, openChange: boolean) => void;
}

export type ComponentT = (props: PropsI) => React.ReactNode;
