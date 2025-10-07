import { MdDashboard } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
export const navItems = [
  {
    name: "Dashboard",
    key: "dashboard",
    icon: <MdDashboard />,
    path: "/dashboard",
  },
  {
    name: "Projects",
    key: "projects",
    icon: <GrProjects />,
    path: "/projects",
  },
  {
    name: "Tasks",
    key: "tasks",
    icon: <FaTasks />,
    path: "/tasks",
  },
  {
    name: "Settings",
    key: "settings",
    icon: <IoIosSettings />,
    path: "/settings",
  },
];
