import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../slices/sidebarSlice";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../slices/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useEffect } from "react";
const Navbar = () => {
  const dispatch = useDispatch();
  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };
  const sidebarOpen = useSelector((store) => store.sidebar.sidebar);
  const user = useSelector((store) => store.user);
  const pageName = useSelector((store) => store.sidebar.pageName);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });

    //unsubscribe when components unmount.
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
      <div className="bg-gray-900/95 fixed z-10 w-full  backdrop-blur-lg border-b border-gray-700 shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSidebar}
            className="p-3 rounded-xl !bg-gray-800 hover:!bg-gray-700 border border-gray-600 transition-all duration-300 transform hover:scale-105 flex flex-col space-y-1.5"
          >
            <div className="w-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full h-0.5"></div>
            <div className="w-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full h-0.5"></div>
            <div className="w-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full h-0.5"></div>
          </button>

          <div className="flex items-center space-x-3">
            <h2 className="font-bold text-3xl  bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ProPlanner
            </h2>
            <h4
              className={`mt-2 ${
                sidebarOpen ? "hidden" : "block"
              } text-gray-300 font-medium text-lg`}
            >
              {pageName}
            </h4>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="user" 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:ring-4 transition-all duration-300 transform hover:scale-105" 
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-gray-600 hover:ring-4 transition-all duration-300 transform hover:scale-105">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}

          <button
            onClick={handleSignOut}
            className="!bg-gray-800 hover:!bg-gray-700 border border-gray-600 text-white hover:text-blue-200 font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
  );
};
export default Navbar;
