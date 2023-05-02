// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwaQifN5-sPjmzkGnokkaZ8XkJV7O2SDA",
  authDomain: "parkfindremind.firebaseapp.com",
  projectId: "parkfindremind",
  storageBucket: "parkfindremind.appspot.com",
  messagingSenderId: "514293633890",
  appId: "1:514293633890:web:247e18f01e5b930550523b",
  measurementId: "G-9E5TXZRNWR",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// potentially delete the line below if not needed
// export const analytics = getAnalytics(FIREBASE_APP);
