"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../services/firebaseConfig";
//import { getAuth, onAuthStateChanged, User } from "firebase/auth";
//import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import styles from "./styles/CompleteRegistrationView.module.scss";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";


const CompleteRegistration = () => {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  //const auth = getAuth();
  //const db = getFirestore();

  
  // Pobieranie zalogowanego użytkownika
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Jeśli użytkownik nie jest zalogowany, przekieruj
      } else {
        setUser(currentUser);

        // Sprawdź, czy użytkownik ma już zapisany nickname
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname);
        }
      }
    });
    

    return () => unsubscribe(); // Oczyszczenie subskrypcji
  }, [auth, router, db]);



  const handleSaveNickname = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !nickname.trim()) return;

    setLoading(true);

    try {
      // Zapisanie nickname do Firestore
      await setDoc(doc(db, "users", user.uid), {
        nickname,
        userId: user.uid,
      });

      // Przekierowanie na HelloPage
      router.push("/hellopage");
    } catch (error) {
      console.error("Błąd przy zapisie nickname:", error);
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <section className={styles.registrationPage}>
      <h1 className={styles.title}>Legendy Rynsztoka</h1>
      <h2 className={styles.title2}>Jak Cię zwą?</h2>
      
      <form onSubmit={handleSaveNickname} className={styles.inputNameContainer}>
        <input
          className={styles.formContainer}
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Wpisz swój nickname"
          required
        />
        
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Zapisywanie..." : "Dalej"}
        </button>
      </form>
    </section>
  );
};

export default CompleteRegistration;
