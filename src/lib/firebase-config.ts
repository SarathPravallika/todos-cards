import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyC57y3i0CbMz0gdhjBcDyB011PA4coS_ag",
  authDomain: "todos-sarath.firebaseapp.com",
  projectId: "todos-sarath",
  storageBucket: "todos-sarath.appspot.com",
  messagingSenderId: "1045794272925",
  appId: "1:1045794272925:web:5b550439b5bde8f4fb8674",
  measurementId: "G-4JZJDLT7CH",
});

const db = getFirestore(app);

export default db;
