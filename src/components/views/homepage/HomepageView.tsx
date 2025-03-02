// kod dla strony głównej

import styles from "./styles/HomepageView.module.scss";

export const HomepageView = () => {
  return (
    <section className={styles.homepage}>
      <h1 className={styles.title}>Legendy Rynsztoka</h1>
        
        <div className={styles.homepage-container}>
          <Link href="/login"><button className={styles.button-login}>
            Logowanie
          </button></Link>
          <button className={styles.button-login}>
            <Link href="/register">Rejestracja</Link>
          </button>
            
      <div className={styles.down-container}>
        <p>Wchodzisz na własne ryzyko!</p>
      </div>
    </section>
  );
};
}
