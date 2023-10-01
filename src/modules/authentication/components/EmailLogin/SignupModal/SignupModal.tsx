import React, { useState, useEffect } from "react";
import { auth } from "../../FirebaseInit/FirebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SignupModalProps } from "../HomeLogin/HomeLogin";
import styles from "./SignupModal.module.css";

const SignupModal: React.FC<SignupModalProps> = ({
  isSignupOpen,
  closeSignupModal,
  openLoginModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const closeModalOnOutsideClick: EventListener = (e) => {
      const target = e.target as HTMLElement;
      if (isSignupOpen && target.classList.contains(styles.modalOpen)) {
        closeSignupModal();
      }
    };

    window.addEventListener("click", closeModalOnOutsideClick);

    return () => {
      window.removeEventListener("click", closeModalOnOutsideClick);
    };
  }, [isSignupOpen, closeSignupModal]);

  const handleSignup = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={`${isSignupOpen ? styles.modalOpen : styles.modalClosed}`}>
      <div className={styles.modalContent}>
        <h2 className={styles.header}>Create Your Account</h2>
        <div className={styles.inputs}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSignup}>Sign up</button>
          <button
            onClick={() => {
              closeSignupModal();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              closeSignupModal();
              openLoginModal();
            }}
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
