// firebase.js
import { initializeApp } from 'firebase/app';  // firebase/app'i import ediyoruz
import { getAuth } from 'firebase/auth';  // firebase/auth'i import ediyoruz
import { getAnalytics } from 'firebase/analytics'; // firebase/analytics import ediyoruz

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};

// Firebase'i initialize et
const app = initializeApp(firebaseConfig);

// Auth ve Analytics'i al
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };  // auth ve analytics'i dışa aktar
