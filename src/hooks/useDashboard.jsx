import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  addTask,
  setSelectedProjectId,
} from "../slices/dashboardSlice";

const useDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [isForm, setIsForm] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [projectError, setProjectError] = useState("");

  const dispatch = useDispatch();
  const { projects, selectedProjectId } = useSelector(
    (state) => state.dashboard
  );
  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const tasks = selectedProject?.tasks || [];

  const todo = tasks.filter((task) => task.todo);
  const inProgress = tasks.filter((task) => task.inProgress);
  const completed = tasks.filter((task) => task.completed);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProjectId) {
      setErrorMessages("Please select a project first.");
      return;
    }

    if (title && description && dueDate) {
      dispatch(
        addTask({
          id: Date.now(),
          title,
          description,
          dueDate,
          todo: true,
          inProgress: false,
          completed: false,
          projectId: selectedProjectId,
        })
      );

      // Reset form & close
      setTitle("");
      setDescription("");
      setDueDate("");
      setErrorMessages("");
      setIsForm(false);
    } else {
      setErrorMessages("Enter all the fields");
    }
  };

  const handleProjectChange = (projectId) => {
    dispatch(setSelectedProjectId(projectId));
    setIsForm(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    setErrorMessages("");
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      const newId = Date.now();
      dispatch(
        addProject({
          id: newId,
          name: newProjectName,
          tasks: [],
        })
      );
      dispatch(setSelectedProjectId(newId)); // auto-select new project
      setNewProjectName("");
      setIsProjectFormOpen(false);
      setProjectError("");
    } else {
      setProjectError("Project name cannot be empty.");
    }
  };

  return {
    // State
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
    projects,
    selectedProjectId,
    isProjectFormOpen,
    setIsProjectFormOpen,
    newProjectName,
    setNewProjectName,
    projectError,
    // Functions
    handleSubmit,
    handleProjectChange,
    handleProjectSubmit,
  };
};

export default useDashboard;
