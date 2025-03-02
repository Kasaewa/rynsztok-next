"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser, registerUser } from "../../services/firebaseConfig"; // Poprawiona ścieżka
import styles from "./styles/LoginView.module.scss";

export const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Czy użytkownik loguje się czy rejestruje?

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginUser(email, password);
        alert("Zalogowano pomyślnie!");
      } else {
        await registerUser(email, password);
        alert("Konto utworzone!");
      }
    } catch {
      setError("Błąd: Sprawdź dane logowania.");
    }
  };

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
          <p
            className={!isLogin ? styles.loginClicked : styles.loginNotClicked}
            onClick={() => setIsLogin(false)}
          >
            Rejestracja
          </p>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className={styles.formField}>
          <label htmlFor="email" className={styles.emailText}>
            E-mail:
          </label>
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
          <label htmlFor="password" className={styles.passwordText}>
            Hasło:
          </label>
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
