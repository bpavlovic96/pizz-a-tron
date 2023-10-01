import styles from "./HomeLogin.module.css";
import { useEffect, useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import { useSelector } from "react-redux";
import { RootState, setAuthenticatedUser } from "../../../../storage/Slice";
import SignupModal from "../SignupModal/SignupModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../FirebaseInit/FirebaseInit";

export type LoginModalProps = {
  isLoginOpen: boolean;
  closeLoginModal: () => void;
  openSignupModal: () => void;
  loggedIn: string;
  setLoggedIn: React.Dispatch<React.SetStateAction<string>>;
};

export type SignupModalProps = {
  isSignupOpen: boolean;
  closeSignupModal: () => void;
  openLoginModal: () => void;
};

export type ModalProps = {
  LoginModal: LoginModalProps;
  SignupModal: SignupModalProps;
};

function HomeLogin() {
  const [loggedIn, setLoggedIn] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const dispatch = useDispatch();
  const authenticatedUser = useSelector(
    (state: RootState) => state.storage.authenticatedUser
  );

  useEffect(() => {
    const listenAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthenticatedUser(user.email));
      } else {
        dispatch(setAuthenticatedUser(null));
      }
      console.log(authenticatedUser);
      return () => {
        listenAuth();
      };
    });
  }, [authenticatedUser, dispatch]);

  const userSignOut = () => {
    authenticatedUser !== null
      ? signOut(auth)
          .then(() => {
            setLoggedIn("");
          })
          .catch((error) => console.log(error))
      : signOut(auth)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupOpen(false);
  };

  return (
    <>
      {authenticatedUser === null ? (
        <button className={styles.button} onClick={openLoginModal}>
          Log in
        </button>
      ) : (
        <button className={styles.button} onClick={userSignOut}>
          Log out
        </button>
      )}

      {isLoginOpen ? (
        <LoginModal
          isLoginOpen={isLoginOpen}
          closeLoginModal={closeLoginModal}
          openSignupModal={openSignupModal}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
        />
      ) : null}
      {isSignupOpen ? (
        <SignupModal
          closeSignupModal={closeSignupModal}
          isSignupOpen={isSignupOpen}
          openLoginModal={openLoginModal}
        />
      ) : null}
    </>
  );
}

export default HomeLogin;
