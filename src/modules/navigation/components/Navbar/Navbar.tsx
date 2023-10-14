import { useSelector } from "react-redux";
import OrderHistoryModal from "../../../OrderHistory/OrderHistory";
import HomeLogin from "../../../authentication/components/EmailLogin/HomeLogin/HomeLogin";
import styles from "./Navbar.module.css";
import { RootState } from "../../../storage/Slice";
import { useState } from "react";

type HandleHistory = () => void;

function Navbar() {
  const authenticatedUser = useSelector((state: RootState) => state.storage.authenticatedUser);
  const [orderHistoryClicked, setOrderHistoryClicked] = useState(false);

  const handleHistory: HandleHistory = () => {
    setOrderHistoryClicked(!orderHistoryClicked);
  };

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <p className={styles.logoName}>Pizz-á-tron</p>
        <span className={styles.logo}>🍕</span>
        <HomeLogin />
      </div>
      {authenticatedUser.userId ? (
        <button className={styles.historyButton} onClick={handleHistory}>
          Show order history
        </button>
      ) : null}
      {orderHistoryClicked ? <OrderHistoryModal handleHistory={handleHistory} /> : null}
    </div>
  );
}

export default Navbar;
