
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aiinterview-c6812.firebaseapp.com",
  projectId: "aiinterview-c6812",
  storageBucket: "aiinterview-c6812.firebasestorage.app",
  messagingSenderId: "654779541950",
  appId: "1:654779541950:web:17875e8069da364d40f1ef"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }