import type { CEItemListRequestBodyI } from "@/server/list/types";

interface PropsI {
  isOpen: boolean;
  data: CEItemListRequestBodyI;
  onChange: (data: CEItemListRequestBodyI) => void;
  onDialogRequestToClose: () => void;
}

export type ComponentT = (props: PropsI) => React.ReactNode;
