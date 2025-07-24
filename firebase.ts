import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQUTNQvWkYWj_2RxFXUn2-UXayYiGp29A",
  authDomain: "letterlater-1495f.firebaseapp.com",
  projectId: "letterlater-1495f",
  storageBucket: "letterlater-1495f.firebasestorage.app",
  messagingSenderId: "7796274943",
  appId: "1:7796274943:web:538802acf97a2401e5feca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
