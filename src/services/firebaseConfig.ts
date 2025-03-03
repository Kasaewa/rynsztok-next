// src/services/FirebaseConfig.ts

import { initializeApp, getApp, getApps } from "firebase/app"; // Import functions to manage multiple Firebase apps
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicjalizacja Firebase tylko po stronie klienta (wymaga sprawdzenia, czy aplikacja jest już zainicjowana)
if (typeof window !== "undefined" && !getApps().length) {
  initializeApp(firebaseConfig);  // Inicjalizuj Firebase, jeśli aplikacja nie została wcześniej zainicjowana
}

const app = getApp();  // Jeśli Firebase już jest zainicjowane, pobierz istniejącą instancję
const auth = getAuth(app);
const db = getFirestore(app);

// Funkcja logowania użytkownika
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login failed", error);
    throw new Error("Login failed");
  }
};

// Funkcja rejestracji użytkownika
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Registration failed", error);
    throw new Error("Registration failed");
  }
};

// Funkcja do zapisu nickname do Firestore
export const addUserNickname = async (userId: string, nickname: string) => {
  try {
    await addDoc(collection(db, "users"), {
      userId,
      nickname,
      createdAt: new Date(),
    });
    console.log("Nickname zapisany do Firestore!");
  } catch (error) {
    console.error("Błąd zapisu nickname'a:", error);
  }
};

// Funkcja wylogowywania
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Wylogowano pomyślnie");
  } catch (error) {
    console.error("Błąd podczas wylogowywania:", error);
  }
};

// Eksportujemy instancję auth i db na wypadek potrzeby w innych plikach
export { auth, db, collection, addDoc };
