import type { ComponentT } from "./types";
import type { ItemI } from "@/server/item/types";

import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type FormEventHandler } from "react";
import { CEItemServer } from "@/server/item/ce-item";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";
import { getItemsServer } from "@/server/item/get-items";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

export const StoryDialog: ComponentT = (props) => {
  const { data, isOpen, onDialogRequestToClose, onDataChange } = props;

  const [epics, setEpics] = useState<ItemI[]>([]);

  const getAndSetServerData = async () => {
    const response = await getItemsServer("Epic");
    setEpics(response.data);
  };

  useEffect(() => {
    if (isOpen) {
      getAndSetServerData();
    }
  }, [isOpen]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await CEItemServer("Story", data);

    console.debug("created/edited-story: ", response.data);

    toast.success(`Story succesfully ${data.id ? "edited" : "created"}`);

    onDialogRequestToClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onDialogRequestToClose()}>
      <DialogContent>
        <DialogDescription></DialogDescription>
        <DialogTitle>{data.id ? "Edit Story" : "Create Story"}</DialogTitle>
        <div className="story-dialog">
          <form onSubmit={onSubmit} className="story-dialog__form">
            <div className="story-dialog__form__box">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) =>
                  onDataChange({ ...data, name: e.target.value })
                }
              />
            </div>
            <div className="story-dialog__form__box">
              <label htmlFor="description">Description</label>
              <Input
                id="description"
                value={data.description}
                onChange={(e) =>
                  onDataChange({ ...data, description: e.target.value })
                }
              />
            </div>
            <div className="story-dialog__form__box">
              <label>Epic (Optional)</label>
              <Select
                value={String(data.epic?.id)}
                onValueChange={(value) =>
                  onDataChange({
                    ...data,
                    epic: epics.find((e) => e.id === Number(value)),
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Epic" />
                </SelectTrigger>
                <SelectContent>
                  {epics.map((epic) => (
                    <SelectItem value={String(epic.id)}>{epic.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="story-dialog__form__box">
              <Button type="submit">{data.id ? "Edit" : "Create"}</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
