import styles from "./Discount.module.css";

function Discount() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Get the discount</h2>
      <div className={styles.buttonWrapper}>
        <input
          type="text"
          placeholder="Enter discount code"
          className={styles.input}
        />
        <button>Apply</button>
      </div>
    </div>
  );
}

export default Discount;
