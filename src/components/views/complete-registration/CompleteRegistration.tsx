"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../services/firebaseConfig";
import styles from "./styles/CompleteRegistrationView.module.scss";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CompleteRegistration = () => {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(""); // Stan dla płci
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
    if (!user || !nickname.trim() || !gender) return; // Upewnij się, że płeć jest wybrana

    setLoading(true);

    try {
      // Przypisanie odpowiedniego avatara w zależności od płci
      const avatarUrl =
        gender === "M"
          ? "/images/avatar_male.png" // Ścieżka do awatara mężczyzny
          : "/images/avatar_female.png"; // Ścieżka do awatara kobiety

      // Zapisanie nickname, płci i avatara do Firestore
      await setDoc(doc(db, "users", user.uid), {
        nickname,
        gender,
        avatar: avatarUrl,
        userId: user.uid,
      });

      // Przekierowanie na HelloPage
      router.push("/hellopage");
    } catch (error) {
      console.error("Błąd przy zapisie danych:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.registrationPage}>
      <h1 className={styles.title}>Legendy Rynsztoka</h1>
      <div className={styles.completeBox}>
      <h2 className={styles.title2}>Nazwij swojego żula!</h2>

      <form onSubmit={handleSaveNickname} className={styles.inputNameContainer}>
        <input
          className={styles.formContainer}
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Wpisz imię dla żula"
          required
        />

        {/* Wybór płci */}
        <div className={styles.genderSelection}>
          <h2 className={styles.title2}>Wybierz płeć dla żula!</h2>
          <label className={styles.gender}>
            <input
              type="radio"
              value="M"
              checked={gender === "M"}
              onChange={() => setGender("M")}
            />
            Mężczyzna
          </label>
          <label className={styles.gender}>
            <input
              type="radio" 
              value="K"
              checked={gender === "K"}
              onChange={() => setGender("K")}
            />
            Kobieta
          </label>
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Zapisywanie..." : "Dalej"}
        </button>
        </form>
        </div>
    </section>
  );
};

export default CompleteRegistration;