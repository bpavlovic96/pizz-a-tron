import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG).apiKey,
  authDomain: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG).authDomain,
  projectId: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG).projectId,
  storageBucket: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG).storageBucket,
  messagingSenderId: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)
    .messagingSenderId,
  appId: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG).appId,
  measurementId: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG).measurementId,
  databaseURL:
    "https://pizz-a-tron-115fa-default-rtdb.europe-west1.firebasedatabase.app/",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase();

export default firebaseApp;
