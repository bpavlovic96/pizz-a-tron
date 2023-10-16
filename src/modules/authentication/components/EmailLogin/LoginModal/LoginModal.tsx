import React, { useState, useEffect } from "react";
import { auth } from "../../FirebaseInit/FirebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginModalProps } from "../HomeLogin/HomeLogin";
import styles from "./LoginModal.module.css";
import GoogleLogin from "../../GoogleLogin/GoogleLogin";

export type GoogleModalProps = Pick<LoginModalProps, "closeLoginModal">;

const LoginModal: React.FC<LoginModalProps> = ({
  isLoginOpen,
  closeLoginModal,
  openSignupModal,
  loggedIn,
  setLoggedIn,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const closeModalOnOutsideClick: EventListener = (e) => {
      const target = e.target as HTMLElement;
      if (isLoginOpen && target.classList.contains(styles.modalOpen)) {
        closeLoginModal();
      }
    };

    window.addEventListener("click", closeModalOnOutsideClick);

    return () => {
      window.removeEventListener("click", closeModalOnOutsideClick);
    };
  }, [isLoginOpen, closeLoginModal]);

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoggedIn("Sucessfully logged in.");
        setTimeout(closeLoginModal, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn("Password is incorrect, please try again.");
      });
  };

  return (
    <div className={`${isLoginOpen ? styles.modalOpen : styles.modalClosed}`}>
      <div className={styles.modalContent}>
        <h2 className={styles.header}>Log in to your account to continue.</h2>
        <div className={styles.inputs}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={handleLogin}>Login</button>
          <button onClick={closeLoginModal}>Cancel</button>
          <button
            onClick={() => {
              openSignupModal();
              closeLoginModal();
            }}
          >
            Don't have an account?
          </button>
        </div>
        <GoogleLogin closeLoginModal={closeLoginModal} />
        <p
          className={`${styles.loginMessage} ${
            loggedIn === "Sucessfully logged in." ? styles.success : styles.failure
          }`}
        >
          {loggedIn}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
