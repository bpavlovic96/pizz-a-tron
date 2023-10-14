import styles from "./HomeLogin.module.css";
import { useEffect, useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import { useSelector } from "react-redux";
import { RootState, setAuthenticatedUser, setCurrentConfiguration } from "../../../../storage/Slice";
import SignupModal from "../SignupModal/SignupModal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../FirebaseInit/FirebaseInit";
import { v4 as uuidv4 } from "uuid";

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
  const authenticatedUser = useSelector((state: RootState) => state.storage.authenticatedUser);
  const currentConfiguration = useSelector((state: RootState) => state.storage.currentConfiguration);

  useEffect(() => {
    const listenAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthenticatedUser({ ...authenticatedUser, userEmail: user.email, userId: user.uid }));
      } else {
        dispatch(setAuthenticatedUser({ ...authenticatedUser, userEmail: null, userId: null }));
      }
      return () => {
        listenAuth();
      };
    });
  }, [dispatch]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn("");
      })
      .catch((error) => console.log(error));
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

  useEffect(() => {
    const newId = uuidv4();

    authenticatedUser.userEmail && currentConfiguration.id === ""
      ? dispatch(setCurrentConfiguration({ ...currentConfiguration, id: newId }))
      : dispatch(setCurrentConfiguration({ ...currentConfiguration, id: "" }));
  }, [authenticatedUser.userEmail]);

  return (
    <>
      {authenticatedUser.userEmail && authenticatedUser.userId ? (
        <button className={styles.button} onClick={userSignOut}>
          Log out
        </button>
      ) : (
        <button className={styles.button} onClick={openLoginModal}>
          Log in
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
        <SignupModal closeSignupModal={closeSignupModal} isSignupOpen={isSignupOpen} openLoginModal={openLoginModal} />
      ) : null}
    </>
  );
}

export default HomeLogin;
