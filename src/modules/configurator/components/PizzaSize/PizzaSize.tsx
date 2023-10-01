import styles from "./PizzaSize.module.css";

function PizzaSize() {
  return (
    <div className={styles.sizeWrapper}>
      <h2 className={styles.sizeHeader}>Pizza! Pizza! size</h2>
      <div className={styles.buttonWrapper}>
        <button>S</button>
        <button>M</button>
        <button>L</button>
      </div>
    </div>
  );
}

export default PizzaSize;
