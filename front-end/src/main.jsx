import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ7K5ot-C-B7ztX1PLGZ_Zo-vhHfRPGxE",
  authDomain: "full-stack-react-840a9.firebaseapp.com",
  projectId: "full-stack-react-840a9",
  storageBucket: "full-stack-react-840a9.firebasestorage.app",
  messagingSenderId: "1005954946265",
  appId: "1:1005954946265:web:65ecd39fc07d120153dac8",
  measurementId: "G-7WY5PBXBLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
