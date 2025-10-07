import { createSlice } from "@reduxjs/toolkit";

// 1️⃣ Sidebar slice
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebar: false,
    pageName: "Dashboard",
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
  },
});

export const { toggleSidebar, setPageName } = sidebarSlice.actions;
export default sidebarSlice.reducer;
