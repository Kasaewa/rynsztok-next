import Link from "next/link";

import styles from "./styles/RegisterView.module.scss";

export const RegisterView = () => {
  return (
    <section className={styles.loginScreen}>
      <h1 className={styles.title}>Legendy Rynsztoka</h1>
      <form id="register-form" className={styles.loginContainer}>
        <div className={styles.upper}>
          <p className={styles.nieWybrane}>
            <Link href="/login">Logowanie</Link>
          </p>
          <p className={styles.wybrane}>
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
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Zaczynam przygodę!
        </button>
      </form>
      <div className={styles.ryzyko}>
        <p>Wchodzisz na własne ryzyko!</p>
      </div>
    </section>
  );
};
