import { createBrowserRouter } from "react-router";
import App from "./App";
import { BoardView, LoginView, RegisterView, NotFoundView } from "./views";
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
        path: "*",
        Component: NotFoundView,
      },
    ],
  },
]);
