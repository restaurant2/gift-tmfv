import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmL64vfBE43K9zg_7d5iqdIimHncbVz58",
  authDomain: "gift-tmfv.firebaseapp.com",
  projectId: "gift-tmfv",
  storageBucket: "gift-tmfv.firebasestorage.app",
  messagingSenderId: "159663278849",
  appId: "1:159663278849:web:5a70538d543c734e98e900",
  measurementId: "G-0XCYKDBFDV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
