// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase-configuratie (authenticatie blijft actief)
const firebaseConfig = {
  apiKey: "AIzaSyBbvJB-qg98LJJCEIPsuNiqxo05_y12cqw",
  authDomain: "realestatecare-abdullah.firebaseapp.com",
  projectId: "realestatecare-abdullah",
  storageBucket: "realestatecare-abdullah.firebasestorage.app",
  messagingSenderId: "521326084040",
  appId: "1:521326084040:web:2f13e9e84f98a70eef0afd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // enkel Auth

export { app, auth };
