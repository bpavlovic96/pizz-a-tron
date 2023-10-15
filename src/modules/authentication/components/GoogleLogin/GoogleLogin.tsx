import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styles from "./GoogleLogin.module.css";
import { useState } from "react";
import { GoogleModalProps } from "../EmailLogin/LoginModal/LoginModal";
import { useAuthenticatedUser } from "../../../configurator/hooks/useAuthenticatedUser";

const GoogleLogin: React.FC<GoogleModalProps> = ({ closeLoginModal }) => {
  const [googleLoginStatus, setGoogleLoginStatus] = useState("");

  const authenticatedUser = useAuthenticatedUser();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setGoogleLoginStatus("Login successful.");
        setTimeout(closeLoginModal as () => void, 2000);
      })
      .catch((error) => {
        console.log(error);
        setGoogleLoginStatus("Something went wrong, please try again.");
      });
  };

  return (
    <>
      {authenticatedUser.userEmail || !authenticatedUser.userId ? (
        <button className={styles.button} onClick={handleGoogleLogin}>
          Log in with Google?
        </button>
      ) : null}

      <p
        className={`${styles.loginButton} ${
          googleLoginStatus === "Login successful." ? styles.success : styles.failure
        }`}
      >
        {googleLoginStatus}
      </p>
    </>
  );
};

export default GoogleLogin;
