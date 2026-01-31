// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoeRaht--KLzKmwiOLKnQjwiP-QCdWoKs",
  authDomain: "portofolio-lathif.firebaseapp.com",
  projectId: "portofolio-lathif",
  storageBucket: "portofolio-lathif.firebasestorage.app",
  messagingSenderId: "846774759198",
  appId: "1:846774759198:web:07f192dc4ae001ec8aa30f",
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
