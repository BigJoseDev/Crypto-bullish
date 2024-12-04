// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

const firebaseConfig = {
  apiKey: "AIzaSyD6Ux93o1qddSYJdn9Plhxy7328ZBAPVzM",
  authDomain: "panteraetf.firebaseapp.com",
  projectId: "panteraetf",
  storageBucket: "panteraetf.firebasestorage.app",
  messagingSenderId: "794319691973",
  appId: "1:794319691973:web:53ba3853a04baecc2cd0ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Auth
const auth = getAuth(app);
export { auth }; // Export auth so it can be used in other files
