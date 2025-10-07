import React, { useEffect } from "react";
import TaskColumn from "../components/TaskColumn";
import TaskForm from "../components/TaskForm";
import useDashboard from "../hooks/useDashboard";
import ProjectForm from "./ProjectForm";
import { FaChevronDown, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    errorMessages,
    isForm,
    setIsForm,
    todo,
    inProgress,
    completed,
    selectedProjectId,
    handleSubmit,
    projects,
    handleProjectChange,
    isProjectFormOpen,
    setIsProjectFormOpen,
    newProjectName,
    setNewProjectName,
    projectError,
    handleProjectSubmit,
  } = useDashboard();

  // 🧠 Reset add-task form when project changes
  useEffect(() => {
    setIsForm(false);
  }, [selectedProjectId]);

  return (
    <div>
      {/* New Project Modal */}
      {isProjectFormOpen ? (
        <ProjectForm
          newProjectName={newProjectName}
          setNewProjectName={setNewProjectName}
          handleProjectSubmit={handleProjectSubmit}
          setIsProjectFormOpen={setIsProjectFormOpen}
          projectError={projectError}
        />
      ) : (
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                Project Dashboard
              </h1>
              <p className="text-gray-400">
                Manage your tasks and projects efficiently
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <select
                  value={selectedProjectId || ""}
                  onChange={(e) => handleProjectChange(Number(e.target.value))}
                  className="appearance-none cursor-pointer bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl px-6 py-3 pr-12 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 min-w-[200px]"
                >
                  {projects.length === 0 ? (
                    <option value="" disabled>
                      No projects yet
                    </option>
                  ) : (
                    projects.map((project) => (
                      <option
                        key={project.id}
                        value={project.id}
                        className="bg-gray-800 text-white"
                      >
                        {project.name}
                      </option>
                    ))
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300">
                  <FaChevronDown className="h-4 w-4" />
                </div>
              </div>

              <button
                onClick={() => setIsProjectFormOpen(true)}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                <FaPlus className="h-4 w-4" />
                <span>New Project</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">
                    Total Tasks
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {todo.length + inProgress.length + completed.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-600/10 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {inProgress.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {completed.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Task Columns (using Flex now) */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <TaskColumn
                title="Todo"
                tasks={todo}
                projectsId={selectedProjectId}
                type="todo"
              >
                {isForm && (
                  <TaskForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    setIsForm={setIsForm}
                    errorMessages={errorMessages}
                    onSubmit={handleSubmit}
                  />
                )}
                {!isForm && (
                  <button
                    onClick={() => setIsForm(true)}
                    disabled={!selectedProjectId}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gradient-to-r disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
                  >
                    <span>+ Add Todo</span>
                  </button>
                )}
              </TaskColumn>
            </div>

            <div className="flex-1">
              <TaskColumn
                title="In Progress"
                tasks={inProgress}
                projectsId={selectedProjectId}
                type="inProgress"
              />
            </div>

            <div className="flex-1">
              <TaskColumn
                title="Completed"
                tasks={completed}
                projectsId={selectedProjectId}
                type="completed"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
