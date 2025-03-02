import styles from "./styles/HomepageView.module.scss";
import Link from "next/link";

export const HomepageView = () => {
  return (
    <section className={styles.homepage}>
      <h1 className={styles.title}>Legendy Rynsztoka</h1>

      <div className={styles.homepageContainer}>
        <Link href="/login">
          <button className={styles.buttonLogin}>Logowanie</button>
        </Link>
        <Link href="/register">
          <button className={styles.buttonLogin}>Rejestracja</button>
        </Link>
      </div>

      <div className={styles.downContainer}>
        <p>Wchodzisz na własne ryzyko!</p>
      </div>
    </section>
  );
};
