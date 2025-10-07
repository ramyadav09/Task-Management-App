// router.js
import { createBrowserRouter } from "react-router-dom";
import { createElement } from "react";
import { Provider } from "react-redux";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import store from "../slices/appStore";
import Tasks from "../pages/Tasks";
import Settings from "../pages/Settings";
import Projects from "../pages/Projects";

const router = createBrowserRouter([
  {
    path: "/login",
    element: createElement(Provider, { store }, createElement(Login)),
  },
  {
    path: "/",
    element: createElement(App),
    children: [
      { index: true, element: createElement(Dashboard) },
      { path: "dashboard", element: createElement(Dashboard) },
      { path: "tasks", element: createElement(Tasks) },
      { path: "settings", element: createElement(Settings) },
      { path: "projects", element: createElement(Projects) },
      { path: "*", element: createElement(Dashboard) },
    ],
  },
  {
    path: "*",
    element: createElement(Provider, { store }, createElement(Login)),
  },
]);

export default router;
