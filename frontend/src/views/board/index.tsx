import "./styles.scss";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskDialog } from "./task.dialog";
import { ListDialog } from "./list.dialog";
import { getItemListServer } from "@/server/list/get-item-list";
import {
  type CEItemListRequestBodyI,
  type ItemListI,
} from "@/server/list/types";
import { type ItemI } from "@/server/item/types";
import { getItemsServer } from "@/server/item/get-items";

export const BoardView = () => {
  const [tasks, setTasks] = useState<ItemI[]>([]);
  const [itemLists, setItemLists] = useState<ItemListI[]>([]);

  const [dialog, setDialog] = useState<{
    task: {
      open: boolean;
      data: ItemI;
    };
    list: {
      open: boolean;
      data: CEItemListRequestBodyI;
    };
  }>({
    task: {
      open: false,
      data: {
        id: undefined,
        name: "",
        description: "",
      },
    },
    list: {
      open: false,
      data: {
        id: undefined,
        name: "",
        description: "",
      },
    },
  });

  const getServerData = async () => {
    const [itemLists, tasks] = await Promise.all([
      getItemListServer(),
      getItemsServer("Task"),
    ]);

    setItemLists(itemLists.data);
    setTasks(tasks.data);
  };

  useEffect(() => {
    getServerData();
  }, []);

  return (
    <div className="board-view">
      <div className="board-view__header">
        <div className="board-view__header--title">Board</div>
        <div className="board-view__header--actions">
          <Button
            onClick={() =>
              setDialog({ ...dialog, task: { ...dialog.task, open: true } })
            }
          >
            Create Task
          </Button>
          <Button
            onClick={() =>
              setDialog({ ...dialog, list: { ...dialog.list, open: true } })
            }
          >
            Create List
          </Button>
        </div>
      </div>
      <div className="board-view__body"></div>

      <TaskDialog
        data={dialog.task.data}
        isOpen={dialog.task.open}
        onChange={(data, open) =>
          setDialog({ ...dialog, task: { open, data: data } })
        }
      />
      <ListDialog
        data={dialog.list.data}
        isOpen={dialog.list.open}
        onChange={(data, open) =>
          setDialog({ ...dialog, list: { open, data: data } })
        }
      />
    </div>
  );
};
