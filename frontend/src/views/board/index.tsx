import "./styles.scss";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { TaskDialog } from "@/components/advanced/ce-task-dialog";
import { ListDialog } from "@/components/advanced/ce-list-dialog";
import { getItemListServer } from "@/server/list/get-item-list";
import {
  type CEItemListRequestBodyI,
  type ItemListI,
} from "@/server/list/types";
import { type ItemI, type ItemTaskI } from "@/server/item/types";
import { getItemsServer } from "@/server/item/get-items";
import { CEItemListServer } from "@/server/list/ce-item-list";

const SortableItemList = ({
  id,
  name,
  tasks,
  onTaskRequestToEdit,
}: {
  tasks: ItemTaskI[];
  id: number;
  name: string;
  onTaskRequestToEdit: (task: ItemTaskI) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="board-view__body__list"
      key={id}
      ref={setNodeRef}
      style={styles}
    >
      <div
        className="board-view__body__list--title"
        {...attributes}
        {...listeners}
      >
        {name}
      </div>
      <div className="board-view__body__list__tasks">
        {tasks
          .filter((task) => task.itemList && task.itemList.id === id)
          .map((task) => (
            <div
              onClick={() => onTaskRequestToEdit(task)}
              className="board-view__body__list__tasks--item"
              key={task.id}
            >
              {task.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export const BoardView = () => {
  const [tasks, setTasks] = useState<ItemTaskI[]>([]);
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
        position: 1,
      },
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getServerData = async () => {
    const [itemLists, tasks] = await Promise.all([
      getItemListServer(),
      getItemsServer("Task"),
    ]);

    setItemLists(itemLists.data);
    setTasks(tasks.data as ItemTaskI[]);
  };

  useEffect(() => {
    getServerData();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeList = itemLists.find(
        (list) => list.id === active.id
      ) as ItemListI;

      const overList = itemLists.find(
        (list) => list.id === over.id
      ) as ItemListI;

      await CEItemListServer({
        ...activeList,
        position: overList.position,
      });

      const { data } = await getItemListServer();

      setItemLists(data);
    }
  };

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
      <div className="board-view__body">
        <DndContext
          modifiers={[restrictToHorizontalAxis]}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={itemLists.map((item) => item.id)}
            strategy={horizontalListSortingStrategy}
          >
            {itemLists
              .sort((a, b) => a.position - b.position)
              .map((list) => {
                return (
                  <SortableItemList
                    id={list.id}
                    name={list.name}
                    tasks={tasks}
                    key={list.id}
                    onTaskRequestToEdit={(task) =>
                      setDialog({
                        ...dialog,
                        task: {
                          open: true,
                          data: task,
                        },
                      })
                    }
                  />
                );
              })}
          </SortableContext>
        </DndContext>
      </div>
      <TaskDialog
        data={dialog.task.data}
        itemLists={itemLists}
        isOpen={dialog.task.open}
        onChange={(data) =>
          setDialog({ ...dialog, task: { ...dialog.task, data: data } })
        }
        onDialogRequestToClose={() => {
          setDialog({ ...dialog, task: { ...dialog.task, open: false } });
          getServerData();
        }}
      />
      <ListDialog
        data={dialog.list.data}
        isOpen={dialog.list.open}
        onChange={(data) =>
          setDialog({ ...dialog, list: { open: dialog.list.open, data: data } })
        }
        onDialogRequestToClose={() => {
          setDialog({
            ...dialog,
            list: { open: false, data: dialog.list.data },
          });
          getServerData();
        }}
      />
    </div>
  );
};
