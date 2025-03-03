"use client"
// src/services/FirebaseConfig.ts

import { initializeApp, getApps, getApp  } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
console.log("FIREBASE CONFIG:", firebaseConfig);
// Inicjalizacja Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Funkcja logowania użytkownika
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Sprawdzamy, czy e-mail został zweryfikowany
    if (!user.emailVerified) {
      throw new Error("E-mail nie został zweryfikowany. Sprawdź swoją skrzynkę pocztową.");
    }

    return user;
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Login failed", error);
    throw new Error("Login failed: " + error.message);
  } else {
    console.error("Login failed", error);
    throw new Error("Login failed: Unknown error");
  }
}
};

// Funkcja rejestracji użytkownika
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Wysyłanie e-maila weryfikacyjnego
    await sendEmailVerification(user);
    console.log("Rejestracja zakończona. Wysłano e-mail weryfikacyjny!");

    return user;
  } catch (error) {
    console.error("Registration failed", error);
    throw new Error("Registration failed");
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

export { auth, db, collection, addDoc };
