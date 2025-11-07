import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ComponentT } from "./types/task.dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CEItemServer } from "@/server/item/ce-item";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { moveTaskToListServer } from "@/server/actions/move-task-to-list";

export const TaskDialog: ComponentT = ({
  data,
  isOpen,
  itemLists,
  onChange,
  onDialogRequestToClose,
}) => {
  const onFormSubmitAction: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const response = await CEItemServer("Task", {
      description: data.description,
      name: data.name,
      id: data.id,
    });

    if (data.itemList) {
      await moveTaskToListServer(response.data.id as number, data.itemList.id);

      console.debug("Task succesfuly added in item list");
    }

    console.debug("created/edited-task: ", response.data);

    toast.success(`Task succesfully ${data.id ? "edited" : "created"}`);

    onChange({
      description: "",
      name: "",
      id: undefined,
      user: data.user,
      itemList: data.itemList,
      story: data.story,
    });
    onDialogRequestToClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onDialogRequestToClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.id ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <form className="dialog-form" onSubmit={onFormSubmitAction}>
          <div className="dialog-form__box">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
            />
          </div>
          <div className="dialog-form__box">
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) =>
                onChange({ ...data, description: e.target.value })
              }
            />
          </div>
          <div className="dialog-form__box">
            <label htmlFor="item_list">Item List</label>
            <Select
              onValueChange={(value) =>
                onChange({
                  ...data,
                  itemList:
                    value !== "none"
                      ? itemLists.find((a) => a.id === Number(value))
                      : null,
                })
              }
              value={data.itemList?.id ? String(data.itemList?.id) : "none"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Item List" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">No Item List</SelectItem>
                  {itemLists.map((list) => (
                    <SelectItem value={String(list.id)}>{list.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
