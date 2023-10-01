import HomeLogin from "../../../authentication/components/EmailLogin/HomeLogin/HomeLogin";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <p className={styles.logoName}>Pizz-á-tron</p>
      <span className={styles.logo}>🍕</span>
      <HomeLogin />
    </div>
  );
}

export default Navbar;
