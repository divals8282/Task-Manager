import { TMServerClient } from "@/server-client";

export const moveTaskToListServer = (taskId: number, listId: number) =>
  TMServerClient.post("/actions/move-task-to-list", {
    taskId,
    listId,
  });
