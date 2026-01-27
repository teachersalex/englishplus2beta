/**
 * firebase.js
 * Configuração central do Firebase
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5gv94YdFWlQGHW-1LGrylOMDSoVgfrAw",
  authDomain: "englishplus-d5d6d.firebaseapp.com",
  projectId: "englishplus-d5d6d",
  storageBucket: "englishplus-d5d6d.firebasestorage.app",
  messagingSenderId: "365620423010",
  appId: "1:365620423010:web:26a32b4ed35cb724d6e43b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
