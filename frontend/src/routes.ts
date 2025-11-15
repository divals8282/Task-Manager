import { createBrowserRouter } from "react-router";
import App from "./App";
import {
  BoardView,
  LoginView,
  RegisterView,
  NotFoundView,
  EpicsView,
  StoriesView,
  TasksView,
} from "./views";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "login",
        Component: LoginView,
      },
      {
        path: "register",
        Component: RegisterView,
      },
      {
        path: "board",
        Component: BoardView,
      },
      {
        path: "epics",
        Component: EpicsView,
      },
      {
        path: "stories",
        Component: StoriesView,
      },
      {
        path: "tasks",
        Component: TasksView,
      },
      {
        path: "*",
        Component: NotFoundView,
      },
    ],
  },
]);
