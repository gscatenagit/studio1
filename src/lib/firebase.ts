import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "casal-prspero",
  appId: "1:483500512220:web:5fd1010f0875c67790b519",
  storageBucket: "casal-prspero.firebasestorage.app",
  apiKey: "AIzaSyCz_KkEwhpKoS8Y-Gz9ug57_8C_cURl47o",
  authDomain: "casal-prspero.firebaseapp.com",
  messagingSenderId: "483500512220",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
