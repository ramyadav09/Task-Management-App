import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import store from "./slices/appStore";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Provider store={store}>
        <Navbar />
        <div className="flex relative left-16 w-[95%]">
          <Sidebar />
          <main className="flex-1 p-6 pt-24 transition-all duration-300">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </Provider>
    </div>
  );
}

export default App;
