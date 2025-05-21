import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAO6ZFpjE3ZYgZcz97XoL4GNWm8U9QAyY4",
  authDomain: "nyhetssjekk.firebaseapp.com",
  projectId: "nyhetssjekk",
  storageBucket: "nyhetssjekk.firebasestorage.app",
  messagingSenderId: "1053070464132",
  appId: "1:1053070464132:web:3ea875b59e21950f039ed1",
  measurementId: "G-L33WGZH35K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
