// src/services/FirebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqe8FIF5iZJXj9NhUfG3jF-3teHD0V2nM",
  authDomain: "legendy-rynsztoka.firebaseapp.com",
  projectId: "legendy-rynsztoka",
  storageBucket: "legendy-rynsztoka.firebasestorage.app",
  messagingSenderId: "220637483565",
  appId: "1:220637483565:web:a99b269a7ee0f7d86cdea4",
  measurementId: "G-CCRTPBTH6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Funkcja logowania użytkownika
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Zwróć obiekt użytkownika
  } catch (error) {
    console.error("Login failed", error);
    throw new Error("Login failed");
  }
};

// Funkcja rejestracji użytkownika
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Zwróć obiekt użytkownika
  } catch (error) {
    console.error("Registration failed", error);
    throw new Error("Registration failed");
  }
};
