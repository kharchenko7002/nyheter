import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO6ZFpjE3ZYgZcz97XoL4GNWm8U9QAyY4",
  authDomain: "nyhetssjekk.firebaseapp.com",
  projectId: "nyhetssjekk",
  storageBucket: "nyhetssjekk.appspot.com",
  messagingSenderId: "1053070464132",
  appId: "1:1053070464132:web:xxx"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
