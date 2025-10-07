import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import sidebarSliceReducer from "./sidebarSlice";
import dashboardSliceReducer from "./dashboardSlice";
const store = configureStore({
  reducer: {
    user: userSliceReducer,
    sidebar: sidebarSliceReducer,
    dashboard: dashboardSliceReducer,
  },
});
export default store;
