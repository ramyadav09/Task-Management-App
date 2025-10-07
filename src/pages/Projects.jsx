import React from "react";
import TaskCard from "../components/TaskCard";
import { useSelector } from "react-redux";

const Projects = () => {
  const projects = useSelector((store) => store.dashboard.projects);

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-white ">Projects</h1>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="
            bg-gray-700/50 border border-gray-600 rounded-xl p-6 space-y-4"
          >
            <h2 className="text-2xl text-center font-semibold text-white">
              {project.name}
            </h2>

            {project.tasks.length === 0 ? (
              <p className="text-gray-300 text-center text-sm">No tasks yet.</p>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex-shrink-0 w-full sm:w-[300px] md:w-[30%]"
                  >
                    <TaskCard
                      task={task}
                      type={
                        task.todo
                          ? "todo"
                          : task.inProgress
                          ? "inProgress"
                          : "completed"
                      }
                      projectsId={project.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
