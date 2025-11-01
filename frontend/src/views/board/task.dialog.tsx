import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ComponentT } from "./types/list.dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CEItemServer } from "@/server/item/ce-item";
import { toast } from "sonner";

export const TaskDialog: ComponentT = ({ data, isOpen, onChange }) => {
  const onFormSubmitAction: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const response = await CEItemServer("Task", data);

    console.debug("created/edited-task: ", response.data);

    toast.success(`Task succesfully ${data.id ? "edited" : "created"}`);

    onChange(
      {
        description: response.data.description,
        name: response.data.name,
        id: undefined,
      },
      false
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => onChange(data, open)}>
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
