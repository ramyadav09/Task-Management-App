import React, { useState, useRef, useEffect } from "react";
import { FiClock, FiArrowRightCircle, FiCheckCircle } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { updateTaskStatus, removeTask } from "../slices/dashboardSlice";

const TaskCard = ({ task, type, projectsId }) => {
  const dispatch = useDispatch();

  // local state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  // refs
  const menuRef = useRef(null);
  const formRef = useRef(null);

  // don't render if not in project
  if (task.projectId !== projectsId) return null;

  // keep local state synced with prop changes — BUT don't overwrite while editing this task
  useEffect(() => {
    if (editingTaskId !== task.id) {
      setEditedTitle(task.title);
      setEditedDescription(task.description);
    }
  }, [task, editingTaskId]);

  // close menu / edit-form on outside click (re-create handler when `task` changes so resets use latest values)
  useEffect(() => {
    const handleClickOutside = (e) => {
      // close dropdown if clicking outside of menu button/menu
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }

      // if the edit form is open and click happens outside it, cancel editing & reset fields
      if (formRef.current && !formRef.current.contains(e.target)) {
        setEditingTaskId(null);
        handleCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [task]);

  // button config
  const getButtonConfig = () => {
    switch (type) {
      case "todo":
        return {
          text: "In Progress",
          icon: <FiArrowRightCircle />,
          color: "text-blue-400",
        };
      case "inProgress":
        return {
          text: "Done",
          icon: <FiCheckCircle />,
          color: "text-yellow-400",
        };
      default:
        return null;
    }
  };
  const buttonConfig = getButtonConfig();

  // handlers
  const handleSave = () => {
    dispatch(
      updateTaskStatus({
        taskId: task.id,
        title: editedTitle,
        description: editedDescription,
      })
    );
    setEditingTaskId(null);
    setIsMenuOpen(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditingTaskId(null);
  };

  // If this task is being edited, show the edit form (attach ref for outside-click)
  if (editingTaskId === task.id) {
    return (
      <div
        ref={formRef}
        className="w-full max-w-md p-5 bg-white/5 rounded-2xl shadow-md space-y-4"
      >
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-200"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Enter task details..."
          className="w-full min-h-[140px] px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-200 resize-none"
        />
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition-all duration-200"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  // Normal card view
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:scale-[1.01]">
      <div className="flex justify-between items-start">
        <h3
          className={`text-xl font-semibold tracking-tight ${
            type === "completed" ? "text-gray-400 line-through" : "text-white"
          }`}
        >
          {task.title}
        </h3>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Open task menu"
          >
            <HiOutlineDotsVertical className="text-gray-400" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg z-10">
              <div className="p-2 space-y-1">
                <button
                  onClick={() => {
                    // open edit mode for this task; set fields fresh and close menu
                    setEditingTaskId(task.id);
                    setEditedTitle(task.title);
                    setEditedDescription(task.description);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
                >
                  ✏️ Edit Task
                </button>

                <button
                  onClick={() => {
                    dispatch(removeTask({ taskId: task.id }));
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  🗑️ Delete Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p
        className={`text-base leading-relaxed ${
          type === "completed" ? "text-gray-500" : "text-gray-300"
        }`}
      >
        {task.description}
      </p>

      <div className="flex justify-between items-center pt-2">
        <div
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full ${
            type === "completed"
              ? "bg-green-500/10 text-green-400"
              : "bg-indigo-500/10 text-indigo-400"
          }`}
        >
          <FiClock className="text-base" />
          <span>
            {type === "completed"
              ? `Completed on ${task.dueDate}`
              : `Due: ${task.dueDate}`}
          </span>
        </div>

        {buttonConfig && (
          <button
            onClick={() =>
              dispatch(
                updateTaskStatus({
                  taskId: task.id,
                  status: type === "todo" ? "inProgress" : "completed",
                })
              )
            }
            className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-all duration-300 active:scale-95"
          >
            {buttonConfig.icon}
            <span>{buttonConfig.text}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
