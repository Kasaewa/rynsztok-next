"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Poprawione importowanie
import { loginUser, registerUser } from "../../services/firebaseConfig"; 
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore
import styles from "./styles/LoginView.module.scss";

export const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); 
  const [isRedirecting, setIsRedirecting] = useState(false); // Stan do przekierowania
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Logowanie użytkownika
        await loginUser(email, password);
        setIsRedirecting(true); // Przekierowanie po udanym logowaniu
      } else {
        // Rejestracja użytkownika
        await registerUser(email, password);
        alert("Konto utworzone! Sprawdź swoją skrzynkę pocztową, aby zweryfikować e-mail.");
      }
    } catch (err: unknown) {
  // Sprawdzamy, czy err jest obiektem i czy ma właściwość message
  if (err instanceof Error) {
    setError(err.message || "Błąd: Sprawdź dane logowania.");
  } else {
    // Jeśli to nie jest obiekt Error, to wyświetlamy ogólny komunikat o błędzie
    setError("Błąd: Sprawdź dane logowania.");
  }
}
  };

  // Przekierowanie po zalogowaniu, jeśli weryfikacja e-maila zakończona pomyślnie
  useEffect(() => {
    if (isRedirecting) {
      router.push("/complete-registration"); // Możesz to zmienić na stronę główną lub dashboard
    }
  }, [isRedirecting, router]);

// Przekierowanie po zalogowaniu
  useEffect(() => {
    if (isRedirecting) {
      const checkNickname = async () => {
        const user = auth.currentUser;
        if (user) {
          // Pobieramy dane użytkownika z Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const nickname = userDoc.data().nickname;
            if (nickname) {
              // Jeśli nickname istnieje, przekierowujemy na stronę hellopage
              router.push("/hellopage");
            } else {
              // Jeśli nickname nie istnieje, przekierowujemy na stronę complete-registration
              router.push("/complete-registration");
            }
          } else {
            // Jeśli dokument użytkownika nie istnieje, przekierowujemy na stronę complete-registration
            router.push("/complete-registration");
          }
        }
      };

      checkNickname();
    }
  }, [isRedirecting, router, auth, db]);

  return (
    <section className={styles.loginScreen}>
      <h1 className={styles.title}>
        <Link href="/">Legendy Rynsztoka</Link>
      </h1>
      
      <form onSubmit={handleSubmit} className={styles.loginContainer}>
        <div className={styles.upper}>
          <p
            className={isLogin ? styles.loginClicked : styles.loginNotClicked}
            onClick={() => setIsLogin(true)}
          >
            Logowanie
          </p>
          <p className={!isLogin ? styles.loginClicked : styles.loginNotClicked}>
            <Link href="/register">Rejestracja</Link>
          </p>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className={styles.formField}>
          <label htmlFor="email" className={styles.emailText}>E-mail:</label>
          <input
            type="email"
            className={styles.inputBox}
            id="email"
            name="email"
            placeholder="Wpisz e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="password" className={styles.passwordText}>Hasło:</label>
          <input
            type="password"
            className={styles.inputBox}
            id="password"
            name="password"
            placeholder="Wpisz hasło"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {isLogin ? "Wchodzę!" : "Rejestruję się!"}
        </button>
      </form>

      <div className={styles.downContainer}>
        <p>Wchodzisz na własne ryzyko!</p>
      </div>
    </section>
  );
};
