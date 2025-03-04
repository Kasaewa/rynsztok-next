"use client";

import styles from "./styles/HelloPageView.module.scss";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth"; 
import { useState, useEffect } from "react";
import { auth, db } from "../../../services/firebaseConfig"; 
import { doc, getDoc } from "firebase/firestore"; 

const HelloPage = () => {
  const router = useRouter();
  
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | null>(null); 
  const [gender, setGender] = useState<string | null>(null); // Nowy stan do przechowywania płci
  const [loading, setLoading] = useState(false);
  const [nicknameLoading, setNicknameLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sprawdzanie, czy użytkownik jest zalogowany
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Jeśli użytkownik nie jest zalogowany, przekierowanie do logowania
      } else {
        setUser(currentUser);
        
        try {
          // Pobieranie danych użytkownika (nickname i gender)
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setNickname(userData?.nickname || "Brak nickname'a"); // Ustawienie nickname'a
            setGender(userData?.gender || ""); // Ustawienie płci (M/K)
          } else {
            setNickname("Brak nickname'a"); 
            setGender(""); // Brak danych o płci
          }
        } catch (fetchError) {
          console.error("Błąd przy pobieraniu danych:", fetchError);
          setError("Wystąpił błąd przy ładowaniu danych.");
        } finally {
          setNicknameLoading(false); 
        }
      }
    });

    return () => unsubscribe(); // Czyszczenie subskrypcji przy odmontowywaniu komponentu
  }, [router]);

  // Obsługa wylogowania
  async function handleLogout() {
    setLoading(true);
    setError(null); 
    try {
      await signOut(auth); // Wylogowanie z Firebase
      router.push("/login"); // Przekierowanie do logowania po wylogowaniu
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      setError("Błąd wylogowania. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  }

  // Wybór odpowiedniego awatara na podstawie płci
  const getAvatarUrl = () => {
    if (gender === "M") {
      return "/images/avatar_male.png"; // Ścieżka do awatara mężczyzny
    } else if (gender === "K") {
      return "/images/avatar_female.png"; // Ścieżka do awatara kobiety
    }
    return "/images/avatar_default.png"; // Domyślny awatar, jeśli płeć nie jest ustawiona
  };

  return (

    <section className={styles.hellopage}>
      <div className={styles.helloUpper}>
        <h1 className={styles.title}>Legendy Rynsztoka</h1>
        
        <button onClick={handleLogout} disabled={loading} className={styles.submitButton}>
          {loading ? "Wylogowywanie..." : "Wyloguj"}
        </button>
        </div>
      
      <div className={styles.hellopageContainer}>
        
        <div className={styles.nameavatarContainer}>
          {user && !nicknameLoading ? (
            <p className={styles.nameContainer}>{nickname}</p>
          ) : nicknameLoading ? (
            <p>Ładowanie nicknamea...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : null}

          <img src={getAvatarUrl()} alt="Avatar" className={styles.avatar} />
      </div>
          
        <div className={styles.textContainer}>
          <div className={styles.textBox}>
            <h3 className={styles.titleText}>Dziękuję za rejestrację!</h3>
            <p className={styles.text}>Cieszę się, że dołączasz do mojej społeczności!</p>
          </div>

          <div className={styles.textBox}>
            <h3 className={styles.titleText}>Beta testy – wrzesień 2025</h3>
            <p className={styles.text}>Już niedługo ruszą testy gry. Twoje opinie pomogą mi ją ulepszyć!</p>
          </div>

          <div className={styles.textBox}>
            <h3 className={styles.titleText}>Premiera – styczeń 2026</h3>
            <p className={styles.text}>Pełna wersja gry pojawi się na początku 2026 roku.</p>
          </div>

          <div className={styles.textBox}>
            <h3 className={styles.titleText}>Bądź na bieżąco!</h3>
            <p className={styles.text}>Śledź postępy tworzenia gry na <a href="https://www.youtube.com/playlist?list=PL8CDDbyqrUoaYDPNglkhFDUG50G9NsbjZ" target="_blank" rel="noopener noreferrer">Youtube</a></p>
            <p className={styles.text}>Uczestnicz w głosowaniach i dziel się wrażeniami w <a href="https://www.facebook.com/groups/534397122475254" target="_blank" rel="noopener noreferrer">grupie na Facebooku</a></p>
          </div>

            </div>
      

      
        </div>
    </section>
  );
};

export default HelloPage;
