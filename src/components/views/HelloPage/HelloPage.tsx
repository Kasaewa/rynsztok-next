"use client";

import styles from "./styles/HelloPageView.module.scss";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth"; // Używamy auth, które zostało zainicjalizowane w firebaseConfig
import { useState, useEffect } from "react";
import { auth, db } from "../../../services/firebaseConfig"; // Importujemy auth i db z firebaseConfig
import { doc, getDoc } from "firebase/firestore"; // Importujemy getDoc z Firestore

const HelloPage = () => {
  const router = useRouter();
  
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | null>(null); // Stan do przechowywania nickname
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sprawdzamy, czy użytkownik jest zalogowany
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Jeśli użytkownik nie jest zalogowany, przekierowujemy na stronę logowania
      } else {
        setUser(currentUser);
        // Pobieramy nickname z Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setNickname(userData?.nickname || "Brak nickname'a"); // Ustawiamy nickname w stanie
        } else {
          setNickname("Brak nickname'a");
        }
      }
    });

    return () => unsubscribe(); // Oczyszczenie subskrypcji przy odmontowywaniu komponentu
  }, [router]);

  async function handleLogout() {
    setLoading(true);
    setError(null); // Resetowanie błędów przed wylogowaniem
    try {
      await signOut(auth); // Wylogowanie z Firebase
      router.push("/login"); // Przekierowanie do logowania po wylogowaniu
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      setError("Wystąpił błąd przy wylogowywaniu. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.hellopage}>
      <h1 className={styles.title}>Legendy Rynsztoka</h1>

      {user && (
        <div className={styles.downContainer}>
          <p>Cześć {nickname} - wszedłeś na własne ryzyko!</p>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div>
        <button onClick={handleLogout} disabled={loading}>
          {loading ? "Wylogowywanie..." : "Wyloguj"}
        </button>
      </div>
    </section>
  );
};

export default HelloPage;
