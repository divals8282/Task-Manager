import type { ItemStoryI } from "@/server/item/types";
import type { ReactNode } from "react";

interface PropsI {
  data: ItemStoryI;
  onDataChange: (data: ItemStoryI) => void;
  isOpen: boolean;
  onDialogRequestToClose: () => void;
}

export type ComponentT = (props: PropsI) => ReactNode;
