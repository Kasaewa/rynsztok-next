"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./styles/RegisterView.module.scss";
import { loginUser, registerUser } from "../../services/firebaseConfig"; // Poprawiona ścieżka

export const RegisterView = () => {
  // Stan dla emaila, hasła oraz błędu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  // Funkcja do obsługi wysyłania formularza
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Wywołanie funkcji rejestracji
      await registerUser(email, password);
      alert("Konto zostało utworzone pomyślnie!");
      // Możesz przekierować użytkownika po zarejestrowaniu
      window.location.href = "/login"; // Przykład przekierowania do strony logowania
    } catch {
      setError("Błąd: Sprawdź dane logowania.");
    }
  };

  return (
    <section className={styles.loginScreen}>
      <h1 className={styles.title}>Legendy Rynsztoka</h1>
      <form id="register-form" className={styles.loginContainer} onSubmit={handleSubmit}>
        <div className={styles.upper}>
          <p className={styles.loginNotClicked}>
            <Link href="/login">Logowanie</Link>
          </p>
          <p className={styles.loginClicked}>
            <Link href="/register">Rejestracja</Link>
          </p>
        </div>
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
            onChange={(e) => setEmail(e.target.value)} // Aktualizacja stanu email
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
            onChange={(e) => setPassword(e.target.value)} // Aktualizacja stanu password
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Dalej!
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>} {/* Wyświetlanie błędu */}
      </form>
      <div className={styles.downContainer}>
        <p>Wchodzisz na własne ryzyko!</p>
      </div>
    </section>
  );
};
