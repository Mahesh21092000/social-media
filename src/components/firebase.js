import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYP2IMr_e8uLH6KMQJ2WFpjaD3OChmEt0",
  authDomain: "login-f6291.firebaseapp.com",
  databaseURL: "https://login-f6291-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "login-f6291",
  storageBucket: "login-f6291.firebasestorage.app",
  messagingSenderId: "489972590527",
  appId: "1:489972590527:web:77b550e7676a820ccbe30a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, db, database, storage };
