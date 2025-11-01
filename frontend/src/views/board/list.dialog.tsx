import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ComponentT } from "./types/list.dialog";
import { toast } from "sonner";
import { CEItemListServer } from "@/server/list/ce-item-list";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ListDialog: ComponentT = ({ data, isOpen, onChange }) => {
  const onFormSubmitAction: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const response = await CEItemListServer(data);

    console.debug("created/edited-item-list: ", response.data);
    toast.success(`Item List succesfully ${data.id ? "edited" : "created"}`);

    onChange(
      {
        ...response.data,
        id: undefined,
      },
      false
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => onChange(data, open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data.id ? "Edit Item List" : "Create Item List"}
          </DialogTitle>
        </DialogHeader>
        <form className="dialog-form" onSubmit={onFormSubmitAction}>
          <div className="dialog-form__box">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) =>
                onChange({ ...data, name: e.target.value }, true)
              }
            />
          </div>
          <div className="dialog-form__box">
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) =>
                onChange({ ...data, description: e.target.value }, true)
              }
            />
          </div>
          <div className="dialog-form__box">
            <Button className="w-full" type="submit">
              {data.id ? "Edit" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
