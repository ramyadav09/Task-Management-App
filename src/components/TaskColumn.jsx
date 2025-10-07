import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, type, children, projectsId }) => {
  return (
    <div className="w-full flex flex-col bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-6 rounded-2xl">
      <div className="w-full text-center pb-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="w-full mt-6 space-y-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              type={type}
              projectsId={projectsId}
            />
          ))
        ) : (
          <div className="w-full text-center text-gray-400 text-base py-10">
            <p>No tasks in this column yet.</p>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default TaskColumn;
