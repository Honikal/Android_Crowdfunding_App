// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJEc8sEqidHOjoLtOT01Y8ipkO2buQR8o",
  authDomain: "crowd-funding-app-46230.firebaseapp.com",
  databaseURL: "https://crowd-funding-app-46230-default-rtdb.firebaseio.com",
  projectId: "crowd-funding-app-46230",
  storageBucket: "crowd-funding-app-46230.appspot.com",
  messagingSenderId: "283620534285",
  appId: "1:283620534285:web:45b452e5005bac6b6b4d44",
  measurementId: "G-7P8V5JGFHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;
