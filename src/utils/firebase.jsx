import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHrlJAutXTAfmzjOFH8lcYWucgJ06IJpI",
  authDomain: "netflixgpt-e52e1.firebaseapp.com",
  projectId: "netflixgpt-e52e1",
  storageBucket: "netflixgpt-e52e1.firebasestorage.app",
  messagingSenderId: "818544641720",
  appId: "1:818544641720:web:444c76782ccf6bc8d6164d",
  measurementId: "G-L0GHBRW3JK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
