import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuKOlhRtpZsRhpBFKKiA8rA5ldc0_2Pbs",
  authDomain: "react-links-a2d78.firebaseapp.com",
  projectId: "react-links-a2d78",
  storageBucket: "react-links-a2d78.firebasestorage.app",
  messagingSenderId: "370911155898",
  appId: "1:370911155898:web:cd19fab990c4b15a0e1483",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
