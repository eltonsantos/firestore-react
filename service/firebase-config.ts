// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwydrCLrfkkoodmGMNWhvf9G9p0GS_ItI",
  authDomain: "firestore-react-7655d.firebaseapp.com",
  projectId: "firestore-react-7655d",
  storageBucket: "firestore-react-7655d.appspot.com",
  messagingSenderId: "459270503378",
  appId: "1:459270503378:web:61761b82bd722af1d2260b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
