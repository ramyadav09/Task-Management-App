import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import { auth } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
const USER_AVATAR =
  "https://avatars.githubusercontent.com/u/145370048?s=48&v=4";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      !isSignInForm ? fullName.current?.value : null
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: USER_AVATAR,
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
          <p className="text-gray-300">Please sign in to your account</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-white">{errorMessage}</p>
            <div className="relative">
              {!isSignInForm && (
                <input
                  ref={fullName}
                  placeholder="Full Name"
                  className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  type="text"
                />
              )}
            </div>
            <div className="relative">
              <input
                ref={email}
                placeholder="Email"
                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                type="email"
              />
            </div>
            <div className="relative">
              <input
                ref={password}
                placeholder="Password"
                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                type="password"
              />
            </div>
          </div>

          <div className="text-right">
            <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300">
              Forgot password?
            </button>
          </div>
        </div>

        <div onClick={handleButtonClick} className="space-y-4">
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          <p className="text-center text-gray-300">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={toggleSignInForm}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
            >
              {!isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
