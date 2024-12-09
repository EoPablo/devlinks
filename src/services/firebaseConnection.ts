import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEDahptGqO3b1FlG_BOaYgo_RbruLl_o0",
  authDomain: "devlinks-a8463.firebaseapp.com",
  projectId: "devlinks-a8463",
  storageBucket: "devlinks-a8463.firebasestorage.app",
  messagingSenderId: "547072920704",
  appId: "1:547072920704:web:c6dddfc7ac400a64e4ea65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };