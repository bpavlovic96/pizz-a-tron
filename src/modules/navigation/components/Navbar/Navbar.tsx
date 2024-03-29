import OrderHistoryModal from "../../../OrderHistory/OrderHistory";
import HomeLogin from "../../../authentication/components/EmailLogin/HomeLogin/HomeLogin";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useAuthenticatedUser } from "../../../configurator/hooks/useAuthenticatedUser";

export type HandleHistory = () => void;

function Navbar() {
  const authenticatedUser = useAuthenticatedUser();
  const [orderHistoryClicked, setOrderHistoryClicked] = useState(false);

  const handleHistory: HandleHistory = () => {
    setOrderHistoryClicked(!orderHistoryClicked);
  };

  return (
    <div>
      <div className={styles.navbar}>
        <p className={styles.logoName}>Pizz-á-tron</p>
        <span className={styles.logo}>🍕</span>
        <HomeLogin />
        {orderHistoryClicked ? <OrderHistoryModal handleHistory={handleHistory} /> : null}
      </div>
      <div className={styles.historyButtonContainer}>
        {authenticatedUser.userId ? (
          <button className={styles.historyButton} onClick={handleHistory}>
            Show order history
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
