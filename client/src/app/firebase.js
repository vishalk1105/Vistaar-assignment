import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASHgQq6ZQq_s6uttFNg3OyRdrybXNAoGA",
  authDomain: "vistaar-assignment.firebaseapp.com",
  projectId: "vistaar-assignment",
  storageBucket: "vistaar-assignment.appspot.com",
  messagingSenderId: "499769708564",
  appId: "1:499769708564:web:c4539ea29705a5b5679701",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
