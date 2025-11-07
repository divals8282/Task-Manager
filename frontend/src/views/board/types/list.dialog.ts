import type { CEItemListRequestBodyI } from "@/server/list/types";

interface PropsI {
  isOpen: boolean;
  data: CEItemListRequestBodyI;
  onChange: (data: CEItemListRequestBodyI, openChange: boolean) => void;
}

export type ComponentT = (props: PropsI) => React.ReactNode;
