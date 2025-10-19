// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHrUZejmvp94l1tSy_PYuHznvW3N_cUyQ",
  authDomain: "coconut-hub-client.firebaseapp.com",
  projectId: "coconut-hub-client",
  storageBucket: "coconut-hub-client.firebasestorage.app",
  messagingSenderId: "715397317335",
  appId: "1:715397317335:web:7c8ad1bfc9a16730162692",
  measurementId: "G-KJHGX70E8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);