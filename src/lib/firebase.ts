import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDukP8QwIhPuM5BNoT2dBRot0dNWgPOGfU",
  authDomain: "loopmark-de961.firebaseapp.com",
  projectId: "loopmark-de961",
  storageBucket: "loopmark-de961.firebasestorage.app",
  messagingSenderId: "320939493127",
  appId: "1:320939493127:web:4ec0fc8f0268efaed1a7a2",
  measurementId: "G-3ZZHHG0ZEM"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
