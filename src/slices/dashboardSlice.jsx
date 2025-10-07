import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    projects: [
      {
        id: 1,
        name: "Website Redesign",
        tasks: [
          {
            id: 1,
            title: "Gather Requirements",
            projectId: 1,
            description:
              "Meet with the client to gather requirements and goals for the new website.",
            dueDate: "2025-05-05",
            todo: true,
            inProgress: false,
            completed: false,
          },
          {
            id: 2,
            title: "Create Wireframes",
            projectId: 1,
            description:
              "Design wireframes for all main pages and get approval from stakeholders.",
            dueDate: "2025-05-10",
            todo: false,
            inProgress: true,
            completed: false,
          },
          {
            id: 3,
            title: "Develop Homepage",
            projectId: 1,
            description:
              "Implement the homepage based on approved wireframes and design assets.",
            dueDate: "2025-05-15",
            todo: false,
            inProgress: false,
            completed: true,
          },
          {
            id: 4,
            title: "Test Website",
            projectId: 1,
            description:
              "Perform QA testing across different devices and browsers.",
            dueDate: "2025-05-20",
            todo: true,
            inProgress: false,
            completed: false,
          },
        ],
      },
      {
        id: 2,
        name: "Mobile App Development",
        tasks: [
          {
            id: 5,
            title: "Define App Features",
            projectId: 2,
            description:
              "List all essential app features and prioritize the MVP.",
            dueDate: "2025-06-01",
            todo: true,
            inProgress: false,
            completed: false,
          },
          {
            id: 6,
            title: "Design UI Mockups",
            projectId: 2,
            description: "Create user interface mockups for the main screens.",
            dueDate: "2025-06-07",
            todo: false,
            inProgress: true,
            completed: false,
          },
          {
            id: 7,
            title: "Setup Backend API",
            projectId: 2,
            description:
              "Create RESTful API endpoints for user authentication and data handling.",
            dueDate: "2025-06-15",
            todo: false,
            inProgress: false,
            completed: true,
          },
        ],
      },
      {
        id: 3,
        name: "Marketing Campaign",
        tasks: [
          {
            id: 8,
            title: "Define Campaign Goals",
            projectId: 3,
            description: "Set objectives and KPIs for the marketing campaign.",
            dueDate: "2025-07-01",
            todo: true,
            inProgress: false,
            completed: false,
          },
          {
            id: 9,
            title: "Create Social Media Content",
            projectId: 3,
            description:
              "Prepare graphics, videos, and posts for all platforms.",
            dueDate: "2025-07-05",
            todo: false,
            inProgress: true,
            completed: false,
          },
          {
            id: 10,
            title: "Launch Campaign",
            projectId: 3,
            description: "Execute the campaign and monitor engagement.",
            dueDate: "2025-07-10",
            todo: false,
            inProgress: false,
            completed: true,
          },
        ],
      },
    ],

    selectedProjectId: 1,
  },
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    addTask: (state, action) => {
      const task = action.payload;
      const project = state.projects.find(
        (p) => p.id === (task.projectId || state.selectedProjectId)
      );
      if (project) project.tasks.push(task);
    },
    removeTask: (state, action) => {
      const { taskId } = action.payload;
      const project = state.projects.find((p) =>
        p.tasks.some((t) => t.id === taskId)
      );
      if (project) project.tasks = project.tasks.filter((t) => t.id !== taskId);
    },
    updateTaskStatus: (state, action) => {
      const { taskId, status, title, description } = action.payload;

      const project = state.projects.find((p) =>
        p.tasks.some((t) => t.id === taskId)
      );

      if (project) {
        const task = project.tasks.find((t) => t.id === taskId);
        if (task) {
          // ✅ Update status if provided
          if (status) {
            task.todo = false;
            task.inProgress = false;
            task.completed = false;
            task[status] = true;
          }

          // ✅ Update title and description if provided
          if (title !== undefined) task.title = title;
          if (description !== undefined) task.description = description;
        }
      }
    },

    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
  },
});

export const {
  addProject,
  addTask,
  removeTask,
  updateTaskStatus,
  setSelectedProjectId,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
