import styles from "./OrderSummary.module.css";

function OrderSummary() {
  return (
    <div className={styles.wrapper}>
      <img
        src="src\assets\pizzaSlice.png"
        alt="Pizza slice"
        className={styles.pizzaImg}
      />
      <div className={styles.qtyAndTotalWrapper}>
        <div className={styles.qtyWrapper}>
          <input type="number" />
          <span>QTY</span>
        </div>
        <div className={styles.orderTotalWrapper}>
          <span className={styles.orderTotal}>$22.50</span>
          <span className={styles.orderTotalText}>ORDER TOTAL</span>
        </div>
      </div>
      <button className={styles.button}>Buy Pizza! Pizza!</button>
    </div>
  );
}

export default OrderSummary;
