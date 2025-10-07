import React from "react";

const ProjectForm = ({
  newProjectName,
  setNewProjectName,
  handleProjectSubmit,
  setIsProjectFormOpen,
  projectError,
}) => {
  return (
    <div className="fixed inset-0 bg-black top-29 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <form onSubmit={handleProjectSubmit}>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {projectError && <p className="text-red-500 text-xs mt-1">{projectError}</p>}
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => setIsProjectFormOpen(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;