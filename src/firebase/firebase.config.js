// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjkFihpyQrt2AC09I3KJpvssP5kHYfR2w",
  authDomain: "serene-stays-ab67f.firebaseapp.com",
  projectId: "serene-stays-ab67f",
  storageBucket: "serene-stays-ab67f.appspot.com",
  messagingSenderId: "279352104363",
  appId: "1:279352104363:web:79cdae2123a9218a6a6eee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
