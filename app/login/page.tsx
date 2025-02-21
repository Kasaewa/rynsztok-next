// app/login/page.tsx
"use client";
import Link from "next/link";
import "../../styles/globals.css";

export default function Login() {
  return (
    <section className="login-screen">
      <h1>Legendy Rynsztoka</h1>
      <form id="login-form" className="login-container">
        <div className="upper">
          <p className="wybrane">Logowanie</p>
          <p className="nie-wybrane">
            <Link href="/register">Rejestracja</Link>
          </p>
        </div>
        <div className="form-field">
          <label htmlFor="email" className="email-text">E-mail:</label>
          <input type="email" className="input-box" id="email" name="email" placeholder="Wpisz e-mail" required />
        </div>
        <div className="form-field">
          <label htmlFor="password" className="password-text">Hasło:</label>
          <input type="password" className="input-box" id="password" name="password" placeholder="Wpisz hasło" required />
        </div>
        <button type="submit">Zaczynam przygodę!</button>
      </form>
      <div className="ryzyko">
        <p>Wchodzisz na własne ryzyko!</p>
      </div>
    </section>
  );
}