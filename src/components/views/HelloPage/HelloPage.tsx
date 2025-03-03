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
  const [nickname, setNickname] = useState<string | null>(null); // State for storing the nickname
  const [loading, setLoading] = useState(false);
  const [nicknameLoading, setNicknameLoading] = useState(true); // Add separate loading for nickname fetching
  const [error, setError] = useState<string | null>(null);

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Redirect to login if user is not logged in
      } else {
        setUser(currentUser);
        
        try {
          // Fetch nickname from Firestore
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setNickname(userData?.nickname || "Brak nickname'a"); // Set the nickname or default value
          } else {
            setNickname("Brak nickname'a"); // If no nickname is found
          }
        } catch (fetchError) {
          console.error("Error fetching nickname:", fetchError);
          setError("Wystąpił błąd przy ładowaniu nickname'a.");
        } finally {
          setNicknameLoading(false); // End nickname loading
        }
      }
    });

    return () => unsubscribe(); // Clean up subscription on component unmount
  }, [router]);

  // Logout handler
  async function handleLogout() {
    setLoading(true);
    setError(null); // Reset errors before logging out
    try {
      await signOut(auth); // Log out from Firebase
      router.push("/login"); // Redirect to login after logout
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

      {user && !nicknameLoading && (
        <div className={styles.downContainer}>
          <p>Cześć {nickname} - wszedłeś na własne ryzyko!</p>
        </div>
      )}

      {nicknameLoading && <p>Ładowanie nicknamea...</p>} {/* Display a loading message while nickname is loading */}

      {error && <p className={styles.error}>{error}</p>}

      <div>
        <button onClick={handleLogout} disabled={loading} className={styles.submitButton}>
          {loading ? "Wylogowywanie..." : "Wyloguj"}
        </button>
      </div>
    </section>
  );
};

export default HelloPage;