import DiscountButton from "./DiscountButton/DiscountButton";
import styles from "./Discount.module.css";

function Discount() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Get the discount</h2>
      <DiscountButton />
    </div>
  );
}

export default Discount;
