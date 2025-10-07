import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setPageName } from "./../slices/sidebarSlice";
import { NavLink } from "react-router-dom";
import { navItems } from "../utils/constants";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((store) => store.sidebar.sidebar);

  return (
    <aside
      className={`fixed top-0 left-0 z-50 ${
        sidebarOpen ? "w-[25%] px-6" : "w-[6.5%] top-20 px-2"
      } h-screen flex flex-col overflow-y-auto bg-gray-900/95 backdrop-blur-lg border-r border-gray-700 shadow-2xl py-8 transition-all duration-300 ease-in-out`}
    >
      {sidebarOpen && (
        <div className="flex items-center justify-between border-b border-gray-700 pb-6 mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ProPlanner
          </h2>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>
      )}

      <nav className="flex flex-1 flex-col space-y-3">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.key}
            onClick={() => {
              dispatch(setPageName(item.name));
              if (sidebarOpen) dispatch(toggleSidebar());
            }}
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-5 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 group ${
                isActive
                  ? "bg-gray-800/70 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/70"
              }`
            }
          >
            <span className={` ${!sidebarOpen ? "text-xl" : ""}`}>
              {item.icon}
            </span>
            {sidebarOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
